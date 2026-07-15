import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'shanghai-cs-bachelor-foreign-2024',
  category: 'salary',
  title: '上海计算机本科应届外企薪资 (2024)',
  content:
    '2024年上海地区计算机科学与技术专业本科应届毕业生在外资企业（如SAP、微软、IBM等）的税前月薪范围约为10,000至15,000元人民币，中位数约为12,000元。该数据基于主流招聘平台（智联招聘、BOSS直聘）发布的2024年校园招聘薪资报告及行业调研数据综合估算。外企通常提供较为完善的福利体系与培训机制，现金薪资部分可能略低于互联网大厂但工作强度相对可控。该薪资水平适用于0-1年经验的初级软件工程师、测试工程师等技术岗位。',
  data: {
    city: '上海',
    industry: '计算机/软件',
    degree: '本科',
    experience: '0-1年',
    companyType: '外企',
    salaryRange: { min: 10000, max: 15000, median: 12000 },
    currency: 'CNY',
    year: 2024,
  },
  tags: ['上海', '计算机', '本科', '外企', '薪资', '应届'],
  sourceUrl:
    'https://www.zhaopin.com/report/2024/campus-salary-shanghai-it',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
