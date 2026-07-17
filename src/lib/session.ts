/**
 * 会话阶段机 — 根据画像填充度决定当前阶段。
 *
 * 三阶段：
 * - collect: 画像不足 6 维，AI 逐项采集信息
 * - plan:   画像 >= 6 维，或学生主动触发，生成路线
 * - adjust: 已有路线，学生反馈调整
 */

import type { UserProfile } from '@/types';

export type SessionStage = 'collect' | 'plan' | 'adjust';

/** 启动规划的画像维度阈值 */
const PLAN_THRESHOLD = 6;

const PROFILE_KEYS: (keyof UserProfile)[] = [
  'grade', 'major', 'universityTier', 'targetCity',
  'householdBudget', 'interests', 'lifestyle', 'redLines',
];

/** 计算画像已填充的维度数 */
export function profileFillCount(profile: Partial<UserProfile>): number {
  return PROFILE_KEYS.filter((k) => {
    const v = profile[k];
    if (v === undefined || v === null) return false;
    if (typeof v === 'string') return v.trim().length > 0;
    if (typeof v === 'number') return v > 0;
    if (Array.isArray(v)) return v.length > 0;
    return false;
  }).length;
}

/** 判断当前应处于哪个阶段 */
export function getStage(
  profile: Partial<UserProfile>,
  hasRoutes: boolean,
  userWantsPlan: boolean
): SessionStage {
  if (hasRoutes) return 'adjust';
  if (userWantsPlan) return 'plan';
  if (profileFillCount(profile) >= PLAN_THRESHOLD) return 'plan';
  return 'collect';
}

/** 返回第一个缺失维度，供 AI 引导提问 */
export function nextMissingDimension(profile: Partial<UserProfile>): string | null {
  const missing = PROFILE_KEYS.find((k) => {
    const v = profile[k];
    if (v === undefined || v === null) return true;
    if (typeof v === 'string' && v.trim().length === 0) return true;
    if (typeof v === 'number' && v === 0) return true;
    if (Array.isArray(v) && v.length === 0) return true;
    return false;
  });
  if (!missing) return null;

  const labels: Record<string, string> = {
    grade: '你现在大几？',
    major: '你学的是什么专业？',
    universityTier: '你的学校是985、211还是双非？',
    targetCity: '你毕业后想去哪个城市发展？',
    householdBudget: '你的教育预算大概是多少？（比如考研/出国的话家里能支持多少钱）',
    interests: '你有什么兴趣爱好？',
    lifestyle: '你理想的工作生活状态是什么样的？（比如追求高薪、时间自由、稳定优先等）',
    redLines: '你有什么绝对不能接受的？（比如不接受996、不出国、不考研等）',
  };
  return labels[missing] || `能告诉我你的${missing}吗？`;
}
