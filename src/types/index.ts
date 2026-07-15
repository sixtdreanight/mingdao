export type TrustLevel = 'official' | 'ai-inferred' | 'community-unreviewed';

export interface HardConstraint {
  id: string;
  label: string;
  description: string;
  // 该路径在此约束下的评估
  assessment: 'pass' | 'fail' | 'at-risk' | 'unknown';
  detail: string;
  sourceUrl?: string;
}

export interface CareerPath {
  slug: string;
  title: string;                    // e.g. "国内考研 → 上海外企软件开发"
  category: 'domestic-employment' | 'domestic-postgrad' | 'overseas-study'
    | 'civil-service' | 'freelance' | 'gap-year' | 'other';
  summary: string;                  // 一句话总结
  description: string;              // 详细描述（Markdown）
  constraints: HardConstraint[];    // 9 维硬约束评估
  preferenceScores: {               // 偏好维度 0-100
    interestMatch: number;
    timeFlexibility: number;
    lifestyleCompat: number;
    growthCurve: number;
  };
  trend: 'rising' | 'stable' | 'declining' | 'substitution-risk';
  trendDetail: string;
  exclusivity: string[];            // 选了这条意味着放弃什么
  actionPlan: {                     // 大一 → 大四执行阶梯
    year: string;
    tasks: string[];
  }[];
  tags: string[];                   // 匹配标签
  trustLevel: TrustLevel;
  sourceUrls: string[];             // 数据来源链接
  lastUpdated: string;              // ISO date
  alternatives: string[];           // 相关路径 slug 列表
}

export interface UserProfile {
  grade: string;                    // e.g. "大一上"
  major: string;                    // e.g. "计算机科学与技术"
  universityTier: string;           // e.g. "双非一本"
  targetCity: string;               // e.g. "上海"
  householdBudget: number;          // 家庭可支配教育资金（元）
  interests: string[];
  lifestyle: string[];              // 生活方式偏好
  redLines: string[];               // 底线（不可妥协的）
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  paths?: CareerPath[];             // AI 附带的路径推荐
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
