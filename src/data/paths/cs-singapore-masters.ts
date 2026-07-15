import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-singapore-masters',
  title: '新加坡留学 — NUS/NTU CS 硕士 → 亚洲科技枢纽',
  category: 'overseas-study',
  summary: '申请新加坡国立大学（NUS）或南洋理工大学（NTU）CS 硕士，毕业后在新加坡科技行业就业或回国发展，利用亚洲科技枢纽的区位优势。',
  description: `## 路径概述

新加坡作为亚洲金融和科技枢纽，拥有 Google、Meta、ByteDance、Shopee、Grab 等企业的
亚太总部或研发中心。NUS 和 NTU 的 CS 专业在全球排名前列（QS 2024：NUS 第 6，NTU 第 15），
毕业后就业选择面广，兼具海外经验和亚洲文化认同。

## 真实画像

- **总花费**：1-1.5 年硕士约 30-45 万 RMB（学费 18-28 万 + 生活费 12-17 万）
- **语言门槛**：IELTS 6.5+ 或 TOEFL 90+，实际录取偏好 7.0+
- **就业薪资**：新加坡 CS 应届起薪约 5000-6500 SGD/月（约 27-35 万 RMB/年）
- **工作签证**：毕业后可申请 EP（Employment Pass），薪资门槛约 5000 SGD/月（2025 年起提高）
- **永久居留**：工作 6 个月后可申请 PR（审批周期 6-12 个月，审批较严格）

## 优势

- NUS/NTU 全球排名极高（QS 前 20），学历含金量在亚洲首屈一指
- 新加坡华人社会，文化和语言适应成本低
- 亚洲科技公司亚太总部聚集，就业选择多
- 离中国近（飞行 5-6 小时），回国探亲方便
- 可兼顾回国和留新两条路线，灵活性高
- 英语工作环境但日常可用中文，语言压力较小

## 风险

- NUS/NTU CS 硕士申请竞争极度激烈，双非录取难度很大（GPA 需 88+）
- 新加坡生活成本极高（全球最贵城市之一），租房压力大
- EP 签证薪资门槛持续提高，应届生拿到 EP 的难度增加
- PR 审批不可预测且近年收紧，长期定居不确定
- 新加坡 IT 市场体量有限（远小于中美），长期职业发展空间有限
- 如果回国，30-45 万投入的回报需要较长时间`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'at-risk', detail: '1-1.5 年硕士总投入 30-45 万 RMB。学费比英美低但新加坡生活费极高（尤其是房租，普通单间约 800-1500 SGD/月）。双非普通家庭需要仔细评估承受能力。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: 'IELTS 6.5-7.0 或 TOEFL 90+。新加坡日常可用中文，英语主要用于学习和工作。双非学生通过 3-6 个月系统备考通常可达标。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'at-risk', detail: 'NUS/NTU CS 硕士对双非学生的录取难度极大。GPA 需 88-90+，还需要强有力的科研经历、论文发表或竞赛获奖来弥补学校背景差距。实际录取偏好 985/211。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'NUS/NTU 硕士毕业率较高（90%+），课程设置严谨但合理。以修课为主，部分项目可选论文。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '新加坡 CS 硕士在上海就业市场认可度极高（NUS/NTU 品牌影响力强）。既可以留在新加坡工作也可随时回国，地域灵活性优于欧美路径。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '大四申请 + 硕士 1-1.5 年 ≈ 2-2.5 年到毕业。新加坡求职周期短（毕业生可在毕业前找工），时间成本低。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '留学期间生活费较紧但可通过校内兼职补贴。就业后新加坡 CS 薪资购买力不错，但房租占比高（通常占收入 30-40%）。总体生活质量高，治安好。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: 'NUS/NTU CS 硕士全球排名极高，在上海外企、金融机构和互联网大厂中高度认可。回国求职时品牌溢价明显。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '新加坡政治稳定，是中美之间相对中立的第三方。留学和移民政策受地缘政治影响较小。新加坡与中国关系良好，签证政策稳定。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 85,
    timeFlexibility: 75,
    lifestyleCompat: 80,
    growthCurve: 75,
  },
  trend: 'rising',
  trendDetail: '新加坡作为亚洲科技枢纽的地位持续上升，越来越多科技公司将亚太总部设在新加坡（尤其是中国出海企业）。但同时，EP 签证薪资门槛逐年提高，应届生获得 EP 的难度增加。NUS/NTU CS 硕士申请竞争也在加剧（中国申请者数量持续增长），双非学生的录取难度只增不减。',
  exclusivity: ['放弃欧美留学的广阔就业市场', '放弃移民路径相对更清晰的澳洲/加拿大', '放弃国内考公/考编的应届生身份', '如果目标 NUS/NTU 未录取，同地区的其他选择（SMU/SUTD）品牌溢价明显降低'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构，GPA 目标是底线中的底线（NUS/NTU 双非录取通常需要 88+）', '了解 NUS/NTU CS 硕士项目（MComp/MSc）的区别和申请要求', '开始背雅思单词（每天 50 词）'] },
    { year: '大一下', tasks: ['参加第一次雅思考试摸底（目标 6.5+）', '保持极高 GPA（每门课都全力以赴）', '寻找校内科研机会（进教授实验室），NUS/NTU 看重科研背景', '暑假：雅思集中突击培训'] },
    { year: '大二上', tasks: ['雅思刷分（目标 7.0+）', '深入参与科研项目，争取发表论文（即使是中文期刊或会议也有帮助）', '做一个有深度的个人项目（GitHub 可展示）', '关注 NUS/NTU 的 Summer Workshop 或交换项目'] },
    { year: '大二下', tasks: ['如科研有成果，尝试投英文会议论文', '完成个人项目并撰写技术博客', '暑假：找第一份高质量实习（目标知名外企或国内大厂）'] },
    { year: '大三上', tasks: ['雅思最终刷分（确保 7.0+ 小分 6.5+）', '如可能，考 GRE（NUS 部分项目推荐，320+ 加分明显）', '继续科研或寻找第二段实习', '开始研究目标导师（NUS/NTU 部分项目需要提前联系导师）'] },
    { year: '大三下', tasks: ['完成所有申请文书（PS/SOP + CV + 推荐信，新加坡项目看重学术动机和研究潜力）', '暑假：冲刺一段顶级实习或参加 ACM 等编程竞赛', '联系推荐人（2-3 位教授，最好是科研指导老师）'] },
    { year: '大四上', tasks: ['NUS/NTU 大部分项目 10-12 月开放申请，1-3 月截止，尽早提交', '部分项目（如 NUS MComp）有早申轮，优先录取概率更高', '准备资产证明（约 30-45 万 RMB 存款证明）', '同步准备 Plan B（香港/加拿大留学或国内就业）'] },
    { year: '大四下', tasks: ['等待 Offer（NUS/NTU 通常在 3-5 月出结果）', '确定入读学校并办理学生签证（Student Pass）', '申请校内宿舍或校外租房', '出发前刷 LeetCode + 系统设计（新加坡大厂面试与美国类似）', '如未录取：评估是否 Gap 一年提升背景再申，或转向香港/英国'] },
  ],
  tags: ['计算机', '留学', '新加坡', '硕士', 'NUS', 'NTU', '亚洲', '科技枢纽'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.comp.nus.edu.sg/programmes/pg/mcomp/', 'https://www.ntu.edu.sg/computing/admissions/graduate-programmes', 'https://www.mom.gov.sg/passes-and-permits/employment-pass'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-us-masters', 'cs-uk-masters', 'cs-australia-masters', 'cs-germany-masters', 'cs-domestic-employment'],
};

export default path;
