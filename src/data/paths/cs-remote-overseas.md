import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-remote-overseas',
  title: '远程海外工作 — 赚美元花人民币，国内远程为海外公司开发',
  category: 'domestic-employment',
  summary: '在国内远程为海外科技公司或 startup 做软件开发，以美元/欧元薪资享受人民币消费力。',
  description: `## 路径概述

在地理套利的黄金时代，这条路径让你「赚发达国家的钱，在发展中国家花」。
通过远程工作为美国、欧洲、新加坡等地的科技公司做开发，获取外币薪资（通常 3-8k USD/月），
同时享受中国（尤其非一线城市）的低生活成本优势。

## 真实画像

- **薪资水平**：初级 3-5k USD/月，中级 5-8k USD/月，高级 8-15k USD/月
- **薪资对比**：5k USD（约 36k RMB）/月 ≈ 上海大厂应届生 2-3 倍
- **工作模式**：完全远程，异步沟通为主（Slack/Linear/Notion/GitHub）
- **公司类型**：海外 startup、Web3 项目、SaaS 公司、数字代理
- **工作时差**：美国公司通常需要凌晨或清晨开会（时差 12-15 小时）
- **税务**：通常为 contractor 身份，需要自行处理税务（可能涉及海外收入申报）

## 优势

- 地理套利极致：美元/欧元薪资 + 人民币消费 = 高储蓄率
- 可以住在低生活成本城市（成都/长沙/昆明等），大幅提高生活质量
- 远程工作天然附带时间弹性
- 英语工作环境提升全球竞争力
- 回避了国内职场内卷和第一学历歧视
- 海外公司的技术栈和工程文化通常更成熟

## 风险

- 英语要求高：需要流利的英语读写和口头沟通能力
- 时差问题：和美国公司开会可能需要凌晨 3 点起床
- 法律灰色地带：contractor 模式的社保、税务合规性需要注意
- 社交隔离：远程工作的孤独感 + 同事分布在多个时区
- 职业安全感低：海外公司可以随时终止 contractor 合同（通常无补偿金）
- 在岸岗位竞争劣势：远离总部意味着晋升和核心项目机会有限
- 外汇问题：大额美元收入转入国内需要合规操作`,

  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '零额外投入，毕业即可获得收入。远程海外薪资通常是国内同级的 1.5-3 倍。即使初级岗位 3k USD/月（约 21k RMB）在上海也有较好的生活水平。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'at-risk', detail: '必须流利的英语读写和口语沟通能力（IELTS 7.0+ 或同等水平）。所有面试、代码 review、日常沟通均为英语。英语不过关是硬性门槛。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '海外公司几乎不关心中国大学的排名，只关注技术能力和英语沟通。GitHub 作品集和技术面试决定一切。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，不涉及额外学业。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '完全不受地理位置限制。但上海作为国际化都市有更多英语社群和远程工作者的社交网络。实际上你可以住在任何地方。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '4 年本科毕业即就业。但达到「找到海外远程工作」的能力门槛通常需要 1-2 年技术积累和英语准备（可在本科期间完成）。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '薪资高 + 国内消费水平 = 高生活品质。即使初级岗位，储蓄率也很高。可以选择住在生活成本更低的城市进一步放大优势。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '远程海外工作路径下学历完全不重要。但如果未来想回国进入传统企业，海外 contractor 经历可能不被国内 HR 认可为「正式工作经验」。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '中美关系紧张可能影响某些敏感技术领域的海外远程工作机会（如 AI/芯片）。一般软件开发受影响较小。外汇管制是持续存在的合规考量。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 80,
    timeFlexibility: 85,
    lifestyleCompat: 90,
    growthCurve: 70,
  },
  trend: 'rising',
  trendDetail: '远程办公全球化趋势不可逆转。COVID-19 后海外公司对远程雇员的接受度大幅提高。Deel/Oyster/Remote 等 EOR 平台降低了雇佣合规门槛。但竞争也在加剧——全球远程岗位的申请人来自世界各地。入门级远程岗位尤其竞争激烈。建议在特定技术领域建立差异化（如 Web3/Rust/DevOps）。',
  exclusivity: ['放弃国内大厂的系统培训和职业体系', '放弃线下办公的社交和团队归属感', '放弃进入管理层的自然路径（远程管理难度大）', '接受时差带来的生活节奏调整', '承担 contractor 身份的法律和税务复杂性'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构', '开始系统提升英语（听说读写，目标 IELTS 7.0+）', '了解远程工作的商业模式和常用工具（Slack/Notion/Linear）'] },
    { year: '大一下', tasks: ['精通一门有国际市场需求的技术栈（推荐 React/TypeScript 或 Python/Go）', '英语学习：每天 30 分钟英语阅读 + 听力练习', '暑假：用英语写技术博客或录制技术视频', '开始参加线上技术社区（Reddit/Discord/Hacker News）'] },
    { year: '大二上', tasks: ['深入学习系统设计和分布式架构', '英语学习：开始和外国人进行技术沟通（Discord/telegram 技术群组）', '做一个面向海外用户的 side project（全英文界面和文档）', '开始活跃于 GitHub（参与英文开源项目）'] },
    { year: '大二下', tasks: ['准备英文技术简历和 LinkedIn 主页（全英文）', '学习远程工作中的关键软技能：异步沟通、时间管理、书面表达', '暑假目标：尝试在 Upwork/Toptal 接海外小项目', '通过 CET-6 并额外考取 IELTS（目标 7.0+）'] },
    { year: '大三上', tasks: ['继续在 Upwork 积累好评和客户关系', '开始针对性地投递海外远程实习（AngelList/Wellfound/RemoteOK）', '学习远程合同和税务基础知识（了解 contractor vs employee 区别）', '准备全英文技术面试（算法 + 系统设计 + 行为面试）'] },
    { year: '大三下', tasks: ['目标：拿到第一个海外远程实习或兼职 offer', '建立 LinkedIn 上的海外人脉网络', '学习一个高薪远程方向（Web3/DevOps/AI 工程化）', '如已有稳定客户，尝试提升客单价'] },
    { year: '大四上', tasks: ['通过海外远程求职平台（Wellfound/RemoteOK/We Work Remotely）投递全职岗位', '准备多轮全英文面试（海外公司面试通常 3-5 轮）', '了解海外收入的合规操作（银行账户/外汇申报/税务）', '如未找到合适全职，先以 Upwork 高单价项目作为过渡'] },
    { year: '大四下', tasks: ['选定 offer 并入职', '建立远程工作 routine（固定工作时段/运动/社交）', '了解如何注册个体工商户或自由职业者以合规处理海外收入', '持续提升技术深度，规划下一步职业发展'] },
  ],
  tags: ['计算机', '远程工作', '海外就业', '美元薪资', '地理套利', '英语', '自由职业'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://wellfound.com/', 'https://remoteok.com/', 'https://weworkremotely.com/', 'https://www.upwork.com/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-freelance', 'cs-digital-nomad'],
};

export default path;
