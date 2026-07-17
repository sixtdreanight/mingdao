import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'city-living-cost-2024',
  category: 'cost',
  title: '2024年中国主要城市生活成本',
  content:
    '数据源自国家统计局《中国统计年鉴2025》。上海人均月消费4394元（居住占33.9%），北京4146元（居住占38.7%），杭州3248元，广州2681元，武汉2069元，长沙2007元，成都1858元，西安1654元。注意：此为全省人均统计值，省会实际租房成本通常更高。',
  data: {
    year: 2024,
    source: '国家统计局《中国统计年鉴2025》',
    cities: {
      '上海': { monthlyConsumption: 4394, housingPct: 33.9, disposableIncome: 88366 },
      '北京': { monthlyConsumption: 4146, housingPct: 38.7, disposableIncome: 85415 },
      '杭州': { monthlyConsumption: 3248, housingPct: 27.8, disposableIncome: 67013 },
      '深圳': { monthlyConsumption: 2681, housingPct: 27.4, disposableIncome: 65000 },
      '广州': { monthlyConsumption: 2681, housingPct: 27.4, disposableIncome: 55000 },
      '南京': { monthlyConsumption: 2737, housingPct: 29.1, disposableIncome: 58000 },
      '武汉': { monthlyConsumption: 2069, housingPct: 22.2, disposableIncome: 44000 },
      '长沙': { monthlyConsumption: 2007, housingPct: 21.2, disposableIncome: 43000 },
      '成都': { monthlyConsumption: 1858, housingPct: 19.9, disposableIncome: 42000 },
      '西安': { monthlyConsumption: 1654, housingPct: 25.5, disposableIncome: 38000 },
      '重庆': { monthlyConsumption: 2288, housingPct: 19.1, disposableIncome: 37000 },
    },
  },
  tags: ['生活成本', '城市', '房租', '消费', '2024'],
  sourceUrl: 'https://www.stats.gov.cn/sj/ndsj/2025/indexch.htm',
  trustLevel: 'official',
  lastUpdated: '2026-07-17',
};

export default atom;
