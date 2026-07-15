import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-digital-nomad',
  title: '数字游民 — 国际外包 + SaaS 产品，全球旅居开发',
  category: 'freelance',
  summary: '通过接国际外包项目积累资金，同时开发自己的 SaaS 产品，实现全球旅居的自由生活方式。',
  description: `## 路径概述

数字游民不只是远程工作——它是一种生活方式的重新定义。你通过国际外包平台获取稳定收入，
同时利用空闲时间开发自己的 SaaS 产品。你可以选择住在巴厘岛、清迈、里斯本或任何生活成本低、
网络好的地方。这条路追求的不是金钱最大化，而是生活自由度最大化。

## 真实画像

- **收入结构**：外包项目（稳定现金流）+ SaaS 产品（潜在被动收入）
- **外包收入**：稳定后月入 3-6k USD（约 21-43k RMB）
- **SaaS 收入**：从 0 起步，成功的独立开发者月入 1-10k+ USD
- **生活成本**：在清迈/巴厘岛等地月生活费约 3-5k RMB，在里斯本/巴塞罗那约 8-12k RMB
- **核心数字游民聚集地**：清迈、巴厘岛（Canggu）、里斯本、墨西哥城、麦德林
- **典型一日**：早上冲浪/瑜伽 → 上午深度工作 → 下午开会/轻度工作 → 晚上社交/探索

## 优势

- 极致自由：选择在哪里生活、什么时候工作、和谁合作
- 地理套利：赚美元在低成本国家生活，储蓄率极高
- 生活方式多样性：每个月换一个城市/国家，持续新鲜感
- 全球社交网络：和来自世界各地的数字游民建立联系
- 创业机会：旅居过程中发现的产品机会往往在国内看不到
- 零通勤、零办公室政治

## 风险

- 收入不稳定的叠加效应：外包项目结束 + SaaS 收入为零 = 双重压力
- 初期启动困难：从零建立客户基础 + 从零开始做产品 = 时间分散
- 漂泊孤独感：没有固定住所和稳定的社交圈
- 签证限制：多数数字游民本质上是旅游签证，长期存在合规风险
- 健康保障缺失：在国外生病没有医保覆盖，需要自费
- 感情/家庭关系受挑战：远距离维持关系困难
- 生产力挑战：旅居环境不一定适合专注工作`,

  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'at-risk', detail: '启动成本约 1-2 万 RMB（机票+首月生活费+设备）。前 6-12 个月收入不稳定，建议储备 6 个月生活费（约 3-5 万 RMB）。成功起步后储蓄率极高（月存 50%+ 常见）。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'at-risk', detail: '必须流利英语（听说读写）。你需要用英语谈客户、写产品文案、做技术支持。在非英语国家还需要基础的本地语言生存能力。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '数字游民路径下学历完全无关。客户和用户只关心你的交付能力和产品质量。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，不涉及额外学业。但需要极强的自律和自学能力——没有老板监督，一切靠自己。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '完全不存在地域锁定——这正是数字游民的核心优势。但初期可以在上海积累起步资金和人脉。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '从零开始到月入稳定 3k+ USD 通常需要 1-2 年。SaaS 产品从开发到产生收入通常需要 6-18 个月。建立可持续的双收入流可能需要 2-3 年。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'at-risk', detail: '初期收入不稳定。在低成本国家生活费低但需要一定启动资金。中期生活质量极高（高收入+低成本=高储蓄高享受）。长期需要自我管理退休金和保险。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '数字游民路径下学历完全无关。但如果未来想回归传统就业市场，数字游民经历可能被 HR 视为「不稳定」或「没有团队协作经验」。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '数字游民天然具有分散风险的优势（不在单一国家扎根）。但需要注意各国签证政策变化、外汇管制，以及在某些国家作为外国人的人身安全问题。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 75,
    timeFlexibility: 95,
    lifestyleCompat: 100,
    growthCurve: 60,
  },
  trend: 'rising',
  trendDetail: '数字游民生态持续成熟。清迈/巴厘岛/里斯本等聚集地的数字游民基础设施（coworking space/签证/社群）越来越完善。多个国家推出了数字游民签证（葡萄牙/西班牙/泰国/印尼）。AI 工具大幅提升了单人开发效率——一个人可以做到以前一个团队才能做的事。但竞争也在加剧，入门级的 freelancer 市场价格内卷严重。',
  exclusivity: ['放弃稳定的月薪和五险一金', '放弃传统的职业成长路径和晋升通道', '放弃长期居住在一个地方的归属感', '放弃和家人朋友经常见面的机会', '放弃国内的社会保障体系（社保/医保需自行解决）', '接受孤独和不确定性作为生活方式的一部分'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构', '了解数字游民生活方式（关注 Nomad List/Pieter Levels 等内容）', '决定是否真的想要这种生活——它不适合所有人'] },
    { year: '大一下', tasks: ['精通一个全栈技术栈（推荐 Next.js/TypeScript/Prisma/Supabase）', '做到可以用这个技术栈快速搭建 SaaS MVP', '暑假：做第一个 SaaS 小产品并尝试获得第一个付费用户'] },
    { year: '大二上', tasks: ['系统学习独立开发全技能：产品设计/UI/UX/营销/SEO/数据分析', '注册 Upwork 账号并完成 Profile 优化', '学习英语商务沟通（写 Proposal/谈判/处理客户异议）', '第一个 SaaS 产品继续迭代'] },
    { year: '大二下', tasks: ['在 Upwork 开始接小项目（目标：前 3 个月拿到 5 星好评）', '学习 SaaS 关键技能：Stripe 支付/邮件系统/用户 Onboarding', '暑假目标：外包月入 1k USD + SaaS 产品有稳定流量'] },
    { year: '大三上', tasks: ['提升外包客单价（从小项目转向中型项目/长期客户）', 'SaaS 产品目标：MRR 达到 500 USD', '学习财务规划：如何管理浮动收入、税务合规、退休金规划', '开始了解各国数字游民签证政策'] },
    { year: '大三下', tasks: ['外包目标：月入稳定 3k+ USD', 'SaaS 产品目标：MRR 达到 1000 USD', '如条件成熟，尝试第一次短期旅居（1-2 个月清迈或巴厘岛）', '建立数字游民社交圈（Nomad List/Twitter/线下 meetup）'] },
    { year: '大四上', tasks: ['评估数字游民生活是否可持续（收入/心理健康/人际关系）', '若可持续：选择一个数字游民聚集地作为首个基地', '若不确定：继续在上海积累同时做短期旅居尝试', 'SaaS 产品目标：MRR 2000+ USD（基本覆盖生活费）'] },
    { year: '大四下', tasks: ['毕业时目标：外包+ SaaS 月入 5k+ USD', '制定旅居计划（首站/时长/签证安排）', '配置远程工作基础设施（可靠网络/国际银行卡/旅行保险）', '建立长期规划：旅居节奏/产品组合/退休计划'] },
  ],
  tags: ['计算机', '数字游民', 'SaaS', '独立开发', '全球旅居', '外包', '自由职业'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://nomadlist.com/', 'https://www.upwork.com/', 'https://levels.io/', 'https://www.indiehackers.com/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-freelance', 'cs-remote-overseas', 'cs-domestic-employment'],
};

export default path;
