export type TrustLevel = 'official' | 'ai-inferred' | 'community-unreviewed';

export type AtomCategory =
  | 'salary'
  | 'education'
  | 'employment'
  | 'trend'
  | 'policy'
  | 'cost'
  | 'life'
  | 'competency';

/** 一条原子事实 — 知识库的最小存储单元 */
export interface KnowledgeAtom {
  id: string;
  category: AtomCategory;
  title: string;                    // 简洁标题，用于检索显示
  content: string;                  // 可检索的文本描述
  data: Record<string, unknown>;    // 结构化数据
  tags: string[];
  sourceUrl: string;
  trustLevel: TrustLevel;
  lastUpdated: string;              // ISO date
}

export interface UserProfile {
  grade: string;
  major: string;
  universityTier: string;
  targetCity: string;
  householdBudget: number;
  interests: string[];
  lifestyle: string[];
  redLines: string[];
  /** 学生关注的目标职业 */
  targetCareer?: string;
  /** 当前能力自评列表 */
  currentCompetencies?: {
    name: string;
    selfAssessedLevel: number;  // 1-5
  }[];
}

/** 实时搜索来源 */
export interface WebSource {
  title: string;
  url: string;
  snippet: string;
}

export type ChatSource = KnowledgeAtom | WebSource;

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  /** AI 回复时附带的来源（知识库 + 实时搜索） */
  sources?: ChatSource[];
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
