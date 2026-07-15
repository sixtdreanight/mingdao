import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'overseas-visa-summary-2024',
  category: 'policy',
  title: '主要留学目的国签证与工作政策 (2024)',
  content:
    '美国提供F1学生签证，STEM专业毕业后可获3年OPT实习期，之后需通过H1B抽签留美工作，中国籍申请人中签率约15-25%，整体风险较高。英国提供Student Route签证，毕业后可通过Graduate Route获得2年（本硕）或3年（博士）工作期，风险中低。德国为毕业生提供18个月找工作签证并支持申请蓝卡，IT行业需求大，风险较低。澳大利亚通过500签证和485签证提供2-4年毕业后工作期，IT属于紧缺职业列表，技术移民路线相对清晰。新加坡持Student Pass毕业后可申请EP或SP工作准证，风险中等。',
  data: {
    year: 2024,
    countries: [
      {
        country: '美国',
        studentVisa: 'F1',
        workAfterStudy: 'OPT 3年(STEM专业)+H1B抽签',
        h1bOdds: '约15-25%(中国籍)',
        risk: '高',
      },
      {
        country: '英国',
        studentVisa: 'Student Route',
        workAfterStudy: 'Graduate Route 2年(本硕)/3年(博)',
        risk: '中低',
      },
      {
        country: '德国',
        studentVisa: '学生签证',
        workAfterStudy: '18个月找工作签证+蓝卡',
        risk: '低(IT需求大)',
      },
      {
        country: '澳大利亚',
        studentVisa: '500签证',
        workAfterStudy: '485签证2-4年+技术移民',
        risk: '中低(IT在紧缺职业列表)',
      },
      {
        country: '新加坡',
        studentVisa: 'Student Pass',
        workAfterStudy: '可申请EP/SP工作准证',
        risk: '中',
      },
    ],
  },
  tags: ['签证', '留学', '工作许可', 'H1B', 'OPT', 'PSW', '政策'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
