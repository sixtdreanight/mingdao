import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'germany-student-living-cost-2024',
  category: 'cost',
  title: '德国留学生活成本',
  content:
    '德国留学生活成本在2024年约为每月800至1100欧元。住房是最大支出项，学生宿舍或合租月租金约300至600欧元，大城市如慕尼黑和法兰克福偏高。学生医疗保险为强制项，每月约120欧元。日常饮食约200至300欧元，学期票覆盖公共交通约30至60欧元每月。德国留学签证要求提供11208欧元/年的自保金证明，折合人民币约10万元。',
  data: {
    country: '德国',
    year: 2024,
    monthlyBreakdown: {
      rent: '300-600欧元(学生宿舍/合租)',
      food: '200-300欧元',
      healthInsurance: '120欧元(学生保险)',
      transport: '30-60欧元(学期票)',
      other: '100-200欧元',
    },
    monthlyTotal: '800-1100欧元',
    annualEstimate: '约10万人民币/年',
    blockedAccount: '11208欧元/年(2024年标准)',
  },
  tags: ['德国', '留学', '生活成本', '月支出'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
