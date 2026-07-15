import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-startup-join',
  title: '加入早期创业公司 — A轮/B轮科技初创早期工程师',
  category: 'domestic-employment',
  summary: '加入 A 轮或 B 轮科技创业公司做早期工程师，以高风险换高成长和潜在股权回报。',
  description: `## 路径概述

不去大厂，去能给你更大舞台的地方。加入一家 A 轮/B 轮科技创业公司，作为早期核心工程师，
直接参与产品从 0 到 1 的构建。这条路放弃了大厂的稳定高薪，换来的是更陡峭的成长曲线、
更大的决策权，以及潜在的股权增值收益。

## 真实画像

- **起薪**：A 轮创业公司 10-18k/月（上海），B 轮 15-25k/月
- **股权**：早期工程师通常获得 0.1%-0.5% 期权（4 年归属，1 年 cliff）
- **工作时长**：创业公司通常 10-9-5 起步，节奏由产品迭代驱动
- **团队规模**：早期通常 10-30 人，你的角色可能横跨前端/后端/运维
- **退出场景**：公司被收购或上市（概率约 5-10%），期权变现可能带来 50-500 万+ 回报
- **职场满意度**：两极化——喜欢的人觉得比大厂有意义，不适应的人觉得压力太大

## 优势

- 成长曲线陡峭：早期工程师通常 1 年内接触的技术广度相当于大厂 3 年
- 决策权大：直接影响产品架构和技术选型
- 扁平组织：没有大厂的层级和内卷
- 股权回报：如果公司成功退出，收益远超工资
- 简历价值：创业经历在后续跳槽中受部分公司青睐（尤其是其他创业公司）
- 对学历要求最低：创始人更看重能力和热情

## 风险

- 薪资波动大：创业公司融资困难时可能降薪或延迟发薪
- 公司倒闭率极高：A 轮公司 3 年存活率约 30-40%
- 期权可能一文不值：大部分创业公司的期权永远无法变现
- 技术债积累：创业公司为追求速度常牺牲代码质量
- 「伪创业公司」陷阱：部分打着创业旗号的公司实际是无偿加班的血汗工厂
- 工作与生活边界模糊：创始人随时可能晚上 11 点发消息`,

  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '零额外投入，有薪资收入。起薪 10-18k 在上海可覆盖基本生活，但初期不具备储蓄能力。股权激励是远期收益，短期不能依赖。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '国内创业公司以中文为主，无强制外语要求。但如有出海业务则需要英语能力。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '创业公司几乎不卡学历，创始人更关心你能否干活。GitHub 项目和技术面试表现是核心评估标准。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，不涉及额外学业。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '上海是国内创业生态最好的城市之一（仅次于北京），科技创业公司数量多，尤其是 AI/企业服务/金融科技方向。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '4 年本科正常毕业即就业，无额外时间成本。但前 1-2 年薪资可能低于同龄去大厂的同学。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'at-risk', detail: '起薪不高且波动大。融资环境差时可能面临降薪、延迟发薪甚至裁员。需要 3-6 个月生活费储备作为安全垫。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '创业路径下学历重要性最低。但如果创业失败后需要回归传统就业市场，双非本科学历可能再次成为障碍（部分大厂 HR 会卡学历）。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '国内就业，无地缘政治风险。但技术出口管制可能影响部分 AI/半导体方向的创业公司。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 80,
    timeFlexibility: 50,
    lifestyleCompat: 45,
    growthCurve: 85,
  },
  trend: 'rising',
  trendDetail: '国内硬科技和 AI 创业持续活跃，政策层面也在支持创新创业。早期工程师的需求量在增加，但融资环境周期性波动（2024 年偏冷）。选择时需关注创业公司的赛道（AI/出海/硬科技优于纯模式创新）和创始人背景（连续创业者更靠谱）。',
  exclusivity: ['放弃大厂应届高薪和稳定现金流', '放弃系统的技术培训和 mentor 指导', '放弃明确的晋升通道', '承担公司倒闭和期权归零的风险', '放弃 work-life balance（创业初期很难有明确边界）'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构', '培养对技术产品的兴趣：关注 36氪/极客公园/TechCrunch', '了解创业公司和大厂的区别'] },
    { year: '大一下', tasks: ['精通一门全栈技术（推荐 TypeScript 全栈：Next.js + Prisma）', '做第一个完整产品并上线（MVP 思维）', '暑假：参加一场 Hackathon'] },
    { year: '大二上', tasks: ['深入学习系统设计（分布式、云原生、DevOps）', '参与一个开源项目或自己维护一个开源项目', '学习产品思维：阅读创业方法论（《精益创业》等）'] },
    { year: '大二下', tasks: ['建立个人技术品牌：写技术博客、在 GitHub 活跃', '参加创投圈活动（创业周末、Demo Day 观众席）', '暑假目标：找到一家创业公司的实习（即使是远程/兼职）'] },
    { year: '大三上', tasks: ['在创业公司实习期间积累全栈经验和产品思维', '拓展技术栈（Go/Rust/AI 工程化等热门方向）', '建立创业圈子人脉（通过实习同事和活动认识的人）'] },
    { year: '大三下', tasks: ['寻找下一份更有质量的创业公司实习（B 轮以上）', '建立对融资环境的认知（关注 IT 桔子/企查查）', '准备自己的项目——一个独立开发的产品更好'] },
    { year: '大四上', tasks: ['通过人脉而非海投寻找创业公司机会', '评估 offer 时重点看：创始团队背景、赛道前景、融资健康度', '谨慎对待期权合同（找懂的人帮看）', '如有条件，尝试拿 2-3 个 offer 比较'] },
    { year: '大四下', tasks: ['毕业设计', '如已有 offer：入职前 1 个月学习公司技术栈', '如还在寻找：继续通过人脉网络和创业社群寻找机会', '保留 Plan B（传统就业方向）作为安全网'] },
  ],
  tags: ['计算机', '创业', '早期工程师', '上海', '科技创业', 'A轮', 'B轮', '股权'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.itjuzi.com/', 'https://36kr.com/', 'https://www.yeu.cc/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-freelance', 'cs-remote-overseas'],
};

export default path;
