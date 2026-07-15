import type { CareerPath, UserProfile } from '@/types';

export interface ScoredPath {
  path: CareerPath;
  score: number;        // 0-100
  breakdown: {
    interestMatch: number;     // weighted
    timeFlexibility: number;
    lifestyleCompat: number;
    growthCurve: number;
  };
}

const DEFAULT_WEIGHTS = {
  interestMatch: 0.35,
  timeFlexibility: 0.25,
  lifestyleCompat: 0.25,
  growthCurve: 0.15,
};

export function scorePaths(
  paths: CareerPath[],
  weights: Partial<typeof DEFAULT_WEIGHTS> = {}
): ScoredPath[] {
  const w = { ...DEFAULT_WEIGHTS, ...weights };

  const scored = paths.map((path) => {
    const breakdown = {
      interestMatch: path.preferenceScores.interestMatch * w.interestMatch,
      timeFlexibility: path.preferenceScores.timeFlexibility * w.timeFlexibility,
      lifestyleCompat: path.preferenceScores.lifestyleCompat * w.lifestyleCompat,
      growthCurve: path.preferenceScores.growthCurve * w.growthCurve,
    };

    const score = Object.values(breakdown).reduce((sum, v) => sum + v, 0);

    return { path, score: Math.round(score), breakdown };
  });

  return scored.sort((a, b) => b.score - a.score);
}

export function getUserWeights(userProfile: UserProfile): Partial<typeof DEFAULT_WEIGHTS> {
  const weights: Partial<typeof DEFAULT_WEIGHTS> = {};

  // 根据用户画像动态调整权重
  const freedomKeywords = ['自由', '弹性', '远程', '时间自由'];
  const hasFreedomPreference = userProfile.lifestyle.some((l) =>
    freedomKeywords.some((kw) => l.includes(kw))
  );
  if (hasFreedomPreference) {
    weights.timeFlexibility = 0.35;
    weights.growthCurve = 0.10;
  }

  const growthKeywords = ['高薪', '成长', '发展', '晋升'];
  const hasGrowthPreference = userProfile.lifestyle.some((l) =>
    growthKeywords.some((kw) => l.includes(kw))
  );
  if (hasGrowthPreference) {
    weights.growthCurve = 0.30;
    weights.lifestyleCompat = 0.15;
  }

  return weights;
}
