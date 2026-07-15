"""权威数据源直接抓取 — 已知 URL 结构的精准数据提取。

与 search.py（搜索引擎）互补：
- search.py：不知道哪里有数据 → 搜索引擎找
- scrape.py：知道这个 URL 有权威数据 → 直接抓取解析

权威数据源列表：
- O*NET (美国劳工部) — 职业数据
- 研招网 — 考研数据
- Numbeo — 生活成本
- 各大学官网 — 学费/录取要求
- 国家统计局 — 薪资统计
- 教育部 — 政策文件
"""

import json
import re
import urllib.request
from typing import Optional
from dataclasses import dataclass, field


@dataclass
class ScrapeTarget:
    """一个抓取目标：已知 URL + 解析规则。"""
    name: str                     # 数据源名称
    url: str                      # 目标 URL
    category: str                 # 对应 AtomCategory
    trust_level: str = "official" # 权威源默认 official
    # 提取规则：CSS 选择器或正则
    selectors: dict[str, str] = field(default_factory=dict)
    # 是否需要解析 JSON（API 返回 JSON）
    is_json_api: bool = False
    # API 所需的 headers
    headers: dict[str, str] = field(default_factory=dict)


# === 权威数据源注册表（30+ 可验证来源） ===
# 设计原则：每个维度至少 3 个独立来源，中英文交叉验证，
# 官方数据 + 行业报告 + 平台数据 + 社区反馈 四层覆盖

