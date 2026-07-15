import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-game-dev',
  title: '游戏开发工程师 — Unity/Unreal 客户端或服务端开发',
  category: 'domestic-employment',
  summary: '使用 Unity 或 Unreal Engine 从事游戏客户端/服务端开发，版号限制下国内市场趋于稳定但出海增长强劲。',
  description: `## 路径概述

游戏开发是一个高兴趣驱动的方向。Unity 和 Unreal Engine 是两大主流引擎，覆盖手游、端游、
独立游戏多个赛道。国内版号政策限制了市场增速，但出海（尤其东南亚、中东、拉美）持续增长。
游戏行业工作强度大、加班文化普遍，但技术挑战性和创作成就感强。

## 真实画像

- **起薪中位数**：上海游戏开发应届 12-16k/月（Unity 客户端），服务端略高
- **3年后薪资**：20-35k/月（取决于项目分红和跳槽策略）
- **工作时间**：996 是常态，项目上线前冲刺期可能 007
- **从业者满意度**：分化严重——热爱游戏的开发者满意度高，但行业劝退率也高

## 优势

- 兴趣驱动强，做自己热爱的产品有内在动力
- 技术栈独特（图形学/物理引擎/性能优化），技能壁垒高
- 出海市场增长迅速（原神/崩坏等验证了中国游戏全球竞争力）
- 上海游戏公司集中（米哈游/莉莉丝/鹰角/叠纸等新兴公司）
- 独立游戏赛道提供创业可能

## 风险

- 加班文化严重（996 是底线，项目期更甚），严重影响生活质量
- 版号政策不确定性大，项目被砍风险高
- 行业波动大，项目失败团队解散是常态
- 技术栈绑定（Unity 或 Unreal 技能难以迁移到其他行业）
- 35 岁焦虑在游戏行业更突出

## 适合谁

- 对游戏创作有强烈的内在驱动力，不只是"喜欢玩游戏"
- 能接受高强度工作节奏，年轻时有体力应对
- 对图形学/数学/物理有额外兴趣
- 不介意行业波动，有较强的抗压能力`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '零额外学费投入。Unity/Unreal 均免费个人版。建议有一台性能较好的电脑（显卡至少 RTX 3060 级别），预算约 6000-8000 元。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '中文为主。出海公司（米哈游/莉莉丝）需要基本英语读写能力，阅读英文技术文档（Unity/Unreal 文档）是日常。CET-4 以上更佳。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '游戏行业重视作品集和 Demo，学历门槛相对低。独立开发者和小团队几乎不看学历，只看你能做什么。大厂（腾讯游戏/网易游戏）可能卡学历。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，不涉及额外学业。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '上海是游戏行业重镇，米哈游/莉莉丝/鹰角/叠纸/心动等新兴公司总部均在上海，岗位充足。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '4年本科正常毕业即就业。关键是大学期间做出可展示的游戏 Demo 或作品集。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'at-risk', detail: '起薪 12-16k 在上海可以生活，但游戏行业加班严重（996 常见），个人时间极度压缩。项目期的生活基本是公司-出租屋两点一线。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '游戏行业以作品论英雄，学历影响小于传统 IT 行业。双非本科入行没问题，但大厂可能卡学历。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '国内就业无地缘政治风险。但出海业务受目标国家政策影响（如印度封禁中国游戏）。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 90,
    timeFlexibility: 30,
    lifestyleCompat: 40,
    growthCurve: 65,
  },
  trend: 'stable',
  trendDetail: '国内版号政策持续收紧，国内市场增速放缓但基本盘稳定。出海成为主要增长引擎，东南亚/中东/拉美市场持续扩大。独立游戏分发渠道（Steam/Epic/Switch）为中国开发者提供新机会。AI 辅助生成（AI 美术/AI 文案）可能改变游戏开发流程，但核心开发岗位暂不受威胁。',
  exclusivity: ['放弃正常的工作生活平衡（996 是行业底线）', '技术栈绑定在游戏引擎上，跨行业跳槽成本高', '放弃通用软件开发更广阔的就业选择'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构基础（C# 和 C++ 的前置知识）', '了解游戏开发全流程（策划→程序→美术→测试→运营）', '下载 Unity 并完成官方入门教程（Roll-a-Ball 等）'] },
    { year: '大一下', tasks: ['系统学习 C#（面向对象、委托、事件、协程）', '用 Unity 制作第一个完整小游戏（Flappy Bird/2048 级别）', '学习线性代数基础（向量、矩阵、四元数——游戏开发数学三件套）'] },
    { year: '大二上', tasks: ['深入学习 Unity 高级功能（动画系统、物理引擎、UGUI、Shader 入门）', '学习 Unreal Engine 基础（可选，蓝图层 + C++）', '做一个有完整玩法循环的独立游戏 Demo（Game Jam 级别）'] },
    { year: '大二下', tasks: ['根据兴趣选择方向：客户端（渲染/引擎）或服务端（网络同步/服务器架构）', '学习游戏服务端开发（C++/Go + 网络编程 + 数据库）', '暑假目标：找到第一份游戏开发实习（中小型游戏公司）'] },
    { year: '大三上', tasks: ['深入学习方向技能（客户端：图形学/Shader/性能优化；服务端：分布式/帧同步/状态同步）', '参加 Global Game Jam 或 Ludum Dare 等 Game Jam 活动', '完善个人作品集（至少 2-3 个可展示的游戏项目）'] },
    { year: '大三下', tasks: ['准备大厂面试（腾讯/网易/米哈游需要扎实的算法和图形学基础）', '刷 LeetCode + 图形学八股文', '暑期实习：投递目标游戏公司（优先考虑有转正机会的暑期实习）'] },
    { year: '大四上', tasks: ['秋招投递游戏公司（米哈游/莉莉丝/鹰角/叠纸/心动等上海公司优先）', '如有暑期实习 offer，全力争取转正', '同步准备独立开发者计划的 Plan B（Steam 发布独立游戏）'] },
    { year: '大四下', tasks: ['如秋招未拿到满意 offer，继续春招', '完成毕业设计（建议选题与游戏开发相关）', '入职前了解公司使用的引擎版本、技术栈和工作流'] },
  ],
  tags: ['计算机', '游戏开发', 'Unity', 'Unreal', '上海', '本科', '996'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://unity.com/', 'https://www.unrealengine.com/', 'https://www.onetonline.org/link/summary/15-1252.00'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-freelance', 'cs-tech-writer'],
};

export default path;
