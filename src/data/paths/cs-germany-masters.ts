import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-germany-masters',
  title: '德国留学 — 公立大学 CS 硕士 → 欧洲就业',
  category: 'overseas-study',
  summary: '申请德国公立大学 CS 硕士（免学费），毕业后在欧洲（德国为主）就业，享受高福利和高生活质量。',
  description: `## 路径概述

德国公立大学（TU9 和精英大学）的 CS 硕士项目多数免学费（仅收每学期约 150-400 欧注册费），
性价比极高。毕业后可获得 18 个月找工作签证，工作 2-3 年后可申请永居。

## 真实画像

- **总花费**：2 年硕士约 15-25 万 RMB（生活费为主，学费几乎为零）
- **语言门槛**：英语授课项目需要 IELTS 6.5+ / TOEFL 90+；德语授课需要 TestDaF 16
- **就业薪资**：德国 CS 应届起薪 48-55k 欧/年（约 37-43 万 RMB）
- **工作时间**：普遍 35-40 小时/周，年假 30 天，加班极少
- **生活质量**：全民医保、免费教育、工作生活平衡程度全球前列

## 优势

- 公立大学免学费，经济门槛远低于英美
- 毕业后 18 个月求职签证 + 欧盟蓝卡路径清晰
- 工作生活平衡极好，永久 remote 文化比国内成熟
- 申根签证可自由出入 27 国

## 风险

- 双非一本申请 TU9 有一定难度（需要高 GPA + 匹配的课程描述）
- 德语虽非必需但会极大提升生活质量和就业范围
- 德国官僚效率低（签证、延签、注册都慢）
- 文化融入困难、远离亲友、冬季日照短可能导致情绪问题
- 税后薪资在欧洲不算高（税前 50k 税后约 30k），但福利好
- 近年德国极右翼抬头，移民政策可能有变`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '2 年硕士总花费约 15-25 万 RMB（生活费为主）。需要德国保证金账户（2024年约 11,208 欧/年），可部分通过打工（120 全天/年）补贴。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'at-risk', detail: '英语授课需要 IELTS 6.5+ 或 TOEFL 90+。德语虽非硬要求但实际生活和求职中强烈建议达到 B1 以上。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'at-risk', detail: '德国大学看重课程匹配度（学分对应）和 GPA。双非一本若 GPA 85+ 且课程匹配度好，有机会申请 TU9。GPA 低于 80 则需考虑 FH（应用科学大学）。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'at-risk', detail: '德国硕士宽进严出，CS 专业平均毕业时间 2.5-3.5 年（标准学制 2 年）。考试难度大，挂科有次数限制。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'at-risk', detail: '毕业后大概率留在德国/欧洲。回国则德国学历在国内互联网行业的认可度不如英美。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: 'APS 审核 + 申请 1 年 + 硕士 2-3 年 + 求职 0.5 年 ≈ 3.5-4.5 年到稳定就业。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '就读期间生活费较紧（保证金~930 欧/月），但德国物价低于英美。就业后生活质量高，年假 30 天 + 全民医保。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: 'TU9/精英大学 CS 硕士在欧洲认可度高。回国则知名度低于英美名校，但在德企（大众/西门子/SAP）中认可。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'at-risk', detail: '中欧关系波动可能影响签证政策。德国极右翼政党 AfD 崛起可能收紧移民和留学政策。俄乌战争持续影响欧洲能源价格和生活成本。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 75,
    timeFlexibility: 70,
    lifestyleCompat: 85,
    growthCurve: 65,
  },
  trend: 'stable',
  trendDetail: '德国公立大学免学费政策预计持续，但生活成本因通胀在上升。英语授课 CS 项目增多，中国申请者数量持续增长，竞争加剧。德国 IT 人才缺口仍然大，就业前景稳定。',
  exclusivity: ['放弃中国互联网行业的高速成长机会', '放弃国内的亲友社交网络', '放弃英美顶尖名校的品牌溢价（若可申请）', '放弃在国内考公/考编的应届生身份'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构', '开始学德语（目标：大二结束达到 A2-B1）', '了解德国大学体系和申请流程（DAAD 网站）'] },
    { year: '大一下', tasks: ['保持高 GPA（目标 85+ / 100）', '继续学德语', '参加英语角或语言交换，为大二考雅思打基础', '暑假：报名德语 A2 课程'] },
    { year: '大二上', tasks: ['参加第一次雅思/托福考试（目标 6.5/90+）', '德语推进到 B1', '开始收集目标学校课程描述（为学分匹配做准备）'] },
    { year: '大二下', tasks: ['雅思/托福刷分（目标 7.0/100+）', '做一个有深度的个人项目（GitHub 可展示）', '暑假：找第一份实习，积累项目经验'] },
    { year: '大三上', tasks: ['准备 APS 审核材料（成绩单翻译、公证）', '研究 5-8 所目标学校的具体申请要求', '德语推进到 B2（如果目标是德语授课项目）'] },
    { year: '大三下', tasks: ['提交 APS 审核申请并准备面试', '完成所有申请文书（Motivation Letter + CV + 推荐信）', '持续刷 GPA，争取最后学期的好成绩'] },
    { year: '大四上', tasks: ['APS 面谈', '按各校截止日期提交申请（大部分为 1/15 或 3/15 截止）', '准备德国保证金账户（约 11,208 欧）', '同步准备 Plan B（国内就业/考研）'] },
    { year: '大四下', tasks: ['等待录取结果（通常在 5-8 月出结果）', '办理签证、机票、住宿', '出发前继续学德语', '如未录取：评估是否延期一年再申或转向 Plan B'] },
  ],
  tags: ['计算机', '留学', '德国', '硕士', '免学费', '欧洲就业'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.daad.de/en/', 'https://www.make-it-in-germany.com/', 'https://www.aps.org.cn/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-postgrad', 'cs-domestic-employment', 'cs-japan-it'],
};

export default path;
