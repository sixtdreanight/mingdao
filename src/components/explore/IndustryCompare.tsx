'use client';

import { useState, useEffect } from 'react';
import { loadAllData, getIndustries } from '@/lib/data-store';

interface IndustryRow { name: string; nonPrivate: number; private: number }

export function IndustryCompare() {
  const [industries, setIndustries] = useState<IndustryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true); setError(false);
    loadAllData().then(ok => {
      if (ok) setIndustries([...getIndustries()].sort((a, b) => b.nonPrivate - a.nonPrivate));
      else setError(true);
      setLoading(false);
    }).catch(() => { setError(true); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div className="flex items-center justify-center h-full"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  if (error || industries.length === 0) return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <p className="text-sm text-muted-foreground">{error ? '数据加载失败' : '暂无行业数据'}</p>
      <button onClick={load} className="text-xs text-primary hover:underline">重试</button>
    </div>
  );

  const maxValue = Math.max(...industries.map(i => i.nonPrivate), 1);
  const pct = (v: number) => Math.min(100, Math.max(0, (v / maxValue) * 100));

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground mb-1">体制内外薪资差</h2>
        <p className="text-sm text-muted-foreground mb-4">{industries.length} 个行业，非私营与私营单位对比</p>

        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span aria-hidden className="h-2.5 w-2.5 rounded-full bg-primary" /> 非私营(国企/机关/事业)</span>
          <span className="flex items-center gap-1.5"><span aria-hidden className="h-2.5 w-2.5 rounded-full bg-muted-foreground" /> 私营单位</span>
          <span className="text-muted-foreground/60">均为年平均工资</span>
        </div>

        <div className="mb-8 space-y-1">
          {industries.map(ind => {
            const hasPrivate = ind.private > 0;
            const npPct = pct(ind.nonPrivate);
            const pPct = pct(ind.private);
            const lineLeft = Math.min(npPct, pPct);
            const lineWidth = Math.abs(npPct - pPct);
            return (
              <div key={ind.name} className="py-1.5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  <span className="w-40 truncate text-[11px] text-muted-foreground" title={ind.name}>{ind.name}</span>
                  <div className="relative h-6 flex-1 min-w-[180px]">
                    {hasPrivate && (
                      <div aria-hidden className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-muted-foreground/25" style={{ left: `${lineLeft}%`, width: `${lineWidth}%` }} />
                    )}
                    {hasPrivate && (
                      <div className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground ring-2 ring-background" style={{ left: `${pPct}%` }} title={`私营 ¥${ind.private.toLocaleString()}`} />
                    )}
                    <div className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-background" style={{ left: `${npPct}%` }} title={`非私营 ¥${ind.nonPrivate.toLocaleString()}`} />
                  </div>
                  {hasPrivate ? (
                    <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium tabular-nums text-foreground" title="非私营 ÷ 私营 年平均工资">×{(ind.nonPrivate / ind.private).toFixed(1)}</span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">无私营数据</span>
                  )}
                </div>
                {/* 10.5rem = 名称列 w-40 (10rem) + gap-x-2 (0.5rem)，与轨道左缘对齐 */}
                <div className="mt-0.5 flex flex-wrap gap-x-3 text-[10px] tabular-nums text-muted-foreground/70 sm:pl-[10.5rem]">
                  <span>非私营 ¥{ind.nonPrivate.toLocaleString()}</span>
                  {hasPrivate && <span>私营 ¥{ind.private.toLocaleString()}</span>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4">
          <p className="text-xs font-medium text-foreground mb-1">决策提示</p>
          <p className="text-xs leading-relaxed text-muted-foreground">同一行业体制内外差距可达数倍，但稳定性、编制、晋升逻辑完全不同——差距大小由你自己权衡。</p>
        </div>

        <p className="text-[10px] text-muted-foreground/60">数据来源：国家统计局2025年城镇单位就业人员平均工资；部分行业为估算值，仅供参考</p>
      </div>
    </div>
  );
}
