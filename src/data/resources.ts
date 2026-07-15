/** 资源索引 — 按教育部 13 学科门类 + 通用能力 + 数据平台组织 */
export interface ResourceLink { name: string; url: string; description: string; needProxy?: boolean; }
export interface ResourceCategory { id: string; icon: string; title: string; description: string; links: ResourceLink[]; }

export const RESOURCE_INDEX: ResourceCategory[] = [

  // ================================================================
  // 通用 — 所有专业
  // ================================================================
  {
    id: 'universal', icon: '🏛️', title: '通用求职',
    description: '不分专业的官方求职平台，所有大学生第一站',
    links: [
      { name: '国家大学生就业服务平台 (24365)', url: 'https://job.ncss.cn', description: '教育部主管，60万+企业，信息最权威的校招平台' },
      { name: '国聘网', url: 'https://www.iguopin.com', description: '国资委等7部委发起，央企/国企校招主阵地' },
      { name: '应届生求职网', url: 'https://www.yingjiesheng.com', description: '每日3000+校招信息，20万篇面经，AI模拟面试' },
      { name: '实习僧', url: 'https://www.shixiseng.com', description: '大学生实习第一平台，全行业覆盖，可转正筛选' },
      { name: 'BOSS直聘', url: 'https://www.zhipin.com', description: '直聊模式，反馈最快，互联网/私企岗位最多' },
      { name: '智联招聘', url: 'https://www.zhaopin.com', description: '28年校招经验，央国企/外企/民企全覆盖' },
      { name: '前程无忧 (51job)', url: 'https://www.51job.com', description: '传统行业和MNC岗位最深，AI智能匹配' },
      { name: '国家公务员局', url: 'http://www.scs.gov.cn', description: '国考公告/报名/成绩唯一官方入口' },
      { name: '全国事业单位招聘网', url: 'https://www.qgsydw.com', description: '事业单位招聘公告聚合' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com', description: '全球职业社交平台，外企/留学求职必备' },
    ],
  },

  // ================================================================
  // 01 哲学 / 06 历史学 / 05 文学（文史哲）
  // ================================================================
  {
    id: 'humanities', icon: '📜', title: '文史哲',
    description: '中文/历史/哲学/外语——除了当老师，还有出版、文博、国际传播、跨境电商',
    links: [
      { name: '文博招聘网', url: 'https://www.wenbozhaopin.com', description: '博物馆/文化遗产/考古垂直招聘' },
      { name: '中国文字博物馆', url: 'https://www.chnmuseum.cn', description: '国家博物馆志愿者项目+招聘' },
      { name: '上海古籍出版社', url: 'https://www.guji.com.cn', description: '编辑校对岗位，文史专业对口' },
      { name: '中国知网 (CNKI)', url: 'https://www.cnki.net', description: '学术论文检索，发表论文查引用' },
      { name: 'CText 中国哲学书电子化计划', url: 'https://ctext.org', description: '经典文献数字化，数字人文方向实践' },
      { name: 'CATTI 官网', url: 'https://www.catticenter.com', description: '全国翻译专业资格考试，外语专业核心证书' },
      { name: '中国日报', url: 'https://www.chinadaily.com.cn', description: '国家级英文媒体，国际传播方向就业' },
      { name: '一考通 (eshukan.com)', url: 'https://www.eshukan.com', description: '学术期刊投稿目录，文科发论文查这个' },
    ],
  },

  // ================================================================
  // 05 文学 — 新闻传播 / 广告 / 新媒体
  // ================================================================
  {
    id: 'media', icon: '📡', title: '新闻传播',
    description: '新闻/广告/新媒体/出版——媒体、互联网运营、品牌方',
    links: [
      { name: '实习僧 — 媒体/运营板块', url: 'https://www.shixiseng.com', description: '传媒运营类实习最集中' },
      { name: 'BOSS直聘 — 内容/运营岗', url: 'https://www.zhipin.com', description: '新媒体、内容运营、短视频方向' },
      { name: '学院奖 (5iidea)', url: 'https://www.5iidea.com', description: '中国广告协会主办，企业命题创意竞赛，获奖直通实习' },
      { name: '刺猬实习 (ciwei)', url: 'https://www.ciwei.net', description: '实习聚合+职业教练，媒体和快消行业强' },
      { name: 'SC四川日报·川观合伙人', url: 'https://www.scol.com.cn', description: '省级媒体结构化实习，1对1导师制' },
      { name: '国家新闻出版署', url: 'https://www.nppa.gov.cn', description: '出版资格考试信息，出版社入职必备' },
    ],
  },

  // ================================================================
  // 02 经济学 / 12 管理学（经管）
  // ================================================================
  {
    id: 'business', icon: '💼', title: '经管',
    description: '金融/会计/经济/管理——四大/投行/咨询/快消/互联网商业',
    links: [
      { name: '四大各官网 (校招)', url: 'https://www.yingjiesheng.com', description: 'PwC/德勤/安永/毕马威 校招唯一官方通道' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com', description: '外资金融/咨询/快消行业核心网络' },
      { name: '高顿教育 (CFA/CPA/ACCA)', url: 'https://www.gaodun.com', description: '财经证书培训龙头，校企合作项目有折扣' },
      { name: '融跃教育 (CFA/FRM)', url: 'https://www.rongyuejiaoyu.com', description: '智能学习平台，85%讲师硕博' },
      { name: '金程教育 (CFA/FRM)', url: 'https://www.gfedu.cn', description: '20+证书课程，移动端刷题' },
      { name: '233网校 (从业资格)', url: 'https://www.233.com', description: '证券/基金/银行从业资格考试备考' },
      { name: '学堂在线 (清华)', url: 'https://www.xuetangx.com', description: '肖星《财务分析与估值》等免费经管好课' },
      { name: 'CFI — 财务数据分析 (BIDA)', url: 'https://www.corporatefinanceinstitute.com', description: '财务数据分析与建模认证，CFI国际认可' },
      { name: 'CPDA 数据分析师', url: 'https://www.chinacpda.com', description: '中国商业联合会+工信部双认证，政府项目招投标加分' },
      { name: '人人都是产品经理', url: 'https://www.woshipm.com', description: '产品/运营入门最大社区，行业报告+案例' },
      { name: '鸟哥笔记', url: 'https://www.niaogebiji.com', description: '互联网营销/运营深度案例，App推广/ASO教程' },
      { name: '36氪', url: 'https://www.36kr.com', description: '科技商业媒体，培养商业嗅觉必读' },
    ],
  },

  // ================================================================
  // 03 法学
  // ================================================================
  {
    id: 'law', icon: '⚖️', title: '法学',
    description: '法考/考研/律所实习/法务——法学就业三岔口',
    links: [
      { name: '容大法研 (微信公众号)', url: 'https://www.yingjiesheng.com', description: '五院四系考研辅导，青律先锋青年律师孵化计划' },
      { name: '北大法宝', url: 'https://www.pkulaw.com', description: '法规/判例/法学期刊检索（高校图书馆免费访问）' },
      { name: '无讼', url: 'https://www.itslaw.com', description: '案例检索+法律人社区，实习律师交流活跃' },
      { name: '中国庭审公开网', url: 'https://tingshen.court.gov.cn', description: '法院庭审直播，诉讼实务学习的最佳素材' },
      { name: '中国裁判文书网', url: 'https://wenshu.court.gov.cn', description: '全国判决书公开，案例研究必备' },
      { name: '国家公务员局', url: 'http://www.scs.gov.cn', description: '法院/检察院/司法行政岗位国考入口' },
      { name: '粉笔公考', url: 'https://www.fenbi.com', description: '行测+申论刷题，公检法岗位备考首选' },
    ],
  },

  // ================================================================
  // 04 教育学
  // ================================================================
  {
    id: 'education', icon: '🍎', title: '教育/师范',
    description: '教师资格证/教师编/教育技术——从考证到入编',
    links: [
      { name: 'NTCE — 教师资格考试', url: 'https://ntce.neea.edu.cn', description: '教师资格证报名唯一官方入口' },
      { name: '粉笔教师 (App)', url: 'https://www.fenbi.com', description: '近10年真题，AI评分预测，980系统课' },
      { name: '易师考 (App)', url: 'https://www.eshikao.com', description: '教资+教师编一体化备考，模拟考试' },
      { name: '高正教师 (App)', url: 'https://www.gaozheng.com', description: '真题+专项训练+语音互动背诵' },
      { name: '国家智慧教育平台', url: 'https://www.chinaooc.com.cn', description: '教育部出品，系统教育学课程免费学' },
      { name: '一起考教师 (App)', url: 'https://www.yiqikaojiaoshi.com', description: '游戏化闯关模式，免费直播课' },
    ],
  },

  // ================================================================
  // 07 理学 / 08 工学（理工科）
  // ================================================================
  {
    id: 'stem-general', icon: '🔬', title: '理工科（非CS）',
    description: '机械/土木/电气/化工/生物/环境——行业垂直招聘+学科竞赛',
    links: [
      { name: '一览英才网 (800hr)', url: 'https://www.800hr.com', description: '15个子站：建筑/机械/化工/电力，行业垂直招聘' },
      { name: '化工英才网 (chenhr)', url: 'https://www.chenhr.com', description: '化工行业第一大招聘，石化/制药/新材料全覆盖' },
      { name: '建筑英才网 (job1001)', url: 'https://www.job1001.com', description: '土木/建筑/施工/造价方向' },
      { name: '百大英才网 (baidajob)', url: 'https://www.baidajob.com', description: '75个细分行业，机械/化工/新材料/新能源' },
      { name: '硕博人才网 (lipind)', url: 'https://www.lipind.com', description: '硕博专属，3000+高校/医院/研究所直招' },
      { name: '高校人才网 (gaoxiaojob)', url: 'https://www.gaoxiaojob.com', description: '全国高校教师+科研岗位，按学科筛选' },
      { name: 'OFweek人才网', url: 'https://talent.ofweek.com', description: '光电/电子工程/智能制造/AI垂直招聘' },
      { name: '摩尔精英 (mooreelite)', url: 'https://www.mooreelite.com', description: '半导体/芯片行业垂直招聘' },
      { name: '91博硕 (91boshuo)', url: 'https://www.91boshuo.com', description: '博硕人才服务，科研/高校/央企岗位' },
    ],
  },

  // ================================================================
  // 08 工学 — 计算机/软件
  // ================================================================
  {
    id: 'cs-career', icon: '💻', title: '计算机就业',
    description: '薪资查询/面试刷题/找实习——CS学生求职闭环',
    links: [
      { name: '牛客网', url: 'https://www.nowcoder.com', description: '校招笔试真题+面经+内推+薪资爆料，CS求职第一站' },
      { name: '力扣 (LeetCode CN)', url: 'https://leetcode.cn', description: '算法刷题+周赛+企业题库，技术面试必修' },
      { name: 'OfferShow (微信小程序)', url: 'https://www.offershow.cn', description: '校招薪资共享，基本工资/年终/签字费细节' },
      { name: '职级对标 (duibiao)', url: 'https://www.duibiao.info', description: '互联网大厂职级薪资对标，含时薪排行榜' },
      { name: 'Levels.fyi', url: 'https://www.levels.fyi', description: '全球科技公司薪资标准，Base/Bonus/Stock明细' },
      { name: '拉勾网', url: 'https://www.lagou.com', description: '互联网垂直招聘，薪资透明，面试评价' },
      { name: '脉脉', url: 'https://www.maimai.cn', description: '互联网职场社区，匿名打听薪资/加班/裁员' },
      { name: '看准网', url: 'https://www.kanzhun.com', description: '员工匿名评价公司文化/工作强度/薪资福利' },
    ],
  },
  {
    id: 'remote-freelance', icon: '🏠', title: '自由职业/远程',
    description: '不分专业的远程工作和自由职业平台',
    links: [
      { name: '程序员客栈', url: 'https://www.proginn.com', description: '国内领先程序员远程平台，项目成功率97%' },
      { name: '电鸭社区', url: 'https://www.eleduck.com', description: '最早的中文远程工作社区，AI/全栈/产品岗多' },
      { name: 'Upwork', url: 'https://www.upwork.com', description: '全球最大自由职业平台，接海外项目赚美元' },
      { name: '甜薪工场', url: 'https://www.txgc.com', description: '开发/设计/新媒体远程工作，28万+工作者' },
      { name: '猪八戒网', url: 'https://www.zbj.com', description: '老牌众包平台，入门级项目积累经验' },
      { name: '米画师', url: 'https://www.mihuashi.com', description: '插画/视觉设计自由接单平台' },
    ],
  },

  // ================================================================
  // 10 医学
  // ================================================================
  {
    id: 'medicine', icon: '🩺', title: '医学',
    description: '临床/护理/药学/公卫——执医考试/规培/考研/医院招聘',
    links: [
      { name: '维普医学考试 (yikao.cqvip)', url: 'https://yikao.cqvip.com', description: 'DeepSeek AI备考，10K+视频/12M+题库/20+考试类别' },
      { name: '医考帮 (App)', url: 'https://www.yikaobang.com', description: '执医/考研/护理/药学/规培全覆盖' },
      { name: '蓝基因 (App)', url: 'https://www.lanjigin.com', description: '400+考试类型，33年真题章节解析' },
      { name: '无为医学 (App)', url: 'https://www.wuweiyixue.com', description: 'AI驱动，护理全阶段+医师+药学' },
      { name: '丁香园 (dxy)', url: 'https://www.dxy.cn', description: '百万医生社区，临床经验/病例讨论/职业发展/科研' },
      { name: '高校人才网 — 医学板块', url: 'https://www.gaoxiaojob.com', description: '三甲医院/医学院/卫健委招聘' },
    ],
  },

  // ================================================================
  // 09 农学
  // ================================================================
  {
    id: 'agriculture', icon: '🌾', title: '农学',
    description: '农学/林学/水产/兽医——科研院所/央企/选调',
    links: [
      { name: '中国农业科学院', url: 'https://www.caas.cn', description: '国家级农业科研机构，研究生招生+科研岗位' },
      { name: '中国农业大学就业网', url: 'https://scc.cau.edu.cn', description: '农林院校就业信息标杆，全行业覆盖' },
      { name: '国聘网 — 农林板块', url: 'https://www.iguopin.com', description: '中粮/中化/中农发等央企农业板块' },
      { name: '高校人才网 — 农学板块', url: 'https://www.gaoxiaojob.com', description: '农业院校教师/科研岗，按学科筛选' },
      { name: '各省农业农村厅', url: 'https://www.moa.gov.cn', description: '农业农村部 → 各省厅链接，公务员/事业编招考' },
    ],
  },

  // ================================================================
  // 13 艺术学
  // ================================================================
  {
    id: 'art-design', icon: '🎨', title: '艺术/设计',
    description: '平面/UI/室内/建筑/游戏美术——作品集平台+竞赛+垂直招聘',
    links: [
      { name: '站酷 (ZCOOL)', url: 'https://www.zcool.com.cn', description: '中国设计师大本营，1600万创作者，作品展示+招聘' },
      { name: 'Behance', url: 'https://www.behance.net', description: 'Adobe旗下全球创意作品展示，外企/留学申请必备' },
      { name: 'Dribbble', url: 'https://www.dribbble.com', description: '邀请制设计师社区，UI/图标/插画方向' },
      { name: 'ArtStation', url: 'https://www.artstation.com', description: '游戏美术/概念设计平台，直接连接招聘方' },
      { name: '即时设计 (js.design)', url: 'https://www.js.design', description: '国产在线UI设计工具，作品模板+社区' },
      { name: '设计师之家 (51sjsj)', url: 'https://www.51sjsj.com', description: '3000+课程/150万+素材，大学生免费（图书馆访问）' },
      { name: '翼狐网 (yiihuu)', url: 'https://www.lib.yiihuu.com', description: '30000+视频教程，55+设计软件教学' },
      { name: '古田路9号 (gtn9)', url: 'https://www.gtn9.com', description: '品牌设计作品学习，有应届生作品集专区' },
      { name: 'gooood — 建筑/景观招聘', url: 'https://www.gooood.cn', description: '建筑/景观/室内/艺术方向垂直招聘' },
      { name: 'MANA 新媒体艺术站 (公众号)', url: 'https://www.manamana.net', description: '新媒体艺术/交互装置/沉浸式体验行业动态+招聘' },
    ],
  },

  // ================================================================
  // 技能提升 — 不分专业
  // ================================================================
  {
    id: 'learn-online', icon: '🖥️', title: '在线课程',
    description: '不分专业的优质免费/平价学习平台',
    links: [
      { name: '中国大学MOOC', url: 'https://www.icourse163.org', description: '国内高校公开课，计算机/数学/经管/外语等全学科' },
      { name: '学堂在线', url: 'https://www.xuetangx.com', description: '清华出品，名校课程免费学，可申请证书' },
      { name: 'Coursera', url: 'https://www.coursera.org', description: '全球名校课程，选"旁听"免费学，可申请助学金' },
      { name: 'edX', url: 'https://www.edx.org', description: 'MIT/哈佛等顶级大学课程，免费旁听' },
      { name: 'B站 — 知识区', url: 'https://www.bilibili.com', description: '中文最好的免费课程聚集地，搜索任何学科都有' },
      { name: 'CS50 (Harvard)', url: 'https://cs50.harvard.edu', description: '哈佛计算机导论，B站有完整中文翻译版' },
      { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org', description: '免费编程认证，项目驱动，社区活跃' },
      { name: 'The Odin Project', url: 'https://www.theodinproject.com', description: '免费全栈Web开发，真实项目驱动' },
      { name: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', description: '数据科学+ML免费互动课程，免费GPU' },
      { name: '可汗学院', url: 'https://www.khanacademy.org', description: '数学/科学/经济学基础，完全免费' },
    ],
  },
  {
    id: 'tools', icon: '🛠️', title: '效率工具',
    description: '写简历/搜文献/做笔记——不分专业的效率利器',
    links: [
      { name: 'GitHub Student Pack', url: 'https://education.github.com/pack', description: '学生免费获100+专业工具（需edu邮箱）' },
      { name: '超级简历 (wondercv)', url: 'https://www.wondercv.com', description: 'AI写简历，模板专业，自动排版' },
      { name: 'Grammarly', url: 'https://www.grammarly.com', description: '英文写作辅助，论文/邮件/简历必备' },
      { name: 'DeepL', url: 'https://www.deepl.com', description: '最自然的AI翻译，学术论文翻译神器' },
      { name: 'Z-Library', url: 'https://z-lib.io', description: '全球最大免费电子书库' },
      { name: '鸠摩搜书', url: 'https://www.jiumodiary.com', description: '中文电子书搜索引擎' },
      { name: 'Google Scholar', url: 'https://scholar.google.com', description: '学术论文搜索，写综述/选导师必备', needProxy: true },
      { name: 'Anki', url: 'https://apps.ankiweb.net', description: '间隔重复记忆软件，背单词/记概念神器' },
    ],
  },
  {
    id: 'language', icon: '🌐', title: '语言学习',
    description: '英语考试+二外入门——考出该有的分数',
    links: [
      { name: '雅思中国官网', url: 'https://www.chinaielts.org', description: '雅思报名+免费样题+评分标准' },
      { name: '托福中国官网', url: 'https://www.toefl.cn', description: '托福报名+官方备考' },
      { name: 'IELTS Buddy', url: 'https://www.ieltsbuddy.com', description: '听说读写分项免费练习' },
      { name: 'YouGlish', url: 'https://www.youglish.com', description: '用YouTube视频学单词真实发音' },
      { name: '多邻国 (Duolingo)', url: 'https://www.duolingo.com', description: '免费语言入门App，日语法语德语都有' },
      { name: 'DW 学德语', url: 'https://learngerman.dw.com', description: '德国之声免费德语课 A1-B2' },
      { name: 'NHK Easy Japanese', url: 'https://www3.nhk.or.jp/news/easy/', description: 'NHK简明日语新闻，N4-N3阅读练习' },
      { name: 'MOJiTest (App)', url: 'https://www.mojitest.com', description: '日语能力考真题+解析，N5-N1全覆盖' },
      { name: 'JLPT 中国官网', url: 'https://jlpt.neea.cn', description: '日语能力考报名+成绩查询' },
    ],
  },

  // ================================================================
  // 考研 / 保研 / 留学 / 考公
  // ================================================================
  {
    id: 'postgrad', icon: '🎓', title: '考研/保研',
    description: '从择校到复试——考研保研全流程资源',
    links: [
      { name: '研招网 (yz.chsi.com.cn)', url: 'https://yz.chsi.com.cn', description: '考研报名/调剂/分数线/院校库，唯一官方平台' },
      { name: '学信网', url: 'https://www.chsi.com.cn', description: '学历认证，报名必备' },
      { name: '中国教育在线 — 考研', url: 'https://kaoyan.eol.cn', description: '报录比/分数线/院校对比最全' },
      { name: '考研论坛 (bbs.kaoyan.com)', url: 'http://bbs.kaoyan.com', description: '考研人最大社区，找学长/求资料/讨论版' },
      { name: '保研论坛 (eeban.com)', url: 'https://www.eeban.com', description: '保研圈最大社区，夏令营面经+导师评价' },
      { name: '小木虫 (muchong.com)', url: 'http://www.muchong.com', description: '调剂论坛——导师课题组直接发招人信息' },
      { name: '教育部学科评估', url: 'http://www.cdgdc.edu.cn', description: '全国学科排名，比民间榜单可靠' },
    ],
  },
  {
    id: 'study-abroad', icon: '✈️', title: '留学',
    description: 'DIY申请——选校/文书/签证/校友经验',
    links: [
      { name: '一亩三分地', url: 'https://www.1point3acres.com/bbs', description: '北美留学核心社区，选校定位/录取汇报/签证攻略' },
      { name: '寄托天下', url: 'https://bbs.gter.net', description: '老牌留学论坛，覆盖美英加澳港新' },
      { name: 'ChaseDream', url: 'https://www.chasedream.com', description: '商学院申请（MBA/商科硕士）核心社区' },
      { name: '教育部留学服务中心', url: 'https://www.cscse.cn', description: '回国学历认证/落户/档案管理' },
      { name: '国家留学基金委 (CSC)', url: 'https://www.csc.edu.cn', description: '国家公派留学（博士/联培）申请入口' },
      { name: 'DAAD — 德国留学', url: 'https://www.daad.de/en', description: '德国留学官方信息入口' },
      { name: 'Study UK (British Council)', url: 'https://study-uk.britishcouncil.org', description: '英国留学官方指南' },
      { name: 'Campus France', url: 'https://www.campusfrance.org/en', description: '法国留学官方指导' },
      { name: 'QS Rankings', url: 'https://www.topuniversities.com', description: '全球大学排名，按学科筛选' },
    ],
  },
  {
    id: 'civil-service', icon: '🏛️', title: '考公/选调',
    description: '国考/省考/选调生/事业单位——从信息到刷题',
    links: [
      { name: '国家公务员局', url: 'http://www.scs.gov.cn', description: '国考唯一官方入口' },
      { name: '粉笔公考', url: 'https://www.fenbi.com', description: '行测+申论刷题App，题库最大' },
      { name: '华图教育', url: 'https://www.huatu.com', description: '老牌公考培训，真题解析质量高' },
      { name: '中公教育', url: 'https://www.offcn.com', description: '各省分校资源丰富，公告解读及时' },
      { name: '中央遴选/选调', url: 'http://subb.scs.gov.cn/lx2024', description: '中央选调/公开遴选专用报名网站' },
      { name: '各省人事考试网', url: 'https://www.mohrss.gov.cn', description: '搜索"XX省人事考试网"找省考/选调公告' },
    ],
  },

  // ================================================================
  // 薪资/就业数据 — 不分专业
  // ================================================================
  {
    id: 'salary-data', icon: '💰', title: '查薪资',
    description: '谈薪前必查——各城市/行业/岗位真实薪资数据',
    links: [
      { name: 'OfferShow (微信小程序)', url: 'https://www.offershow.cn', description: '校招薪资共享，基本工资/年终/签字费细节' },
      { name: '牛客网 — 薪资爆料', url: 'https://www.nowcoder.com', description: 'IT类薪资最多，可对比同行水平' },
      { name: '职级对标 (duibiao)', url: 'https://www.duibiao.info', description: '大厂职级薪资对标+加班排行榜+时薪排行' },
      { name: 'Levels.fyi', url: 'https://www.levels.fyi', description: '全球科技公司薪资标准，Base/Bonus/Stock拆分' },
      { name: '看准网', url: 'https://www.kanzhun.com', description: '员工匿名分享薪资+面试评价' },
      { name: '脉脉 — 职言区', url: 'https://www.maimai.cn', description: '匿名打听薪资+加班+裁员动态' },
      { name: '国家统计局 — 平均工资', url: 'https://www.stats.gov.cn/sj/ndsj/', description: '官方城镇就业人员平均工资，按行业/地区' },
      { name: '智联招聘 — 薪酬报告', url: 'https://www.zhaopin.com', description: '季度/年度就业薪酬趋势报告' },
    ],
  },
  {
    id: 'industry-reports', icon: '📊', title: '行业趋势',
    description: '产业报告/就业白皮书/开发者调查——看大方向',
    links: [
      { name: 'Stack Overflow Survey', url: 'https://survey.stackoverflow.co', description: '全球最大开发者调查，薪资/技术栈年度报告' },
      { name: 'GitHub Octoverse', url: 'https://octoverse.github.com', description: '开源生态年度报告' },
      { name: '中国信通院', url: 'https://www.caict.ac.cn', description: '官方数字经济/互联网白皮书' },
      { name: '艾瑞咨询', url: 'https://www.iresearch.cn', description: '互联网各细分行业报告（部分免费）' },
      { name: 'WEF — Future of Jobs', url: 'https://www.weforum.org', description: '全球就业趋势+AI替代风险评估' },
      { name: 'O*NET Online', url: 'https://www.onetonline.org', description: '美国劳工部职业数据库，薪资/技能/前景' },
      { name: '猎聘 — 人才趋势报告', url: 'https://www.liepin.com', description: '中高端人才流动+薪资溢价分析' },
      { name: '脉脉 — 人才报告', url: 'https://www.maimai.cn', description: '年度人才流动+薪资趋势+热门技能' },
    ],
  },

  // ================================================================
  // 社区与竞赛 — 不分专业
  // ================================================================
  {
    id: 'communities', icon: '👥', title: '社区',
    description: '信息差最大的地方在社区——加入对的地方',
    links: [
      { name: 'GitHub', url: 'https://github.com', description: '代码托管+开源协作，你的GitHub就是你的技术简历' },
      { name: '掘金', url: 'https://juejin.cn', description: '中文开发者社区活跃度第一，技术文章+面试' },
      { name: 'LINUX DO', url: 'https://www.linux.do', description: '2024新起之秀，AI/大模型/运维讨论质量极高' },
      { name: 'V2EX', url: 'https://www.v2ex.com', description: '程序员/设计师/创业者聚集地' },
      { name: '知乎', url: 'https://www.zhihu.com', description: '搜索"XX专业 出路""XX行业 真实体验"——注意甄别偏差' },
      { name: 'Stack Overflow', url: 'https://www.stackoverflow.com', description: '全球程序员问答，几乎所有编程问题都有答案' },
      { name: '即刻App', url: 'https://www.okjike.com', description: '产品/技术/设计圈子，找同频开发者+行业前辈' },
      { name: '小红书 — 求职/考研板块', url: 'https://www.xiaohongshu.com', description: '大量面经/实习体验/校招时间线分享' },
      { name: '少数派', url: 'https://www.sspai.com', description: '数字工具+效率方法，教你用好工具' },
    ],
  },
  {
    id: 'competitions', icon: '🏆', title: '竞赛与开源',
    description: '比赛和开源项目——把"学过"变成"做过"',
    links: [
      { name: '蓝桥杯', url: 'https://www.dasai.lanqiao.cn', description: '国内最大IT学科竞赛，2100+高校覆盖，保研加分' },
      { name: 'ICPC (ACM)', url: 'https://www.icpc.global', description: '计算机奥林匹克，金牌=大厂直通车' },
      { name: 'Kaggle', url: 'https://www.kaggle.com', description: '数据科学竞赛，免费GPU，获奖对DS/ML岗位含金量高' },
      { name: '阿里云天池', url: 'https://tianchi.aliyun.com', description: '国内最大数据科学竞赛，60小时免费GPU' },
      { name: '开源之夏 (OSPP)', url: 'https://summer-ospp.ac.cn', description: '中科院主办，参与国内开源项目，有奖金+导师' },
      { name: 'Google Summer of Code', url: 'https://summerofcode.withgoogle.com', description: '全球最有声望学生开源项目，有薪酬' },
      { name: 'LFX Mentorship', url: 'https://mentorship.lfx.linuxfoundation.org', description: 'Linux基金会导师计划，K8s/云原生方向' },
      { name: '大广赛 (5iidea)', url: 'https://www.5iidea.com', description: '教育部A类赛事，广告/设计/营销方向' },
      { name: '"互联网+" 创新创业大赛', url: 'https://cy.ncss.cn', description: '教育部主办，获奖对保研/找工作都有用' },
      { name: '中国好创意大赛', url: 'https://www.cdec.org.cn', description: '数字艺术设计全国大赛，动画/交互/数媒方向' },
    ],
  },
  {
    id: 'certifications', icon: '📜', title: '证书认证',
    description: '行业认可的证书——什么时候值得考，什么时候不值得',
    links: [
      { name: '软考 (ruankao)', url: 'https://www.ruankao.org.cn', description: '人社部+工信部，职称评定/积分落户/招投标资质' },
      { name: 'CET-4/6 四六级', url: 'https://cet.neea.edu.cn', description: '国内求职基本门槛' },
      { name: 'NISP (信息安全)', url: 'https://www.nisp.org.cn', description: '校园版CISP，毕业后免试换CISP证书' },
      { name: 'AWS/ Azure/ GCP 认证', url: 'https://aws.amazon.com/certification', description: '云平台认证，DevOps/SRE方向加薪明显' },
      { name: 'CKA (Kubernetes管理员)', url: 'https://www.cncf.io/training/certification/cka/', description: 'CNCF官方K8s认证，DevOps最有价值证书之一' },
      { name: '教师资格证 (NTCE)', url: 'https://ntce.neea.edu.cn', description: '师范/非师范均可报考' },
      { name: 'CATTI 翻译资格证', url: 'https://www.catticenter.com', description: '外语专业核心证书，翻译行业准入' },
      { name: '法律职业资格证 (法考)', url: 'https://www.moj.gov.cn', description: '法官/检察官/律师/公证员执业必备' },
      { name: 'CPA 注册会计师', url: 'https://www.cicpa.org.cn', description: '财会行业金字证书，审计/税务/财务方向' },
      { name: 'CFA 特许金融分析师', url: 'https://www.cfainstitute.org', description: '投资/金融分析方向国际认证' },
      { name: '医师资格证', url: 'https://www.nmec.org.cn', description: '临床执业必备，医学毕业生必考' },
    ],
  },
];
