import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-tech-writer',
  title: '技术写作/开发者关系 — 技术文档工程师/DevRel/技术内容创作',
  category: 'domestic-employment',
  summary: '从事技术文档编写、开发者关系（DevRel）或技术内容创作，开发者生态建设受重视且远程友好。',
  description: `## 路径概述

技术写作和开发者关系（DevRel）是 CS 专业的一条非传统就业路径。技术文档工程师（Technical Writer）
负责编写 API 文档、用户手册和开发者指南；DevRel 则聚焦于开发者社区运营和技术内容传播。
随着开源文化和开发者体验（DX）理念的普及，企业对技术写作和 DevRel 的投入持续增加。

## 真实画像

- **起薪中位数**：上海 Technical Writer 应届 10-15k/月，DevRel 12-18k/月
- **3年后薪资**：18-30k/月（取决于语言能力和专业领域）
- **工作时间**：远程友好度高，外企和开源公司普遍支持 remote
- **从业者满意度**：偏高（工作生活平衡好，创作成就感强，但晋升路径模糊）

## 优势

- 远程办公友好，时间弹性在 CS 各方向中最佳
- 外企 Technical Writer 岗位稳定，裁员风险低
- 技术写作 + 英语能力 = 全球化就业可能（技术文档没有国界）
- 工作节奏规律，个人时间充裕可发展副业
- 开源社区的 Technical Writer 和 DevRel 需求增长快

## 风险

- 职业天花板低，晋升路径不如纯技术岗清晰
- 薪资增长曲线平缓，长期天花板低于同级别开发岗
- 国内企业对技术文档的重视程度参差不齐（外企 > 大厂 > 中小公司）
- 容易被误解为"非核心岗位"，在公司内部话语权弱
- AI 辅助写作工具（如 Copilot for Docs）可能部分替代基础文档工作

## 适合谁

- 写作能力强，能用简洁的语言解释复杂的技术概念
- 追求工作生活平衡，不希望每天加班
- 英语读写能力好（外企 Technical Writer 岗位通常要求 TOEFL 100+ 或同等水平）
- 对开源和技术社区有热情，喜欢写作和分享`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '零额外学费投入。建议搭建个人技术博客（GitHub Pages 免费）和 GitHub 开源项目文档作为作品集。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '外企 Technical Writer 岗位英语读写能力要求极高（需产出专业级英文文档），中文岗位要求相对宽松。建议 CET-6 以上，雅思 7.0/托福 100+ 更有竞争力。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '技术写作/DevRel 以作品集和写作能力为核心考核标准，学历影响极小。双非一本完全够用，关键是能展示高质量的技术文档和内容作品。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，不涉及额外学业。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '上海外企研发中心集中（SAP/Microsoft/Google/Unity），Technical Writer 岗位数量全国第一。远程文化让地域限制更小。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '4年本科正常毕业即就业。关键是在大学期间积累技术写作作品集（技术博客、开源文档贡献、翻译作品）。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '起薪 10-15k 在上海中规中矩，但工作节奏规律、时间弹性好，可通过副业（技术写作/翻译/内容创作）增加收入。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '技术写作和 DevRel 领域学历权重极低，作品和写作能力是唯一硬通货。双非学历无任何负面影响。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '国内就业无地缘政治风险。如果走远程为海外公司工作路线，需关注税务和法律合规问题。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 70,
    timeFlexibility: 90,
    lifestyleCompat: 85,
    growthCurve: 45,
  },
  trend: 'rising',
  trendDetail: '开发者体验（DX）和开源文化推动技术写作/DevRel 需求增长。大厂（阿里/腾讯/字节）开始设立专门的开发者关系团队。远程办公普及扩大了 Technical Writer 的就业市场（不仅限于本地企业）。AI 辅助工具提升文档产出效率但暂未威胁核心岗位。建议同时培养技术写作 + 视频内容创作 + 社区运营的复合能力。',
  exclusivity: ['放弃纯技术岗位的薪资增长速度和职业天花板', '晋升路径模糊（不像开发有明确的 P 级体系）', '技术深度积累可能不如一线开发岗'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和计算机基础（理解技术才能写好技术文档）', '开始写技术学习笔记（CSDN/掘金/知乎），培养写作习惯', '学习 Markdown 和 Git 基础，搭建个人 GitHub Pages 博客'] },
    { year: '大一下', tasks: ['深入学习一门技术（后端/前端/数据科学均可，重点是能讲清楚）', '持续更新技术博客，每周至少一篇', '学习技术文档写作方法论（Google Developer Documentation Style Guide）'] },
    { year: '大二上', tasks: ['参与开源项目文档翻译或编写（从 Good First Issue 开始）', '翻译 1-2 篇高质量英文技术文章（展示双语能力）', '学习 API 文档工具（Swagger/OpenAPI/Postman 文档功能）'] },
    { year: '大二下', tasks: ['为 1-2 个开源项目贡献文档（README/Getting Started/API Reference）', '建立技术写作作品集（博客 + 开源贡献 + 翻译作品）', '暑假目标：找到第一份技术写作实习（外企文档团队或开源公司）'] },
    { year: '大三上', tasks: ['学习开发者关系（DevRel）基础：社区运营、技术演讲、内容策略', '深入研究一个技术领域并成为该领域的优质内容创作者', '参加技术社区活动，尝试做一次技术分享（Meetup/校内的 Lightning Talk）'] },
    { year: '大三下', tasks: ['完善作品集（高质量技术文章 + 开源文档贡献 + 演讲记录）', '如英语能力强，尝试申请海外公司的远程 Technical Writer 实习', '暑期实习：投递 Technical Writer/DevRel/技术内容运营岗位'] },
    { year: '大四上', tasks: ['秋招投递 Technical Writer/DevRel/技术内容相关岗位', '如有暑期实习 offer，全力争取转正', '同时关注海外远程 Technical Writer 机会（Upwork/RemoteOK 等平台）'] },
    { year: '大四下', tasks: ['如秋招未拿到满意 offer，继续春招', '完成毕业设计（建议选题与技术传播/文档系统相关）', '入职前了解公司技术文档工具链（如 Docusaurus/MkDocs/Confluence）'] },
  ],
  tags: ['计算机', '技术写作', 'DevRel', '技术文档', '远程', '上海', '本科'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://developers.google.com/tech-writing', 'https://www.writethedocs.org/', 'https://www.onetonline.org/link/summary/27-3042.00'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-freelance', 'cs-germany-masters'],
};

export default path;
