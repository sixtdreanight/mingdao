"""查询扩展器 — 在用户意图基础上智能扩展搜索范围。

原则：
1. 以用户为主：精确匹配的查询权重高，扩展查询标记为"参考"
2. 地理辐射：目标城市 → 周边城市群
3. 专业相近：主专业 → 相近/可转方向
4. 预算弹性：预算 ±30% 的范围
5. 所有扩展明确标注类型，不做隐性替换
"""

from dataclasses import dataclass, field
from typing import Literal


@dataclass
class ExpandedQuery:
    query: str
    priority: Literal["exact", "extended", "reference"]
    reason: str  # 为什么加入这个查询


# === 城市辐射圈 ===
# 每个城市映射到周边城市群（含通勤距离）

CITY_CLUSTERS: dict[str, list[tuple[str, str]]] = {
    "上海": [
        ("苏州", "高铁30分钟，同城化程度高"),
        ("杭州", "高铁1小时，互联网产业互补"),
        ("南京", "高铁1.5小时，省会城市"),
        ("无锡", "高铁40分钟，制造业聚集"),
        ("宁波", "高铁1.5小时，港口城市"),
        ("合肥", "高铁2小时，长三角辐射"),
    ],
    "北京": [
        ("天津", "高铁30分钟，同城化"),
        ("雄安", "规划新区，央企疏解"),
        ("石家庄", "高铁1小时，省会"),
    ],
    "深圳": [
        ("广州", "高铁30分钟，大湾区核心"),
        ("东莞", "高铁15分钟，制造业"),
        ("惠州", "高铁30分钟，居住溢出"),
        ("珠海", "高铁1小时，横琴"),
    ],
    "广州": [
        ("深圳", "高铁30分钟"),
        ("佛山", "地铁直达，同城化"),
        ("东莞", "高铁20分钟"),
    ],
    "杭州": [
        ("上海", "高铁1小时"),
        ("宁波", "高铁1小时"),
        ("绍兴", "地铁直达"),
        ("嘉兴", "高铁30分钟"),
    ],
    "成都": [
        ("重庆", "高铁1.5小时，双城经济圈"),
        ("绵阳", "高铁40分钟，科技城"),
    ],
    "武汉": [
        ("长沙", "高铁1.5小时"),
        ("郑州", "高铁2小时"),
        ("南昌", "高铁2小时"),
    ],
    "南京": [
        ("上海", "高铁1.5小时"),
        ("苏州", "高铁1小时"),
        ("合肥", "高铁1小时"),
        ("杭州", "高铁1.5小时"),
    ],
    "苏州": [
        ("上海", "高铁30分钟"),
        ("无锡", "高铁15分钟"),
        ("南京", "高铁1小时"),
        ("杭州", "高铁1.5小时"),
    ],
    "重庆": [
        ("成都", "高铁1.5小时"),
    ],
    "西安": [
        ("咸阳", "地铁直达，同城化"),
    ],
    "厦门": [
        ("福州", "高铁1.5小时"),
        ("泉州", "高铁30分钟"),
    ],
    "青岛": [
        ("济南", "高铁1.5小时"),
        ("烟台", "高铁1小时"),
    ],
    "大连": [
        ("沈阳", "高铁1.5小时"),
    ],
    # 出国特殊处理
    "德国": [
        ("荷兰", "申根区，英语普及率高"),
        ("奥地利", "德语区，文化相近"),
        ("瑞士", "高薪资，德语区"),
    ],
    "日本": [
        ("韩国", "东亚文化圈，IT产业"),
        ("新加坡", "英语环境，国际化"),
    ],
}


# === 专业相近映射 ===
# 主专业 → 可考虑的相关/相近方向

