import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-selected-transfer',
  title: '校内选拔/转专业/实验班 — 通过校内竞争进入优质培养通道',
  category: 'domestic-postgrad',
  summary: '通过校内转专业、卓越工程师班、拔尖班等选拔机制，在本科阶段进入更优质的专业或培养项目，提升毕业竞争力。',
  description: `## 路径概述

部分高校设有校内选拔通道：大一末或大二初可申请转入计算机专业（若录取时非 CS），
或通过选拔进入卓越工程师班、拔尖创新班等实验班。这些班级通常有更好的师资、
更多科研机会和更高的保研率，是不需要跨校考研就能「升级」培养质量的路径。

## 真实画像

- **选拔成功率**：转专业取决于目标专业名额和申请人数（热门专业如 CS 竞争激烈，可能 5:1 以上）；实验班选拔通常更看重 GPA 和面试表现
- **实验班优势**：保研率通常 30-50%（普通班约 10-15%），有独立导师和实验室资源
- **时间投入**：转专业可能需要补修课程（增加学业压力）；实验班课程强度更大
- **典型体验**：竞争氛围浓厚，同学普遍目标明确（保研/出国/大厂），peer pressure 较大

## 优势

- 在本校范围内实现专业/项目层级的「升级」，无需跨校考研
- 实验班的高保研率是进入名校读研的捷径
- 接触更好的师资和科研资源，竞赛/论文机会更多
- 同学圈子质量高，后续发展互相带动

## 风险

- 名额极少，竞争激烈，不一定能选上
- 转专业后需要补修大量课程，可能导致延期毕业或学业压力过大
- 实验班课程强度大、考核严格，不适合所有人
- 各校政策差异大，部分学校转专业门槛极高或根本不允许`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '零额外经济投入，正常缴纳学费即可。实验班通常不另外收费。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '无额外语言要求，正常 CET-4/6 即可。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'fail', detail: '转专业和实验班名额极少（通常每届 10-30 人），本校范围内竞争激烈。GPA 通常是硬门槛（前 20% 才有资格申请）。选拔失败后可能只能留在原专业。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'at-risk', detail: '实验班课程强度大，淘汰率约 10-20%。转专业学生需要补修课程，学业压力大，个别学生可能因挂科延毕。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '校内路径，与地域无关。但上海高校的校内选拔机会可能因名校集中而竞争更激烈。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '正常 4 年本科毕业，无额外时间成本。但补修课程可能挤占实习和求职准备时间。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '与正常本科生活无异，无额外经济负担。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'at-risk', detail: '实验班经历在简历上有一定加分，但仍受限于双非本科学历上限。进入实验班不代表学历层次提升（不同于考研换学校）。保研到名校才是真正的跃升。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '国内路径，无地缘政治风险。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 75,
    timeFlexibility: 65,
    lifestyleCompat: 55,
    growthCurve: 70,
  },
  trend: 'stable',
  trendDetail: '各高校的实验班/拔尖计划政策相对稳定，但名额有限且竞争逐年激烈。教育部持续推进「六卓越一拔尖」计划 2.0，实验班在双一流高校中较为普遍，但双非院校的实验班项目参差不齐。建议提前了解本校政策并评估实验班的实际含金量。',
  exclusivity: ['放弃按部就班的普通班节奏', '放弃大一相对轻松的课余生活（需要用高 GPA 争取资格）', '放弃转专业失败后的时间窗口（错过可能再无机会）'],
  actionPlan: [
    { year: '大一上', tasks: ['全力刷高 GPA（转专业/实验班选拔的硬门槛）', '了解本校转专业政策和实验班选拔条件', '学好高数和 C 语言（CS 专业核心基础）', '与辅导员和学长学姐确认选拔流程和时间节点'] },
    { year: '大一下', tasks: ['继续保持高 GPA（目标年级前 15%）', '参加 1-2 个校级比赛或项目（选拔面试加分项）', '如目标是转专业：确保当前专业课程不挂科', '准备选拔申请材料和面试'] },
    { year: '大二上', tasks: ['如成功转入 CS 或进入实验班：集中补修缺失课程', '适应实验班的高强度学习节奏', '主动联系实验班导师，了解科研方向', '如选拔失败：调整心态，专注原专业或考虑考研'] },
    { year: '大二下', tasks: ['跟随导师参与科研项目或实验室工作', '争取参与学科竞赛（ACM/蓝桥杯/数学建模）', '利用实验班资源寻找实习机会', '暑假目标：实验室科研或企业实习'] },
    { year: '大三上', tasks: ['深化科研方向，争取发表论文或竞赛获奖', '评估保研可能性（实验班保研率更高）', '如保研无望，开始准备考研或秋招', '保持与导师的良好关系（推荐信关键）'] },
    { year: '大三下', tasks: ['如果是保研方向：参加目标院校夏令营', '如果是就业方向：投递暑期实习', '如果保研/考研都不乐观：全力准备秋招', '利用实验班的校友网络获取内推机会'] },
    { year: '大四上', tasks: ['保研：确认录取并联系研究生导师', '考研：全力冲刺初试', '就业：秋招投递目标公司', '如多项并行，合理分配精力'] },
    { year: '大四下', tasks: ['完成毕业设计', '保研/考研成功：提前了解研究生阶段规划', '就业：春招补录或入职前准备', '总结本科经历，为下一阶段做准备'] },
  ],
  tags: ['计算机', '转专业', '实验班', '卓越工程师', '拔尖计划', '保研', '本科'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.moe.gov.cn/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-postgrad', 'cs-domestic-employment', 'cs-second-degree'],
};

export default path;
