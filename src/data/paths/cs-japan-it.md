import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-japan-it',
  title: '日本 IT 就职 — 语言学校/直接应聘 → 东京 IT 企业',
  category: 'overseas-study',
  summary: '通过语言学校或直接应聘进入日本 IT 行业，利用日本 IT 人才缺口实现海外就业，对学历要求相对宽松。',
  description: `## 路径概述

日本 IT 行业长期缺人，对中国技术人才的需求旺盛。与欧美留学不同，日本 IT 就业对学历和
语言的要求有独特的灵活性：技术好可以弥补日语不足，日语好可以弥补技术不足。

## 真实画像

- **成本**：语言学校 1 年约 8-12 万 RMB（学费 + 生活费），直接应聘成本几乎为零
- **语言门槛**：N2 是基本线（技术强则 N3 也可），N1 + 技术 = 高竞争力
- **起薪**：东京 IT 应届 22-30 万日元/月（约 1.1-1.5 万 RMB），3-5 年后 35-50 万日元/月
- **工作时间**：传统日企加班文化较重，但外资 IT（Indeed/Google/Amazon Japan）和新兴 IT 企业逐渐改善
- **身份路径**：工作签证 → 5 年可申请归化，10 年可申请永住。高度人才签证最快 1 年拿永住。

## 优势

- 地理距离近，回国方便（2-3 小时航班）
- 日本 IT 人才缺口大，对双非学历的歧视远轻于国内
- 全民医保，医疗水平高，治安好
- 动漫/游戏/二次元文化对爱好者有强大吸引力
- 高度人才积分制：80 分以上 1 年拿永住（硕士学历 + N1 + 年收 400 万+ 即可达成）

## 风险

- 日企年功序列制：薪资增长慢，初期薪资不高
- 传统日企加班文化重（每月 40-80 小时加班不罕见）
- 日语学习曲线陡峭（从零到 N2 需约 1.5-2 年）
- 日元贬值趋势（2024 年日元兑人民币已跌至 0.048）
- 日本社会融入困难（隐性排外、「玻璃天花板」）
- 地震等自然灾害风险`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '语言学校路径约 8-12 万 RMB/年；直接应聘路径成本几乎为零（仅签证和机票）。相比欧美留学，经济门槛极低。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'at-risk', detail: '至少需要日语 N2（技术强可放宽至 N3）。从零到 N2 需要约 1.5-2 年系统学习。英语在日本 IT 外企中有加分但非必需。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '日本 IT 行业对学历要求相对宽松，双非本科完全够用。技术能力（GitHub/项目经验）比学历重要。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，直接就业路径不涉及额外学业。语言学校课程不难，主要靠自己考 JLPT。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'at-risk', detail: '就业集中在东京/大阪。若回国则日企工作经验在国内 IT 行业的对口性一般（技术栈和开发文化差异大）。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '若走语言学校：1 年语言 + 就职 = 毕业 1 年后就业。若直接应聘：毕业即就业但需提前 1-2 年准备日语。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '东京起薪 22-30 万日元/月（约 1.1-1.5 万 RMB）。注意日元近期贬值，实际购买力折算人民币在下降。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'at-risk', detail: '双非本科在日本 IT 行业足够，但回国后这段经历在非日企的认可度有限。建议积累国际化技术栈（AWS/Python/Go）以提高通用性。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'at-risk', detail: '中日关系波动可能影响签证政策。日本经济长期低迷、日元贬值趋势是现实风险。日本地处地震带。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 70,
    timeFlexibility: 55,
    lifestyleCompat: 60,
    growthCurve: 50,
  },
  trend: 'stable',
  trendDetail: '日本 IT 人才缺口持续存在，但对日语的要求并未降低。日元贬值降低了在日本赚钱汇回国内的吸引力，但同时也降低了留学和生活的入场成本。日本政府正在放宽高度人才签证政策以吸引 IT 人才。',
  exclusivity: ['放弃国内互联网行业的高薪天花板', '放弃中文母语的工作环境', '适应日本严格的职场文化和礼仪', '日元贬值可能侵蚀实际收入'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构', '开始学日语（五十音 → 标日初级上册）', '了解日本 IT 就业的基本路径和要求'] },
    { year: '大一下', tasks: ['日语推进到 N5-N4 水平', '确定技术方向（推荐后端/全栈/数据工程，日本需求大）', '暑假：日语集中学习 + 做一个小项目'] },
    { year: '大二上', tasks: ['日语目标 N3', '深入学习一门框架并做完整项目', '研究目标公司（乐天/Line/Mercari 等对日语要求相对宽松的公司）'] },
    { year: '大二下', tasks: ['日语目标 N2（报名 7 月 JLPT）', '做第二个有深度的项目并写英文/日文 README', '暑假：找国内实习积累经验'] },
    { year: '大三上', tasks: ['N2 未通过则 12 月再考', '开始了解日本求职流程（履历书、職務経歴書、SPI 考试）', '学习日本常用技术栈（Ruby on Rails/Java/PHP 在日本仍广泛使用）'] },
    { year: '大三下', tasks: ['目标 N1（可选，技术强者 N2 即可）', '注册日本求职平台（Wantedly/Green/LinkedIn Japan/Indeed Japan）', '参加日本企业的线上说明会或招聘活动'] },
    { year: '大四上', tasks: ['集中投递日本企业（直接应聘或通过 TokyoDev/Japan Dev 等平台）', '准备技术面试 + 日语面试', '同步准备 Plan B（语言学校 4 月入学申请）', '如拿到 offer 则办理工作签证'] },
    { year: '大四下', tasks: ['如未拿到直接 offer，确定语言学校（7 月或 10 月入学）', '办理签证、住宿', '出发前继续强化日语', '如语言学校路径：边学日语边找工作'] },
  ],
  tags: ['计算机', '日本', 'IT', '海外就业', '日语', '东京'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.jlpt.jp/', 'https://www.moj.go.jp/isa/', 'https://tokyodev.com/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-germany-masters', 'cs-freelance'],
};

export default path;
