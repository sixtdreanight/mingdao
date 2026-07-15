import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-second-degree',
  title: '辅修/第二学士学位 — 打造复合型人才背景',
  category: 'domestic-postgrad',
  summary: '辅修金融、设计或法律等专业，或毕业后攻读第二学士学位，以 CS + X 的复合背景在 FinTech、LegalTech 等交叉领域建立独特竞争力。',
  description: `## 路径概述

在 CS 主修之外辅修第二专业（金融/设计/法律/管理等），或本科毕业后攻读第二学士学位（通常 2 年）。
这条路的核心逻辑是「T 型人才」——CS 技术深度 + 垂直领域知识 = 稀缺的交叉学科竞争力。
典型的 CS+X 组合在 FinTech（金融科技）、LegalTech（法律科技）、HealthTech（医疗科技）等领域有显著优势。

## 真实画像

- **辅修**：大二开始上课，利用周末或晚上修读，通常 2 年完成。不另发学位证，只有辅修证书
- **第二学士学位**：本科毕业后全日制攻读（通常 2 年），发第二个学士学位证（教育部认可）
- **热门组合**：CS + 金融（FinTech 方向）、CS + 设计（UX/产品方向）、CS + 法律（合规/数据隐私方向）、CS + 生物（生物信息学方向）
- **典型投入**：辅修额外学费约 5000-15000 元/年；第二学士学位学费约 5000-10000 元/年
- **市场反馈**：FinTech 公司对 CS+金融背景的候选人兴趣浓厚；LegalTech 领域极度稀缺懂技术的法律人

## 优势

- 在交叉领域建立独特优势，避开纯 CS 赛道的激烈竞争
- FinTech/LegalTech 等领域薪资溢价明显（比纯技术岗高 20-50%）
- 第二学士学位可弥补双非第一学历的劣势（尤其是 985 院校的第二学士学位）
- 知识结构更完整，长期职业发展上限更高

## 风险

- 辅修证书含金量有限（不是学位），部分 HR 不认可
- 同时修两个专业学业压力极大，可能两边都不够深入
- 第二学士学位额外投入 2 年时间和学费，且社会认可度不如硕士学位
- 不是所有 CS+X 组合都有市场溢价（需调研目标行业真实需求）
- 复合背景在求职早期可能「两头不讨好」——技术不够深、业务不够专`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'at-risk', detail: '辅修额外学费约 0.5-1.5 万/年 × 2 年；第二学士学位学费 0.5-1 万/年 × 2 年 + 生活费。总体投入可控但需额外支出。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '无额外语言要求。如果辅修方向涉及国际业务（如国际金融/跨境合规），英语加分但非必须。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'at-risk', detail: '本校辅修通常无学历门槛（交钱上课即可）。第二学士学位需通过招生考试（竞争低于考研但仍有淘汰）。985 院校的第二学士学位对双非学生是低成本学历升级机会。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'at-risk', detail: '同时修两个专业学业压力大。部分学生因精力分散导致主修专业 GPA 下降或辅修半途而废。第二学士学位毕业率较高（约 90%），但需合理安排时间。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '上海 FinTech（陆家嘴金融科技集群）、LegalTech（上海数据交易所等）等交叉领域岗位充足。是 CS+X 复合人才的最佳城市之一。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '辅修与主修同步进行，不额外延时（但挤占课余时间）。第二学士学位额外 2 年，总计 6 年本科+第二学位。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '辅修期间生活方式不变。第二学士学位期间同正常本科生活。就业后在 FinTech 等领域的起薪通常高于纯 CS 岗位。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'at-risk', detail: '辅修证书含金量有限，简历加分有限。第二学士学位在某些行业（金融/法律）有认可度，但普遍不如硕士学位。关键价值在于知识结构而非学位本身。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '国内路径，无地缘政治风险。部分 FinTech 领域（加密货币/跨境支付）受监管政策影响大。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 75,
    timeFlexibility: 45,
    lifestyleCompat: 50,
    growthCurve: 75,
  },
  trend: 'stable',
  trendDetail: 'CS+X 复合背景在 FinTech、LegalTech、HealthTech 等交叉领域的需求持续增长。教育部近年恢复并扩大了第二学士学位招生（2020 年起），为双非学生提供了低成本学历提升通道。但辅修/第二学位的市场认可度参差不齐，关键要看能否真正掌握跨领域知识和技能，而非仅仅多一张证书。建议选择与 CS 有明确交叉点的辅修方向，避免「为复合而复合」。',
  exclusivity: ['放弃将所有精力投入单一技术方向的机会', '放弃本科期间较多的自由时间', '承担辅修/第二学位认可度不如预期的风险', '放弃毕业后直接工作的 2 年收入（如选择第二学士学位）'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和计算机基础', '探索可能的辅修方向（金融/设计/法律/管理等）', '了解本校辅修政策和第二学士学位招生信息'] },
    { year: '大一下', tasks: ['确定辅修方向：选择一个与 CS 有明确交叉点的领域', '如选择金融：学习金融市场基础、会计学原理', '如选择设计：学习 UI/UX 基础、设计工具', '暑假：阅读目标交叉领域的前沿资讯和书籍'] },
    { year: '大二上', tasks: ['正式申请辅修并开始上课', '主修 CS：学习数据结构+算法+操作系统', '辅修：打基础阶段，不求深但求建立框架', '与辅修专业老师建立联系，了解交叉研究方向'] },
    { year: '大二下', tasks: ['主修：学习数据库+计算机网络+软件工程', '辅修：深化学习，尝试交叉项目', '做一个 CS+X 的结合项目（如金融数据可视化/法律文书分析工具）', '暑假：找一份交叉领域的实习（如 FinTech 公司/互联网法务部门）'] },
    { year: '大三上', tasks: ['主修：系统设计+AI+安全', '辅修：进入核心课程阶段', '完善 CS+X 作品集（2-3 个交叉项目）', '评估：辅修方向真的有市场价值吗？继续深造还是就业？'] },
    { year: '大三下', tasks: ['如就业方向：投递交叉领域暑期实习', '如深造方向：了解相关硕士项目（金融工程/计算法学/生物信息学等）', '辅修结业/继续第二学士学位准备', '利用复合背景在求职中建立差异化'] },
    { year: '大四上', tasks: ['秋招：重点投递 FinTech/LegalTech/HealthTech 等交叉领域公司', '如选择第二学士学位：准备招生考试', '如直接就业：用 CS+X 作品集展示复合能力', '对比 pure CS 岗位和交叉岗位的 offer 差异'] },
    { year: '大四下', tasks: ['完成毕业设计（建议选交叉方向课题）', '如第二学士学位录取：准备入学', '如就业：入职交叉领域岗位', '总结：复合背景对你求职的实际帮助有多大？值得投入吗？'] },
  ],
  tags: ['计算机', '辅修', '第二学士学位', '复合型人才', 'FinTech', 'LegalTech', '交叉学科'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.moe.gov.cn/', 'https://www.chsi.com.cn/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-postgrad', 'cs-domestic-employment', 'cs-mba-path'],
};

export default path;
