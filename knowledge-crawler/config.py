"""Career Maze 知识库爬虫 — 配置与数据源定义"""

import os
from pathlib import Path

# === API Keys ===
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY", "")
DEEPSEEK_MODEL = "deepseek-chat"
DEEPSEEK_MODEL_PRO = "deepseek-reasoner"

BING_API_KEY = os.environ.get("BING_API_KEY", "")

# === Paths ===
PROJECT_ROOT = Path(__file__).resolve().parent.parent
KB_DIR = PROJECT_ROOT / "src" / "data" / "knowledge"
CACHE_DIR = Path(__file__).resolve().parent / ".cache"

# === 7 大数据源配置 ===
# 每个数据源定义了：搜索关键词、目标 URLs、期望提取的维度

SALARY_SOURCES = {
    "search_queries": [
        "上海 计算机 应届 薪资 2024",
        "上海 外企 软件开发 薪资 2024",
        "北京 互联网 校招 薪资 2024",
        "深圳 程序员 薪资 2024",
    ],
    "target_urls": [
        "https://www.onetonline.org/link/summary/15-1252.00",  # O*NET Software Developer
        "https://www.zhaopin.com/",  # 智联招聘
    ],
    "category": "salary",
    "data_schema": {
        "city": "string",
        "industry": "string",
        "degree": "string",
        "experience": "string",
        "companyType": "string",
        "salaryRange": {"min": "number", "max": "number", "median": "number"},
        "currency": "string",
        "year": "number",
    },
}

EDUCATION_SOURCES = {
    "search_queries": [
        "上海 计算机 考研 报录比 2024",
        "德国 计算机 硕士 留学 费用 2024",
        "美国 CS 硕士 学费 2024",
        "英国 计算机 硕士 一年制 费用 2024",
        "日本 IT 留学 费用 2024",
    ],
    "target_urls": [
        "https://yz.chsi.com.cn/",  # 研招网
        "https://www.daad.de/",  # 德国学术交流中心
    ],
    "category": "education",
    "data_schema": {
        "pathType": "string",
        "country": "string",
        "tuition": "string",
        "livingCost": "string",
        "duration": "string",
        "languageRequirement": "string",
        "totalEstimate": "string",
    },
}

EMPLOYMENT_SOURCES = {
    "search_queries": [
        "上海 科技公司 招聘 学历要求 2024",
        "双非 计算机 就业 学历门槛",
        "AI 初级程序员 岗位 影响 2024",
        "互联网 校招 需求 变化 2024",
    ],
    "target_urls": [
        "https://www.liepin.com/",  # 猎聘
    ],
    "category": "employment",
    "data_schema": {
        "city": "string",
        "companyType": "string",
        "degreeRequirement": "string",
        "demandTrend": "string",
    },
}

POLICY_SOURCES = {
    "search_queries": [
        "上海 应届生 落户 政策 2024",
        "计算机 选调生 报考 条件 2024",
        "美国 H1B 签证 2024 概率",
        "英国 PSW 毕业生 签证 2024",
        "德国 蓝卡 IT 2024",
        "澳洲 技术移民 IT 2024",
    ],
    "target_urls": [
        "https://www.shanghai.gov.cn/",  # 上海政府
        "https://travel.state.gov/",  # 美国签证
        "https://www.gov.uk/graduate-visa",  # 英国签证
    ],
    "category": "policy",
    "data_schema": {
        "policyType": "string",
        "country": "string",
        "year": "number",
        "conditions": "string",
        "applicable": "boolean",
    },
}

COST_SOURCES = {
    "search_queries": [
        "上海 租房 月租金 2024",
        "上海 月生活成本 2024",
        "北京 月生活成本 2024",
        "德国 留学生 月生活费 2024",
    ],
    "target_urls": [
        "https://www.numbeo.com/cost-of-living/",  # Numbeo 生活成本
    ],
    "category": "cost",
    "data_schema": {
        "city": "string",
        "year": "number",
        "monthlyBreakdown": "object",
        "monthlyTotal": "string",
        "annualEstimate": "string",
    },
}

TREND_SOURCES = {
    "search_queries": [
        "AI 替代 初级程序员 趋势 2024",
        "云原生 DevOps 人才 需求 2024",
        "游戏 行业 版号 就业 趋势 2024",
        "芯片 国产化 人才 需求 2024",
    ],
    "target_urls": [],
    "category": "trend",
    "data_schema": {
        "year": "number",
        "trend": "string",
        "reason": "string",
        "data": "object",
    },
}

LIFE_SOURCES = {
    "search_queries": [
        "外企 互联网 工作文化 对比",
        "学历 职业天花板 程序员",
        "远程办公 程序员 可行性 2024",
    ],
    "target_urls": [],
    "category": "life",
    "data_schema": {
        "year": "number",
        "findings": "object",
    },
}

# 全部数据源
ALL_SOURCES = [
    SALARY_SOURCES,
    EDUCATION_SOURCES,
    EMPLOYMENT_SOURCES,
    POLICY_SOURCES,
    COST_SOURCES,
    TREND_SOURCES,
    LIFE_SOURCES,
]
