import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-mba-path',
  title: '技术→MBA→管理 — 先做技术再读 MBA 转型管理/产品',
  category: 'domestic-postgrad',
  summary: '本科毕业后先从事软件开发 3-5 年，再通过全日制或在职 MBA 转型技术管理、产品经理或创业，成为复合型人才。',
  description: `## 路径概述

一条「先技术后管理」的职业发展路线：本科 CS 毕业后先做 3-5 年软件开发积累技术底蕴，
然后报考 MBA，转型为技术经理、产品总监、CTO 或创业。
这条路径的核心逻辑是「技术深度 + 商业视野 = 稀缺的复合竞争力」。

## 真实画像

- **第一阶段（3-5年开发）**：薪资 12-25k/月，积累技术实力和行业认知
- **MBA 阶段**：全日制 2 年+ 2 年收入中断；在职 MBA 3 年可边工作边读
- **MBA 后薪资**：技术管理岗 30-50k/月，产品总监 40-60k/月
- **典型院校**：交大安泰、复旦管院、中欧国际；MBA 联考 + 提前面试
- **从业者画像**：通常 28-33 岁读 MBA，已有明确的职业转型目标

## 优势

- 技术+管理复合背景在科技公司极具竞争力
- MBA 校友网络价值大，对创业和高端求职有直接帮助
- 从执行层跃升到管理层，薪资天花板大幅提高
- 适合对纯技术路线感到瓶颈、希望转向商业和产品的工程师

## 风险

- MBA 学费高昂，经济压力大
- 全日制 MBA 中断收入 2 年，总机会成本可达 80-120 万
- MBA 毕业后面临「高不成低不就」风险——技术岗嫌你脱离一线太久，管理岗嫌你管理经验不足
- 在职 MBA 强度极大，对体能和自律要求高
- 总时间线 7-8 年，周期长，中间任何一个环节出问题都可能打乱计划`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'at-risk', detail: 'MBA 学费 20-50 万，全日制还需 2 年无收入。总机会成本约 80-120 万。需要家庭支持或贷款，经济压力极大。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '国内 MBA 不需要额外语言成绩。部分中外合作项目需要英语面试。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'at-risk', detail: 'Top MBA对第一学历有隐形要求，但双非可通过优秀的 GMAT 成绩和工作履历弥补。一般院校 MBA 门槛较低。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'MBA 毕业率很高，属于「严进宽出」。核心难点在录取而非毕业。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '上海是中国 MBA 教育最发达的城市之一（交大安泰/复旦管院/中欧/上财），技术管理岗位需求充沛。毕业后本地就业机会多。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '工作时间 3-5 年 + MBA 2-3 年 = 总时间线 5-8 年。到管理岗稳定就业时已接近 30 岁，时间投入大。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'at-risk', detail: '全日制 MBA 期间无收入且需支付高额学费，生活水平大幅下降。在职 MBA 虽有收入但极度疲惫。MBA 毕业后的薪资跃升能否覆盖前期投入是关键。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: 'Top MBA 在上海科技行业认可度高，但需配合扎实的技术背景才真正有价值。普通院校 MBA 含金量有限，可能得不偿失。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '国内路径，无地缘政治风险。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 70,
    timeFlexibility: 35,
    lifestyleCompat: 40,
    growthCurve: 85,
  },
  trend: 'stable',
  trendDetail: '技术管理复合型人才在 AI 时代仍有需求——AI 可以写代码但很难替代技术决策和团队管理。但 MBA 的投入产出比在下降（学费上涨 + 就业市场竞争加剧）。全日制 MBA 的风险更高，在职 MBA 是更稳健的选择。建议评估是否可以通过内部晋升实现管理转型，不一定需要 MBA 这个中间环节。',
  exclusivity: ['放弃纯技术路线成为资深架构师的可能', '承担 MBA 期间巨大的经济和机会成本', '放弃「一直做技术」的单纯职业路径', 'MBA 毕业后不一定能顺利转型管理'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和计算机基础', '了解 MBA 是什么、有哪些方向', '培养对商业的兴趣'] },
    { year: '大一下', tasks: ['学好一门主流编程语言并完成项目', '开始培养沟通和领导力（参加社团/学生会/组织活动）', '暑假：尝试做一个小型创业项目或参与 Hackathon'] },
    { year: '大二上', tasks: ['深入学习计算机专业课', '选修或旁听经管类课程（管理学/市场营销/会计基础）', '开始关注 TechCrunch/36氪 等科技商业媒体'] },
    { year: '大二下', tasks: ['做第一个全栈项目并部署上线', '参加商业计划书比赛或创业比赛', '暑假：找到第一份实习（技术岗，了解企业运作）'] },
    { year: '大三上', tasks: ['系统刷题准备实习面试', '学习系统设计和架构基础', '尝试承担团队中的协调/管理角色'] },
    { year: '大三下', tasks: ['投递大厂或中型公司暑期实习', '实习期间观察管理层的工作方式和决策逻辑', '记录工作中遇到的管理和商业问题'] },
    { year: '大四上', tasks: ['秋招锁定一份技术开发工作', '入职前了解公司内部的晋升通道', '开始为 3-5 年后的 MBA 申请做知识储备'] },
    { year: '大四下', tasks: ['完成毕业设计', '入职前准备：了解公司技术栈和业务', '制定 5 年职业规划：工作年份 → MBA 院校目标 → 管理岗转型路径', '开始储蓄 MBA 学费'] },
  ],
  tags: ['计算机', 'MBA', '技术管理', '产品经理', '职业转型', '上海', '复合型人才'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.mba.org.cn/', 'https://mba.phbs.pku.edu.cn/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-domestic-postgrad', 'cs-second-degree'],
};

export default path;