MAJOR_RELATED: dict[str, list[tuple[str, str]]] = {
    "计算机科学与技术": [
        ("软件工程", "核心对口"),
        ("人工智能", "热门方向"),
        ("数据科学", "交叉领域"),
        ("网络安全", "细分方向"),
        ("电子信息工程", "硬件方向"),
    ],
    "数学与应用数学": [
        ("数据科学", "热门转型方向"),
        ("金融工程", "金融+数学"),
        ("统计学", "对口专业"),
        ("计算机科学", "可转方向"),
    ],
    "金融学": [
        ("经济学", "相近学科"),
        ("会计学", "技能互通"),
        ("数据科学", "量化金融方向"),
        ("工商管理", "管理方向"),
    ],
    "机械工程": [
        ("自动化", "相近方向"),
        ("车辆工程", "细分方向"),
        ("电子信息", "智能硬件"),
        ("航空航天", "高端制造"),
    ],
    "临床医学": [
        ("药学", "医药方向"),
        ("生物医学工程", "医工交叉"),
        ("公共卫生", "体制内方向"),
    ],
    "法学": [
        ("知识产权", "科技法方向"),
        ("经济法", "金融法方向"),
        ("公共管理", "公务员方向"),
    ],
    "英语": [
        ("翻译", "对口方向"),
        ("国际商务", "复合方向"),
        ("国际关系", "体制方向"),
        ("跨境电商", "新兴方向"),
    ],
    "设计学": [
        ("UI/UX设计", "互联网方向"),
        ("工业设计", "硬件方向"),
        ("数字媒体", "游戏/影视"),
    ],
}


def expand_cities(user_city: str) -> list[ExpandedQuery]:
    """扩展城市：用户城市 + 周边城市群。

    用户城市用 "exact" 优先级，周边城市用 "extended" 优先级。
    返回模板字符串 "{city}" 供 query_builder 替换。
    """
    results: list[ExpandedQuery] = []

    # 精确匹配
    results.append(ExpandedQuery(
        query=user_city,
        priority="exact",
        reason="用户首选城市",
    ))

    # 周边城市群
    cluster = CITY_CLUSTERS.get(user_city, [])
    for nearby_city, proximity_reason in cluster[:4]:  # 最多扩展 4 个
        results.append(ExpandedQuery(
            query=nearby_city,
            priority="extended",
            reason=f"周边城市 — {proximity_reason}",
        ))

    return results


def expand_majors(user_major: str) -> list[ExpandedQuery]:
    """扩展专业：主专业 + 相近方向。"""
    results: list[ExpandedQuery] = []

    if not user_major:
        return results

    results.append(ExpandedQuery(
        query=user_major,
        priority="exact",
        reason="用户主修专业",
    ))

    related = MAJOR_RELATED.get(user_major, [])
    for related_major, relation_reason in related[:3]:
        results.append(ExpandedQuery(
            query=related_major,
            priority="extended",
            reason=f"相近方向 — {relation_reason}",
        ))

    return results


def expand_budget(budget: int) -> list[ExpandedQuery]:
    """扩展预算：精确值 + ±30% 弹性范围。"""
    if budget <= 0:
        return [ExpandedQuery(query="", priority="exact", reason="预算未知")]

    lo = int(budget * 0.7)
    hi = int(budget * 1.3)

    return [
        ExpandedQuery(
            query=f"{budget//10000}万",
            priority="exact",
            reason="用户预算",
        ),
        ExpandedQuery(
            query=f"{lo//10000}-{hi//10000}万",
            priority="extended",
            reason=f"弹性范围 (±30%): {lo//10000}-{hi//10000}万",
        ),
    ]


def build_expanded_queries(
    user_city: str = "",
    user_major: str = "",
    user_budget: int = 0,
) -> dict[str, list[ExpandedQuery]]:
    """综合扩展：城市 + 专业 + 预算全维度展开。

    返回: {dimension: [ExpandedQuery, ...]}
    """
    return {
        "city": expand_cities(user_city),
        "major": expand_majors(user_major),
        "budget": expand_budget(user_budget),
    }
