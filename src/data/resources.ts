/** 资源索引 — 告诉用户去哪找权威数据，不搬运数据本身 */

export interface ResourceLink {
  name: string;
  url: string;
  description: string;
  /** 是否需要科学上网 */
  needProxy?: boolean;
}

export interface ResourceCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
  links: ResourceLink[];
}

export const RESOURCE_INDEX: ResourceCategory[] = [
  {
    id: 'salary',
    icon: '💰',
    title: '薪资查询',
    description: '各城市、行业、公司的真实薪资数据，直接去这些平台查',
    links: [
      {
        name: 'Levels.fyi',
        url: 'https://www.levels.fyi/',
        description: '全球科技公司薪资，按级别/城市/公司筛选，数据来自用户提交',
        needProxy: false,
      },
      {
        name: 'Glassdoor',
        url: 'https://www.glassdoor.com/Salaries/',
        description: '公司评价+薪资+面试经验，国际版数据丰富',
        needProxy: false,
      },
      {
        name: '牛客网 — 薪资讨论区',
        url: 'https://www.nowcoder.com/discuss?type=7',
        description: '国内校招薪资共享最活跃的社区，按公司/岗位搜索',
      },
      {
        name: 'offershow',
        url: 'https://www.offershow.cn/',
        description: '微信小程序，校招offer薪资共享，国内数据最全',
      },
      {
        name: '脉脉 — 职言区',
        url: 'https://maimai.cn/',
        description: '互联网从业者匿名社区，薪资职级讨论活跃',
      },
      {
        name: '国家统计局 — 平均工资',
        url: 'https://www.stats.gov.cn/sj/ndsj/',
        description: '官方城镇单位就业人员平均工资统计，按行业/地区分类',
      },
    ],
  },
  {
    id: 'education',
    icon: '🎓',
    title: '升学查询',
    description: '考研、保研、留学的官方入口和权威数据源',
    links: [
      {
        name: '研招网',
        url: 'https://yz.chsi.com.cn/',
        description: '考研报名、分数线、专业目录、调剂——所有考研数据的唯一官方入口',
      },
      {
        name: '学信网',
        url: 'https://www.chsi.com.cn/',
        description: '学历学籍认证、高考录取查询',
      },
      {
        name: '中国教育在线 — 考研频道',
        url: 'https://kaoyan.eol.cn/',
        description: '考研分数线汇总、报录比、院校对比',
      },
      {
        name: 'DAAD — 德国留学',
        url: 'https://www.daad.de/en/',
        description: '德国学术交流中心，德国留学的官方信息入口',
      },
      {
        name: 'Study UK (British Council)',
        url: 'https://study-uk.britishcouncil.org/',
        description: '英国留学官方指南，课程搜索+奖学金+签证',
      },
      {
        name: 'Campus France',
        url: 'https://www.campusfrance.org/en',
        description: '法国高等教育署，法国留学全流程官方指导',
      },
      {
        name: 'QS World University Rankings',
        url: 'https://www.topuniversities.com/university-rankings',
        description: '全球大学排名，可按学科筛选CS/工程/商科等',
      },
      {
        name: 'JASSO — 日本留学',
        url: 'https://www.jasso.go.jp/en/',
        description: '日本学生支援机构，日本留学的官方信息入口',
      },
    ],
  },
  {
    id: 'policy',
    icon: '📋',
    title: '政策查询',
    description: '落户、签证、选调、考公——直接去官方页面查最新政策',
    links: [
      {
        name: '上海市人社局',
        url: 'https://rsj.sh.gov.cn/',
        description: '应届生落户、人才引进、积分落户政策',
      },
      {
        name: '北京市人社局',
        url: 'https://rsj.beijing.gov.cn/',
        description: '北京积分落户、人才引进政策',
      },
      {
        name: '国家公务员局',
        url: 'http://www.scs.gov.cn/',
        description: '国考公告、职位表、报名入口',
      },
      {
        name: 'UK Government — Graduate Visa',
        url: 'https://www.gov.uk/graduate-visa',
        description: '英国毕业生签证（PSW）最新政策',
      },
      {
        name: '澳大利亚内政部 — 技术移民',
        url: 'https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list',
        description: '澳洲技术移民职业列表（查IT是否在紧缺列表）',
      },
      {
        name: 'USCIS — H-1B',
        url: 'https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations',
        description: '美国H-1B工作签证最新政策与抽签信息',
      },
      {
        name: '德国移民局 — EU Blue Card',
        url: 'https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/MigratEU/BlaueKarteEU/blaue-karte-eu-node.html',
        description: '欧盟蓝卡申请条件（IT从业者的主要移民路径）',
      },
    ],
  },
  {
    id: 'tools',
    icon: '🛠️',
    title: '实用工具',
    description: '写简历、刷题、找实习、做项目——这些工具帮你落地执行',
    links: [
      {
        name: '超级简历 (wondercv)',
        url: 'https://www.wondercv.com/',
        description: 'AI辅助写简历，模板专业，自动排版',
      },
      {
        name: 'LeetCode',
        url: 'https://leetcode.cn/',
        description: '技术面试刷题平台，国内版有企业题库',
      },
      {
        name: '牛客网 — 笔试题库',
        url: 'https://www.nowcoder.com/exam/company',
        description: '各大公司笔试真题+面经',
      },
      {
        name: 'GitHub Student Developer Pack',
        url: 'https://education.github.com/pack',
        description: '学生免费获取100+开发工具（需edu邮箱认证）',
      },
      {
        name: '实习僧',
        url: 'https://www.shixiseng.com/',
        description: '专注实习和应届生求职',
      },
      {
        name: 'BOSS直聘',
        url: 'https://www.zhipin.com/',
        description: '直接和招聘者聊，反馈快',
      },
    ],
  },
  {
    id: 'reports',
    icon: '📊',
    title: '行业报告',
    description: '产业趋势、就业报告、开发者调查——了解大方向用这些',
    links: [
      {
        name: 'Stack Overflow Developer Survey',
        url: 'https://survey.stackoverflow.co/',
        description: '全球最大的开发者调查，薪资/技术栈/工作偏好年度报告',
      },
      {
        name: 'GitHub Octoverse',
        url: 'https://octoverse.github.com/',
        description: 'GitHub年度开发者生态报告，开源趋势+AI影响',
      },
      {
        name: '中国信通院 — 数字经济白皮书',
        url: 'https://www.caict.ac.cn/',
        description: '官方数字经济/互联网行业年度报告',
      },
      {
        name: '艾瑞咨询',
        url: 'https://www.iresearch.cn/',
        description: '互联网各细分行业研究报告（部分免费）',
      },
      {
        name: 'World Economic Forum — Future of Jobs',
        url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2024/',
        description: '全球就业趋势+AI替代风险评估',
      },
      {
        name: 'O*NET Online',
        url: 'https://www.onetonline.org/',
        description: '美国劳工部职业数据库，每个岗位的薪资/技能/前景',
      },
    ],
  },
];
