import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-korea-masters',
  title: '韩国 CS 硕士留学 — SKY/KAIST/POSTECH → 韩国 IT 企业就业',
  category: 'overseas-study',
  summary: '申请韩国顶尖大学 CS 硕士（SKY/KAIST/POSTECH），毕业后进入韩国 IT 企业或回国进入韩企中国分部。',
  description: `## 路径概述

韩国 CS 硕士是一条相对低成本的留学路径。SKY（首尔大/高丽大/延世大）、KAIST、POSTECH
在亚洲排名靠前，对中国学生录取相对友好。毕业后可在韩国 IT 企业（Naver/Kakao/Coupang/
Samsung SDS）就业，或回国进入韩企中国分部（Samsung/LG/SK）。

## 真实画像

- **学费**：国立大学约 2-4 万 RMB/年，私立大学约 4-6 万 RMB/年（KAIST/POSTECH 有丰厚奖学金）
- **生活费**：首尔约 6-8 万 RMB/年，地方城市约 4-5 万 RMB/年
- **总投入**：2 年硕士约 20-35 万 RMB（含生活费）
- **语言要求**：韩语授课需 TOPIK 5 级以上；部分项目为英语授课（需 IELTS 6.5+/TOEFL 80+）
- **毕业后薪资**：韩国 IT 企业起薪约 3000-4000 万韩元/年（约 16-22 万 RMB），大企业起薪更高
- **工作时长**：韩国 IT 企业加班文化普遍（尤其是大企业），每周 45-52 小时常见

## 优势

- 学费显著低于英美澳加（约为美国的 1/3-1/2）
- KAIST/POSTECH 奖学金丰厚（很多硕士项目免学费 + 提供生活费）
- 地理位置近，文化差异小于欧美
- 韩国 IT 产业成熟（Naver/Kakao 技术实力强）
- 回国后进韩企中国分部有语言和文化优势

## 风险

- 韩语要达到 TOPIK 5+ 需要 1-2 年系统学习（零基础起步时间更长）
- 外国人在韩国就业存在签证和职场文化障碍（需要公司担保 E-7 签证）
- 韩国社会对外国人存在一定的隐性歧视
- 首尔生活成本高（尤其是租房，保证金制度需要大额现金）
- 韩国 IT 企业晋升天花板对外国人较低
- 中韩关系波动可能影响签证政策和就业环境`,

  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'at-risk', detail: '2 年总投入 20-35 万 RMB（学费+生活费）。公立大学和 KAIST/POSTECH 奖学金可大幅降低成本。但首尔生活成本高，春川保证金制度需要额外现金储备。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'fail', detail: '韩语授课项目需要 TOPIK 5 级以上（零基础需 1-2 年系统学习）。英语授课项目可绕过韩语要求，但日常生活和实习面试仍需要韩语能力。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '韩国大学对中国双非本科的接受度较高，更看重 GPA 和研究计划。SKY 级别要求较高（GPA 3.3/4.0+），KAIST/POSTECH 偏重科研潜力。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'at-risk', detail: '韩国硕士毕业率约 90%，但毕业论文要求因学校和导师而异。KAIST/POSTECH 学术要求较高，延毕情况存在。核心难点是语言而非学术。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '毕业后若回国，上海有 Samsung/LG/SK 等韩企中国分部，以及大量需要韩语 IT 人才的岗位。留韩则集中在首尔/京畿道。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '语言准备 1-2 年 + 硕士 2 年 = 总计 3-4 年。比直接就业晚 3-4 年进入职场。需要提前规划语言学习。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'at-risk', detail: '硕士期间生活费紧张（即使有奖学金，首尔生活成本高）。就业后起薪 16-22 万 RMB/年，在韩国属于中等偏下水平。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: 'KAIST/POSTECH 在亚洲 CS 领域认可度高（QS 排名前 100）。SKY 毕业生在韩国本土就业竞争力强。回国认可度不及美国 top 50 但优于国内双非硕士。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'at-risk', detail: '中韩关系受朝鲜半岛局势和美国影响存在波动性。萨德事件后出现过中国对韩文化产业的限制。当前关系相对稳定但需关注政策变化。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 65,
    timeFlexibility: 35,
    lifestyleCompat: 40,
    growthCurve: 55,
  },
  trend: 'stable',
  trendDetail: '韩国 CS 留学热度稳定，没有显著增长或下降趋势。韩国 IT 产业成熟但增长放缓，对外国人就业仍然存在结构性限制。KAIST/POSTECH 的 AI/半导体方向有上升空间。建议关注英语授课项目以降低语言门槛。',
  exclusivity: ['放弃国内 3-4 年工作经验和收入', '放弃国内大厂应届的机会窗口', '承担韩语学习的高时间成本', '接受韩国职场文化（加班、等级制度）', '放弃国内的社会关系和职业网络'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构', '开始学习韩语（从发音和基础语法开始）', '了解韩国 CS 院校排名和申请要求（SKY/KAIST/POSTECH）'] },
    { year: '大一下', tasks: ['韩语学习：完成初级（目标 TOPIK 2-3 级）', '学好高数、线代、概率论（保证 GPA）', '暑假：参加韩语强化班或线上课程'] },
    { year: '大二上', tasks: ['韩语学习：进入中级（目标 TOPIK 3-4 级）', '开始参与科研项目或实验室工作（申请硕士的关键加分项）', '学好操作系统、计算机网络等核心课程'] },
    { year: '大二下', tasks: ['考取 TOPIK 4 级（或 IELTS 6.5+ 如果有英语授课计划）', '确定 3-5 所目标院校并研究教授研究方向', '暑假：如预算允许，参加韩国大学暑期项目', '开始准备英文推荐信（联系授课教授）'] },
    { year: '大三上', tasks: ['冲刺 TOPIK 5-6 级', '撰写研究计划（Statement of Purpose）', '联系目标院校教授（套磁）', '准备申请文书和作品集'] },
    { year: '大三下', tasks: ['完成所有语言考试（TOPIK 6 级为最佳）', '提交硕士申请（韩国大学通常 9-11 月截止春季入学）', '准备面试（部分院校要求现场或线上面试）', '同步准备 Plan B（国内考研或就业）'] },
    { year: '大四上', tasks: ['等待录取结果（通常 11-12 月出结果）', '如被录取：办理签证、找住宿、了解韩国生活', '如未录取：评估是否申请下一轮或转向 Plan B'] },
    { year: '大四下', tasks: ['入学前准备：韩语强化、了解韩国文化', '联系导师并确定研究方向', '到达韩国：办理外国人登陆证、开设银行账户', '开始硕士课程和实验室工作'] },
  ],
  tags: ['计算机', '留学', '韩国', '硕士', 'SKY', 'KAIST', 'POSTECH', '海外就业'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.topik.go.kr/', 'https://www.kaist.ac.kr/', 'https://www.postech.ac.kr/', 'https://en.snu.ac.kr/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-postgrad', 'cs-germany-masters', 'cs-japan-it'],
};

export default path;
