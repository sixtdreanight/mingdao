import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'job-market-trends-2025',
  category: 'employment',
  title: '2025届高校毕业生就业市场趋势',
  content: '2025届毕业生1270万人（同比增43万）。超六成选择地级市及以下就业，一线城市占比降至37%。机器人行业职位增长83.8%，新材料增长60.1%。AI科学家月薪13.28万为唯一破10万岗位。数据来源：教育部、麦可思、智联招聘。',
  data: {
    year: 2025,
    source: '教育部、麦可思研究院、智联招聘',
    totalGrads: 12700000,
    yearOverYear: '+43万',
    cityDistribution: {
      '一线城市': '37%（持续下降）',
      '新一线城市': '28%',
      '地级及以下': '35%（持续上升）',
    },
    industryGrowth: {
      '机器人': '+83.8%',
      '新材料': '+60.1%',
      '新能源': '+45%',
      '半导体': '+38%',
      'AI/大模型': '+35%',
      '互联网': '-5%（初级岗位下降）',
      '房地产': '-15%',
    },
    topSalaryRoles: {
      'AI科学家/负责人': 132800,
      '集成电路工程技术人员': 8459,
      '互联网开发人员': 8245,
      '工业互联网工程技术人员': 8030,
      '游戏策划人员': 7799,
    },
    greenMajors: ['电气工程及其自动化', '微电子科学与工程', '自动化', '能源与动力工程', '车辆工程', '新能源科学与工程'],
  },
  tags: ['就业', '趋势', '行业', '2025', '最新'],
  sourceUrl: 'https://finance.eastmoney.com/a/202606123769784988.html',
  trustLevel: 'official',
  lastUpdated: '2026-07-18',
};

export default atom;
