import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-us-masters',
  title: '美国留学 — TOP50 CS 硕士 → OPT/H1B 工作',
  category: 'overseas-study',
  summary: '申请美国 TOP50 CS 硕士，毕业后通过 OPT 在美国科技公司就业，争取 H1B 工作签证和长期留美机会。',
  description: `## 路径概述

美国拥有全球最顶级的科技公司和最具竞争力的 CS 就业市场。TOP50 CS 硕士毕业后可获得
3 年 OPT（STEM 专业），在硅谷、西雅图、纽约等地寻求高薪就业机会。
H1B 工作签证需抽签，中签后可转绿卡。

## 真实画像

- **总花费**：2 年硕士约 50-80 万 RMB（学费 30-50 万 + 生活费 20-30 万）
- **语言门槛**：TOEFL 100+/IELTS 7.0+，部分顶尖项目需要 GRE 320+
- **就业薪资**：美国 CS 硕士应届 Offer 中位数约 120-160k USD/年（约 87-116 万 RMB）
- **OPT 政策**：STEM 专业 3 年 OPT，每年可抽 1 次 H1B（本科中签率约 25%，硕士约 35-40%）
- **生活质量**：高收入高消费，工作节奏因公司而异（大厂 40-50h/周，创业公司更长）

## 优势

- 全球最高 CS 薪资天花板（大厂 Senior 年薪可达 300-500k USD）
- 硅谷/西雅图是全球技术创新的中心，职业发展机会无与伦比
- TOP50 CS 硕士在全球范围内有极高的学历含金量
- STEM OPT 3 年多次抽 H1B 机会

## 风险

- 经济投入巨大（50-80 万），双非学生申请奖学金难度高
- 中美关系持续紧张，签证政策不确定性大（10043 号总统令等限制可能扩大）
- H1B 抽签概率低（近年中签率约 15-25%，远低于硕士受益比例的理论值）
- 双非一本申请 TOP50 CS 硕士竞争激烈（需要高 GPA 85+、强推荐信、有竞争力的科研/项目经历）
- 即使拿到 H1B，绿卡排期长（中国大陆出生 5-8 年起）
- AI 对初级 SDE 岗位的替代效应在美国同样显著`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'fail', detail: '2 年硕士总投入 50-80 万 RMB。美国硕士几乎无全额奖学金（仅有部分学费减免或 TA/RA 机会）。对双非普通家庭压力极大，可能需家庭举债。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'at-risk', detail: '需要 TOEFL 100+ 或 IELTS 7.0+。GRE 320+ 对申请 TOP50 项目是加分项（部分学校已取消 GRE 要求）。双非学生英语基础普遍较弱，需要较长时间准备。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'fail', detail: '美国 TOP50 CS 项目对双非学生的录取难度大。GPA 需 85+（3.5/4.0 以上），需要高质量科研经历或论文发表来弥补学校层次差距。录取率通常低于 10%。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'at-risk', detail: '美国 CS 硕士项目一般 1.5-2 年可完成。课程难度中上，多数项目不需要论文（以修课为主）。毕业率较高（90%+），压力主要来自同时找工作和学业。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'fail', detail: '毕业后大概率留在美国。如果回国，美国 CS 硕士在上海外企/大厂认可度高，但 50-80 万投入和国内 20-30k 起薪的 ROI 不匹配。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '大四申请 + 硕士 1.5-2 年 + 求职（OPT 3 年内）≈ 2.5-5 年到稳定就业（取决于 H1B 抽签运气）。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '留学期间生活费较紧（每月约 1500-2500 USD）。就业后薪资高，在美生活水平好（但高税收高消费）。回国则投入产出比一般。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '美国 TOP50 CS 硕士全球认可度极高。在上海外企/大厂中有明显竞争优势，海归身份在部分企业有额外加分。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'at-risk', detail: '中美科技竞争持续升温，签证政策不确定性大。10043 号总统令对部分中国高校毕业生有限制，未来可能扩大。H1B 改革和绿卡政策受美国国内政治影响波动。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 90,
    timeFlexibility: 50,
    lifestyleCompat: 65,
    growthCurve: 95,
  },
  trend: 'declining',
  trendDetail: '美国 CS 硕士申请的竞争激烈程度持续上升，但签证和政策风险也在同步增加。2024-2025 年 H1B 中签率进一步走低（注册人数激增导致），且特朗普若再次上台可能收紧 OPT/H1B 政策。建议关注加拿大、欧洲作为 Plan B。',
  exclusivity: ['放弃经济上较为宽松的其他留学目的地', '放弃国内应届生考公/考编窗口', '放弃在国内低成本读研后稳妥就业的路径', '如 H1B 未中签则需回国重新规划，浪费 2-3 年时间和大量金钱'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构，保持 GPA 85+ 是底线', '开始背托福/雅思单词（每天 50 词）', '了解美国 CS 硕士申请流程和时间线（一亩三分地/知乎）'] },
    { year: '大一下', tasks: ['参加第一次托福/雅思考试摸底（目标 80+/6.5+）', '保持高 GPA（85+），核心课成绩尤为关键', '寻找校内科研机会（进教授实验室）', '暑假：托福/雅思集中突击培训'] },
    { year: '大二上', tasks: ['托福/雅思刷分（目标 100+/7.0+）', '开始背 GRE 单词（如目标学校需要）', '深入参与科研项目，争取发表论文或至少有一作经历', '学完一门主流语言（Java/Python/Go）并做项目'] },
    { year: '大二下', tasks: ['考 GRE（如需要，目标 320+）', '完成一个高质量个人项目（GitHub stars 50+ 或技术博客连载）', '暑假：找到第一份实习（即使是小公司，重在积累经验）'] },
    { year: '大三上', tasks: ['托福/雅思最终刷分（确保在申请前达到目标）', '继续科研或寻找第二段更高质量的实习', '开始研究目标学校（选 8-12 所，分冲刺/匹配/保底三档）', '联系推荐人（教授+实习 mentor）'] },
    { year: '大三下', tasks: ['完成所有申请文书（PS/SOP +CV + 推荐信）', '暑假：冲刺一段知名外企或国内大厂实习（提升简历竞争力）', '如 GRE 不理想，利用暑假再次刷分', '关注一亩三分地论坛的录取数据实时调整选校策略'] },
    { year: '大四上', tasks: ['9-12 月提交所有申请（注意每个学校的截止日期）', '准备资产证明（约 60-80 万 RMB 存款或收入证明）', '12 月-次年 1 月准备面试（部分学校需要面试）', '同步准备 Plan B（国内考研/就业/其他留学目的地）'] },
    { year: '大四下', tasks: ['1-4 月等待录取结果', '4/15 前确定最终入读学校', '办理 I-20 + F-1 签证面试', '暑期实习/刷 LeetCode（为美国求职做准备）', '如未录取：评估是否延期一年再申或转向加拿大/欧洲'] },
  ],
  tags: ['计算机', '美国', '留学', '硕士', '硅谷', 'H1B', '高薪'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students', 'https://www.1point3acres.com/bbs/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-uk-masters', 'cs-australia-masters', 'cs-singapore-masters', 'cs-germany-masters', 'cs-domestic-postgrad'],
};

export default path;
