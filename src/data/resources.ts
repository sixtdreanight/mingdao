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
  {
    id: 'hard-skills',
    icon: '🖥️',
    title: '硬技能课程',
    description: '编程、数据分析、设计、AI——系统学习技术能力的平台',
    links: [
      {
        name: 'CS50 (Harvard)',
        url: 'https://cs50.harvard.edu/',
        description: '哈佛大学计算机导论课，免费，全球最好的编程入门课之一',
      },
      {
        name: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/',
        description: '免费学编程，从HTML到机器学习，有项目+证书',
      },
      {
        name: 'The Odin Project',
        url: 'https://www.theodinproject.com/',
        description: '免费全栈Web开发课程，项目驱动，社区活跃',
      },
      {
        name: '中国大学MOOC',
        url: 'https://www.icourse163.org/',
        description: '国内高校公开课平台，计算机/数学/电子等专业课',
      },
      {
        name: 'Coursera',
        url: 'https://www.coursera.org/',
        description: '全球名校课程，可申请助学金免费学，有证书',
      },
      {
        name: 'B站 — 编程学习区',
        url: 'https://www.bilibili.com/v/technology/program/',
        description: '中文最好的免费编程教程聚集地，从入门到项目实战',
      },
      {
        name: 'MIT OpenCourseWare',
        url: 'https://ocw.mit.edu/',
        description: 'MIT全部课程免费公开，6.006算法/6.004计组等经典课',
      },
      {
        name: 'Kaggle Learn',
        url: 'https://www.kaggle.com/learn',
        description: '数据科学+机器学习，免费互动课程，直接上手做项目',
      },
    ],
  },
  {
    id: 'soft-skills',
    icon: '📝',
    title: '软技能与素养',
    description: '写作、沟通、英语、思维方式——这些比技术活得久',
    links: [
      {
        name: 'Coursera — Learning How to Learn',
        url: 'https://www.coursera.org/learn/learning-how-to-learn',
        description: '全球最受欢迎的学习方法课，教你科学地学习任何东西',
      },
      {
        name: 'Grammarly',
        url: 'https://www.grammarly.com/',
        description: '英文写作辅助，检查语法+语气+清晰度',
      },
      {
        name: 'DeepL Write',
        url: 'https://www.deepl.com/write',
        description: 'AI写作优化，中英文改写润色',
      },
      {
        name: '鸠摩搜书',
        url: 'https://www.jiumodiary.com/',
        description: '电子书搜索引擎，找专业书籍和教材',
      },
      {
        name: 'Z-Library',
        url: 'https://z-lib.io/',
        description: '全球最大免费电子书库，学术书籍和论文',
      },
      {
        name: 'Google Scholar',
        url: 'https://scholar.google.com/',
        description: '学术论文搜索，找研究方向+导师论文',
        needProxy: true,
      },
    ],
  },
  {
    id: 'certifications',
    icon: '🏆',
    title: '证书与认证',
    description: '行业认可的证书路径——什么时候值得考，什么时候不值得',
    links: [
      {
        name: 'AWS / Azure / GCP 认证',
        url: 'https://aws.amazon.com/certification/',
        description: '云平台认证，对DevOps/SRE/云架构方向加薪明显',
      },
      {
        name: 'CKA (Kubernetes管理员)',
        url: 'https://www.cncf.io/training/certification/cka/',
        description: 'CNCF官方K8s认证，DevOps方向最有价值的证书之一',
      },
      {
        name: 'CET-4/6 (大学英语四六级)',
        url: 'https://cet.neea.edu.cn/',
        description: '国内求职基本门槛，外企看六级分数',
      },
      {
        name: 'IELTS / TOEFL',
        url: 'https://www.ielts.org/',
        description: '出国留学语言考试，雅思vs托福选择指南',
      },
      {
        name: 'N2/N1 日语能力考',
        url: 'https://www.jlpt.jp/',
        description: '日本留学/就职的日语门槛，N2够用，N1加分',
      },
      {
        name: 'CISP / OSCP (安全方向)',
        url: 'https://www.offsec.com/courses/pen-200/',
        description: '网络安全认证，国内CISP+国际OSCP双线',
      },
    ],
  },
  {
    id: 'projects',
    icon: '🔬',
    title: '项目实战',
    description: '光上课不够，做项目才是真的学。这些平台帮你找到能写到简历里的项目',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/',
        description: '代码托管+开源协作，你的GitHub就是你的技术简历',
      },
      {
        name: 'Google Summer of Code',
        url: 'https://summerofcode.withgoogle.com/',
        description: '谷歌赞助的开源实习，给大型开源项目贡献代码，有薪酬',
      },
      {
        name: '开源之夏 (国内版GSoC)',
        url: 'https://summer-ospp.ac.cn/',
        description: '中国科学院主办，为中国开源项目贡献代码，有奖金+证书',
      },
      {
        name: 'Kaggle Competitions',
        url: 'https://www.kaggle.com/competitions',
        description: '数据科学竞赛，获奖经历对DS/ML岗位含金量高',
      },
      {
        name: 'LeetCode',
        url: 'https://leetcode.cn/',
        description: '算法刷题+周赛，技术面试的必修课',
      },
      {
        name: 'Product Hunt',
        url: 'https://www.producthunt.com/',
        description: '独立开发者产品发布平台，看别人做了什么，自己也能发布',
      },
    ],
  },
  {
    id: 'language',
    icon: '🌐',
    title: '语言学习',
    description: '英语是必修，第二外语是杠杆——工具型的不用学到精通',
    links: [
      {
        name: 'Anki',
        url: 'https://apps.ankiweb.net/',
        description: '间隔重复记忆软件，背单词/记概念的神器，开源免费',
      },
      {
        name: 'YouGlish',
        url: 'https://youglish.com/',
        description: '用YouTube视频学单词真实发音和用法，比词典管用',
      },
      {
        name: '多邻国 (Duolingo)',
        url: 'https://www.duolingo.com/',
        description: '免费语言学习App，适合入门，日语法语德语都有',
      },
      {
        name: 'NHK Easy Japanese',
        url: 'https://www3.nhk.or.jp/news/easy/',
        description: 'NHK简明日语新闻，N4-N3水平阅读练习',
      },
      {
        name: '德语: Deutsche Welle',
        url: 'https://learngerman.dw.com/',
        description: '德国之声免费德语课程，A1到B2全覆盖',
      },
    ],
  },
  {
    id: 'community',
    icon: '👥',
    title: '社区与网络',
    description: '信息差最大的地方往往在社区——加入对的地方，比多上两门课有用',
    links: [
      {
        name: 'GitHub Discussions / Issues',
        url: 'https://github.com/',
        description: '参与开源项目讨论，从提issue到提PR，是最高效的学习方式',
      },
      {
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com/',
        description: '全球程序员问答社区，问问题前先搜，搜不到再问',
      },
      {
        name: 'V2EX',
        url: 'https://www.v2ex.com/',
        description: '国内技术社区，程序员/设计师/创业者聚集地',
      },
      {
        name: '即刻 — 产品/技术圈子',
        url: 'https://www.okjike.com/',
        description: '互联网从业者社群，产品/技术/设计圈子活跃',
      },
      {
        name: '少数派',
        url: 'https://sspai.com/',
        description: '数字工具+效率方法，教你用好工具提升生产力',
      },
      {
        name: '知乎',
        url: 'https://www.zhihu.com/',
        description: '搜索"XX专业 出路""XX行业 真实体验"——但注意甄别幸存者偏差',
      },
    ],
  },
  {
    id: 'competitions',
    icon: '🚀',
    title: '竞赛与实习',
    description: '比赛和实习是把"学过"变成"做过"的最快路径',
    links: [
      {
        name: 'ACM-ICPC / CCPC',
        url: 'https://icpc.global/',
        description: '国际大学生程序设计竞赛，算法能力的天花板证明',
      },
      {
        name: '蓝桥杯',
        url: 'https://www.lanqiao.cn/',
        description: '国内最大的IT类学科竞赛，门槛适中，适合大一大二参加',
      },
      {
        name: '中国"互联网+"大学生创新创业大赛',
        url: 'https://cy.ncss.cn/',
        description: '教育部主办，创业类竞赛，获奖对保研/找工作都有用',
      },
      {
        name: '实习僧',
        url: 'https://www.shixiseng.com/',
        description: '专注实习和应届生求职，按城市/行业/岗位筛选',
      },
      {
        name: 'BOSS直聘',
        url: 'https://www.zhipin.com/',
        description: '直接和招聘者对话，实习生/应届生岗位丰富',
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/',
        description: '国际职业社交平台，找外企实习+建立人脉',
      },
    ],
  },
];
