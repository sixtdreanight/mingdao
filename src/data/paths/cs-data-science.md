import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-data-science',
  title: '转型数据科学/AI 工程师 — 从传统开发到机器学习工程',
  category: 'domestic-employment',
  summary: '从传统软件开发转型数据科学或机器学习工程方向，抓住 AI 时代最大的人才需求红利。',
  description: `## 路径概述

AI 正在重塑整个科技行业。这条路径让你从传统软件开发（CRUD/Web/Mobile）转向
数据科学或机器学习工程，成为 AI 时代的核心建设者而非被替代者。从数据分析/特征工程
起步，逐步深入到模型训练、MLOps 和 AI 产品化。

## 真实画像

- **细分方向**：
  - 数据分析师：SQL + 可视化 + 业务洞察，起薪 10-18k
  - 数据科学家：统计学 + ML 建模 + Python，起薪 15-25k
  - 机器学习工程师（MLE）：ML 系统 + 工程化 + 部署，起薪 20-35k
  - AI 应用工程师：LLM API + Prompt Engineering + RAG，起薪 15-30k（新兴方向）
- **学历门槛**：大厂 DS 岗位偏好硕士及以上；AI 应用工程师/数据分析师对学历要求较低
- **学习内容**：数学（线代/概率论/统计学）、Python/ML 框架、数据处理、模型部署
- **行业分布**：互联网大厂 AI Lab、金融科技、医疗 AI、自动驾驶、AI SaaS 创业公司

## 优势

- 巨大的行业红利：AI/ML 是当前最热的技术方向
- 薪资天花板高：高级 MLE 年薪可达 80-150 万+
- 技术壁垒高：ML 工程技能的不可替代性强于普通 CRUD 开发
- 跨行业适用性强：金融/医疗/零售/制造各行业都在 AI 化
- AI 应用工程师方向降低了入门门槛（不需要博士级数学）
- 未来 5-10 年 AI 人才需求持续增长

## 风险

- 大厂 DS 岗位学历门槛高（偏好 211/985 硕士+）
- 学习曲线陡峭：数学 + 编程 + 领域知识三重挑战
- 技术迭代极快：今天的 SOTA 明天可能被新模型取代
- 双非本科直接冲击大厂 DS 岗难度极高
- 需要大量数学基础（双非院校数学教学质量参差不齐）
- 如果只是用 API（如调 OpenAI），竞争力壁垒低
- AI 泡沫风险：如果行业遇冷，大批 DS 人才可能过剩`,

  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '零额外学费（自学为主）。如购买网课（Coursera/吴恩达等）和 Kaggle 竞赛成本约 2-5k RMB/年。不需要昂贵硬件——可用 Google Colab/Kaggle 免费 GPU。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '国内岗位以中文为主。但阅读英文论文、文档和参与 Kaggle 竞赛需要良好英文阅读能力（CET-6 足够）。顶尖 AI Lab 英文要求更高。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'at-risk', detail: '大厂 DS 岗位强烈偏好 211/985 硕士及以上。双非本科直接进大厂 DS 团队难度极高。但 AI 应用工程师/数据分析师/中小企业 ML 岗对学历要求较低。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，不涉及额外学业。但自学 ML 需要极强的自律和学习能力。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '上海是国内 AI/DS 岗位最集中的城市之一。互联网大厂 AI Lab（字节/腾讯/阿里）、外资 AI 团队、金融科技公司均在上海有大量 DS 岗位。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '从零学习到具备 DS/MLE 就业能力（非大厂）需要 1-2 年集中学习。冲击大厂 DS 岗可能需要读研（+3 年）。AI 应用工程师方向入门最快（约 6-12 个月）。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '数据分析师/AI 应用工程师起薪 10-18k（上海），和普通软件开发相当或略高。MLE 方向起薪更高（20-35k）。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'at-risk', detail: 'DS/MLE 领域学历溢价明显——名校硕士在简历筛选中有显著优势。双非本科需要通过 Kaggle 竞赛排名、开源贡献、技术博客来替代学历信号。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'at-risk', detail: 'AI 芯片出口管制可能影响国内 AI 公司的算力获取。中美 AI 技术竞争加剧，部分 AI 公司业务受到政策不确定性影响。但国内 AI 产业整体仍在高速发展。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 85,
    timeFlexibility: 60,
    lifestyleCompat: 65,
    growthCurve: 95,
  },
  trend: 'rising',
  trendDetail: 'AI/ML 人才需求持续旺盛，但人才供给也在快速增加。2024-2025 年大量 CS 毕业生涌入 AI 方向，初级岗位竞争加剧。建议走差异化路线：AI 工程化/MLOps/LLM 应用开发（而非纯算法研究），在有实际落地场景的垂直领域深耕（金融/医疗/工业）。AI 应用工程师/AI 产品方向对学历要求较低，适合双非背景学生。',
  exclusivity: ['放弃传统软件开发积累的深度和熟练度', '接受陡峭的学习曲线和持续的数学痛苦', '放弃「学完一通百通」的稳定感（AI 领域需要持续学习）', '双非背景进大厂 DS 的路径极窄（需读研）'],
  actionPlan: [
    { year: '大一上', tasks: ['学好高数、线代、概率论（DS/ML 的数学基石，必须非常扎实）', '学好 C 语言和数据结构', '了解 AI/DS 行业的不同角色（DA/DS/MLE/AI Engineer）'] },
    { year: '大一下', tasks: ['学习 Python（NumPy/Pandas/Matplotlib）', '完成吴恩达《Machine Learning》课程', '在 Kaggle 完成第一个入门竞赛（Titanic/House Prices）', '暑假：阅读《统计学习方法》（李航）'] },
    { year: '大二上', tasks: ['深入学习 ML 算法（决策树/SVM/集成学习/神经网络）', '学习 SQL 和数据处理（数据 Pipeline、特征工程）', '在 Kaggle 冲排名——目标拿到第一枚铜牌', '开始系统刷 LeetCode（Python，DS 岗位也考算法）'] },
    { year: '大二下', tasks: ['学习深度学习（PyTorch/TensorFlow）和 CV/NLP 基础', '做一个有完整流程的 ML 项目（数据采集→清洗→训练→部署）', '暑假目标：找一份数据分析或 ML 相关实习（即使是小公司）', '参加一个 Kaggle 比赛并争取银牌'] },
    { year: '大三上', tasks: ['确定细分方向（推荐：AI 应用工程师或 MLE，而非纯 DS 研究）', '学习 MLOps（模型部署/Docker/K8s/模型监控）或 LLM 应用开发（RAG/Agent/LangChain）', '继续 LeetCode Medium + SQL 高级题', '如确定走 MLE，学习系统设计（ML System Design）'] },
    { year: '大三下', tasks: ['冲击高质量实习：AI 公司/大厂 AI Lab 的暑期实习', '准备 DS/MLE 面试（统计学八股 + ML 八股 + 算法 + SQL + 项目展示）', '在 GitHub 上维护高质量的 ML 项目（有 README/文档/测试）', '发表一篇技术博客或做一次技术分享'] },
    { year: '大四上', tasks: ['秋招投递 DS/MLE/AI 工程师岗位（策略：大厂够一够 + 中厂保底 + AI 创业公司）', '如实评估：双非本科进大厂 DS 的概率很低，调整预期', 'AI 创业公司和中小企业往往对学历要求更低且成长更快', '同步准备 Plan B（传统软件开发就业作为保底）'] },
    { year: '大四下', tasks: ['选定 offer 或评估是否读研（如果目标大厂 DS 且秋招不理想）', '继续学习：AI 领域永远没有「学完」', '入职前集中学习公司业务领域的 AI 应用场景', '建立 AI 领域的人脉网络（参加技术会议/线上社区）'] },
  ],
  tags: ['计算机', '数据科学', '机器学习', '人工智能', 'AI工程师', 'Python', '上海'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.kaggle.com/', 'https://www.coursera.org/learn/machine-learning', 'https://pytorch.org/', 'https://huggingface.co/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-domestic-postgrad', 'cs-startup-join'],
};

export default path;
