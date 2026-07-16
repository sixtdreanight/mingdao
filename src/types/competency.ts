/** 能力冰山分层 — 对齐 McClelland/Spencer 冰山模型 */
export type CompetencyLayer =
  | 'skill'          // 可执行的技能（Bloom 应用层以上）
  | 'knowledge'      // 理论知识（Bloom 记忆+理解层）
  | 'cert'           // 可验证的证书/资质
  | 'self_concept'   // 自我认知、职业认同、价值观
  | 'trait'          // 责任心、抗压力、适应性
  | 'motive';        // 成就动机、亲和动机

/** 6 维能力分类 — 对齐中国大学生就业能力研究（鲍威&万义辉 2025 等） */
export type CompetencyType =
  | 'professional'   // 专业素养
  | 'transferable'   // 可迁移能力
  | 'digital'        // 数智素养
  | 'career_dev'     // 职业发展能力
  | 'emotional'      // 情绪管理
  | 'self_efficacy'; // 自我效能

/** 5 级能力水平 — 对齐 Bloom 认知分类学 + 中国国家职业技能等级 */
export type ProficiencyLevel = 1 | 2 | 3 | 4 | 5;

/** 5 级标尺的行为描述 */
export const PROFICIENCY_LABELS: Record<ProficiencyLevel, { label: string; desc: string }> = {
  1: { label: '了解',     desc: '知道概念，没做过' },
  2: { label: '辅助完成', desc: '有人指导能完成' },
  3: { label: '独立完成', desc: '能自主交付' },
  4: { label: '分析优化', desc: '能拆解、对比、改进' },
  5: { label: '创新引领', desc: '能设计新方案、指导他人' },
};

/** 差距优先级 — 对齐技能差距分析业界标准 */
export type GapPriority = 'blocker' | 'critical' | 'important' | 'nice_to_have';

export const GAP_PRIORITY_LABELS: Record<GapPriority, string> = {
  blocker:     '🔴 硬门槛 — 不掌握无法入行',
  critical:    '🟠 核心能力 — 影响核心竞争力',
  important:   '🟡 重要 — 提升竞争力但非必须',
  nice_to_have:'🟢 锦上添花',
};

/** 单条能力条目 */
export interface Competency {
  id: string;
  name: string;                        // "法律检索与文书写作"
  layer: CompetencyLayer;
  type: CompetencyType;
  proficiencyLevels: Record<ProficiencyLevel, string>;  // 每级行为锚定描述
  relatedOccupations: string[];
  weightInOccupation: number;          // 0-1
  importanceRationale: string;
}

/** 职业能力画像 — AI 为某个目标职业生成的全套能力集合 */
export interface OccupationCompetencyProfile {
  occupation: string;                  // "律师（诉讼方向）"
  competencies: Competency[];
  generatedBy: 'ai' | 'community';
  trustLevel: 'ai-inferred' | 'community-unreviewed';
  generatedAt: string;
}

/** 学生自评某一条能力 */
export interface SelfAssessment {
  competencyId: string;
  currentLevel: ProficiencyLevel;
  evidence: string;
  lastUpdated: string;
}

/** AI 从对话中推断的能力信号 */
export interface InferredSignal {
  competencyId: string;
  inferredLevel: ProficiencyLevel;
  confidence: number;                  // 0-1
  source: string;                      // 推断依据
}

/** 学生能力画像 */
export interface StudentCompetencyProfile {
  targetCareer?: string;
  selfAssessments: SelfAssessment[];
  inferredSignals: InferredSignal[];
}

/** 单条差距 */
export interface CompetencyGap {
  competency: Competency;
  currentLevel: ProficiencyLevel;
  targetLevel: ProficiencyLevel;
  gap: number;                         // targetLevel - currentLevel
  priority: GapPriority;
}

/** 差距分析完整结果 */
export interface CompetencyGapAnalysis {
  targetOccupation: string;
  gaps: CompetencyGap[];
  generatedAt: string;
}