AUTHORITATIVE_SOURCES: list[ScrapeTarget] = [

    # ================================================================
    # 薪资数据 — 6 个来源
    # ================================================================
    ScrapeTarget(
        name="O*NET — Software Developers (美国劳工部)",
        url="https://www.onetonline.org/link/summary/15-1252.00",
        category="salary",
        trust_level="official",
    ),
    ScrapeTarget(
        name="BLS — Software Developers Occupational Outlook (美国劳工统计局)",
        url="https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
        category="salary",
        trust_level="official",
    ),
    ScrapeTarget(
        name="Levels.fyi — China Tech Salary 2024",
        url="https://www.levels.fyi/",
        category="salary",
    ),
    ScrapeTarget(
        name="Glassdoor — Software Engineer Salary Shanghai",
        url="https://www.glassdoor.com/Salaries/shanghai-software-engineer-salary-SRCH_IL.0,8_IM1065_KO9,27.htm",
        category="salary",
    ),
    ScrapeTarget(
        name="牛客网 — 校招薪资汇总",
        url="https://www.nowcoder.com/",
        category="salary",
    ),
    ScrapeTarget(
        name="中国国家统计局 — 城镇单位就业人员平均工资",
        url="https://www.stats.gov.cn/sj/ndsj/",
        category="salary",
        trust_level="official",
    ),

    # ================================================================
    # 教育数据 — 8 个来源
    # ================================================================
    ScrapeTarget(
        name="研招网 — 硕士专业目录 (教育部)",
        url="https://yz.chsi.com.cn/zsml/queryAction.do",
        category="education",
        trust_level="official",
    ),
    ScrapeTarget(
        name="中国教育在线 — 考研频道",
        url="https://kaoyan.eol.cn/",
        category="education",
    ),
    ScrapeTarget(
        name="DAAD — 德国学术交流中心 (官方)",
        url="https://www.daad.de/en/studying-in-germany/",
        category="education",
        trust_level="official",
    ),
    ScrapeTarget(
        name="Study UK — British Council (官方)",
        url="https://study-uk.britishcouncil.org/",
        category="education",
        trust_level="official",
    ),
    ScrapeTarget(
        name="Campus France — 法国高等教育署 (官方)",
        url="https://www.campusfrance.org/en",
        category="education",
        trust_level="official",
    ),
    ScrapeTarget(
        name="Study Australia — 澳大利亚政府留学 (官方)",
        url="https://www.studyaustralia.gov.au/",
        category="education",
        trust_level="official",
    ),
    ScrapeTarget(
        name="JASSO — 日本学生支援机构 (官方)",
        url="https://www.jasso.go.jp/en/study_j/index.html",
        category="education",
        trust_level="official",
    ),
    ScrapeTarget(
        name="QS Top Universities — Computer Science Rankings",
        url="https://www.topuniversities.com/university-rankings/university-subject-rankings/computer-science-information-systems",
        category="education",
    ),

    # ================================================================
    # 就业数据 — 7 个来源
    # ================================================================
    ScrapeTarget(
        name="Stack Overflow Developer Survey 2024",
        url="https://survey.stackoverflow.co/2024/",
        category="employment",
    ),
    ScrapeTarget(
        name="中国教育部 — 高校毕业生就业质量报告",
        url="https://www.moe.gov.cn/jyb_xwfb/xw_zt/moe_357/2024/",
        category="employment",
        trust_level="official",
    ),
    ScrapeTarget(
        name="GitHub Octoverse 2024 — 开发者生态报告",
        url="https://octoverse.github.com/",
        category="employment",
    ),
    ScrapeTarget(
        name="JetBrains Developer Ecosystem Survey 2024",
        url="https://www.jetbrains.com/lp/devecosystem-2024/",
        category="employment",
    ),
    ScrapeTarget(
        name="智联招聘 — IT 行业就业报告",
        url="https://www.zhaopin.com/",
        category="employment",
    ),
    ScrapeTarget(
        name="猎聘 — 中高端人才趋势报告",
        url="https://www.liepin.com/",
        category="employment",
    ),
    ScrapeTarget(
        name="前程无忧 — 薪酬调研报告",
        url="https://www.51job.com/",
        category="employment",
    ),

    # ================================================================
    # 行业趋势 — 5 个来源
    # ================================================================
    ScrapeTarget(
        name="Gartner — IT Spending & Technology Trends",
        url="https://www.gartner.com/en/information-technology",
        category="trend",
    ),
    ScrapeTarget(
        name="麦肯锡 — AI 对就业影响报告",
        url="https://www.mckinsey.com/featured-insights/future-of-work",
        category="trend",
    ),
    ScrapeTarget(
        name="中国信通院 — 数字经济白皮书",
        url="https://www.caict.ac.cn/",
        category="trend",
        trust_level="official",
    ),
    ScrapeTarget(
        name="艾瑞咨询 — 互联网行业研究报告",
        url="https://www.iresearch.cn/",
        category="trend",
    ),
    ScrapeTarget(
        name="世界经济论坛 — Future of Jobs Report 2024",
        url="https://www.weforum.org/publications/the-future-of-jobs-report-2024/",
        category="trend",
    ),

    # ================================================================
    # 政策数据 — 8 个来源
    # ================================================================
    ScrapeTarget(
        name="上海市人社局 — 人才引进落户 (官方)",
        url="https://rsj.sh.gov.cn/",
        category="policy",
        trust_level="official",
    ),
    ScrapeTarget(
        name="北京市人社局 — 积分落户 (官方)",
        url="https://rsj.beijing.gov.cn/",
        category="policy",
        trust_level="official",
    ),
    ScrapeTarget(
        name="深圳市人社局 — 人才引进 (官方)",
        url="https://hrss.sz.gov.cn/",
        category="policy",
        trust_level="official",
    ),
    ScrapeTarget(
        name="UK Government — Graduate Visa (官方)",
        url="https://www.gov.uk/graduate-visa",
        category="policy",
        trust_level="official",
    ),
    ScrapeTarget(
        name="澳大利亚内政部 — 技术移民职业列表 (官方)",
        url="https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list",
        category="policy",
        trust_level="official",
    ),
    ScrapeTarget(
        name="USCIS — H-1B Cap Season (美国移民局)",
        url="https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations",
        category="policy",
        trust_level="official",
    ),
    ScrapeTarget(
        name="德国联邦移民局 — EU Blue Card (官方)",
        url="https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/MigratEU/BlaueKarteEU/blaue-karte-eu-node.html",
        category="policy",
        trust_level="official",
    ),
    ScrapeTarget(
        name="新加坡人力部 — COMPASS 框架 (官方)",
        url="https://www.mom.gov.sg/passes-and-permits/employment-pass",
        category="policy",
        trust_level="official",
    ),

    # ================================================================
    # 生活成本 — 6 个来源
    # ================================================================
    ScrapeTarget(
        name="Numbeo — Shanghai Cost of Living",
        url="https://www.numbeo.com/cost-of-living/in/Shanghai",
        category="cost",
    ),
    ScrapeTarget(
        name="Numbeo — Beijing Cost of Living",
        url="https://www.numbeo.com/cost-of-living/in/Beijing",
        category="cost",
    ),
    ScrapeTarget(
        name="Numbeo — Munich Cost of Living",
        url="https://www.numbeo.com/cost-of-living/in/Munich",
        category="cost",
    ),
    ScrapeTarget(
        name="Numbeo — Tokyo Cost of Living",
        url="https://www.numbeo.com/cost-of-living/in/Tokyo",
        category="cost",
    ),
    ScrapeTarget(
        name="Expatistan — Cost of Living Comparison",
        url="https://www.expatistan.com/cost-of-living",
        category="cost",
    ),
    ScrapeTarget(
        name="安居客/贝壳 — 上海租房数据",
        url="https://sh.zu.anjuke.com/",
        category="cost",
    ),

    # ================================================================
    # 工作与生活 — 5 个来源
    # ================================================================
    ScrapeTarget(
        name="Glassdoor — Company Reviews & Ratings",
        url="https://www.glassdoor.com/Reviews/index.htm",
        category="life",
    ),
    ScrapeTarget(
        name="996.ICU — 加班公司列表 (GitHub开源)",
        url="https://github.com/996icu/996.ICU",
        category="life",
    ),
    ScrapeTarget(
        name="脉脉 — 互联网职场社区",
        url="https://maimai.cn/",
        category="life",
    ),
    ScrapeTarget(
        name="中国劳动统计年鉴 — 工作时间数据 (官方)",
        url="https://www.stats.gov.cn/sj/ndsj/",
        category="life",
        trust_level="official",
    ),
    ScrapeTarget(
        name="Remote OK / We Work Remotely — 远程工作趋势",
        url="https://remoteok.com/",
        category="life",
    ),
]


