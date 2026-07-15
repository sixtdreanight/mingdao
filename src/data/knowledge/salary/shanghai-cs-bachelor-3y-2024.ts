import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'shanghai-cs-bachelor-3y-2024',
  category: 'salary',
  title: '上海计算机本科3年经验薪资 (2024)',
  content:
    '2024年上海地区计算机相关专业本科毕业生具备3年工作经验后的税前月薪范围约为18,000至30,000元人民币，中位数约为24,000元。3年经验是技术岗位的一个重要薪资跃升节点，通常伴随从初级工程师向中级或高级工程师的职级晋升。该数据基于猎聘、BOSS直聘等平台2024年发布的上海IT行业中位薪资及岗位薪酬分布数据综合估算。具备大厂背景或特定热门技术栈（如AI、云原生）经验的候选人可获得区间上限薪资，而传统行业IT部门的薪资通常位于区间中下位置。',
  data: {
    city: '上海',
    degree: '本科',
    experience: '3年',
    salaryRange: { min: 18000, max: 30000, median: 24000 },
    currency: 'CNY',
    year: 2024,
  },
  tags: ['上海', '计算机', '本科', '3年经验', '薪资'],
  sourceUrl:
    'https://www.liepin.com/report/it-salary-shanghai-2024',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
