import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'beijing-cs-bachelor-bigtech-2024',
  category: 'salary',
  title: '北京计算机本科应届大厂薪资 (2024)',
  content:
    '2024年北京地区计算机科学与技术专业本科应届毕业生进入互联网大厂（如字节跳动、百度、美团、京东等）的税前月薪范围约为15,000至25,000元人民币，中位数约为18,000元。与上海相比，北京互联网大厂的应届生起薪整体相近，但中位数略低，部分原因为北京生活成本（房租）较高导致企业需在总包中配置更多非薪资福利。该数据综合了脉脉、牛客网等平台2024届校招薪资爆料及主流招聘网站公开岗位薪资范围。北京头部大厂的算法岗和研发岗SP offer可达25,000元以上。',
  data: {
    city: '北京',
    degree: '本科',
    companyType: '大厂',
    salaryRange: { min: 15000, max: 25000, median: 18000 },
    currency: 'CNY',
    year: 2024,
  },
  tags: ['北京', '计算机', '本科', '大厂', '薪资', '应届'],
  sourceUrl:
    'https://www.maimai.cn/salary/report/beijing-tech-graduate-2024',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
