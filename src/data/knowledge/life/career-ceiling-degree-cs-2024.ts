import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'career-ceiling-degree-cs-2024',
  category: 'life',
  title: 'CS行业学历对晋升天花板的影响',
  content:
    '在2024年的中国CS行业中，学历对职业天花板的影响随着职业阶段而变化。初级到中级阶段（0至5年），技术能力是核心评价标准，学历影响很低。中级到高级阶段（5至10年），项目经验和架构能力成为主要考量，学历影响仍然有限。进入高级管理或架构师层级后，部分外企和国企的管理岗会出现学历偏好，但纯技术岗影响依然较小。跨行业跳槽时学历可作为背书，但技术博客、开源贡献和行业影响力能大幅弥补学历短板。',
  data: {
    year: 2024,
    findings: [
      {
        level: '初级→中级(0-5年)',
        degreeImpact: '低',
        detail: '技术能力为主，学历影响很小',
      },
      {
        level: '中级→高级(5-10年)',
        degreeImpact: '中低',
        detail: '项目经验+架构能力为主，学历影响有限',
      },
      {
        level: '高级→管理/架构师(10年+)',
        degreeImpact: '中',
        detail: '部分外企/国企管理岗有学历偏好，技术岗影响小',
      },
      {
        level: '转行/跳槽',
        degreeImpact: '中高',
        detail: '跨行业跳槽时学历可作为背书',
      },
    ],
    mitigation: '技术博客+开源贡献+行业影响力可大幅弥补学历短板',
  },
  tags: ['职业天花板', '学历', '晋升', '管理岗', '长期发展'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
