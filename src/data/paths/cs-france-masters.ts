import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-france-masters',
  title: '法国留学 — 公立大学/工程师学院 CS 硕士 → 欧盟就业',
  category: 'overseas-study',
  summary: '申请法国公立大学或工程师学院的 CS 硕士，学费极低但法语门槛高，毕业后在法国/欧盟 IT 市场就业。',
  description: `## 路径概述

法国 CS 教育体系分两条线：公立大学（Universite）和工程师学院（Grande Ecole）。公立大学注册费极低
（欧盟外学生本科约 2770 欧/年，硕士约 3770 欧/年），工程师学院学费较高（约 6000-15000 欧/年）
但就业认可度更高。法语是硬门槛 —— 无论是生活、学习还是求职，不会法语寸步难行。

## 真实画像

- **学制**：公立大学硕士 2 年，工程师学院 3 年（含预备班）或 2 年（Master 2 直入）
- **学费**：公立大学约 3770 欧/年（约 3 万 RMB），工程师学院约 6000-15000 欧/年
- **生活费**：巴黎约 1000-1300 欧/月，外省约 700-900 欧/月
- **总花费**：2 年硕士约 20-35 万 RMB
- **就业薪资**：法国 CS 应届起薪 38-45k 欧/年（巴黎），外省约 32-38k 欧/年
- **语言要求**：法语 B2（公立大学最低）/ C1（工程师学院），英语 B2 为辅

## 优势

- 公立大学学费极低，性价比接近德国
- 法国 IT 人才缺口大（尤其是 cybersecurity、data、cloud 方向）
- 毕业后 1 年求职签证（APS），工作 2 年后可申请入籍或 10 年长居
- 申根区自由通行，生活文化体验丰富
- 工程师学院（Grande Ecole）在法国社会地位极高

## 风险

- 法语 B2+/C1 是硬门槛，对零基础学生需 1-1.5 年全职学习法语
- 双非一本申请顶级工程师学院（X、Centrale、Telecom Paris）极难
- 法国行政效率低（OFII 手续、CAF 房补、续居留都慢）
- 巴黎生活成本高，税后薪资在欧洲属于中下水平
- 法国近年社会动荡（黄背心、养老金改革罢工、移民政策收紧）
- 回国则法国学历认可度远低于英美`,

  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '公立大学硕士 2 年总花费约 20-35 万 RMB（学费低，生活费为主）。需准备法国签证资金证明（约 7380 欧/年 in 2024）。工程师学院总花费约 30-50 万 RMB。整体低于英美。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'fail', detail: '法语 B2 是公立大学最低要求，C1 是工程师学院的实际要求。法语从零开始需 1-1.5 年全日制学习才能达到 B2（约 600-800 学时）。英语 B2（雅思 6.0+）作为辅助要求。语言是该路径的最大障碍。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'at-risk', detail: '公立大学对双非一本相对友好（看重课程匹配度和动机信），但顶级工程师学院（Telecom Paris、Centrale）竞争激烈偏好 985/211。双非学生建议瞄准中档公立大学（如 Universite Paris-Saclay 的外围学院）。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'at-risk', detail: '法国公立大学淘汰率高，硕士第一年（M1）通过率约 60-70%。法语授课对语言能力要求高，挂科重修较常见。工程师学院管理更严但支持更多，毕业率相对高。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'at-risk', detail: '毕业后大概率留在法国/欧盟。回国则法国 CS 学历在国内认可度有限，主要适用于法企（达索、施耐德、欧莱雅 IT 部门）或在华欧洲科技公司。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '法语学习 1-1.5 年 + 申请 0.5 年 + 硕士 2 年 + 求职 0.5 年 ≈ 4-4.5 年到稳定就业。加上本科 4 年，总计约 8-8.5 年。时间投入较大。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '就读期间生活费较紧（月均 700-1300 欧）。就业后法国生活质量较高（35h 工作制、5 周带薪假、全民医保），但税后薪资在欧洲属于中下（税前 40k 税后约 30k）。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'at-risk', detail: '工程师学院（Grande Ecole）在法国社会地位极高，求职有优势。公立大学硕士在欧洲有一定认可度，但回国知名度远低于英美。法企在华分支认可法国学历。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '中法关系相对稳定，但法国移民政策近年有收紧趋势（尤其是非欧盟学生续居留）。法国社会矛盾（罢工、社会运动）可能影响生活体验但一般不针对国际学生。欧盟整体政治稳定。', sourceUrl: '' },
  ],

  preferenceScores: {
    interestMatch: 60,
    timeFlexibility: 45,
    lifestyleCompat: 55,
    growthCurve: 50,
  },

  trend: 'stable',
  trendDetail: '法国公立大学低学费政策预计持续，但生活成本因通胀上升（尤其是巴黎）。法国 IT 人才缺口持续存在，政府鼓励科技人才留法（French Tech Visa 简化流程）。但法语门槛是稳定不变的筛选器，导致中国学生申请量始终低于英美澳。',

  exclusivity: ['放弃英美顶尖名校的品牌溢价（若可申请）', '放弃中国互联网行业的高速发展机会', '放弃国内的亲友社交网络和生活习惯', '放弃国内考公/考编的应届生身份', '需要花 1-1.5 年专门攻克法语'],

  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构', '开始学法语（目标：大一结束达到 A1-A2）', '了解法国大学体系（Campus France 官网）和 CS 硕士项目列表'] },
    { year: '大一下', tasks: ['保持高 GPA（目标 80+/100）', '法语推进到 A2（完成 Alter Ego A1 或 Edito A1）', '暑假：参加法语 A2-B1 密集课程（Alliance Francaise 或线上）'] },
    { year: '大二上', tasks: ['法语推进到 B1（目标：能进行日常对话）', '同时准备英语雅思（目标 6.0-6.5）', '开始收集目标学校的课程描述和申请要求'] },
    { year: '大二下', tasks: ['参加雅思考试（目标 6.5+）', '法语尝试 TCF/TEF 考试摸底', '做一个有深度的 CS 项目（GitHub 可展示）', '暑假：法语推进到 B2 水平，参加 TCF B2 考试'] },
    { year: '大三上', tasks: ['法语冲刺 B2+（如已通过 B2 则开始接触法语技术文档和视频）', '确定 5-8 所目标学校（公立大学 + 工程师学院混合）', '开始撰写法语/英语动机信（Lettre de Motivation）'] },
    { year: '大三下', tasks: ['完成所有申请文书（CV + Motivation Letter + 推荐信）', '通过 Campus France 的 Etudes en France 系统提交申请', '持续保持 GPA，部分学校看重最后一年成绩', '暑假：如法语已达 C1，可尝试申请工程师学院'] },
    { year: '大四上', tasks: ['按各校截止日期提交申请（大部分为 1-5 月陆续截止）', '准备法国学生签证资金证明（约 7380 欧/年）', '研究法国城市和住宿选项（CROUS 学生公寓优先）', '同步准备 Plan B（国内就业/其他留学目的地）'] },
    { year: '大四下', tasks: ['等待录取结果（通常在 4-7 月出结果）', '办理 Campus France 预签证程序和签证', '寻找法国住宿和机票', '出发前继续学法语（目标：出发时法语能流利交流）', '如未录取：评估是否延期一年再申或转向 Plan B'] },
  ],

  tags: ['计算机', '留学', '法国', '硕士', '法语', '欧洲就业'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.campusfrance.org/', 'https://www.campusfrance.org/fr/ressource/etudiants-etrangers-en-france', 'https://www.service-public.fr/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-germany-masters', 'cs-domestic-postgrad', 'cs-exchange-program'],
};

export default path;
