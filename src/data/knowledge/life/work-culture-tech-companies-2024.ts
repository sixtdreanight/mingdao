import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'work-culture-tech-companies-2024',
  category: 'life',
  title: '科技公司工作文化对比',
  content:
    '2024年中国科技行业的工作文化因公司类型而异，主要分为互联网大厂、外企研发中心、国企/银行科技部与创业公司四大类。互联网大厂以结果导向和高压快节奏著称，工时从995到996不等，薪资和成长速度快但伴随加班文化和裁员风险。外企研发中心注重工作生活平衡，主流工时为1075或朝九晚六，技术氛围好但薪资天花板较低。国企与银行科技部最为稳定，以朝九晚五为主，福利好但技术栈偏旧。创业公司节奏最快，扁平化管理，成长空间大但不稳定因素多。',
  data: {
    year: 2024,
    companyTypes: [
      {
        type: '互联网大厂',
        workHours: '1095/995/996不等',
        culture: '结果导向、高压快节奏、年轻化',
        pros: '薪资高、成长快、跳槽溢价',
        cons: '加班多、35岁焦虑、裁员风险',
      },
      {
        type: '外企研发中心',
        workHours: '1075/朝九晚六为主',
        culture: '流程规范、WLB重视、国际化',
        pros: '工作生活平衡、技术氛围好',
        cons: '薪资天花板较低、晋升慢、收缩风险',
      },
      {
        type: '国企/银行科技部',
        workHours: '朝九晚五为主',
        culture: '稳定、层级分明、节奏慢',
        pros: '稳定、福利好、户口优势',
        cons: '技术老旧、薪资低、晋升靠资历',
      },
      {
        type: '创业公司',
        workHours: '不固定，忙时可能007',
        culture: '扁平、高速迭代、全员多面手',
        pros: '成长极快、可能有期权、薪资弹性大',
        cons: '不稳定、加班多、福利少',
      },
    ],
  },
  tags: ['工作文化', '996', '外企', '大厂', '国企', '创业'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
