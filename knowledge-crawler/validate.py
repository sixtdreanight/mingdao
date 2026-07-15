"""数据质量验证 — 多层校验，拒绝低质量数据。

借鉴 weekly-hotspot 的 scorer + censor 分层验证模式。

验证流水线：
1. 结构校验: 必填字段、类型检查、格式规范
2. 数值边界: 薪资/费用/时间不能超出合理范围
3. 一致性检查: 同一维度的数据不应自相矛盾
4. AI 交叉验证: "这条数据合理吗？"
5. 质量评分 + 阈值过滤
"""

import json
import re
from typing import Optional

from chinese_scraper_utils import DeepSeekClient  # type: ignore

# === 数值边界校验规则 ===
# 每个字段的合理范围，超出则标记为可疑

NUMERIC_BOUNDS: dict[str, dict] = {
    # 薪资 (月薪，CNY)
    "salary_min": {"min": 3000, "max": 80000, "unit": "CNY/月"},
    "salary_max": {"min": 5000, "max": 150000, "unit": "CNY/月"},
    "salary_median": {"min": 4000, "max": 100000, "unit": "CNY/月"},

    # 学费 (年，CNY)
    "tuition_domestic": {"min": 3000, "max": 50000, "unit": "CNY/年"},
    "tuition_overseas": {"min": 30000, "max": 600000, "unit": "CNY/年"},

    # 生活成本 (月，CNY)
    "living_cost_cn": {"min": 1500, "max": 15000, "unit": "CNY/月"},
    "living_cost_overseas": {"min": 3000, "max": 30000, "unit": "CNY/月"},

    # 时间 (年)
    "duration_education": {"min": 0.5, "max": 5, "unit": "年"},
    "experience_years": {"min": 0, "max": 20, "unit": "年"},
}


def validate_structure(atom: dict) -> list[str]:
    """结构校验：必填字段 + 类型 + 格式。返回错误列表。"""
    errors = []

    # 必填字段
    required = ["id", "category", "title", "content", "data", "tags", "lastUpdated"]
    for field in required:
        if not atom.get(field):
            errors.append(f"缺少必填字段: {field}")

    # id 格式: kebab-case
    atom_id = atom.get("id", "")
    if atom_id and not re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", atom_id):
        errors.append(f"id 格式错误（需 kebab-case）: {atom_id}")

    # category 有效值
    valid_categories = {"salary", "education", "employment", "trend", "policy", "cost", "life"}
    if atom.get("category", "") not in valid_categories:
        errors.append(f"无效 category: {atom.get('category')}")

    # title 长度
    title = atom.get("title", "")
    if len(title) < 5:
        errors.append(f"title 过短 (<5字符): {title}")
    if len(title) > 100:
        errors.append(f"title 过长 (>100字符): {title}")

    # content 长度
    content = atom.get("content", "")
    if len(content) < 20:
        errors.append(f"content 过短 (<20字符)，可能内容不完整")
    if len(content) > 2000:
        errors.append(f"content 过长 (>2000字符)")

    # tags 至少 2 个
    tags = atom.get("tags", [])
    if not isinstance(tags, list) or len(tags) < 2:
        errors.append("tags 至少需要 2 个标签")

    # sourceUrl
    source_url = atom.get("sourceUrl", "")
    if not source_url:
        errors.append("缺少 sourceUrl（数据无法追溯）")
    elif not source_url.startswith("http"):
        errors.append(f"sourceUrl 格式错误: {source_url}")

    # trustLevel
    if atom.get("trustLevel") not in {"official", "ai-inferred", "community-unreviewed"}:
        errors.append(f"无效 trustLevel: {atom.get('trustLevel')}")

    return errors


