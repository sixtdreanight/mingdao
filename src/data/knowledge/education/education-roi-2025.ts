import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'education-roi-2025',
  category: 'education',
  title: '2025年学历薪资溢价与教育投资回报',
  content: '硕士毕业生起薪中位数约为本科的1.3-1.5倍，但不同行业差异显著。信息技术硕士溢价约40%（部分算法岗溢价80%+），制造业硕士溢价约25%，教育行业硕士溢价约15%。双一流院校毕业生起薪8373元，地方本科6095元。考研报考人数连续两年下降（2025年388万，较2024年438万下降11.4%），竞争趋缓。',
  data: {
    year: 2025,
    source: '麦可思研究院、教育部',
    bachelorAvg: 6435,
    masterPremium: {
      overall: '1.3-1.5倍',
      '信息技术': '1.4倍（算法岗可达1.8倍）',
      '金融': '1.5倍',
      '制造业': '1.25倍',
      '教育': '1.15倍',
    },
    schoolTier: {
      '双一流': 8373,
      '地方本科': 6095,
      '高职': 4882,
    },
    examTrend: {
      '2025报考人数': 3880000,
      '2024报考人数': 4380000,
      '变化': '-11.4%（连续两年下降）',
    },
  },
  tags: ['教育', '考研', '薪资溢价', '学历', '2025'],
  sourceUrl: 'https://www.stats.gov.cn/',
  trustLevel: 'official',
  lastUpdated: '2026-07-18',
};

export default atom;
