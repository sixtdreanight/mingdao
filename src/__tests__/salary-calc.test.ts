import { describe, it, expect } from 'vitest';
import { estimateNetSalary, ASSUMPTIONS_NOTE } from '@/lib/salary-calc';

describe('estimateNetSalary', () => {
  it('returns zeros for non-positive gross', () => {
    expect(estimateNetSalary(0).net).toBe(0);
    expect(estimateNetSalary(-100).net).toBe(0);
  });

  it('gross 5000 → no tax (annual taxable <= 0)', () => {
    // pension 400 + medical 100 + unemployment 25 + fund 350 = 875
    // annualTaxable = 60000 - 60000 - 10500 = 0 → tax 0
    const r = estimateNetSalary(5000);
    expect(r.socialTotal).toBe(875);
    expect(r.monthlyTax).toBe(0);
    expect(r.net).toBe(4125);
  });

  it('gross 6980 (计算机专业均薪) → net 5735', () => {
    // social: 558+140+35+489 = 1222
    // annualTaxable = 83760-60000-14664 = 9096 → 3% = 272.88 → monthly 23
    const r = estimateNetSalary(6980);
    expect(r.socialTotal).toBe(1222);
    expect(r.monthlyTax).toBe(23);
    expect(r.net).toBe(5735);
  });

  it('gross 10000 → bracket 2 (10%)', () => {
    // social 1750; annualTaxable = 120000-60000-21000 = 39000
    // tax = 39000*0.10-2520 = 1380 → monthly 115
    const r = estimateNetSalary(10000);
    expect(r.socialTotal).toBe(1750);
    expect(r.monthlyTax).toBe(115);
    expect(r.net).toBe(8135);
  });

  it('gross 50000 → bracket 5 (30%)', () => {
    // social 8750; annualTaxable = 600000-60000-105000 = 435000
    // tax = 435000*0.30-52920 = 77580 → monthly 6465
    const r = estimateNetSalary(50000);
    expect(r.monthlyTax).toBe(6465);
    expect(r.net).toBe(34785);
  });

  it('housingFundRate affects net', () => {
    const low = estimateNetSalary(10000, 0.05);
    const high = estimateNetSalary(10000, 0.12);
    // 0.05: social 1550, taxable 41400 → tax 1620 → monthly 135 → net 8315
    expect(low.net).toBe(8315);
    // 0.12: social 2250, taxable 33000 → tax 990 → monthly 83 → net 7667
    expect(high.net).toBe(7667);
    expect(low.net).toBeGreaterThan(high.net);
  });

  it('breakdown sums correctly', () => {
    const r = estimateNetSalary(15000);
    expect(r.pension + r.medical + r.unemployment + r.housingFund).toBe(r.socialTotal);
    expect(r.gross - r.socialTotal - r.monthlyTax).toBe(r.net);
  });
});

describe('ASSUMPTIONS_NOTE', () => {
  it('is a non-empty disclaimer', () => {
    expect(ASSUMPTIONS_NOTE.length).toBeGreaterThan(10);
    expect(ASSUMPTIONS_NOTE).toContain('参考');
  });
});