def fetch_page(url: str, headers: dict[str, str] | None = None) -> Optional[str]:
    """获取页面 HTML 内容。"""
    default_headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        ),
    }
    if headers:
        default_headers.update(headers)

    try:
        req = urllib.request.Request(url, headers=default_headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            raw = resp.read(100000).decode("utf-8", errors="replace")
            return raw
    except Exception as e:
        print(f"  [fetch] 获取失败 {url}: {e}")
        return None


def extract_text_from_html(html: str) -> str:
    """从 HTML 中提取纯文本，保留结构信息。"""
    # 移除 script/style/noscript
    html = re.sub(
        r"<(script|style|noscript|iframe|svg)[^>]*>.*?</\1>",
        "", html, flags=re.DOTALL | re.IGNORECASE,
    )
    # 保留标题/段落/列表的结构标记
    html = re.sub(r"<h[1-6][^>]*>(.*?)</h[1-6]>", r"\n## \1\n", html, flags=re.IGNORECASE)
    html = re.sub(r"<p[^>]*>", r"\n", html, flags=re.IGNORECASE)
    html = re.sub(r"<li[^>]*>(.*?)</li>", r"\n- \1", html, flags=re.IGNORECASE | re.DOTALL)
    html = re.sub(r"<br\s*/?>", "\n", html, flags=re.IGNORECASE)
    # 移除剩余标签
    html = re.sub(r"<[^>]+>", " ", html)
    # 合并空白
    html = re.sub(r"\n\s*\n", "\n\n", html)
    html = re.sub(r"[ \t]+", " ", html)
    html = re.sub(r"\n{3,}", "\n\n", html)
    return html.strip()[:10000]


def extract_numbers(text: str) -> list[dict]:
    """从文本中提取数值信息（薪资、费用等）。

    返回格式：[{"value": 12000, "unit": "元/月", "context": "...", "confidence": 0.8}, ...]
    """
    results = []

    # 薪资模式: "XX-XXk/月", "XX-XX万/年", "月薪XX-XX"
    salary_patterns = [
        (r"(\d+)[\s-]*[-–—][\s-]*(\d+)\s*k\s*/\s*月", "k/月"),
        (r"(\d+)[\s-]*[-–—][\s-]*(\d+)\s*万\s*/\s*年", "万/年"),
        (r"月薪\s*(\d+)[\s-]*[-–—][\s-]*(\d+)\s*k", "k/月"),
        (r"(\d+)[\s-]*[-–—][\s-]*(\d+)\s*元\s*/\s*月", "元/月"),
    ]

    for pattern, unit in salary_patterns:
        for m in re.finditer(pattern, text):
            try:
                lo, hi = int(m.group(1)), int(m.group(2))
                context_start = max(0, m.start() - 50)
                context_end = min(len(text), m.end() + 50)
                results.append({
                    "range": [lo, hi],
                    "unit": unit,
                    "raw": m.group(0),
                    "context": text[context_start:context_end].strip(),
                })
            except ValueError:
                continue

    # 费用模式: "约XX万/年", "$XX,XXX/年"
    cost_patterns = [
        (r"约?\s*(\d+)[\s-]*[-–—][\s-]*(\d+)\s*万\s*/\s*年?", "万/年"),
        (r"\$\s*([\d,]+)\s*[-–—]\s*\$?\s*([\d,]+)\s*/\s*年?", "USD/年"),
        (r"(\d+)\s*欧元\s*/\s*月", "EUR/月"),
    ]

    for pattern, unit in cost_patterns:
        for m in re.finditer(pattern, text):
            try:
                lo_s = m.group(1).replace(",", "")
                hi_s = m.group(2).replace(",", "")
                lo, hi = int(lo_s), int(hi_s)
                context_start = max(0, m.start() - 50)
                context_end = min(len(text), m.end() + 50)
                results.append({
                    "range": [lo, hi],
                    "unit": unit,
                    "raw": m.group(0),
                    "context": text[context_start:context_end].strip(),
                })
            except ValueError:
                continue

    return results


def scrape_target(target: ScrapeTarget) -> Optional[str]:
    """抓取一个权威数据源，返回纯文本内容。"""
    print(f"  [scrape] {target.name}: {target.url}")

    html = fetch_page(target.url, target.headers)
    if not html:
        return None

    if target.is_json_api:
        try:
            data = json.loads(html)
            return json.dumps(data, ensure_ascii=False, indent=2)[:8000]
        except json.JSONDecodeError:
            pass

    text = extract_text_from_html(html)
    print(f"    提取文本: {len(text)} 字符")

    # 额外提取数值信息
    numbers = extract_numbers(text)
    if numbers:
        print(f"    发现数值: {len(numbers)} 条")
        text += "\n\n=== 提取的数值 ===\n"
        for n in numbers[:10]:
            text += f"- {n['raw']} | 上下文: {n['context']}\n"

    return text
