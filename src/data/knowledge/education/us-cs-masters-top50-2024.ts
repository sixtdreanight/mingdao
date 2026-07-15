import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'us-cs-masters-top50-2024',
  category: 'education',
  title: '美国 TOP50 CS 硕士',
  content:
    '美国 TOP50 计算机科学硕士项目是全球含金量最高的学位之一，但投入成本也相应较高，学费约 30000 至 55000 美元/年，生活费约 15000 至 25000 美元/年。项目时长通常为 1.5 至 2 年，总费用估算在 50 至 80 万人民币。申请要求 TOEFL 100 分以上或 IELTS 7.0 以上，绝大多数项目要求提交 GRE 成绩。作为 STEM 专业，CS 硕士毕业生可享受最长 3 年的 OPT 实习期，有利于在美国积累工作经验。',
  data: {
    country: '美国',
    universityTier: 'TOP50',
    tuition: '约30000-55000美元/年',
    livingCost: '约15000-25000美元/年',
    duration: '1.5-2年',
    totalEstimate: '约50-80万人民币',
    languageRequirement: 'TOEFL100+/IELTS7.0+',
    greRequired: true,
    optDuration: '3年(STEM)',
  },
  tags: ['美国', '留学', '计算机', '硕士', '高投入'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
