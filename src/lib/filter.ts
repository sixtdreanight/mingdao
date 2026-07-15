import type { CareerPath, HardConstraint } from '@/types';

// 硬约束筛选顺序（可配置，社区可扩展）
export const CONSTRAINT_ORDER: string[] = [
  'economy',
  'language',
  'degree-gate',
  'graduation-difficulty',
  'location-lock',
  'time-cost',
  'living-standard',
  'degree-value',
  'geopolitics',
];

export interface FilterResult {
  passing: CareerPath[];
  failed: { path: CareerPath; failedConstraints: HardConstraint[] }[];
  atRisk: CareerPath[];
  total: number;
}

export function applyConstraints(
  paths: CareerPath[],
  constraintIds: string[] = CONSTRAINT_ORDER
): FilterResult {
  const passing: CareerPath[] = [];
  const failed: FilterResult['failed'] = [];
  const atRisk: CareerPath[] = [];

  for (const path of paths) {
    const failedConstraints = constraintIds
      .map((cid) => path.constraints.find((c) => c.id === cid))
      .filter((c): c is HardConstraint => c !== undefined)
      .filter((c) => c.assessment === 'fail');

    const atRiskConstraints = constraintIds
      .map((cid) => path.constraints.find((c) => c.id === cid))
      .filter((c): c is HardConstraint => c !== undefined)
      .filter((c) => c.assessment === 'at-risk');

    if (failedConstraints.length > 0) {
      failed.push({ path, failedConstraints });
    } else if (atRiskConstraints.length > 0) {
      atRisk.push(path);
    } else {
      passing.push(path);
    }
  }

  return {
    passing,
    failed,
    atRisk: atRisk.filter((p) => !passing.includes(p) && !failed.find((f) => f.path.slug === p.slug)),
    total: paths.length,
  };
}

export function getConstraintSummary(
  paths: CareerPath[],
  constraintId: string
): { passCount: number; failCount: number; atRiskCount: number } {
  let passCount = 0;
  let failCount = 0;
  let atRiskCount = 0;

  for (const path of paths) {
    const c = path.constraints.find((c) => c.id === constraintId);
    if (!c) continue;
    if (c.assessment === 'pass') passCount++;
    else if (c.assessment === 'fail') failCount++;
    else if (c.assessment === 'at-risk') atRiskCount++;
  }

  return { passCount, failCount, atRiskCount };
}
