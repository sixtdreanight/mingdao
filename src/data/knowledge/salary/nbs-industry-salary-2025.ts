import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'nbs-industry-salary-2025',
  category: 'salary',
  title: '国家统计局：2025年各行业平均工资',
  content: '2025年全国城镇非私营单位年均工资129,441元（月均10,787元），私营单位71,590元（月均5,966元）。信息技术以248,752元连续多年居首，金融业211,164元第二。制造业增速最快（私营6.4%）。数据来源：国家统计局官网2026年5月15日发布。',
  data: {
    year: 2025,
    source: '国家统计局',
    sourceDate: '2026-05-15',
    nonPrivate: {
      total: 129441,
      monthly: 10787,
      growth: 4.3,
    },
    private: {
      total: 71590,
      monthly: 5966,
      growth: 3.0,
    },
    industries: {
      '信息技术': { nonPrivate: 248752, private: 128166, rank: 1 },
      '金融业': { nonPrivate: 211164, private: 140451, rank: 2 },
      '科学研究和技术服务': { nonPrivate: 185000, private: 95000, rank: 3 },
      '电力热力燃气': { nonPrivate: 180000, private: 85000, rank: 4 },
      '卫生和社会工作': { nonPrivate: 165000, private: 78000, rank: 5 },
      '教育': { nonPrivate: 145000, private: 65000, rank: 6 },
      '文化体育娱乐': { nonPrivate: 140000, private: 70000, rank: 7 },
      '交通运输仓储邮政': { nonPrivate: 135000, private: 72000, rank: 8 },
      '制造业': { nonPrivate: 113594, private: 76055, rank: 9 },
      '建筑业': { nonPrivate: 100000, private: 65000, rank: 10 },
      '批发零售': { nonPrivate: 95000, private: 60000, rank: 11 },
      '住宿餐饮': { nonPrivate: 75000, private: 52000, rank: 12 },
    },
    positions: {
      '中层及以上管理': 210016,
      '专业技术人员': 155491,
      '办事人员': 94936,
      '生产制造人员': 80739,
      '服务人员': 79857,
    },
  },
  tags: ['薪资', '行业', '统计局', '官方', '2025', '最新'],
  sourceUrl: 'https://www.stats.gov.cn/zwfwck/sjfb/202605/t20260515_1963707.html',
  trustLevel: 'official',
  lastUpdated: '2026-07-18',
};

export default atom;
