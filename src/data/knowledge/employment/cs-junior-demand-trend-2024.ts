import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'cs-junior-demand-trend-2024',
  category: 'employment',
  title: 'CS 初级岗位需求变化趋势 (2024)',
  content:
    '2024 年计算机行业初级岗位需求出现了明显的结构性分化。初级前端与后端开发岗位需求下降约 15-20%，主要受 AI 辅助开发工具普及和初级岗位外包双重影响。AI/ML 工程师需求上升约 30-40%，源于大模型应用落地的需求爆发。DevOps/SRE 岗位因云原生普及上升约 20%，数据分析与数据工程岗位需求保持稳定。AI 辅助工具如 Copilot 和 Cursor 降低了初级编码需求，但同时催生了 AI 应用开发、Prompt Engineering 等新兴岗位。',
  data: {
    industry: '计算机/软件',
    year: 2024,
    trends: [
      {
        role: '初级前端/后端开发',
        demandChange: '下降约15-20%',
        reason: 'AI辅助开发+初级岗位外包',
      },
      {
        role: 'AI/ML工程师',
        demandChange: '上升约30-40%',
        reason: '大模型应用落地需求爆发',
      },
      {
        role: 'DevOps/SRE',
        demandChange: '上升约20%',
        reason: '云原生普及',
      },
      {
        role: '数据分析/数据工程',
        demandChange: '稳定',
        reason: '数据驱动决策持续需求',
      },
    ],
    aiImpactSummary:
      'AI辅助工具（Copilot/Cursor）降低了初级编码需求，但增加了AI应用开发、Prompt Engineering等新岗位',
  },
  tags: ['就业趋势', 'AI影响', '初级岗位', '需求变化', '2024'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
