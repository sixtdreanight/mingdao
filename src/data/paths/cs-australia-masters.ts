import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-australia-masters',
  title: '澳大利亚留学 — 八大 CS 硕士 → 485 工签 → 移民路径',
  category: 'overseas-study',
  summary: '申请澳洲八大 CS 硕士，毕业后利用 485 毕业生工签在澳工作，通过技术移民（189/190/491签证）实现长期留澳。',
  description: `## 路径概述

澳大利亚是当前对中国留学生移民政策最友好的英语国家之一。CS/IT 专业长期在澳洲技术移民
职业清单（MLTSSL）上，毕业后可获得 2-4 年 485 工签，通过技术移民打分系统
（年龄、学历、英语、工作经验、NAATI 等加分项）申请永久居留。

## 真实画像

- **总花费**：2 年硕士约 50-70 万 RMB（学费 30-45 万 + 生活费 20-25 万）
- **语言门槛**：IELTS 6.5（小分 6.0），移民加分需要 7.0 或 8.0
- **就业薪资**：澳洲 CS 应届起薪约 65-80k AUD/年（约 31-38 万 RMB）
- **移民路径**：485 工签（2-4年）→ 累积工作经验 + 英语加分 → 189/190 技术移民
- **生活质量**：工作生活平衡极好、全民医保 Medicare、自然环境优美

## 优势

- 移民路径清晰且可行（CS 属于优先职业），成功率相对较高
- 澳洲 IT 人才持续短缺，就业市场对留学生友好
- 工作生活平衡好（标准 38 小时/周，年假 20 天 + 公共假期）
- 时区与中国接近（2-3 小时），回国探亲方便
- 八大（墨尔本、悉尼、UNSW、ANU 等）全球排名高

## 风险

- 50-70 万总投入较高，双非家庭压力大
- 技术移民打分竞争日益激烈（近年 EOI 邀请分数逐年上涨）
- 澳洲主要城市（悉尼、墨尔本）生活成本高
- 双非一本申请八大需要高 GPA（85+ 较稳妥）
- 移民政策虽有延续性但联邦大选后可能有变数
- 回国发展则澳洲学历在国内互联网行业的认知度不如英美`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'at-risk', detail: '2 年硕士总投入 50-70 万 RMB。澳洲允许留学生每两周打工 48 小时，可部分补贴生活费。但双非普通家庭仍需较大投入，可能需银行贷款。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'at-risk', detail: '入学需 IELTS 6.5（小分 6.0）。技术移民加分需 IELTS 7.0（+10分）或 8.0（+20分）。双非学生英语基础较弱，达到 7.0/8.0 需要长期系统准备。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '澳洲八大对中国双非大学较为友好，GPA 80-85+ 有较大概率录取。相对于英美名校，澳洲八大的录取门槛对双非更为宽松。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: '澳洲硕士毕业率较高（85%+），课程设置合理，以修课为主。挂科可以重修（但费用较高，约 4000-6000 AUD/门）。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'at-risk', detail: '毕业后大概率留在澳洲（移民导向）。如回国，澳洲八大 CS 硕士在上海外企中有一定认可度，但在国内互联网大厂中竞争力不如英美同层次学历。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '大四申请 + 硕士 2 年 + 485工签找工 0.5 年 ≈ 3-4 年到稳定就业。如果走移民路径（PR），从入学到拿 PR 通常需要 4-6 年。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '留学期间打工可补贴生活费（半工半读模式成熟）。就业后澳洲 CS 薪资购买力强，工作生活平衡好。悉尼/墨尔本房价高但公寓可负担。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '澳洲八大 CS 硕士在澳洲本地认可度极高。在国内则属中上水平，不如英美顶尖名校但高于东南亚学历，在上海外企中有一定竞争力。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '中澳关系虽有起伏但留学和移民政策相对稳定。澳洲是移民国家，对技术移民需求持续。AUKUS 等安全联盟对留学生影响有限。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 80,
    timeFlexibility: 60,
    lifestyleCompat: 90,
    growthCurve: 70,
  },
  trend: 'rising',
  trendDetail: '澳洲 IT 人才短缺问题持续加剧（ACS 报告显示技能缺口扩大），CS/IT 在技术移民中的优先级保持高位。政策层面，2024-2025 年移民配额中技术移民占比提高。但主要城市生活成本上升和房价上涨是需要关注的风险点。对双非学生而言，澳洲是移民可能性最高的英语国家留学目的地。',
  exclusivity: ['放弃国内高薪互联网行业的短期收入', '放弃国内亲友社交圈和便利生活', '放弃考公/考编的应届生身份', '如移民不成功回国，50-70 万投入的回报周期较长'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构，保持 GPA 80+ 是基础底线', '开始背雅思单词（每天 50 词）', '了解澳洲八大 CS 项目、移民职业清单和打分系统（移民局官网）'] },
    { year: '大一下', tasks: ['参加第一次雅思考试摸底（目标 6.0+）', '保持高 GPA（目标 85+ 为移民打分加分做准备）', '暑假：雅思集中培训 + 了解澳洲文化和社会'] },
    { year: '大二上', tasks: ['雅思刷分（目标 6.5+ 小分 6.0+）', '做一个有深度的个人项目（GitHub 可展示）', '开始学习移民加分项（NAATI 社区语言、PY 职业年规划）'] },
    { year: '大二下', tasks: ['雅思进一步刷分（移民目标 7.0-8.0，加分最多）', '完成个人项目并撰写英文技术文档', '暑假：找第一份实习（澳洲就业市场看重本地或国际公司经历）'] },
    { year: '大三上', tasks: ['继续刷分雅思或准备 PTE（PTE 在澳洲更受欢迎，出分快）', '积累第二段实习经历', '研究 6-8 所目标学校的课程设置、学费、所在城市就业和移民情况'] },
    { year: '大三下', tasks: ['完成 Personal Statement 和 CV', '学习澳洲技术移民打分表并开始规划加分路径', '暑假：冲刺一段知名公司实习（提升找工竞争力）'] },
    { year: '大四上', tasks: ['提交澳洲大学申请（多数学校 2 月和 7 月开学，灵活选择）', '准备资产证明（约 50-70 万 RMB 存款证明）', '同步关注 ACS 职业评估要求（确认本科课程是否满足评估条件）', '同步准备 Plan B（加拿大/英国留学或国内就业）'] },
    { year: '大四下', tasks: ['等待 Offer 并确定入读学校', '办理学生签证（500 签证）', '如英语未达移民加分目标，继续刷 PTE', '出发前学习澳洲租房/银行/医保等生活技能，加入校友群', '如未录取：评估是否 Gap 一年提升 GPA/英语后再申'] },
  ],
  tags: ['计算机', '留学', '澳大利亚', '硕士', '移民', '八大', '技术移民', '485签证'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list', 'https://www.acs.org.au/', 'https://www.studyassist.gov.au/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-us-masters', 'cs-uk-masters', 'cs-singapore-masters', 'cs-germany-masters', 'cs-domestic-employment'],
};

export default path;
