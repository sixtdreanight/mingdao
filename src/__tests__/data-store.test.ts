import { describe, it, expect } from 'vitest';
import { getSalaryRanking, getCityCosts, getIndustries, getNationalAvg } from '@/lib/data-store';

describe('data-store default state', () => {
  it('returns empty arrays before load', () => {
    expect(Array.isArray(getSalaryRanking())).toBe(true);
    expect(Array.isArray(getCityCosts())).toBe(true);
    expect(Array.isArray(getIndustries())).toBe(true);
  });

  it('nationalAvg is 0 before load', () => {
    expect(getNationalAvg()).toBe(0);
  });
});
