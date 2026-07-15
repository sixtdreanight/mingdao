import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'shanghai-living-cost-2024',
  category: 'cost',
  title: '上海生活成本基准',
  content:
    '上海是中国生活成本最高的城市之一，2024年月均生活支出约为5000至10000元人民币。住房是最大的支出项，外环内合租约2500至3500元，整租一居室约4000至6000元。日常饮食开销约1500至2500元，地铁通勤费用约200至400元。综合来看，在上海维持基本体面生活的年支出约6至12万元，不含大额消费和旅行。',
  data: {
    city: '上海',
    year: 2024,
    monthlyBreakdown: {
      rent: '2500-5000元(合租/整租一居)',
      food: '1500-2500元',
      transport: '200-400元(地铁)',
      utilities: '300-500元',
      entertainment: '500-1500元',
    },
    monthlyTotal: '5000-10000元',
    annualEstimate: '6-12万/年',
    note: '外环内合租约2500-3500元，整租一居室约4000-6000元',
  },
  tags: ['上海', '生活成本', '租房', '月支出'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
