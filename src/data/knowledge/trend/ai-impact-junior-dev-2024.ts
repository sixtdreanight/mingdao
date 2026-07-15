import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'ai-impact-junior-dev-2024',
  category: 'trend',
  title: 'AI 辅助开发对初级岗位的影响',
  content:
    'AI 编程助手（GitHub Copilot、Cursor、Claude 等）的普及正在重塑初级开发者的就业市场，传统的初级 CRUD 开发需求显著下降，但 AI 工具使用能力正成为新的入门门槛。与此同时，AI 在测试领域的应用减少了对初级 QA 岗位的需求。新兴机遇集中在 AI 应用开发、Prompt Engineering、AI Agent 开发和模型微调/部署等复合型方向，市场对理解 AI 原理并具备工程能力的复合人才需求上升。',
  data: {
    year: 2024,
    impacts: [
      {
        area: '代码生成',
        tools: ['GitHub Copilot', 'Cursor', 'Claude'],
        effect: '初级CRUD开发需求下降，但AI工具使用能力成为新要求',
      },
      {
        area: '测试',
        effect: 'AI生成单元测试减少初级QA需求',
      },
      {
        area: '新机遇',
        items: ['AI应用开发', 'Prompt Engineering', 'AI Agent开发', '模型微调/部署'],
        effect: '对理解AI原理+工程能力的复合人才需求上升',
      },
    ],
    recommendation:
      '初级开发者应主动学习AI工具链，从"写代码的人"转变为"用AI写代码+做架构决策的人"',
  },
  tags: ['AI', '自动化', '初级岗位', '风险', '趋势', '2024'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
