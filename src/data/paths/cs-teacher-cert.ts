import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-teacher-cert',
  title: '教师资格证 — 信息技术教师路径',
  category: 'civil-service',
  summary: '考取信息技术教师资格证，进入上海中小学或中职学校担任信息技术教师，获得事业编制和稳定工作。',
  description: `## 路径概述

考取信息技术教师资格证（高中或中职），参加教师招聘考试进入上海公立中小学或中职学校。
这条路用「编制保障」换「薪资上限」——收入不高但稳定，有寒暑假，是追求工作生活平衡的选择。

## 真实画像

- **入职工资**：上海公立学校新教师约 8-12k/月（含基本工资+绩效，不含公积金）
- **3年后薪资**：10-15k/月（随职称晋升缓慢增长）
- **编制情况**：上海编制收紧，新教师多走「储备教师」或「区管校聘」模式
- **工作体验**：有寒暑假，但日常工作繁琐（备课/班主任/行政事务），信息技术教师可能被拉去做全校 IT 维护
- **从业者画像**：女性比例高，追求稳定和家庭平衡者居多

## 优势

- 事业编制，工作稳定，不担心裁员
- 寒暑假（约 3 个月/年），时间自由度高
- 社会地位尚可，家长认可度高
- 工作压力相对互联网行业小很多
- 可兼顾家庭和个人兴趣

## 风险

- 薪资天花板低（高级教师职称后也难以突破 20k/月）
- 信息技术课在中小学是非主科，存在感弱，评职称困难
- 上海教师编制逐年收紧，非师范生竞争劣势明显
- 每日通勤 + 坐班制（早 7:30 到校），自由度不如想象中大
- 教师职业倦怠率高，需要真正的教育热情支撑`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '教师资格证考试费用仅几百元，培训班可选（2000-5000 元）。主要投入是备考时间。入职工资 8-12k，上海生活够用但存钱难。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '普通话二级乙等以上（语文教师需二级甲等）。无外语要求。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'at-risk', detail: '上海公立学校教师招聘竞争激烈（市重点通常要求 211/985 或师范院校）。双非非师范生考编难度大，但中职学校或郊区学校门槛较低。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: '教师资格证考试通过率约 30-40%（笔试+面试）。教师招聘考试的竞争比因区而异（热门区可能 20:1 以上）。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'at-risk', detail: '上海教师编制总体收缩（出生率下降导致学龄人口减少），但信息技术教师因专业对口度低，竞争相对较小。远郊学校缺口更大。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '大三大四期间备考教资+教招，正常 4 年本科毕业即就业。时间成本与直接就业相当。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'at-risk', detail: '入职第一年综合收入约 10-15 万/年（含公积金）。在上海属于中等偏下水平，租房后结余有限。但公积金比例高（12%+12%），长期有购房优势。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'at-risk', detail: '教师行业看重师范背景和学历层次，双非非师范 CS 学历在教师招聘中无明显优势。但 CS 背景在信息技术教师岗位上有专业对口加分。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '国内事业编制岗位，无地缘政治风险。教育行业受政策影响大（如双减），但信息技术教师影响较小。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 50,
    timeFlexibility: 70,
    lifestyleCompat: 85,
    growthCurve: 30,
  },
  trend: 'stable',
  trendDetail: '教师编制总体收缩（出生率下降），但信息技术教师因中小学信息化建设需求（编程教育进课堂、智慧校园）有一定增量需求。上海作为一线城市对信息技术教育投入较大。但长期来看，学龄人口减少将逐步影响教师招聘规模，建议关注职业教育（中职/高职）方向。',
  exclusivity: ['放弃 CS 行业的高薪天花板', '放弃技术快速迭代中的成长刺激', '放弃企业中的灵活工作方式和晋升通道', '接受相对固化的职称晋升体系'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和计算机基础课程', '通过普通话等级考试（二级乙等以上）', '了解教师资格证考试的科目和要求'] },
    { year: '大一下', tasks: ['继续学习编程和计算机教育相关知识', '关注信息技术教育的最新政策（编程进课堂、新课标）', '暑假：参加教育类志愿活动或支教（积累教育相关经历）'] },
    { year: '大二上', tasks: ['报名教师资格证笔试（综合素质 + 教育知识与能力 + 信息技术学科）', '系统学习教育学和心理学知识', '关注上海各区教育局教师招聘公告'] },
    { year: '大二下', tasks: ['通过教师资格证笔试（三科）', '准备教师资格证面试（试讲+结构化面试）', '暑假：找一所学校或培训机构做兼职/实习教师'] },
    { year: '大三上', tasks: ['通过教师资格证面试，完成认定拿到证书', '了解上海教师招聘考试（区统考/学校自主招聘）', '系统学习教育综合知识（教招笔试内容）'] },
    { year: '大三下', tasks: ['参加上海各区教师招聘考试（通常在 10-12 月集中招聘）', '准备试讲和面试', '同步投递中职学校信息技术教师岗位（门槛相对较低）'] },
    { year: '大四上', tasks: ['如已拿到教师 offer：完成签约和体检', '如未拿到：继续参加各区春招补录', '同步准备 Plan B（IT 企业秋招）'] },
    { year: '大四下', tasks: ['完成毕业设计和师范类实习（如需要）', '入职前准备：了解学校情况和教学计划', '如教师路径不顺：重新评估是否转向 IT 行业就业', '取得毕业证和学位证后办理入编手续'] },
  ],
  tags: ['计算机', '教师资格证', '信息技术教师', '编制', '上海', '教育', '事业编'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.neea.edu.cn/', 'https://www.shehr.cn/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-domestic-postgrad', 'cs-civil-service'],
};

export default path;
