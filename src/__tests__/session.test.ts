import { describe, it, expect } from 'vitest';
import { profileFillCount, getStage, nextMissingDimension } from '@/lib/session';
import type { UserProfile } from '@/types';

describe('profileFillCount', () => {
  it('returns 0 for empty profile', () => {
    expect(profileFillCount({})).toBe(0);
  });

  it('counts string fields that are non-empty', () => {
    expect(profileFillCount({ grade: '大三', major: '计算机' } as Partial<UserProfile>)).toBe(2);
  });

  it('counts array fields with entries', () => {
    expect(profileFillCount({ interests: ['coding'], lifestyle: ['WLB'] } as Partial<UserProfile>)).toBe(2);
  });

  it('ignores empty arrays', () => {
    expect(profileFillCount({ interests: [] } as Partial<UserProfile>)).toBe(0);
  });

  it('returns 6+ for a well-filled profile', () => {
    const p: Partial<UserProfile> = {
      grade: '大三', major: 'CS', universityTier: '985', targetCity: '上海',
      householdBudget: 200000, interests: ['code'], lifestyle: ['WLB'], redLines: ['no 996'],
    };
    expect(profileFillCount(p)).toBe(8);
  });
});

describe('getStage', () => {
  it('returns adjust when hasRoutes is true', () => {
    expect(getStage({}, true, false)).toBe('adjust');
  });

  it('returns plan when user wants plan', () => {
    expect(getStage({ major: 'CS' } as Partial<UserProfile>, false, true)).toBe('plan');
  });

  it('returns plan when profile is filled enough', () => {
    const p: Partial<UserProfile> = {
      grade: '大三', major: 'CS', universityTier: '211', targetCity: '北京',
      householdBudget: 200000, interests: ['code'],
    };
    expect(getStage(p, false, false)).toBe('plan');
  });

  it('returns collect for sparse profile', () => {
    expect(getStage({ grade: '大一' } as Partial<UserProfile>, false, false)).toBe('collect');
  });
});

describe('nextMissingDimension', () => {
  it('returns first missing key', () => {
    const result = nextMissingDimension({ grade: '大二' } as Partial<UserProfile>);
    expect(result).toBeTruthy();
    expect(result).not.toBe('你现在大几？');
  });
});
