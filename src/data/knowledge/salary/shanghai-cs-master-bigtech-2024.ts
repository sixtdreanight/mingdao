import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'shanghai-cs-master-bigtech-2024',
  category: 'salary',
  title: '上海计算机硕士应届大厂薪资 (2024)',
  content:
    '2024年上海地区计算机相关专业硕士应届毕业生进入互联网大厂（如字节跳动、阿里巴巴、腾讯、拼多多等）的税前月薪范围约为18,000至28,000元人民币，中位数约为22,000元。硕士学历在大厂校招中通常可获得比本科高30%至50%的起薪溢价，部分核心算法岗位或SP/SSP offer可达30,000元以上。该估算综合了牛客网、脉脉等社区平台2024届校招offer薪资爆料数据。算法工程师、AI研究员等技术岗位的薪资通常位于区间上限。',
  data: {
    city: '上海',
    degree: '硕士',
    companyType: '大厂',
    salaryRange: { min: 18000, max: 28000, median: 22000 },
    currency: 'CNY',
    year: 2024,
  },
  tags: ['上海', '计算机', '硕士', '大厂', '薪资', '应届'],
  sourceUrl:
    'https://www.zhipin.com/web/report/shanghai-tech-graduate-2024',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
