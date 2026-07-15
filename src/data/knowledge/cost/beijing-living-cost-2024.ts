import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'beijing-living-cost-2024',
  category: 'cost',
  title: '北京生活成本基准',
  content:
    '北京的生活成本与上海相当，2024年月均生活支出约为5000至10000元人民币。住房方面，合租单间约2500至3500元，整租一居室约4000至6000元，核心地段更高。日常伙食费约1500至2500元，地铁通勤约200至400元，水电燃气等杂费约300至500元。年生活支出估算为6至12万元，具体波动取决于居住区域和消费习惯。',
  data: {
    city: '北京',
    year: 2024,
    monthlyBreakdown: {
      rent: '2500-5000元(合租/整租一居)',
      food: '1500-2500元',
      transport: '200-400元(地铁)',
      utilities: '300-500元',
    },
    monthlyTotal: '5000-10000元',
    annualEstimate: '6-12万/年',
  },
  tags: ['北京', '生活成本', '租房', '月支出'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
