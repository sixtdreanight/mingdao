import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'cloud-native-demand-2024',
  category: 'trend',
  title: '云原生/DevOps 人才需求趋势',
  content:
    '云原生与 DevOps 领域的人才需求持续上升，Kubernetes、Docker、Terraform 和 CI/CD 工具链（GitHub Actions、GitLab CI）成为核心技能组合。可观测性技术栈（Prometheus、Grafana）的需求同步增长，反映出企业对系统稳定性和故障快速定位的重视。驱动力来自企业数字化转型加速与微服务架构的广泛普及，运维与开发边界日益模糊，运维开发一体化成为主流趋势。',
  data: {
    year: 2024,
    technologies: [
      'Kubernetes',
      'Docker',
      'Terraform',
      'CI/CD(GitHub Actions/GitLab CI)',
      '可观测性(Prometheus/Grafana)',
    ],
    demandTrend: 'rising',
    reason: '企业数字化转型+微服务架构普及，运维开发一体化趋势',
    avgSalary: '15-30k(1-3年经验)',
    certificationValue: 'CKA/CKS认证对薪资有约15-20%溢价',
  },
  tags: ['DevOps', '云原生', 'Kubernetes', '趋势', 'rising'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
