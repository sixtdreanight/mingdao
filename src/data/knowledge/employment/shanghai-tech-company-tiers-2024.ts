import type { KnowledgeAtom } from '@/types';

const atom: KnowledgeAtom = {
  id: 'shanghai-tech-company-tiers-2024',
  category: 'employment',
  title: '上海科技公司梯队与招聘偏好 (2024)',
  content:
    '上海科技公司可分为三个主要梯队。T1 大厂如字节跳动、拼多多、美团、蚂蚁，学历偏好 985/211，双非需突出项目经验，应届平均总包 25-40 万。T2 外企研发中心如 SAP、Microsoft、IBM、Intel，双非可进，重技术面试与算法能力，应届平均总包 15-25 万，工作节奏多为 10-7-5。T3 中型科技公司如 B 站、小红书、得物、米哈游，对学历最为友好，应届平均总包 12-22 万。',
  data: {
    city: '上海',
    tiers: [
      {
        name: 'T1-大厂',
        examples: ['字节跳动', '拼多多', '美团', '蚂蚁'],
        degreePreference: '985/211优先，双非需突出项目',
        avgPackage: '25-40万(应届)',
      },
      {
        name: 'T2-外企研发中心',
        examples: ['SAP', 'Microsoft', 'IBM', 'Intel'],
        degreePreference: '双非可进，重技术面试',
        avgPackage: '15-25万(应届)',
        workHours: '10-7-5为主',
      },
      {
        name: 'T3-中型科技公司',
        examples: ['B站', '小红书', '得物', '米哈游'],
        degreePreference: '双非友好',
        avgPackage: '12-22万(应届)',
      },
    ],
  },
  tags: ['上海', '公司梯队', '招聘', '学历门槛', '计算机'],
  sourceUrl: '',
  trustLevel: 'ai-inferred',
  lastUpdated: '2026-07-16',
};

export default atom;