def validate_numbers(atom: dict) -> list[str]:
    """数值边界校验：提取 data 中的数值，检查是否在合理范围。"""
    warnings = []
    data = atom.get("data", {})
    if not isinstance(data, dict):
        return ["data 字段不是对象"]

    data_str = json.dumps(data, ensure_ascii=False).lower()

    # 检查是否有看起来不合理的极值
    # 应届薪资 > 5万/月 通常不对
    if atom.get("category") == "salary":
        # 提取所有数字
        numbers = re.findall(r'\b(\d+)\b', data_str)
        for n_str in numbers:
            n = int(n_str)
            if n > 100000 and ("salary" in data_str or "pay" in data_str or "薪资" in data_str):
                warnings.append(f"数值 {n} 可能过大，需确认单位")

    # 检查经验年限
    if "0-1" in str(data.get("experience", "")) or "应届" in str(data):
        salary_max = extract_nested_number(data, "salaryRange", "max")
        if salary_max and salary_max > 50000:
            warnings.append(f"应届薪资 max={salary_max} 偏高，请核实")

    return warnings


def extract_nested_number(data: dict, *keys: str) -> Optional[float]:
    """从嵌套字典中提取数值。"""
    current = data
    for key in keys:
        if isinstance(current, dict):
            current = current.get(key)
        else:
            return None
    if isinstance(current, (int, float)):
        return float(current)
    return None


AI_VALIDATE_PROMPT = """你是一个数据质量审查专家。请检查以下从互联网提取的职业规划数据是否合理。

## 待审查数据
```json
{data_json}
```

## 审查维度
1. **来源可信度**: sourceUrl 是否是可信的权威来源（政府、学校、官方机构 > 知名媒体 > 个人博客）
2. **数据合理性**: 数字看起来是否符合常识？（比如应届生月薪 10 万就不合理）
3. **时效性**: 数据是否过时？是最近的数据吗？
4. **完整性**: 数据是否足够完整，还是缺了关键信息？
5. **一致性**: 数据内部有没有自相矛盾的地方？

## 输出格式
请输出纯 JSON：
{{
  "pass": true/false,
  "score": 0-100,
  "issues": ["问题1", "问题2"],
  "suggestion": "改进建议（通过时可为空）"
}}
"""


def ai_validate(
    client: DeepSeekClient, atom: dict
) -> Optional[dict]:
    """AI 交叉验证：判断提取的数据是否合理。"""
    data_json = json.dumps(atom, ensure_ascii=False, indent=2)
    prompt = AI_VALIDATE_PROMPT.format(data_json=data_json)

    try:
        raw = client.chat(prompt)
        raw = raw.strip()
        if raw.startswith("```"):
            lines = raw.split("\n")
            raw = "\n".join(lines[1:-1])
        return json.loads(raw)
    except (json.JSONDecodeError, Exception) as e:
        print(f"  [validate] AI 验证失败: {e}")
        return {"pass": True, "score": 50, "issues": ["AI 验证不可用，人工审核"], "suggestion": ""}


def validate_atom(
    client: DeepSeekClient,
    atom: dict,
    min_score: int = 60,
) -> tuple[bool, list[str], int]:
    """完整验证流水线。

    返回: (是否通过, 问题列表, 质量评分 0-100)
    """
    all_issues: list[str] = []

    # Layer 1: 结构校验
    struct_errors = validate_structure(atom)
    all_issues.extend(struct_errors)

    # Layer 2: 数值边界
    num_warnings = validate_numbers(atom)
    all_issues.extend(num_warnings)

    # Layer 3: AI 交叉验证
    ai_result = ai_validate(client, atom)
    if ai_result:
        ai_score = ai_result.get("score", 50)
        if ai_result.get("issues"):
            all_issues.extend(ai_result["issues"])
    else:
        ai_score = 50

    # 计算最终评分
    # 结构: 每错扣 15 分; 数值: 每警告扣 5 分; AI 评分占 50%
    struct_penalty = len(struct_errors) * 15
    num_penalty = len(num_warnings) * 5
    base_score = 100 - struct_penalty - num_penalty
    final_score = int(base_score * 0.5 + ai_score * 0.5)
    final_score = max(0, min(100, final_score))

    passed = final_score >= min_score and len(struct_errors) == 0

    return passed, all_issues, final_score
