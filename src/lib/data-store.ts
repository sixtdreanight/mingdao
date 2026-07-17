/**
 * 统一数据中心 — 从 public/data/*.json 加载，爬虫定期更新。
 */

interface SalaryEntry { name: string; salary: number; field: string }
interface CityEntry { name: string; monthly: number; housingPct: number; income: number }
interface IndustryEntry { name: string; nonPrivate: number; private: number }

let _salaries: SalaryEntry[] = [];
let _cities: CityEntry[] = [];
let _industries: IndustryEntry[] = [];
let _nationalAvg = 0;
let _source = '';
let _loaded = false;
let _error: string | null = null;
let _loadPromise: Promise<void> | null = null;

export async function loadAllData(): Promise<boolean> {
  if (_loaded) return true;
  if (_loadPromise) return _loadPromise.then(() => true).catch(() => false);
  _loadPromise = (async () => {
    try {
      const results = await Promise.allSettled([
        fetch('/data/salaries.json').then(async r => { if (!r.ok) throw new Error('salaries fetch failed'); return r.json(); }),
        fetch('/data/cities.json').then(async r => { if (!r.ok) throw new Error('cities fetch failed'); return r.json(); }),
        fetch('/data/industries.json').then(async r => { if (!r.ok) throw new Error('industries fetch failed'); return r.json(); }),
      ]);
      const [s, c, i] = results;
      if (s.status === 'fulfilled') {
        _salaries = s.value.data || [];
        _nationalAvg = s.value.nationalAvg || 0;
        _source = s.value.source || '';
      }
      if (c.status === 'fulfilled') _cities = c.value.data || [];
      if (i.status === 'fulfilled') _industries = i.value.data || [];
      _loaded = true;
    } catch {
      _error = '数据加载失败';
    }
  })();
  try { await _loadPromise; return _loaded; } catch { return false; }
}

export function getSalaryRanking(): SalaryEntry[] { return _salaries; }
export function getCityCosts(): CityEntry[] { return _cities; }
export function getIndustries(): IndustryEntry[] { return _industries; }
export function getNationalAvg(): number { return _nationalAvg; }
export function getDataSource(): string { return _source; }
export function hasLoadError(): boolean { return !_loaded && _error !== null; }
