import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'salary-overview-2024',
  category: 'salary',
  title: '2024届本科毕业生各学科门类月收入',
  content:
    '2024届本科毕业生全国平均月收入6199元。工学最高（6841元），教育学最低（5085元）。信息安全连续十年居首（7599元），软件工程（7092元）紧随其后。近六成（57.8%）毕业生起薪在6000元及以下，月入过万者仅9.7%。数据来源：麦可思研究院《2025年中国本科生就业报告》。',
  data: {
    year: 2024,
    source: '麦可思研究院《2025年中国本科生就业报告》',
    nationalAverage: 6199,
    byField: {
      '工学': 6841, '经济学': 6280, '理学': 6115, '管理学': 6075,
      '农学': 5842, '文学': 5789, '艺术学': 5735, '法学': 5610,
      '医学': 5493, '历史学': 5445, '教育学': 5085,
    },
    topMajors: [
      { name: '信息安全', salary: 7599 },
      { name: '微电子科学与工程', salary: 7282 },
      { name: '电子科学与技术', salary: 7215 },
      { name: '自动化', salary: 7108 },
      { name: '软件工程', salary: 7092 },
    ],
    distribution: {
      under6000: 57.8, between6000and8000: 23.2, over10000: 9.7,
    },
  },
  tags: ['薪资', '本科', '应届', '2024', '各专业'],
  sourceUrl: 'https://www.199it.com/archives/1765343.html',
  trustLevel: 'official',
  lastUpdated: '2026-07-17',
};

export default atom;
