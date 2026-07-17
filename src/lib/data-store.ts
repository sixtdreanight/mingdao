/**
 * 统一数据中心 — 所有组件从这里取数据，不各自硬编码。
 * 启动时加载全部知识原子，提供类型安全的查询接口。
 */

import type { KnowledgeAtom } from '@/types';
import { searchAtoms } from '@/data/knowledge';

let _atoms: KnowledgeAtom[] = [];
let _loaded = false;

/** 加载全部数据（幂等，多次调用只加载一次） */
export async function loadAllData(): Promise<KnowledgeAtom[]> {
  if (_loaded) return _atoms;
  const queries: { kw: string; cats: string[] }[] = [
    { kw: '2025', cats: ['salary','employment','education','cost','trend','policy','life'] },
    { kw: '2024', cats: ['salary','cost','policy'] },
    { kw: '薪资', cats: ['salary'] },
    { kw: '就业', cats: ['employment'] },
    { kw: '教育', cats: ['education'] },
    { kw: '生活', cats: ['cost','life'] },
    { kw: '趋势', cats: ['trend'] },
    { kw: '政策', cats: ['policy'] },
  ];

  const results = await Promise.all(queries.map(q => searchAtoms(q.kw, q.cats, 20)));
  const seen = new Set<string>();
  _atoms = results.flat().filter(a => seen.has(a.id) ? false : (seen.add(a.id), true));
  _loaded = true;
  return _atoms;
}

/** 获取已加载的数据（需先调用 loadAllData） */
export function getAllAtoms(): KnowledgeAtom[] { return _atoms; }

/** 按分类获取 */
export function getByCategory(cat: string): KnowledgeAtom[] {
  return _atoms.filter(a => a.category === cat && a.trustLevel === 'official');
}

/** 获取薪资排行（从知识原子中提取） */
export function getSalaryRanking(): { name: string; salary: number; industry: string }[] {
  const atom = _atoms.find(a => a.id === 'complete-majors-db-2025');
  if (!atom?.data) return [];
  const disciplines = (atom.data as any).disciplines;
  const all: { name: string; salary: number; industry: string }[] = [];
  for (const [field, info] of Object.entries(disciplines) as [string, any][]) {
    if (info.majors) {
      for (const [name, salary] of Object.entries(info.majors) as [string, any][]) {
        all.push({ name, salary: Number(salary), industry: String(field) });
      }
    }
  }
  return all.sort((a, b) => b.salary - a.salary);
}

/** 获取行业薪资 */
export function getIndustrySalaries(): { name: string; nonPrivate: number; private: number }[] {
  const atom = _atoms.find(a => a.id === 'nbs-industry-salary-2025');
  if (!atom?.data) return [];
  const industries = (atom.data as any).industries;
  return Object.entries(industries).map(([name, data]: [string, any]) => ({
    name, nonPrivate: data.nonPrivate, private: data.private,
  }));
}

/** 获取城市生活成本 */
export function getCityCosts(): { name: string; monthly: number; housingPct: number; income: number }[] {
  const atom = _atoms.find(a => a.id === 'complete-city-costs-2024');
  if (!atom?.data) return [];
  const provinces = (atom.data as any).provinces;
  return Object.entries(provinces).map(([name, data]: [string, any]) => ({
    name, monthly: data.monthly, housingPct: data.housingPct, income: data.income,
  })).sort((a, b) => b.monthly - a.monthly);
}

/** 获取就业趋势 */
export function getJobTrends(): { industry: string; growth: string }[] {
  const atom = _atoms.find(a => a.id === 'job-market-trends-2025');
  if (!atom?.data) return [];
  return Object.entries((atom.data as any).industryGrowth).map(([k, v]) => ({ industry: k, growth: String(v) }));
}
