import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-open-source',
  title: '开源贡献者/基金会路线 — 贡献→赞助→Maintainer',
  category: 'freelance',
  summary: '专注开源项目贡献，通过基金会资助或企业 sponsorship 获得收入，最终成为知名项目的 maintainer。',
  description: `## 路径概述

开源贡献者路线是一条靠技术热情和社区声誉驱动的非传统职业路径。从参与知名开源项目（Vue、React、Linux Kernel、Apache 项目等）
起步，积累贡献和社区影响力，逐步获得基金会资助（如 GitHub Sponsors、Open Collective、CNCF 等）或企业赞助，
最终成为项目的核心 maintainer 甚至全职开源开发者。

## 真实画像

- **收入来源**：GitHub Sponsors、Open Collective 捐款、企业雇佣全职做开源（如 Vercel 雇佣 Tobias、Databricks 雇佣 Spark 维护者）
- **收入范围**：资深 maintainer 年薪 $100k-$300k，初级贡献者前 1-2 年可能在几千到几万美金之间
- **入门路径**：Good First Issue → 持续贡献 → 成为 Triager → 获得 Commit 权限 → 成为 Maintainer
- **成功案例**：Evan You（Vue.js）、Sebastian McKenzie（Babel/Rome）、Rich Harris（Svelte）

## 优势

- 做自己真正感兴趣的技术，工作即热爱
- 完全远程，全球社区协作
- 企业雇佣做开源通常薪资优厚且工作时间自由
- 技术深度极深（成为某个领域的世界级专家）
- 对后续职业发展是极大的加分项（开源 maintainer 在任何公司都是明星候选人）

## 风险

- 前 1-2 年收入可能极不稳定，依赖积蓄或家庭支持
- 需要极强的自驱力和耐心（PR review 可能等数周，社区政治复杂）
- 「开源 burnout」风险：社区管理、issue triage、review 压力大
- 不是每个贡献者都能获得赞助，两极分化严重
- 需要社交和社区运营能力（不仅仅是写代码）
- 长期脱离企业环境可能导致对工业级工作流程的陌生`,

  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'at-risk', detail: '启动成本接近零（一台电脑即可）。但前 1-2 年赞助收入可能极低（几百到几千美金/年），需约 5-8 万 RMB 缓冲资金支持基本生活。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'at-risk', detail: '大部分大型开源项目的协作语言是英文（issue 讨论、PR review、邮件列表、社区会议）。英语读写和口语水平需能流畅参与技术讨论。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '开源社区完全不在乎学历。你的 PR 和 code review 就是你的简历。关键项目中高质量的贡献比任何学位都更有说服力。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，正常本科毕业即可。但在大学期间就可开始投入开源贡献，积累多年 experience。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '完全不受地理限制。可在上海通过赞助或企业远程雇佣获得收入。甚至在二三线城市生活成本更低的情况下更容易启动。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '从 Good First Issue 到获得稳定的企业 sponsorship 通常需要 1-2 年以上的持续高质量贡献。期间可能需要同时做一份灵活的工作维持生计。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'at-risk', detail: '前 1-2 年生活水平可能偏低（赞助收入有限）。成为核心 maintainer 或被企业雇佣后生活质量大幅提升（薪资与 FAANG 相当，且时间自由）。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '开源 maintainer 的身份在任何科技公司都是极高的加分项。但双非本科学历在转回传统企业面试时可能仍有歧视，需要开源经历来对冲。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '开源本身不受地缘政治限制。但部分项目（尤其是加密/安全相关）可能受出口管制影响。GitHub/GitLab 等平台受美国法律管辖，特定国家可能受限。', sourceUrl: '' },
  ],

  preferenceScores: {
    interestMatch: 95,
    timeFlexibility: 85,
    lifestyleCompat: 70,
    growthCurve: 55,
  },

  trend: 'rising',
  trendDetail: '开源商业化持续成熟：GitHub Sponsors 生态扩大，企业雇佣全职开源贡献者的趋势明显（Vercel、Supabase、PlanetScale 等公司的核心团队大量是开源 maintainer）。CNCF、Apache 基金会等项目提供越来越多的受薪机会。AI 工具也让独立贡献者效率更高。但成为核心 maintainer 的门槛仍然很高。',

  exclusivity: ['放弃稳定的工资收入和社保/公积金（前 1-2 年）', '放弃传统企业晋升路径和管理经验', '放弃从事多种技术方向的机会（深度绑定 1-2 个项目）', '放弃应届生校招的窗口（回传统职场时需从社招渠道进入）'],

  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构', '注册 GitHub 账号，学习 Git 基础操作', '选 3-5 个自己感兴趣的开源项目，star 并阅读 README 和 CONTRIBUTING.md'] },
    { year: '大一下', tasks: ['学习 TypeScript/JavaScript 或 Python（选一个主流开源项目的技术栈）', '找一个项目的 Good First Issue 并提交第一个 PR', '学习开源社区规范（代码风格、PR 模板、issue 模板、Conventional Commits）', '暑假：找 2-3 个 Good First Issue 持续提交'] },
    { year: '大二上', tasks: ['选定 1-2 个开源项目重点投入（建议选择中型活跃项目，覆盖面更广）', '从 Bug Fix 转向 Feature 贡献', '加入项目社区（Discord/Slack/Discourse），参与讨论和 code review', '开始写技术博客，记录开源贡献过程'] },
    { year: '大二下', tasks: ['争取被邀请成为项目的 Triager（有权限管理 issue 和 review PR）', '参加 Google Summer of Code 或 Outreachy 等开源实习项目', '建立开源个人品牌（Twitter/X、个人网站、技术演讲）', '暑假：全力投入项目，争取更多 visibility'] },
    { year: '大三上', tasks: ['持续贡献，争取 Commit 权限', '启用 GitHub Sponsors 页面', '参与项目治理讨论（RFC 提案、社区决策）', '寻找愿意赞助开源的企业或基金会并建立联系'] },
    { year: '大三下', tasks: ['评估当前赞助收入是否可持续', '如收入可观：继续全职开源路线', '如收入不足：寻找愿意雇佣全职做开源的企业（投递 DevOps/Platform Engineer 等与开源相关的岗位）', '暑假：参加开源社区大会或 Meetup（KubeCon、React Conf 等）'] },
    { year: '大四上', tasks: ['全力冲刺维持 contributor/sponsor 收入', '同步准备校招作为 Plan B', '评估是否接受企业雇佣做开源（如能拿到 offer）'] },
    { year: '大四下', tasks: ['如 sponsor 收入稳定且增长：继续全职开源', '如收入不足：接受企业 offer（工作中可继续业余贡献开源）', '完成毕业论文', '无论最终选择哪条路，保持开源贡献的习惯'] },
  ],

  tags: ['计算机', '开源', 'GitHub', '贡献者', '自由职业', '社区'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://github.com/sponsors', 'https://opencollective.com/', 'https://summerofcode.withgoogle.com/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-indie-hacker', 'cs-freelance', 'cs-domestic-employment'],
};

export default path;
