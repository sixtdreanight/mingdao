import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'degree-gate-reality-cs-2024',
  category: 'employment',
  title: 'CS 行业第一学历真实门槛 (2024)',
  content:
    '计算机行业的第一学历门槛因公司类型而异。互联网大厂普遍 985/211 优先，双非毕业生需在笔试中取得高分并有突出的项目经历才能突围，硕士学历可部分弥补本科层次不足。外企研发中心对学历最为宽松，双非可进，更看重英语能力、技术面试表现和算法功底，硕士无明显加成。国企与银行科技部则存在较多的 985/211 硬门槛，硕士学历有加分。创业公司几乎不卡学历，完全以实战能力为导向。',
  data: {
    industry: '计算机/软件',
    findings: [
      {
        companyType: '互联网大厂',
        bachelorRequirement: '985/211优先，双非需笔试高分+突出项目',
        masterEffect: '硕士可部分弥补本科层次',
      },
      {
        companyType: '外企研发',
        bachelorRequirement: '双非可进，重英语+技术面试+算法',
        masterEffect: '无明显加成',
      },
      {
        companyType: '国企/银行科技部',
        bachelorRequirement: '985/211硬门槛较多',
        masterEffect: '硕士有加分',
      },
      {
        companyType: '创业公司',
        bachelorRequirement: '几乎不卡学历，重实战能力',
        masterEffect: '无明显加成',
      },
    ],
  },
  tags: ['学历门槛', '双非', '招聘', '第一学历', '计算机'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
