import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-indie-hacker',
  title: '独立开发者/Indie Hacker — 自主 SaaS/App 创业',
  category: 'freelance',
  summary: '开发自己的 SaaS/App/工具产品，靠订阅或付费收入实现经济独立，完全自主选择技术方向和生活方式。',
  description: `## 路径概述

独立开发者（Indie Hacker）路线是完全自驱动的职业路径。通过开发自己的 SaaS 产品或移动 App，
靠月订阅费（Subscription）或一次性付费获取收入。AI 工具的爆发极大降低了独立开发的成本
和门槛，一个开发者加上 AI 就可以完成过去需要 3-5 人团队的工作。

## 真实画像

- **收入结构**：前 6-12 个月通常零收入或极低收入（几百元/月）；稳定后月收入可从几千到几十万不等，两极分化严重
- **工作模式**：完全自主，随时工作，没有老板，也没有固定工资
- **成功案例**：独立开发者月入 $1k-$10k 的案例日益增多（Product Hunt、Indie Hackers 社区）
- **失败率**：极高，约 80-90% 的独立产品无法达到月入 $1k 的水平

## 优势

- 创造者自由度最大：选择做什么、怎么做、何时做
- 收入无天花板，产品成功后被动收入可观
- AI 降低开发成本：ChatGPT/Cursor/Copilot 让一个人能完成全栈开发
- 可以完全远程，不受地理位置限制
- 过程中积累的技能（产品思维、全栈开发、营销）在任何方向都有价值

## 风险

- 收入极不稳定，前 1-2 年可能完全靠积蓄或家庭支持
- 心理压力大：没有固定收入的安全感，需要极强的自驱力
- 技术之外还需要产品、营销、法律、客服等能力
- 国内市场支付环境不如海外成熟（支付宝/微信 vs Stripe）
- 竞争门槛降低意味着更多人进入，赛道更拥挤
- 没有公司背书，后续回归职场可能面临简历解释问题`,

  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'at-risk', detail: '启动成本低（服务器 + 域名 ≈ 数百元/月），但前 6-12 个月可能零收入。需要约 3-5 万 RMB 缓冲资金覆盖一年基本生活。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '做国内产品只需要中文。但如果面向海外市场（利润更高），需要英语读写能力达到能撰写产品文案和处理客户支持的水平。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '无学历要求。独立开发者靠产品说话，没有人会看你的学位证。技术能力 + 产品思维 > 学历。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，本科正常毕业即可。但部分独立开发者可能在大学期间就开始创业，需平衡学业和产品开发。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '完全不受地理限制。可在上海生活（享受城市资源），也可搬去低生活成本城市以降低运营压力。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '不确定性高。可能 6 个月实现盈利，也可能 2 年后仍在挣扎。建议设定明确的止损线（如：1 年后若月收入 < 3000 则考虑 Plan B）。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'at-risk', detail: '前 1-2 年生活水平可能很低（月支出控制在 3000-5000 RMB）。成功后生活水平可远超普通上班族。风险与回报不对称。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '独立开发者不需要学历认可。但如果后续回归职场，独立产品经历可替代学历成为面试亮点（尤其是产品思维和全栈能力）。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '国内 SaaS 和 App 需关注工信部备案、数据合规等监管要求。海外市场需关注 GDPR、PCI-DSS 等合规。整体可控。', sourceUrl: '' },
  ],

  preferenceScores: {
    interestMatch: 100,
    timeFlexibility: 95,
    lifestyleCompat: 90,
    growthCurve: 50,
  },

  trend: 'rising',
  trendDetail: 'AI 辅助编程（Cursor、Copilot、Claude）大幅降低独立开发成本，一个人加上 AI 可完成过去 3-5 人团队的工作。海外支付生态（Stripe、Lemon Squeezy）和分发渠道（Product Hunt、App Store）持续成熟。社交媒体让独立开发者更容易获客。但门槛降低也意味着竞争加剧。',

  exclusivity: ['放弃稳定的工资收入和社保/公积金', '放弃公司团队的技术成长环境（code review、mentorship）', '放弃职场晋升路径和公司福利', '放弃应届生身份（后续回职场可能失去校招资格）'],

  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构（构建扎实基础）', '开始学一门全栈语言（推荐 TypeScript/JavaScript）', '注册 Product Hunt、Indie Hackers 社区账号，开始观察热门产品'] },
    { year: '大一下', tasks: ['学习前端基础（React + Tailwind CSS）和后端基础（Node.js/Express）', '做一个简单的个人网站并上线', '开始使用 AI 编程工具（Cursor/Copilot）辅助开发', '暑假：尝试做第一个迷你产品（即使是 Todo App 或 Markdown 工具）'] },
    { year: '大二上', tasks: ['深入学习数据库（PostgreSQL/Supabase）和部署（Vercel/Railway）', '学习产品定价策略和商业模式（订阅制 vs 一次付费 vs 免费增值）', '发布第一个认真做的产品到 Product Hunt 或少数派'] },
    { year: '大二下', tasks: ['学习基础 UI/UX 设计（Figma）', '研究 SEO 和社交媒体营销', '学习 Stripe/Lemon Squeezy 支付集成', '暑假：做第二个产品，尝试差异化定位'] },
    { year: '大三上', tasks: ['确定一个垂直方向深入研究（如 AI 写作工具、开发者工具、个人记账 App）', '找一个兼职或实习积累行业经验（同时继续做自己的产品）', '加入独立开发者社群（Twitter/X、即刻、微信群），建立人脉'] },
    { year: '大三下', tasks: ['集中精力打磨主力产品，争取到 10 个付费用户', '学习用户反馈收集和迭代流程', '研究 ASO（App Store Optimization）和海外投放', '设定毕业后的目标：是全职独立开发还是边工作边做'] },
    { year: '大四上', tasks: ['主力产品持续迭代，争取达到月入 $500-$1000', '同步参加秋招作为 Plan B', '研究目标市场（国内 vs 海外）的支付和合规方案', '如果产品有起色：全力冲刺。如果收效甚微：评估调整'] },
    { year: '大四下', tasks: ['做出最终决定：全职独立开发 or 先就业再兼职做产品', '如果独立开发：完善产品并加大营销获客投入', '如果先就业：找一份节奏合适的工作，利用业余时间持续做产品', '完成毕业论文', '无论选择哪条路，保持产品的持续迭代'] },
  ],

  tags: ['计算机', '独立开发', 'SaaS', '创业', '自由职业', '全栈'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.indiehackers.com/', 'https://www.producthunt.com/', 'https://stripe.com/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-freelance', 'cs-open-source'],
};

export default path;
