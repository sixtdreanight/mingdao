"""AI 提取 — 从搜索/抓取结果中提取结构化 KnowledgeAtom。

借鉴 weekly-hotspot 的 analyze_event 模式：
搜索 → 获取内容 → AI 提取结构化数据 → Pydantic 验证
"""

import json
from typing import Optional

from chinese_scraper_utils import DeepSeekClient  # type: ignore

EXTRACT_PROMPT = """你是一个职业规划数据提取专家。我会给你一些搜索结果的标题和摘要，
请从中提取出可用于大学生职业规划的结构化数据。

## 当前提取维度：{category}

## 目标数据 Schema：
{schema_desc}

## 搜索结果：
{search_results}

## 要求：
1. 只从提供的搜索结果中提取，不要编造
2. 如果某个字段在搜索结果中没有找到，标注为 "未知" 或 null
3. 提取出具体的数字、百分比、金额等信息
4. 标注每个数据的可信度：如果来自官方来源（政府/学校/权威机构），标注 "official"；
   如果来自媒体报道，标注 "ai-inferred"
5. 输出纯 JSON 格式，不要包裹在 ```json ``` 中

输出格式：
{{
  "id": "kebab-case-unique-id",
  "title": "简洁标题",
  "content": "3-5句话的文本描述",
  "data": {{ ... 按 Schema 填充 }},
  "tags": ["标签1", "标签2"],
  "sourceUrl": "主要来源URL",
  "trustLevel": "official|ai-inferred",
  "priority": "exact|extended|reference"
}}

priority 说明：
- "exact": 这是用户首选城市/专业/预算的精确匹配数据，权重最高
- "extended": 这是周边城市/相近专业的扩展数据，可作为参考选项
- "reference": 这是更广泛的一般性参考数据
"""

SCHEMA_DESCRIPTIONS = {
    "salary": "city, industry, degree, experience, companyType, salaryRange(min/max/median), currency, year",
    "education": "pathType, country, tuition, livingCost, duration, languageRequirement, totalEstimate",
    "employment": "city, companyType, degreeRequirement, demandTrend, findings",
    "trend": "year, trend, reason, data",
    "policy": "policyType, country, year, conditions, applicable",
    "cost": "city, year, monthlyBreakdown(rent/food/transport/utilities), monthlyTotal, annualEstimate",
    "life": "year, findings",
}


def extract_atom(
    client: DeepSeekClient,
    category: str,
    search_results: list[dict],
    max_retries: int = 2,
) -> Optional[dict]:
    """用 AI 从搜索结果中提取一条 KnowledgeAtom。"""
    if not search_results:
        return None

    # 格式化搜索结果
    results_text = "\n\n".join(
        f"### [{r['title']}]({r['url']})\n{r['snippet']}"
        for r in search_results[:8]
    )

    schema_desc = SCHEMA_DESCRIPTIONS.get(category, "自定义数据")
    prompt = EXTRACT_PROMPT.format(
        category=category,
        schema_desc=schema_desc,
        search_results=results_text,
    )

    for attempt in range(max_retries + 1):
        try:
            raw = client.chat(prompt)
            # 清理可能的 markdown 包裹
            raw = raw.strip()
            if raw.startswith("```"):
                lines = raw.split("\n")
                raw = "\n".join(lines[1:-1])
            data = json.loads(raw)
            data["category"] = category
            data["lastUpdated"] = "2026-07-16"
            return data
        except (json.JSONDecodeError, Exception) as e:
            if attempt < max_retries:
                continue
            print(f"  [extract] 提取失败 ({category}): {e}")
            return None

    return None
