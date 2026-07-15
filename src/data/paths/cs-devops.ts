import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-devops',
  title: 'DevOps/SRE 工程师 — 运维开发一体化',
  category: 'domestic-employment',
  summary: '从软件开发转向 DevOps/SRE/云原生方向，掌握 CI/CD、容器编排、监控告警和基础设施即代码能力。',
  description: `## 路径概述

DevOps/SRE 是连接开发与运维的桥梁岗位。随着云原生技术的普及，企业对 DevOps 工程师的需求持续增长。
这条路径适合喜欢解决系统性问题、对基础设施和自动化有热情的学生，技术栈导向型岗位让学历权重相对较低。

## 真实画像

- **起薪中位数**：上海 DevOps 应届 13-18k/月（含年终均摊），高于同级别纯开发岗
- **3年后薪资**：25-40k/月（取决于云平台认证和技术深度）
- **工作时间**：日常相对规律，但需要 on-call 轮值处理线上故障
- **从业者满意度**：中上（技术挑战大，成长曲线陡峭，但 on-call 压力不可忽视）

## 优势

- 技术栈导向，学历权重低，双非一本完全够用
- 薪资溢价明显，供需缺口大
- 云原生技能可迁移性强（AWS/Azure/GCP 认证含金量高）
- 从 DevOps 转架构师/技术经理路径通畅
- 上海云服务/金融科技企业 DevOps 岗位充足

## 风险

- On-call 轮值影响生活质量，半夜被报警叫醒是常态
- 技术栈更新极快（Kubernetes/Terraform/Helm 每季度都有重大更新）
- 需要同时掌握开发和运维两套技能，学习曲线陡峭
- 中小公司 DevOps 可能沦为"打杂"角色（既要写代码又要修打印机）

## 适合谁

- 喜欢底层原理和系统架构，不满足于纯业务 CRUD
- 能接受 on-call 和突发线上问题处理
- 自学能力强，愿意持续跟进技术迭代
- 希望用技术证书（CKA/CKS/AWS）弥补学历短板`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '零额外学费投入，自学云平台资源可利用免费层（AWS Free Tier/GCP $300 试用金）。认证考试费用约 2000-3000 元/门。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '中文为主，但阅读英文技术文档是基本功（Kubernetes 官方文档、AWS 白皮书均为英文）。CET-4 读写能力即可。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: 'DevOps 岗位极度务实，面试考的是实操（现场写 Dockerfile、排查 K8s 故障），学历权重远低于开发岗。CKA/CKS 认证含金量高于学历。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，不涉及额外学业。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '上海是云服务和金融科技中心，DevOps/SRE 岗位需求全国前二。阿里云/腾讯云华东总部均在上海。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '4年本科正常毕业即就业。建议大二开始自学 Linux + Docker，大三考取 CKA 认证。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '起薪 13-18k，在上海可覆盖基本生活并有少量结余。3年后跳槽薪资涨幅明显。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: 'DevOps 领域学历权重极低，技术和认证说话。双非学历不会成为职业发展瓶颈，但若转管理岗可能略受影响。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '国内就业，无地缘政治风险。但需注意部分外企使用的云服务可能受数据合规政策影响。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 70,
    timeFlexibility: 65,
    lifestyleCompat: 55,
    growthCurve: 80,
  },
  trend: 'rising',
  trendDetail: '云原生全面普及推动 DevOps 需求持续增长。金融、制造、政务等行业数字化转型加速，SRE 岗位年增长率超 25%。AI Ops（智能运维）成为新增长点。建议掌握 Terraform + Kubernetes + Prometheus 三件套，并关注 GitOps 和平台工程趋势。',
  exclusivity: ['放弃纯开发岗位的业务深度积累', '需要接受 on-call 和不规律的工作节奏', '放弃在某个单一技术栈上深度专精的机会'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构基础', '了解操作系统基本原理（进程/线程/文件系统）', '在个人电脑上安装 Linux 虚拟机或 WSL2'] },
    { year: '大一下', tasks: ['学习 Linux 命令行基础（Bash、文件操作、权限管理）', '掌握 Git 版本控制（分支管理、合并冲突解决）', '学习一门脚本语言（Python 或 Go 优先）'] },
    { year: '大二上', tasks: ['学习 Docker 容器化（镜像构建、Dockerfile 编写、Docker Compose）', '搭建个人博客或项目并容器化部署到云服务器', '学习计算机网络基础（TCP/IP、HTTP、DNS）'] },
    { year: '大二下', tasks: ['深入学习 Linux 系统管理（systemd、日志管理、性能监控）', '学习 CI/CD 概念并搭建一条 GitHub Actions 流水线', '暑假目标：找到第一份运维/DevOps 实习'] },
    { year: '大三上', tasks: ['学习 Kubernetes 基础（Pod/Service/Deployment/Ingress）', '搭建本地 K8s 集群（minikube/k3s）并部署微服务应用', '学习 Prometheus + Grafana 监控体系搭建'] },
    { year: '大三下', tasks: ['备考 CKA（Certified Kubernetes Administrator）认证', '学习 Terraform 基础设施即代码，在 AWS/阿里云上实践', '暑期实习：投递 DevOps/SRE 实习生岗位'] },
    { year: '大四上', tasks: ['秋招投递 DevOps/SRE/云平台运维岗位', '深入学习可观测性（OpenTelemetry、ELK Stack）', '如已通过 CKA，继续准备 CKS（安全）或云平台认证'] },
    { year: '大四下', tasks: ['如秋招未拿到满意 offer，继续春招', '完成毕业设计（建议选题与云原生/自动化运维相关）', '入职前学习公司使用的云平台和自动化工具链'] },
  ],
  tags: ['计算机', 'DevOps', 'SRE', '云原生', '运维开发', '上海', '本科'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.cncf.io/reports/', 'https://kubernetes.io/docs/home/', 'https://www.onetonline.org/link/summary/15-1252.00'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-security', 'cs-freelance'],
};

export default path;
