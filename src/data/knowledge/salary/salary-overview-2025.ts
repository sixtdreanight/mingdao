import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'salary-overview-2025',
  category: 'salary',
  title: '2025届本科毕业生各学科门类月收入',
  content:
    '2025届本科毕业生全国平均月收入6435元。微电子科学与工程以7814元居首，传统计算机专业跌出前十。电子信息类专业占据四席，产业重心从互联网+转向硬科技+智能制造。超六成毕业生选择地级及以下城市就业。数据来源：麦可思研究院《2026年中国本科生就业报告》，覆盖19.5万样本。',
  data: {
    year: 2025,
    source: '麦可思研究院《2026年中国本科生就业报告》',
    nationalAverage: 6435,
    topMajors: [
      { name: '微电子科学与工程', salary: 7814 },
      { name: '电子科学与技术', salary: 7752 },
      { name: '自动化', salary: 7573 },
      { name: '信息安全', salary: 7548 },
      { name: '光电信息科学与工程', salary: 7525 },
      { name: '采矿工程', salary: 7448 },
      { name: '机械工程', salary: 7401 },
      { name: '测控技术与仪器', salary: 7348 },
      { name: '材料科学与工程', salary: 7304 },
      { name: '通信工程', salary: 7249 },
    ],
    citySalaries: {
      '北京': 8604, '上海': 8568, '深圳': 8320, '杭州': 7362,
      '南京': 7261, '苏州': 7254, '广州': 7057, '宁波': 7046,
      '东莞': 6930, '佛山': 6595,
    },
    greenMajors: ['电气工程及其自动化', '微电子科学与工程', '自动化', '能源与动力工程', '车辆工程', '新能源科学与工程'],
  },
  tags: ['薪资', '本科', '应届', '2025', '最新'],
  sourceUrl: 'https://finance.eastmoney.com/a/202607163809142791.html',
  trustLevel: 'official',
  lastUpdated: '2026-07-17',
};

export default atom;
