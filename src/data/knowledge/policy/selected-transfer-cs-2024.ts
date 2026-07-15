import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'selected-transfer-cs-2024',
  category: 'policy',
  title: '计算机专业选调生政策 (2024)',
  content:
    '选调生分为中央选调、省级选调和普通选调三个层次，计算机专业在各级选调中均有一定需求。中央选调以985/211为主，双非毕业生极少数有机会，计算机岗位竞争激烈。部分省份的省级选调对双非开放，信息化建设岗位逐年增加。普通选调双非可报，主要面向基层信息化岗位。选调生考试科目为行测和申论，省级选调竞争比约20:1至50:1，上海地区公务员起薪约8-12k/月（含补贴）。',
  data: {
    year: 2024,
    levels: [
      {
        type: '中央选调',
        requirement: '985/211为主，双非极少数',
        csDemand: '有计算机岗位但竞争激烈',
      },
      {
        type: '省级选调(上海)',
        requirement: '部分省份对双非开放',
        csDemand: '信息化建设岗位逐年增加',
      },
      {
        type: '普通选调',
        requirement: '双非可报',
        csDemand: '基层信息化岗',
      },
    ],
    examSubjects: ['行测', '申论'],
    competitionRatio: '省级约20:1至50:1',
    salary: '上海公务员起薪约8-12k/月(含补贴)',
  },
  tags: ['选调生', '考公', '公务员', '政策', '计算机'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
