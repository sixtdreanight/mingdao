import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'germany-cs-masters-public-2024',
  category: 'education',
  title: '德国公立大学 CS 硕士',
  content:
    '德国公立大学对国际学生免收学费，仅需缴纳每学期约 150 至 350 欧元的注册费，是留学成本最低的选项之一。计算机科学硕士项目通常为 4 学期（2 年），英语授课项目一般要求 IELTS 6.5 以上，德语授课则需 TestDaF 4 级。生活费约 800 至 1000 欧元/月，两年总费用估算在 15 至 20 万人民币。申请德国留学必须通过 APS 审核，这是中国学生赴德留学的必要前置步骤。',
  data: {
    country: '德国',
    universityType: '公立大学',
    tuition: '约150-350欧元/学期(注册费)',
    livingCost: '约800-1000欧元/月',
    duration: '2年(4学期)',
    languageRequirement: '英语授课IELTS6.5+/德语授课TestDaF4',
    totalEstimate: '约15-20万人民币(2年)',
    apsRequired: true,
  },
  tags: ['德国', '留学', '计算机', '硕士', '低成本'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
