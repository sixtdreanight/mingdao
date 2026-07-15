import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-security',
  title: '网络安全工程师 — Web安全/渗透测试/安全开发',
  category: 'domestic-employment',
  summary: '攻防渗透、安全开发、等保合规等多方向可选，网络安全法驱动行业增长，人才缺口大。',
  description: `## 路径概述

网络安全是一个多方向、证书导向的细分领域。与通用软件开发不同，安全行业更看重实战能力和专业认证
（CISP、OSCP、CISSP），学历权重显著低于技术和证书。网络安全法、数据安全法、等保 2.0 等政策
驱动行业持续扩张，人才缺口长期存在。

## 真实画像

- **起薪中位数**：上海安全岗应届 12-18k/月（渗透测试偏低，安全开发偏高）
- **3年后薪资**：20-35k/月（持有 OSCP/CISSP 者溢价明显）
- **工作时间**：甲方安全岗节奏规律（10-7-5），乙方安全服务公司项目期加班较多
- **从业者满意度**：中等（技术有趣但压力大，攻防对抗永无止境）

## 优势

- 证书体系成熟，OSCP/CISP/CISSP 可以弥补学历短板
- 政策驱动型行业（等保/网安法），岗位稳定性高于互联网开发
- 甲方安全岗（金融/政府/央企）工作节奏规律，福利好
- 技能不可替代性强，AI 很难取代渗透测试和应急响应
- 上海金融机构和大型企业安全岗需求集中

## 风险

- 方向选择关键：渗透测试天花板低，安全架构/安全开发天花板高
- 乙方安全服务公司加班多、出差频繁
- 安全行业信息封闭，技术交流受限
- 需要持续跟进新漏洞和新攻击手法，学习压力大

## 适合谁

- 对攻防对抗有天然兴趣，喜欢"找茬"和逆向思维
- 能接受持续学习的节奏（新 CVE 每天都有）
- 不介意从乙方安全公司做起积累实战经验
- 愿意考取行业认证来增强竞争力`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '零额外学费投入。OSCP 认证约 1.5 万 RMB，CISP 约 8000 元（需工作年限）。初期可用免费靶场（HackTheBox/TryHackMe/DVWA）练习。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '中文为主。英文阅读能力重要（漏洞报告、安全论文多为英文），但日常工作中文即可。CET-4 足够。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '安全行业极度务实，CTF 战绩和实战项目比学历重要得多。甲方安全岗（金融/央企）可能对学历有门槛要求，但乙方安全公司几乎不卡学历。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，不涉及额外学业。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '上海金融/互联网企业密集，安全岗需求全国领先。奇安信、深信服、360 等安全厂商在上海均有研发中心。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '4年本科正常毕业即就业。建议大二确定安全方向并开始打 CTF，大三暑期实习。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '起薪 12-18k，甲方安全岗福利通常优于互联网开发岗。乙方起薪可能偏低但成长快。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '安全行业以证书和实战论英雄，学历影响远小于开发岗位。OSCP/CISSP 持证者的市场认可度高于名校学历。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '网络安全是国家战略方向，政策持续利好。但部分安全技术受出口管制（如某些加密工具），需注意合规。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 80,
    timeFlexibility: 60,
    lifestyleCompat: 65,
    growthCurve: 75,
  },
  trend: 'rising',
  trendDetail: '网络安全法、数据安全法、等保 2.0 三重政策驱动，安全行业年增长率超 20%。AI 安全、云安全、车联网安全成为新增长极。信创（国产化替代）带来大量政府/央企安全岗。建议从 Web 安全入门，逐步向云安全或安全开发方向深化。',
  exclusivity: ['放弃通用软件开发更广的就业面', '乙方安全公司可能需要频繁出差和驻场', '渗透测试方向的天花板相对较低，需要提前规划转型'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和计算机网络基础（TCP/IP 协议栈是安全基石）', '了解 Web 基础（HTTP/HTTPS、浏览器原理）', '注册 TryHackMe 账号，完成入门学习路径'] },
    { year: '大一下', tasks: ['学习 Web 安全基础（OWASP Top 10：SQL 注入、XSS、CSRF 等）', '搭建本地靶场（DVWA/Pikachu）进行漏洞练习', '学习 Python 编写简单的安全工具（端口扫描、目录爆破）'] },
    { year: '大二上', tasks: ['深入学习渗透测试方法论（信息收集→漏洞扫描→漏洞利用→权限提升→痕迹清理）', '学习 Burp Suite 和 Nmap 等工具使用', '开始参与 CTF 比赛（从新生赛/校赛开始）'] },
    { year: '大二下', tasks: ['学习内网渗透和域渗透基础', '学习代码审计（PHP/Java 代码审计入门）', '暑假目标：找到第一份安全实习（乙方安全公司或企业安全部门）'] },
    { year: '大三上', tasks: ['根据兴趣选择深化方向：渗透测试深入 / 安全开发 / 逆向工程 / 云安全', '参与更高水平的 CTF 比赛（XCTF 联赛/强网杯）', '在漏洞平台（补天/漏洞盒子）提交漏洞积累实战经验'] },
    { year: '大三下', tasks: ['准备 OSCP 认证（需扎实的渗透测试基础）', '如偏向安全开发，学习代码审计和安全架构设计', '暑期实习：投递安全厂商（奇安信/深信服/360）或大厂安全部门'] },
    { year: '大四上', tasks: ['秋招投递安全岗位（甲方安全 > 安全厂商 > 安全服务公司）', '如已通过 OSCP，简历竞争力大幅提升', '同步关注等保测评、数据安全等合规方向（甲方岗位多）'] },
    { year: '大四下', tasks: ['如秋招未拿到满意 offer，继续春招', '完成毕业设计（建议选题与安全相关）', '入职前了解公司安全体系架构和使用的安全产品'] },
  ],
  tags: ['计算机', '网络安全', '渗透测试', '安全开发', '上海', '本科', 'CTF'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://owasp.org/', 'https://www.offsec.com/courses/pen-200/', 'https://www.onetonline.org/link/summary/15-1212.00'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-devops', 'cs-domestic-postgrad'],
};

export default path;
