"""Career Maze 知识库爬虫 — 配置与多源数据定义。

数据源设计原则：
- 每个维度至少 3 个以上独立来源
- 中英文来源交叉验证
- 官方数据 + 行业报告 + 社区反馈 三层覆盖
"""

import os
from pathlib import Path

# === API Keys ===
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY", "")
DEEPSEEK_MODEL = "deepseek-chat"
BING_API_KEY = os.environ.get("BING_API_KEY", "")

# === Paths ===
PROJECT_ROOT = Path(__file__).resolve().parent.parent
KB_DIR = PROJECT_ROOT / "src" / "data" / "knowledge"
CACHE_DIR = Path(__file__).resolve().parent / ".cache"

# ================================================================
# 7 大数据维度 — 每个维度多源覆盖
# ================================================================

SALARY_SOURCES = {
    "search_queries": [
        # 中国城市 × 学历 × 公司类型
        "上海 计算机 应届 薪资 2024 本科",
        "上海 外企 软件工程师 薪资 2024",
        "北京 互联网 校招 薪资 2024 硕士",
        "深圳 程序员 薪资 2024 华为 腾讯",
        "杭州 计算机 应届 薪资 2024 阿里",
        "广州 软件工程师 薪资 2024",
        "成都 武汉 程序员 薪资 2024 新一线",
        # 国际对比
        "上海 software engineer salary 2024 levels.fyi",
        "China tech salary report 2024",
        # 社区数据
        "牛客网 2024 校招 薪资 汇总",
        "脉脉 2024 互联网 薪资 职级",
        "offershow 2024 校招 薪资",
    ],
    "category": "salary",
}

EDUCATION_SOURCES = {
    "search_queries": [
        # 国内升学
        "上海 计算机 考研 报录比 2024",
        "计算机 保研 推免 条件 2024 双非",
        "考研 计算机 408 分数线 2024",
        "研招网 计算机 硕士 招生 2024",
        # 各留学目的国
        "德国 计算机 硕士 APS 费用 2024 公立大学",
        "美国 CS master tuition 2024 international student",
        "英国 计算机 硕士 一年 费用 2024 G5",
        "日本 IT 留学 研究生 费用 2024 语言学校",
        "澳洲 八大 计算机 硕士 学费 2024 移民",
        "新加坡 NUS NTU 计算机 硕士 申请 2024",
        "法国 工程师 计算机 硕士 费用 2024",
        "韩国 计算机 硕士 留学 TOPIK 2024",
        # 费用对比
        "各国 计算机 留学 费用 对比 2024",
        "最便宜 留学 国家 计算机 硕士",
        "中国 教育部 留学 基金委 奖学金 2024",
    ],
    "category": "education",
}

EMPLOYMENT_SOURCES = {
    "search_queries": [
        # 公司类型与门槛
        "上海 科技公司 招聘 学历 要求 2024 双非",
        "互联网 大厂 第一学历 门槛 2024 校招",
        "外企 招聘 中国 计算机 2024 学历 要求",
        "国企 银行 科技部 招聘 学历 2024",
        # 岗位需求
        "AI 大模型 岗位 需求 2024 中国 初级",
        "计算机 就业 形势 2024 应届生",
        "软件工程师 招聘 趋势 2024 中国",
        "中国 IT 人才 缺口 2024 报告",
        # 平台数据
        "BOSS直聘 计算机 应届 岗位 数量 2024",
        "猎聘 2024 计算机 就业 报告",
        "拉勾 技术岗位 需求 趋势 2024",
        "前程无忧 IT 招聘 2024 报告",
        # 国际
        "Stack Overflow developer survey 2024 China",
        "O*NET software developer outlook 2024",
        "BLS computer science job outlook 2024-2034",
    ],
    "category": "employment",
}

TREND_SOURCES = {
    "search_queries": [
        # AI 影响
        "AI 替代 初级程序员 趋势 2024 GitHub Copilot",
        "大模型 对 软件工程师 影响 2024",
        "AI 编程 工具 效率 提升 2024 报告",
        # 细分方向
        "云原生 DevOps Kubernetes 人才 需求 2024 中国",
        "网络安全 人才 缺口 2024 中国",
        "数据科学 机器学习 岗位 增长 2024",
        "游戏 行业 就业 版号 2024 中国",
        "嵌入式 开发 物联网 人才 需求 2024 芯片",
        "区块链 Web3 就业 2024 中国 政策",
        # 宏观趋势
        "中国 IT 行业 发展趋势 2024 报告 Gartner",
        "数字经济 就业 2024 中国 报告",
        "远程办公 程序员 趋势 2024 中国",
        "中国 互联网 行业 裁员 2024 趋势",
    ],
    "category": "trend",
}

POLICY_SOURCES = {
    "search_queries": [
        # 落户
        "上海 应届生 落户 政策 2024 积分",
        "北京 落户 政策 2024 应届生",
        "深圳 杭州 人才 引进 落户 2024 计算机",
        # 考公选调
        "计算机 选调生 2024 报考 条件",
        "公务员 计算机 岗位 2024 国考 省考",
        "事业编 信息技术 招聘 2024",
        # 留学签证
        "美国 H1B 签证 2024 抽签 概率 OPT STEM",
        "英国 毕业生 签证 PSW 2024",
        "德国 蓝卡 EU Blue Card IT 2024 条件",
        "澳大利亚 技术移民 IT 2024 职业列表 打分",
        "新加坡 EP 工作 准证 COMPASS 2024",
        "日本 高度人才 签证 IT 2024 打分",
        "加拿大 Express Entry 计算机 2024",
    ],
    "category": "policy",
}

COST_SOURCES = {
    "search_queries": [
        # 中国城市
        "上海 租房 月租金 2024 单间 合租",
        "北京 月生活成本 2024 程序员",
        "深圳 杭州 租房 成本 2024",
        "成都 武汉 西安 生活成本 2024 程序员",
        # 留学城市
        "德国 留学生 月生活费 2024 慕尼黑 柏林",
        "美国 留学 生活费 2024 硅谷 纽约",
        "英国 伦敦 留学生 月支出 2024",
        "日本 东京 留学生 生活费 2024",
        "新加坡 留学生 月支出 2024",
        # 平台
        "Numbeo cost of living Shanghai 2024",
        "Expatistan cost of living comparison 2024",
    ],
    "category": "cost",
}

LIFE_SOURCES = {
    "search_queries": [
        # 工作文化
        "外企 互联网 工作文化 对比 2024 中国",
        "996 ICU 公司 列表 2024",
        "程序员 职业倦怠 35岁 2024 中国",
        "大厂 工作体验 2024 知乎 真实",
        # 职业发展
        "学历 对 程序员 晋升 影响 2024",
        "技术 转 管理 35岁 程序员 2024",
        "程序员 副业 自由职业 2024",
        "女性 程序员 职业 发展 2024 中国",
        # 远程
        "远程办公 程序员 中国 2024 公司",
        "数字游民 程序员 2024 中国",
        "独立开发者 收入 2024 中国 indie hacker",
        # 国际
        "Glassdoor work life balance rating 2024",
        "Blind tech company review 2024 culture",
    ],
    "category": "life",
}

ALL_SOURCES = [
    SALARY_SOURCES,
    EDUCATION_SOURCES,
    EMPLOYMENT_SOURCES,
    TREND_SOURCES,
    POLICY_SOURCES,
    COST_SOURCES,
    LIFE_SOURCES,
]
