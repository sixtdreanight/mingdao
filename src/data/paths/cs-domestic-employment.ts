import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-domestic-employment',
  title: '直接就业 — 上海外企/中型科技公司软件开发',
  category: 'domestic-employment',
  summary: '本科毕业后直接进入上海外企或中型互联网公司做软件开发，学历要求相对宽松，时间弹性好。',
  description: `## 路径概述

这条路径适合对学历要求不高、希望尽快经济独立的学生。上海的外企和
中型科技公司对第一学历的筛选不如大厂严格，更看重实际技术能力和项目经验。

## 真实画像

- **起薪中位数**：上海 CS 本科 12-15k/月（2024 年数据，含年终均摊）
- **3年后薪资**：20-30k/月
- **工作时间**：外企普遍 10-7-5，中型公司看项目
- **从业者满意度**：中等偏上（外企员工满意度普遍高于互联网大厂）

## 优势

- 零额外时间成本，毕业即就业
- 上海此类岗位充足，跳槽选择多
- 外企工作节奏规律，有时间发展副业或兴趣爱好
- 实战经验积累快，技术成长靠项目驱动

## 风险

- 第一学历可能在晋升到管理岗时成为天花板
- AI 辅助开发工具可能压低初级开发需求
- 外企近年在中国有收缩趋势
- 长期薪资天花板低于大厂或读研后进大厂

## 适合谁

- 家庭经济压力大，需要尽快工作
- 对学历提升没有执念，相信能力比学历重要
- 希望工作和生活有明确边界
- 愿意通过跳槽和自学来弥补学历短板`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '零额外投入，毕业即可获得收入。起薪 12-15k 在上海可覆盖基本生活。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '外企需要基本英语读写能力，日常沟通以中文为主。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '外企和中型公司对双非学历的接受度较高，更看重技术面试表现。大厂则较难进入。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，不涉及额外学业', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '上海软件开发岗位全国第二，外企研发中心集中。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '4年本科正常毕业即就业，无额外时间投入。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '起薪 12-15k，在上海租房+生活基本够用，但存钱速度慢。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'at-risk', detail: '双非本科在上海 CS 行业入行没问题，但中长期晋升可能受阻。5-8年后部分外企会有学历天花板。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '国内就业，无地缘政治风险。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 85,
    timeFlexibility: 80,
    lifestyleCompat: 75,
    growthCurve: 60,
  },
  trend: 'stable',
  trendDetail: '上海软件开发需求稳定但增长放缓。外企招聘从扩张转向优化，AI 辅助开发可能影响初级岗位需求。建议学习 AI 工具链和架构设计以保持竞争力。',
  exclusivity: ['放弃大厂应届高薪起点的机会', '放弃研究生学历带来的长期晋升优势', '放弃通过保研/考研换学校层次的机会'],
  actionPlan: [
    { year: '大一上', tasks: ['确定计算机子方向（后端/前端/移动端/嵌入式）', '学好 C 语言和数据结构', '加入一个技术社团或开源项目'] },
    { year: '大一下', tasks: ['学习一门主流语言并做一个小项目', '参加 LeetCode 刷题，从 Easy 开始', '暑假：学习 Git + Linux 基础'] },
    { year: '大二上', tasks: ['深入学习一门框架', '做一个完整的个人项目并部署上线', '开始系统刷 LeetCode Medium'] },
    { year: '大二下', tasks: ['学习系统设计基础（数据库、缓存、消息队列）', '准备一份英文简历', '暑假目标：找到第一份实习'] },
    { year: '大三上', tasks: ['继续刷 LeetCode Hard + 系统设计题', '参加 1-2 次技术竞赛或 Hackathon', '更新个人项目，写技术博客'] },
    { year: '大三下', tasks: ['投递暑期实习（外企的暑期实习转正率高）', '准备外企面试', '寒假后开始刷牛客网面经'] },
    { year: '大四上', tasks: ['秋招投递 20+ 家目标公司', '如有暑期实习 offer，全力争取转正', '同步准备 Plan B'] },
    { year: '大四下', tasks: ['如秋招未拿到满意 offer，继续春招', '毕业设计', '入职前 3 个月：学习公司技术栈，熟悉业务'] },
  ],
  tags: ['计算机', '就业', '上海', '外企', '软件开发', '本科'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.onetonline.org/link/summary/15-1252.00', 'https://www.mohrss.gov.cn/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-postgrad', 'cs-germany-masters', 'cs-freelance'],
};

export default path;
