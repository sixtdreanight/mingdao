import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-freelance',
  title: '远程开发 / 自由职业 — 平台接单 → 独立开发者',
  category: 'freelance',
  summary: '通过 Upwork/GitHub/国内平台接远程开发项目，逐步建立客户基础，实现地域自由和收入自主。',
  description: `## 路径概述

自由职业/远程开发是一条高风险高自由度的路径。通过接单平台或直接客户获取项目，
逐步建立稳定的收入流和行业声誉。这条路径不依赖学历，核心资产是可展示的作品集和客户口碑。

## 真实画像

- **起步收入**：极不稳定，前 6 个月可能月入 3-8k RMB
- **稳定后收入**：1-2 年后月入 15-30k RMB（取决于技能和客户质量）
- **上限**：顶级自由开发者可达 50-100k+ RMB/月或通过产品化（SaaS）实现被动收入
- **成本**：仅需一台电脑 + 网络，几乎零固定成本
- **工作时间**：完全自由但容易「永远在线」，客户可能随时联系
- **稳定性**：项目间歇期可能 0 收入，需要财务规划和心理承受能力

## 优势

- 完全的地理自由（可在任何有网络的地方工作）
- 时间弹性最大，可以自行安排生活节奏
- 收入上限不受学历或公司薪酬体系限制
- 可以同时发展副业（写作/教学/开源/产品）
- 回避了第一学历歧视和职场政治

## 风险

- 收入极不稳定：项目结束到下一个项目之间可能空窗数周
- 没有五险一金、没有带薪休假、没有年终奖
- 社交孤立：没有同事，长期独自工作可能影响心理健康
- 客户不付款、要求无休止修改、项目范围蔓延
- 技术栈可能碎片化（什么项目都接导致没有深度）
- 医保/社保需要自己缴纳
- 极度依赖自律，拖延可能直接导致收入中断`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'at-risk', detail: '几乎零启动成本（仅需电脑+网络）。但前 6-12 个月收入不稳定，需要储备 3-6 个月生活费作为缓冲。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'at-risk', detail: '海外平台（Upwork/Toptal）需要流利英语读写和交流能力。国内平台（猪八戒/程序员客栈）以中文为主但单价较低。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '自由职业几乎不看学历，客户只看交付能力和作品集。GitHub 和项目经验是唯一的名片。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，不涉及额外学业。但自我驱动学习和能力提升永无止境。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '完全不受地理位置限制，但一线城市生活成本高可能增加财务压力。许多自由职业者选择低成本城市或数字游民生活。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '从零开始建立客户基础到稳定月入 15k+ 通常需要 1-2 年。比直接就业的不确定性高得多。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'at-risk', detail: '初期收入不稳定可能低于最低工资标准。无五险一金意味着需要自己全额缴纳社保/医保（月均约 2-3k）。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '自由职业路径下学历几乎无关紧要。但如中途想重返职场，自由职业经历的简历认可度参差不齐（大厂 HR 可能视为不稳定）。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '纯线上工作，不受地缘政治直接影响。跨境收款可能受外汇管制影响（每年 5 万美元限额）。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 70,
    timeFlexibility: 95,
    lifestyleCompat: 90,
    growthCurve: 55,
  },
  trend: 'rising',
  trendDetail: '全球远程工作趋势持续增长。AI 工具（Copilot/Cursor/GPT）极大提升单人开发效率，自由开发者的技术杠杆在提高。但入门竞争也在加剧，低端平台的价格内卷严重。建议走专业化/垂直领域路线而非低价竞争。',
  exclusivity: ['放弃稳定的月薪和五险一金', '放弃公司提供的职业成长路径和晋升通道', '放弃同事社交和职场归属感', '承担全部财务风险和不确定性'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构', '了解自由职业的商业模式（Upwork/Fiverr/程序员客栈）', '培养一个可以变现的技能方向（Web 开发门槛最低）'] },
    { year: '大一下', tasks: ['精通一个技术栈（推荐 React + Node.js 或 Vue + Python）', '做第一个完整项目并部署上线', '暑假：尝试在猪八戒或 Fiverr 接第一个小单'] },
    { year: '大二上', tasks: ['系统学习自由职业者必备技能（Git/CI-CD/Docker/基础 DevOps）', '注册 Upwork 账号并完成 Profile 优化', '开始写技术博客（建立个人品牌）'] },
    { year: '大二下', tasks: ['在 Upwork 接 3-5 个小项目积累好评', '学习沟通技巧和客户管理（报价/合同/需求管理）', '暑假：目标是月入稳定 3-5k'] },
    { year: '大三上', tasks: ['提升技术深度（架构设计/性能优化/安全）', '尝试提升客单价（从小项目转向中型项目）', '建立个人作品集网站', '学习财务和税务基础知识'] },
    { year: '大三下', tasks: ['目标月入稳定 8-12k', '建立 LinkedIn/推特个人品牌', '尝试产品化：做一个 SaaS 或付费模板', '开始缴纳灵活就业社保'] },
    { year: '大四上', tasks: ['评估自由职业是否可持续（收入是否稳定、是否喜欢这种生活）', '若可持续：扩大客户渠道、提升单价', '若不可持续：准备简历转向企业就业（Plan B）'] },
    { year: '大四下', tasks: ['毕业时目标月入 15k+', '建立至少 3 个长期客户关系', '开始构建被动收入（课程/模板/SaaS 产品）', '持续评估：自由职业 vs 全职工作的长期取舍'] },
  ],
  tags: ['计算机', '自由职业', '远程工作', '独立开发者', 'Upwork', '数字游民'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.upwork.com/', 'https://www.fiverr.com/', 'https://github.com/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-domestic-postgrad', 'cs-germany-masters'],
};

export default path;
