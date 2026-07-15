import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'shanghai-hukou-graduate-2024',
  category: 'policy',
  title: '上海应届生落户政策 (2024)',
  content:
    '上海应届生落户主要分为三条路径：直接落户、积分落户和居转户。上海高校应届硕士、双一流本科以及清华北大本科等符合直接落户条件，但双非本科不适用此通道。双非本科毕业生可通过72分积分制落户，评分维度涵盖学历、成绩、外语、计算机、荣誉及签约单位等因素，签约远郊或重点企业可获得额外加分。此外，持有居住证满7年并满足社保个税和中级职称要求的长期居转户路径同样适用。',
  data: {
    city: '上海',
    year: 2024,
    paths: [
      {
        type: '直接落户',
        condition: '上海高校应届硕士、双一流本科、清华北大本科等',
        applicable: false,
        note: '双非本科不适用',
      },
      {
        type: '积分落户',
        condition: '需满足72分（学历+成绩+外语+计算机+荣誉+签约单位等）',
        applicable: true,
        note: '双非本科可走此通道，签约远郊/重点企业有加分',
      },
      {
        type: '居转户',
        condition: '持有居住证满7年+社保个税满7年+中级职称',
        applicable: true,
        note: '长期路径',
      },
    ],
    summary: '双非本科应届生可通过积分落户（72分制）或居转户在上海落户',
  },
  tags: ['上海', '落户', '应届生', '政策', '积分'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
