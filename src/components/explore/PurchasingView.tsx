'use client';

import { useState, useMemo, useEffect } from 'react';
import { MapPin, Info } from 'lucide-react';
import { loadAllData, getSalaryRanking, getCityCosts } from '@/lib/data-store';

// 顺序经色觉缺陷（CVD）邻接校验，请勿随意重排
const SERIES_COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#f97316', '#06b6d4', '#ec4899'];

const MAX_SELECT = 8;
const DEFAULT_SELECT_COUNT = 5;
const TOP_MAJOR_COUNT = 30;
const CITY_CHIP_COUNT = 10;
const DEFAULT_CITY = '上海';

interface MajorRow { name: string; salary: number; field: string }
interface CityRow { name: string; monthly: number }

function fmtSigned(v: number): string {
  return `${v < 0 ? '-' : ''}¥${Math.abs(v).toLocaleString()}`;
}

export function PurchasingView() {
  const [majors, setMajors] = useState<MajorRow[]>([]);
  const [cities, setCities] = useState<CityRow[]>([]);
  // 专业名 → 系列色下标：颜色跟随专业本身，增删选择不重排幸存者的颜色
  const [colorMap, setColorMap] = useState<Map<string, number>>(new Map());
  const [selCity, setSelCity] = useState(DEFAULT_CITY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true); setError(false);
    loadAllData().then(ok => {
      if (ok) {
        const top = [...getSalaryRanking()].sort((a, b) => b.salary - a.salary).slice(0, TOP_MAJOR_COUNT);
        setMajors(top);
        setCities(getCityCosts().slice(0, CITY_CHIP_COUNT).map(c => ({ name: c.name, monthly: c.monthly })));
        setColorMap(new Map(top.slice(0, DEFAULT_SELECT_COUNT).map((m, i) => [m.name, i])));
      } else { setError(true); }
      setLoading(false);
    }).catch(() => { setError(true); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const toggle = (name: string) => {
    setColorMap(prev => {
      const next = new Map(prev);
      if (next.has(name)) {
        if (next.size > 1) next.delete(name);
        return next;
      }
      if (next.size >= MAX_SELECT) return prev;
      const used = new Set(next.values());
      let idx = 0;
      while (used.has(idx) && idx < SERIES_COLORS.length - 1) idx += 1;
      next.set(name, idx);
      return next;
    });
  };

  const rows = useMemo(() => majors.filter(m => colorMap.has(m.name)).sort((a, b) => b.salary - a.salary), [majors, colorMap]);
  const cityData = cities.find(c => c.name === selCity) || cities[0];
  const cityMonthly = cityData && cityData.monthly > 0 ? cityData.monthly : 0;
  const ratios = rows.map(m => (cityMonthly > 0 ? m.salary / cityMonthly : 0));
  const maxRatio = Math.max(...ratios, 1);
  const balancePos = Math.min(100, (1 / maxRatio) * 100);

  if (loading) return <div className="flex items-center justify-center h-full"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  if (error || majors.length === 0 || cityMonthly <= 0) return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <p className="text-sm text-muted-foreground">{error ? '数据加载失败' : '暂无可用数据'}</p>
      <button onClick={load} className="text-xs text-primary hover:underline">重试</button>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground mb-1">城市购买力</h2>
        <p className="text-sm text-muted-foreground mb-6">专业月薪能覆盖几个月的城市消费，结余多少</p>

        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground mr-1"><MapPin className="inline h-3.5 w-3.5" /> 城市：</span>
          {cities.map(c => (
            <button key={c.name} onClick={() => setSelCity(c.name)} aria-pressed={c.name === cityData.name}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${c.name === cityData.name ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
              {c.name} 消费¥{c.monthly.toLocaleString()}/月
            </button>
          ))}
        </div>

        <div className="mb-2 space-y-2">
          {rows.map(m => {
            const ratio = m.salary / cityMonthly;
            const surplus = m.salary - cityMonthly;
            const colorIdx = colorMap.get(m.name) ?? 0;
            return (
              <div key={m.name} className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span className="w-36 truncate text-right text-[11px] text-muted-foreground" title={m.name}>{m.name}</span>
                <div className="relative h-5 flex-1 min-w-[140px] rounded-full bg-secondary">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (ratio / maxRatio) * 100)}%`, backgroundColor: SERIES_COLORS[colorIdx % SERIES_COLORS.length] }} />
                  <div aria-hidden className="pointer-events-none absolute inset-y-0 border-l border-dashed border-foreground/25" style={{ left: `${balancePos}%` }} />
                </div>
                <span className="w-44 shrink-0 whitespace-nowrap text-[11px] tabular-nums">
                  <span className="font-semibold text-foreground">×{ratio.toFixed(2)}</span>
                  <span className={`ml-2 text-[10px] ${surplus < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                    结余 {fmtSigned(surplus)}/月{surplus < 0 && '（入不敷出）'}
                  </span>
                </span>
              </div>
            );
          })}
          <div className="flex flex-wrap items-center gap-x-2 pt-2 mt-1 border-t border-dashed border-border/40">
            <span className="w-36 text-right text-[10px] text-muted-foreground/60">收支平衡线 ×1</span>
            <div className="relative h-5 flex-1 min-w-[140px]">
              <div aria-hidden className="absolute inset-y-0 border-l border-dashed border-foreground/40" style={{ left: `${balancePos}%` }} />
            </div>
            <span className="w-44 shrink-0 text-[10px] text-muted-foreground/60">月薪 = 城市月均消费</span>
          </div>
        </div>

        <p className="mb-6 text-[10px] leading-relaxed text-muted-foreground/60">购买力 = 专业全国平均月薪 ÷ 城市月均消费支出（国家统计局口径）；专业薪资为全国均值，未按城市调整，仅供横向比较。</p>

        <div className="rounded-2xl border border-border/30 bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-xs text-muted-foreground">点击选择对比专业（1–{MAX_SELECT} 个，按全国平均月薪前 {TOP_MAJOR_COUNT}）</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {majors.map(m => {
              const idx = colorMap.get(m.name);
              const isSelected = idx !== undefined;
              return (
                <button key={m.name} onClick={() => toggle(m.name)} aria-pressed={isSelected}
                  className={`rounded-lg px-3 py-1.5 text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isSelected ? 'bg-foreground text-background shadow-sm' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}>
                  {isSelected && <span aria-hidden className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle" style={{ backgroundColor: SERIES_COLORS[idx % SERIES_COLORS.length] }} />}
                  {m.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
