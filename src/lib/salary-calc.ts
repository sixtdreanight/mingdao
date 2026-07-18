/**
 * 税后到手工资估算 — 纯函数，无 I/O。
 *
 * 基于 2025 年全国通行五险一金个人缴纳比例 + 七级超额累进个税。
 *
 * @remarks
 * - 个人缴纳比例：养老 8%、医疗 2%、失业 0.5%、公积金默认 7%（5%-12% 可调）。
 * - 缴费基数简化假设：以税前工资为基数，不考虑各城市基数上下限。
 * - 个税按年度综合所得预扣后均摊到月，免征额 ¥60,000/年。
 * - 不含专项附加扣除（租房、赡养等），结果偏保守。
 * - 所有金额四舍五入到整数元。
 *
 * @param gross 税前月薪（元）
 * @param housingFundRate 公积金个人缴纳比例，默认 0.07
 * @returns 到手工资明细
 */

export interface NetSalaryBreakdown {
  gross: number;
  pension: number;
  medical: number;
  unemployment: number;
  housingFund: number;
  socialTotal: number;
  monthlyTax: number;
  net: number;
}

export const ASSUMPTIONS_NOTE =
  '按个人缴纳养老8%+医疗2%+失业0.5%+公积金7%估算，各城市基数上下限未计入，不含专项附加扣除，仅供参考';

/** 个税 = 年度应纳税所得额 × 适用税率 − 速算扣除数 */
function calcAnnualTax(taxable: number): number {
  if (taxable <= 0) return 0;
  if (taxable <= 36000) return taxable * 0.03;
  if (taxable <= 144000) return taxable * 0.10 - 2520;
  if (taxable <= 300000) return taxable * 0.20 - 16920;
  if (taxable <= 420000) return taxable * 0.25 - 31920;
  if (taxable <= 660000) return taxable * 0.30 - 52920;
  if (taxable <= 960000) return taxable * 0.35 - 85920;
  return taxable * 0.45 - 181920;
}

export function estimateNetSalary(
  gross: number,
  housingFundRate: number = 0.07
): NetSalaryBreakdown {
  if (gross <= 0) {
    return {
      gross: 0, pension: 0, medical: 0, unemployment: 0,
      housingFund: 0, socialTotal: 0, monthlyTax: 0, net: 0,
    };
  }

  const pension = Math.round(gross * 0.08);
  const medical = Math.round(gross * 0.02);
  const unemployment = Math.round(gross * 0.005);
  const housingFund = Math.round(gross * housingFundRate);
  const socialTotal = pension + medical + unemployment + housingFund;

  const annualTaxable = Math.max(0, gross * 12 - 60000 - socialTotal * 12);
  const annualTax = calcAnnualTax(annualTaxable);
  const monthlyTax = Math.round(annualTax / 12);

  const net = gross - socialTotal - monthlyTax;

  return { gross, pension, medical, unemployment, housingFund, socialTotal, monthlyTax, net };
}
