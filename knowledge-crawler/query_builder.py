"""动态查询构建器 — 根据用户画像生成搜索词，而非硬编码。

原则：用户画像缺什么维度，就搜什么维度的数据。
搜索词由 专业 + 城市 + 学校层次 + 兴趣 + 预算区间 动态组合。
"""

from typing import Optional
from dataclasses import dataclass, field


@dataclass
class UserContext:
    """从角色卡提取的用户上下文，用于动态生成搜索词。"""
    major: str = ""              # 专业: 计算机/数学/电子/机械/金融/医学...
    grade: str = ""              # 年级: 大一/大二/大三/大四
    university_tier: str = ""    # 学校层次: 985/211/双非一本/二本/专科
    target_city: str = ""        # 目标城市: 上海/北京/深圳...
    budget: int = 0              # 教育预算(元)
    interests: list[str] = field(default_factory=list)
    lifestyle: list[str] = field(default_factory=list)
    red_lines: list[str] = field(default_factory=list)


def build_search_queries(
    ctx: UserContext,
    dimensions: Optional[list[str]] = None,
) -> dict[str, list[str]]:
    """根据用户画像动态生成各维度的搜索词。

    返回: {category: [query1, query2, ...]}
    """
    if dimensions is None:
        dimensions = ["salary", "education", "employment",
                      "trend", "policy", "cost", "life"]

    queries: dict[str, list[str]] = {}
    major = ctx.major or "计算机"  # 默认兜底
    city = ctx.target_city or "上海"
    tier = ctx.university_tier or ""
    budget_str = f"{ctx.budget//10000}万" if ctx.budget else ""

    for dim in dimensions:
        qs = _build_for_dimension(dim, major, city, tier, budget_str, ctx)
        if qs:
            queries[dim] = qs

    return queries


def _build_for_dimension(
    dim: str, major: str, city: str, tier: str, budget: str, ctx: UserContext,
) -> list[str]:
    """为单个维度构建搜索词。"""
    qs: list[str] = []

    # 专业关键词泛化：去除具体名词，保留核心职业方向
    # "计算机科学与技术" → "计算机/IT"
    major_short = _shorten_major(major)

    if dim == "salary":
        # 城市 + 专业 + 学历 + 年份 动态组合
        qs = [
            f"{city} {major_short} 应届 薪资 2024",
            f"{city} {major_short} 薪资 2024 本科",
            f"{major_short} 毕业生 起薪 2024 {city}",
            f"{city} {major_short} 3年经验 薪资 2024",
        ]
        if tier:
            qs.append(f"{tier} {major_short} 就业 薪资 2024")

    elif dim == "education":
        qs = [
            f"{major_short} 考研 报录比 2024",
            f"{major_short} 硕士 申请 条件 2024",
            f"{major_short} 留学 费用 2024",
            f"{major_short} 第二学位 辅修 2024",
        ]
        if budget:
            qs.append(f"预算{budget} {major_short} 留学 2024")
        if tier:
            qs.append(f"{tier} {major_short} 保研 推免 2024")

    elif dim == "employment":
        qs = [
            f"{city} {major_short} 招聘 2024 应届",
            f"{major_short} 就业 前景 2024 需求",
            f"{major_short} 岗位 要求 学历 2024",
        ]
        if tier and tier != "985" and tier != "211":
            qs.append(f"{tier} {major_short} 就业 学历门槛 2024")

    elif dim == "trend":
        qs = [
            f"AI 对 {major_short} 岗位 影响 2024",
            f"{major_short} 行业 趋势 2024 中国",
            f"{major_short} 就业 前景 未来 5年",
        ]

    elif dim == "policy":
        if city:
            qs.append(f"{city} 应届生 落户 政策 2024")
            qs.append(f"{city} 人才引进 {major_short} 2024")
        qs.append(f"{major_short} 选调生 考公 2024")

    elif dim == "cost":
        if city:
            qs.append(f"{city} 租房 生活成本 2024")
            qs.append(f"{city} 月支出 毕业生 2024")

    elif dim == "life":
        qs.append(f"{major_short} 工作强度 加班 2024")
        qs.append(f"{major_short} 职业发展 天花板 2024")
        if ctx.lifestyle:
            for ls in ctx.lifestyle[:2]:
                qs.append(f"{major_short} {ls} 职业 2024")

    return qs


def _shorten_major(major: str) -> str:
    """将完整专业名缩短为可搜索的关键词。"""
    mapping = {
        "计算机科学与技术": "计算机",
        "软件工程": "软件工程",
        "人工智能": "人工智能",
        "数据科学": "数据科学",
        "数学与应用数学": "数学",
        "信息与计算科学": "数学/计算机",
        "电子信息工程": "电子信息",
        "通信工程": "通信工程",
        "电气工程及其自动化": "电气工程",
        "机械工程": "机械工程",
        "土木工程": "土木工程",
        "金融学": "金融",
        "会计学": "会计",
        "法学": "法学",
        "临床医学": "临床医学",
        "药学": "药学",
        "生物科学": "生物",
        "化学": "化学",
        "物理学": "物理",
        "英语": "外语/英语",
        "日语": "外语/日语",
        "新闻学": "新闻/传媒",
        "市场营销": "市场营销",
        "工商管理": "工商管理",
        "设计学": "设计",
    }
    return mapping.get(major, major)
