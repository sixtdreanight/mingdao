import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-exchange-program',
  title: '海外交换/暑期科研 — 积累海外经历',
  category: 'overseas-study',
  summary: '通过校级交换项目或暑期科研（如 CSST、Mitacs）积累海外经历，为后续海外深造或归国就业增加竞争力。',
  description: `## 路径概述

这条路径适合希望在不直接出国读学位的情况下积累海外经历的 CS 学生。校级交换通常为一学期到一学年，
暑期科研（如加拿大 Mitacs Globalink、香港 CSST）为期 2-3 个月，成果好的可以拿到推荐信甚至 return offer。

## 真实画像

- **交换费用**：一学期约 5-10 万 RMB（含机票、住宿、生活费）
- **暑期科研**：Mitacs 提供 1.5 万加元奖学金，CSST 提供每月约 1.2 万港币津贴，基本覆盖开销
- **语言要求**：雅思 6.0-6.5 或托福 80-90，部分项目需要学校官方英语成绩折算
- **名额竞争**：校级交换名额有限（通常每校每年 2-5 个 CS 方向），暑期科研全球竞争激烈

## 优势

- 花费远低于完整海外学位（5-10 万 vs 50-100 万）
- 海外科研经历在申请硕士时是强加分项
- 有机会拿到教授推荐信和 return PhD offer
- 不影响国内本科学位，风险可控

## 风险

- 项目名额极其有限，GPA 前 10% 才有竞争力
- 对双非一本学生而言，部分顶级项目（Mitacs、CSST）申请通过率低
- 交换学期课程转换可能影响国内 GPA 和毕业进度
- 短期经历在直接就业时的加分有限，主要价值在于为后续深造铺路
- 地缘政治波动可能影响签证审批`,

  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'at-risk', detail: '交换一学期约 5-10 万 RMB（含机票、住宿、生活费）。暑期科研项目（Mitacs/CSST）有奖学金基本覆盖开销，但竞争激烈。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'at-risk', detail: '雅思 6.0-6.5 或托福 80-90。部分项目对双非一本学生可能隐性地要求更高分数以证明英语能力。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'at-risk', detail: '校级交换对双非一本相对友好（取决于学校合作协议），但顶级暑期科研项目（Mitacs、CSST）偏好 985/211，双非学生需要极高 GPA 和强推荐信。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: '交换学期课程转换可能影响国内学分认定。暑期科研不影响正常学业进度，基本无毕业风险。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'at-risk', detail: '交换期间不在上海，但归国后海外经历对外企求职有一定加分。暑期科研时间短，基本不影响国内秋招。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '暑期科研 2-3 个月，学期交换 4-6 个月。不延长正常毕业时间（暑期科研）或最多延后一学期（交换）。对正常就业时间线影响小。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '交换期间生活费较紧（月均 8000-12000 RMB）。暑期科研有奖学金基本够用。归国后生活水平等同于直接就业路径。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '海外交换经历本身不改变学历层次，但在外企校招中是一个区分点。海外教授推荐信对申请硕士有重大价值。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'at-risk', detail: '中美关系紧张可能影响赴美 J-1/F-1 签证审批。科技领域（AI/芯片/量子）的签证审查趋严。欧盟和加拿大相对宽松。', sourceUrl: '' },
  ],

  preferenceScores: {
    interestMatch: 70,
    timeFlexibility: 65,
    lifestyleCompat: 55,
    growthCurve: 75,
  },

  trend: 'stable',
  trendDetail: '校级交换项目名额受学校预算和国际合作政策影响，增长缓慢。暑期科研项目（如 CSST、Mitacs）名额基本固定，但申请者数量逐年增加，竞争愈发激烈。获取海外科研经历的价值在申硕过程中持续走高。',

  exclusivity: ['放弃将时间直接投入国内实习的机会', '放弃交换学期的国内校招窗口（秋季交换影响秋招）', '放弃将资金用于其他路径（如考研培训）'],

  actionPlan: [
    { year: '大一上', tasks: ['保持高 GPA（目标年级前 10%）', '学好英语，打好 CET-4 基础', '了解学校国际交流处网站，掌握校级交换项目列表和申请条件'] },
    { year: '大一下', tasks: ['继续保持高 GPA', '开始准备英语（目标：大二上考出雅思 6.5/托福 90）', '参加英语角或语言交换，提升口语', '暑假：报名雅思/托福培训班'] },
    { year: '大二上', tasks: ['参加首次雅思/托福考试', '开始做一个有深度的个人项目（GitHub 可展示）', '研究 Mitacs、CSST 等暑期科研项目的申请要求和时间线'] },
    { year: '大二下', tasks: ['雅思/托福刷分（如首次未达标）', '主动联系校内老师，争取参与实验室科研项目', '申请校级交换（通常在大二下申请大三交换）', '暑假：参加第一个暑期科研项目或实验室实习'] },
    { year: '大三上', tasks: ['如已获得交换名额：准备签证、机票、住宿', '如在国外：积极参与教授 Office Hour，建立学术关系', '如未交换：持续刷 LeetCode + 做项目，准备国内校招'] },
    { year: '大三下', tasks: ['交换归来：整理学分转换和成绩认定', '申请大三暑期科研（如 Mitacs Globalink）', '向教授索取推荐信（趁学术关系还热）', '开始准备申请文书（如计划后续出国读硕）'] },
    { year: '大四上', tasks: ['提交海外硕士申请（如走深造路线）', '同步参加秋招，投递外企或跨国公司', '在简历中突出海外科研经历和推荐信', '准备 Plan B：国内考研报名'] },
    { year: '大四下', tasks: ['等待硕士录取结果', '如已就业：正常入职准备', '春招投递（如需）', '完成毕业论文', '总结海外经历，更新 LinkedIn 和个人网站'] },
  ],

  tags: ['计算机', '海外交换', '暑期科研', '背景提升', '推荐信', '留学准备'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.mitacs.ca/globalink/', 'https://www.cst.hk/', 'https://www.csc.edu.cn/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-germany-masters', 'cs-domestic-employment', 'cs-france-masters'],
};

export default path;
