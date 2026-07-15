import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-domestic-postgrad',
  title: '国内考研 — 双非一本 → 211/985 计算机硕士 → 上海大厂/外企',
  category: 'domestic-postgrad',
  summary: '通过考研进入更高层次院校读 CS 硕士，以研究生学历突破第一学历限制，进入大厂或头部外企。',
  description: `## 路径概述

通过考研进入 211/985 院校读计算机硕士，用研究生学历「洗白」第一学历的劣势。
这条路的核心赌注是：一年高强度备考 → 三年研究生 → 大厂校招起薪 25-40k/月。

## 真实画像

- **考研成功率**：双非考 211 约 15-25%，考 985 约 5-10%
- **读研成本**：3 年时间 + 学费约 2.4-4.5 万（学硕便宜，专硕贵）
- **研究生起薪**：上海大厂 SSP offer 可达 35-50k/月，外企 20-30k/月
- **读研体验**：导师决定生活质量——遇到 push 的导师可能比上班还累

## 优势

- 研究生学历在大厂校招中是显著加分项，可突破双非本科的简历筛选
- 大厂算法/AI 岗位基本只招硕士及以上
- 三年缓冲期，可以系统学习、做科研、积累实习
- 校友资源和人脉圈层升级

## 风险

- 考研是高风险赌博：一次考不上浪费一年，二战心理压力巨大
- 部分导师压榨严重，三年可能变成「廉价劳动力」
- 部分 985 专硕不提供宿舍，上海租房成本高
- 计算机考研极度内卷，分数线逐年上涨
- 读研三年后就业市场可能已经变化`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '学费 2.4-4.5 万/3年，生活费另算。国家助学贷款可覆盖学费，研究生补贴可部分覆盖生活费。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '考研英语一/二即可，不需要额外语言考试。外企就业需要 CET-6。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'at-risk', detail: '双非一本考 211/985 计算机竞争激烈。但考上后大厂校招不再卡第一学历。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'at-risk', detail: '国内硕士毕业率约 95%，但个别导师可能卡毕业。核心风险在能否考上而非能否毕业。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '上海高校资源丰富，毕业后本地就业岗位充足。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '备考 1 年 + 读研 3 年 = 比直接就业晚 3-4 年进入职场。若一战失败则再 +1 年。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'at-risk', detail: '研究生期间生活费紧张，需要家庭支持或兼职。部分 985 专硕不提供宿舍。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '211/985 计算机硕士在上海认可度高，大厂和头部外企均认可。可弥补双非本科的学历劣势。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '国内路径，无地缘政治风险。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 80,
    timeFlexibility: 40,
    lifestyleCompat: 45,
    growthCurve: 85,
  },
  trend: 'rising',
  trendDetail: '计算机考研热度持续上升，但大厂对硕士学历的偏好也在增强。考研内卷意味着投入产出比在下降，但研究生学历的长期溢价仍然显著。',
  exclusivity: ['放弃 3-4 年工作经验和收入', '放弃本科应届进大厂的机会窗口', '承担考研失败的心理和时间成本', '放弃本科毕业即经济独立的可能性'],
  actionPlan: [
    { year: '大一上', tasks: ['学好高数、线代、概率论', '学好 C 语言和数据结构', '了解目标院校的考研科目和分数线'] },
    { year: '大一下', tasks: ['保持高 GPA（保研资格是 Plan A，考研是 Plan B）', '系统学习考研数学基础', '暑假：开始背考研英语单词'] },
    { year: '大二上', tasks: ['争取参与科研项目或大创项目', '明确目标院校', '学习计算机专业课：操作系统、计算机网络、组成原理'] },
    { year: '大二下', tasks: ['通过 CET-6', '参加一个学科竞赛', '暑假：开始系统刷考研数学全书'] },
    { year: '大三上', tasks: ['正式开始考研复习', '确定目标院校并联系学长学姐获取真题', '关注夏令营信息（985 夏令营对双非有限制但可尝试）'] },
    { year: '大三下', tasks: ['全力冲刺考研复习', '政治开始复习', '报名考研', '同步投递秋招作为 Plan B'] },
    { year: '大四上', tasks: ['12 月底考研初试', '考后立即准备复试', '如感觉初试不理想，全力投入春招'] },
    { year: '大四下', tasks: ['2-3 月复试', '如录取，联系导师、确定研究方向', '如未录取，春招 + 评估是否二战', '录取后：提前进实验室熟悉项目'] },
  ],
  tags: ['计算机', '考研', '硕士', '上海', '大厂', '外企'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://yz.chsi.com.cn/', 'https://www.mohrss.gov.cn/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-germany-masters', 'cs-freelance'],
};

export default path;
