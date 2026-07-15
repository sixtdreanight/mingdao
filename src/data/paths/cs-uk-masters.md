import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-uk-masters',
  title: '英国留学 — G5/罗素集团 CS 硕士 → 毕业生签证',
  category: 'overseas-study',
  summary: '申请英国 G5 或罗素集团一年制 CS 硕士，利用毕业生签证（PSW）在英国积累工作经验，或回国进入外企就业。',
  description: `## 路径概述

英国一年制 CS 硕士以学制短著称，G5（牛津、剑桥、帝国理工、UCL、LSE）和罗素集团大学
在全球排名中表现优异。毕业生可获得 2 年毕业生签证（Graduate Route）在英国找工作，
但对双非学生而言申请顶级项目的难度较大。

## 真实画像

- **总花费**：1 年硕士约 35-50 万 RMB（学费 22-35 万 + 生活费 13-15 万）
- **语言门槛**：IELTS 6.5-7.0（不同学校要求不同），部分项目不需要 GRE
- **就业薪资**：英国 CS 应届起薪约 30-40k 英镑/年（约 27-37 万 RMB）
- **PSW 签证**：2 年找工作时间，但实际转工签（Skilled Worker）率仅约 20-30%
- **学制特点**：1 年制（9 月入学到次年 9 月毕业），学业紧凑

## 优势

- 1 年即可毕业，时间成本全球最低
- G5/罗素集团学历回国后在上海外企和金融机构中有较高认可度
- 非 STEM 也享有 PSW 签证，CS 更是紧缺方向
- 课程设置紧凑实用，适合快速提升和转专业

## 风险

- 1 年时间极短，几乎无法在英国积累实习经验（入学即秋招）
- PSW 签证实际利用率有限（多数人毕业后回国）
- 英国科技行业规模远小于美国，高薪岗位相对少
- 35-50 万投入在 1 年内花完，回国起薪（15-25k/月）与投入不匹配
- 双非一本申 G5 难度极大（ICL/UCL CS 录取率低于 10%）
- 英国近年提高工签薪资门槛（2024 年起 Skilled Worker 要求年薪 38,700 英镑）`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'at-risk', detail: '1 年硕士总投入 35-50 万 RMB。虽然比美国便宜，但对于双非普通家庭仍然压力较大。英国硕士几乎没有奖学金给国际生。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: 'IELTS 6.5-7.0（或同等水平）。大多数罗素集团大学接受 IELTS 6.5（小分 6.0），G5 需要 7.0+。双非学生通过系统备考 3-6 个月通常可以达到。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'at-risk', detail: '英国大学对中国大学有 List 系统（中国大学认可名单）。G5 对双非的接受度较低（GPA 需 88-90+），罗素集团中游大学（利兹、谢菲、伯明翰等）对双非较友好（GPA 85+）。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: '1 年制硕士课程紧凑但毕业率普遍较高（90%+）。以修课和毕业论文为主，只要跟上进度通常可顺利毕业。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'at-risk', detail: '毕业后大概率回国（PSW 实际留英率低）。英国硕士学历在上海外企和金融机构中有一定品牌溢价，但国内大厂更看重实际能力。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '大四申请 + 硕士 1 年 ≈ 1.5-2 年到毕业。如果直接回国就业，时间成本极低。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '留学期间每月生活费约 1000-1500 英镑。毕业回国上海起薪 15-25k/月，需要 3-5 年才能收回留学投入。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: 'G5/罗素集团 CS 硕士在上海外企和金融机构认可度高。相较于国内双非本科+985 硕士（3 年），1 年英硕+海归身份在特定行业（咨询、金融、外企）更有优势。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '中英关系总体稳定，留学政策相对友好。但英国脱欧后学费和生活费对国际生有所上涨，PSW 政策虽保留但未来可能调整。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 70,
    timeFlexibility: 85,
    lifestyleCompat: 75,
    growthCurve: 55,
  },
  trend: 'stable',
  trendDetail: '英国一年制硕士的性价比争议持续存在，但留学人数保持高位。PSW 签证恢复后吸引力有所恢复，但实际留英就业率仍然不高。2024 年英国提高工签薪资门槛后，应届生在英就业难度加大。对双非学生而言，G5 申请难度持续上升，建议重点关注罗素集团中游大学。',
  exclusivity: ['放弃长期留海外的可能性（英国移民路径不如加/澳清晰）', '放弃通过 2-3 年硕士建立深度技术能力的时间', '放弃考公/考编的应届生身份（如不立即回国）', '放弃在美国高薪就业的机会（路径切换成本高）'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构，保持 GPA 85+ 是申请底线', '开始背雅思单词（每天 50 词），了解雅思考试结构和题型', '了解英国大学 CS 项目排名和录取要求（THE/QS 排名）'] },
    { year: '大一下', tasks: ['参加第一次雅思考试摸底（目标 6.0+）', '保持高 GPA（85+），选修课慎重选择不拉低绩点', '暑假：雅思集中突击培训（参加辅导班或网课）'] },
    { year: '大二上', tasks: ['雅思刷分（目标 6.5+ 小分 6.0+）', '做一个有深度的个人项目（GitHub 可展示）', '开始研究英国大学的中国大学 List，确认目标学校层次'] },
    { year: '大二下', tasks: ['雅思最终刷分（G5 目标 7.0+，罗素集团 6.5+）', '深入完善个人项目并撰写技术文档', '暑假：找第一份实习（即使是小公司，PS/CV 需要实习经历）'] },
    { year: '大三上', tasks: ['继续积累实习/科研经历', '研究 6-8 所目标学校的课程设置和毕业生去向', '开始构思 Personal Statement（PS）的核心故事线', '联系推荐人（2 位教授）+ 保持良好关系'] },
    { year: '大三下', tasks: ['完成 PS 初稿、CV 定稿、推荐信确认', '暑假：冲刺一段更高质量的实习', '关注 UKPASS 等申请系统要求和各校申请开放时间'] },
    { year: '大四上', tasks: ['9-12 月提交所有申请（英国多数学校为滚动录取，先到先得）', 'G5 部分学校 10-11 月开放申请，尽早提交', '准备资产证明（约 35-50 万 RMB 存款证明）', '同步准备 Plan B（国内考研/就业/其他留学国家）'] },
    { year: '大四下', tasks: ['等待 Offer（滚动录取 4-8 周出结果，G5 可能更久）', '确定入读学校并缴纳押金', '办理 CAS + Tier 4 学生签证', '出发前预习专业课程（尤其是转专业学生）', '如未录取：考虑 Gap 一年或转向澳洲/爱尔兰'] },
  ],
  tags: ['计算机', '留学', '英国', '硕士', '一年制', 'G5', '罗素集团'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.gov.uk/graduate-visa', 'https://www.ucas.com/', 'https://www.topuniversities.com/university-rankings'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-us-masters', 'cs-australia-masters', 'cs-singapore-masters', 'cs-germany-masters', 'cs-domestic-employment'],
};

export default path;
