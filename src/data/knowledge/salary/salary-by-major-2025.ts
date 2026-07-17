import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'salary-by-major-2025',
  category: 'salary',
  title: '2025届本科各专业月收入全景',
  content: '麦可思《2026年中国本科生就业报告》覆盖522个本科专业。工学整体领先，但电子信息类崛起取代传统CS。以下为各主要专业门类代表性专业薪资。',
  data: {
    year: 2025,
    source: '麦可思研究院《2026年中国本科生就业报告》',
    nationalAverage: 6435,
    byField: {
      '工学': { avg: 6841, top: '微电子科学与工程', topSalary: 7814 },
      '经济学': { avg: 6280, top: '金融学', topSalary: 6650 },
      '理学': { avg: 6115, top: '信息与计算科学', topSalary: 6890 },
      '管理学': { avg: 6075, top: '信息管理与信息系统', topSalary: 6520 },
      '农学': { avg: 5842, top: '动物医学', topSalary: 5980 },
      '文学': { avg: 5789, top: '翻译', topSalary: 6350 },
      '艺术学': { avg: 5735, top: '数字媒体艺术', topSalary: 6480 },
      '法学': { avg: 5610, top: '知识产权', topSalary: 6120 },
      '医学': { avg: 5493, top: '临床医学', topSalary: 5980 },
      '历史学': { avg: 5445, top: '文物与博物馆学', topSalary: 5680 },
      '教育学': { avg: 5085, top: '教育技术学', topSalary: 5420 },
    },
    top10Majors: [
      { name: '微电子科学与工程', salary: 7814, industry: '半导体' },
      { name: '电子科学与技术', salary: 7752, industry: '电子制造' },
      { name: '自动化', salary: 7573, industry: '工业控制' },
      { name: '信息安全', salary: 7548, industry: '网络安全' },
      { name: '光电信息科学与工程', salary: 7525, industry: '光电子' },
      { name: '采矿工程', salary: 7448, industry: '采矿业' },
      { name: '机械工程', salary: 7401, industry: '机械制造' },
      { name: '测控技术与仪器', salary: 7348, industry: '精密仪器' },
      { name: '材料科学与工程', salary: 7304, industry: '新材料' },
      { name: '通信工程', salary: 7249, industry: '通信设备' },
    ],
    cityTop5: [
      { city: '北京', salary: 8604 }, { city: '上海', salary: 8568 },
      { city: '深圳', salary: 8320 }, { city: '杭州', salary: 7362 },
      { city: '南京', salary: 7261 },
    ],
    trends: [
      '计算机类专业10年来首次跌出高薪TOP10',
      '电子信息类专业占据4席，产业重心从互联网转向硬科技',
      '超六成毕业生选择地级及以下城市就业',
      '2026年绿牌专业全部为工科：电气、微电子、自动化、能源、车辆、新能源',
    ],
  },
  tags: ['薪资', '本科', '应届', '2025', '各专业', '最新'],
  sourceUrl: 'https://finance.eastmoney.com/a/202607163809142791.html',
  trustLevel: 'official',
  lastUpdated: '2026-07-17',
};

export default atom;
