/**
 * 统一数据中心 — 从 public/data/*.json 加载，爬虫定期更新。
 */

interface SalaryEntry { name: string; salary: number; field: string }
interface CityEntry { name: string; monthly: number; housingPct: number; income: number }
interface IndustryEntry { name: string; nonPrivate: number; private: number }

let _salaries: SalaryEntry[] = [];
let _cities: CityEntry[] = [];
let _industries: IndustryEntry[] = [];
let _loaded = false;

export async function loadAllData(): Promise<void> {
  if (_loaded) return;
  try {
    const [s, c, i] = await Promise.all([
      fetch('/data/salaries.json').then(r => r.json()),
      fetch('/data/cities.json').then(r => r.json()),
      fetch('/data/industries.json').then(r => r.json()),
    ]);
    _salaries = s.data || [];
    _cities = c.data || [];
    _industries = i.data || [];
    _loaded = true;
  } catch (e) { console.error('Data load failed:', e); }
}

export function getSalaryRanking(): SalaryEntry[] { return _salaries; }
export function getCityCosts(): CityEntry[] { return _cities; }
export function getIndustries(): IndustryEntry[] { return _industries; }
