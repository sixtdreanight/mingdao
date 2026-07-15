import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'game-industry-trend-2024',
  category: 'trend',
  title: '游戏行业就业趋势',
  content:
    '国内游戏行业在版号发放趋于稳定但仍有数量限制的背景下，市场需求整体平稳，竞争格局以头部厂商为主导。出海成为重要增长极，中东、东南亚和拉美等新兴市场对 Unity、Unreal Engine 及游戏后端（Go/C++）人才需求强劲。行业工作文化方面，国内游戏公司 996 现象仍较为普遍，而外企游戏公司虽有较好的工作生活平衡（WLB），但岗位数量有限。',
  data: {
    year: 2024,
    domestic: {
      licensePolicy: '版号发放趋于稳定但仍有限制',
      demand: '国内需求平稳',
    },
    overseas: {
      demand: '出海需求强劲，中东/东南亚/拉美市场增长',
      skills: ['Unity', 'Unreal Engine', '游戏后端(Go/C++)'],
    },
    workCulture: {
      domestic: '996较普遍',
      overseas: '外企游戏公司(WLB较好但岗位少)',
    },
    salary: {
      junior: '10-18k',
      senior: '20-40k',
    },
  },
  tags: ['游戏开发', '趋势', '版号', '出海', '996'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
