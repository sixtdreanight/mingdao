'use client';

import { useState, useMemo } from 'react';
import type { KnowledgeAtom } from '@/types';
import { ExternalLink, Search } from 'lucide-react';
import { searchAtoms } from '@/data/knowledge';

const CAT_LABELS: Record<string, { label: string; icon: string }> = {
  salary: { label: '薪资数据', icon: '💰' },
  education: { label: '教育路径', icon: '🎓' },
  employment: { label: '就业市场', icon: '💼' },
  trend: { label: '行业趋势', icon: '📈' },
  policy: { label: '政策规定', icon: '📋' },
  cost: { label: '生活成本', icon: '🏠' },
  life: { label: '工作生活', icon: '🌿' },
};

const QUERIES = [
  { kw: '薪资', cats: ['salary'] },
  { kw: '生活成本', cats: ['cost'] },
  { kw: '就业', cats: ['employment'] },
  { kw: '教育', cats: ['education'] },
  { kw: '趋势', cats: ['trend'] },
  { kw: '政策', cats: ['policy'] },
];

export function KnowledgeBrowser() {
  const [atoms, setAtoms] = useState<KnowledgeAtom[]>([]);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useState(() => {
    Promise.all(QUERIES.map(q => searchAtoms(q.kw, q.cats, 5)))
      .then(results => {
        const all = results.flat();
        const seen = new Set<string>();
        const unique = all.filter(a => { if (seen.has(a.id)) return false; seen.add(a.id); return true; });
        setAtoms(unique);
      })
      .finally(() => setLoading(false));
  });

  const categories = useMemo(() => [...new Set(atoms.map(a => a.category))], [atoms]);

  const filtered = useMemo(() => {
    return atoms.filter(a => {
      if (catFilter && a.category !== catFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return a.title.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q));
      }
      return true;
    });
  }, [atoms, search, catFilter]);

  if (loading) return <div className="flex items-center justify-center h-full text-sm text-muted-foreground">加载中...</div>;

  return (
    <div className="flex h-full flex-col overflow-hidden p-6">
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground">数据库</h2>
      <p className="mb-3 text-xs text-muted-foreground">
        共 {atoms.length} 条数据，覆盖 {categories.length} 个维度
      </p>

      <div className="mb-4 flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-input bg-background px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted-foreground/50" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索数据..." className="flex-1 bg-transparent text-xs outline-none" />
        </div>
      </div>

      <div className="flex gap-1 mb-4 flex-wrap">
        <button onClick={() => setCatFilter(null)} className={`rounded-lg px-2.5 py-1 text-xs ${!catFilter ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>全部</button>
        {categories.map(c => (
          <button key={c} onClick={() => setCatFilter(c === catFilter ? null : c)} className={`rounded-lg px-2.5 py-1 text-xs ${c === catFilter ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{CAT_LABELS[c]?.icon} {CAT_LABELS[c]?.label || c}</button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">暂无匹配数据</p>
        ) : filtered.map(atom => (
          <div key={atom.id} className="rounded-xl border border-border/40 bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-foreground">{atom.title}</h3>
              <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-medium ${atom.trustLevel === 'official' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                {atom.trustLevel === 'official' ? '官方数据' : 'AI推断'}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground mb-2">{atom.content}</p>
            {atom.data && typeof atom.data === 'object' && Object.keys(atom.data).length > 2 && (
              <div className="mb-2 rounded-lg bg-secondary/40 px-3 py-2 text-xs">
                {Object.entries(atom.data).map(([k, v]) => {
                  if (k === 'source') return null;
                  if (Array.isArray(v)) {
                    return (
                      <div key={k} className="mt-1">
                        <span className="text-muted-foreground font-medium">{k}：</span>
                        {v.map((item, i) => {
                          if (typeof item === 'object' && item) return <span key={i} className="ml-2 text-foreground">{Object.entries(item as Record<string,unknown>).filter(([kk])=>kk!=='source').map(([kk,vv])=>`${kk}:${typeof vv==='number'?vv.toLocaleString():vv}`).join('，')}{i<v.length-1?'；':''}</span>;
                          return <span key={i} className="ml-2">{String(item)}</span>;
                        })}
                      </div>
                    );
                  }
                  return (
                    <div key={k} className="flex justify-between">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium text-foreground">{typeof v === 'number' ? v.toLocaleString() : String(v)}</span>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              {atom.tags.map(t => <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">{t}</span>)}
              {atom.sourceUrl?.startsWith('http') && (
                <a href={atom.sourceUrl} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-1 text-[11px] text-primary hover:underline"><ExternalLink className="h-3 w-3"/>来源</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
