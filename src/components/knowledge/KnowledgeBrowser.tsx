'use client';

import { useState, useMemo, useEffect } from 'react';
import type { KnowledgeAtom } from '@/types';
import { ExternalLink, Search, TrendingUp, MapPin } from 'lucide-react';
import { searchAtoms } from '@/data/knowledge';

const QUERIES: { kw: string; cats: string[] }[] = [
  { kw: '2025', cats: ['salary','employment','education','cost','trend'] },
  { kw: '2024', cats: ['salary','cost','policy'] },
  { kw: '薪资', cats: ['salary'] },
  { kw: '就业', cats: ['employment'] },
  { kw: '教育', cats: ['education'] },
  { kw: '生活', cats: ['cost','life'] },
  { kw: '趋势', cats: ['trend','employment'] },
  { kw: '政策', cats: ['policy'] },
];

function StatBadge({ label, value, icon }: { label: string; value: string; icon?: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5">
      {icon && <span className="text-xs">{icon}</span>}
      <span className="text-[10px] text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold text-foreground tabular-nums">{value}</span>
    </div>
  );
}

export function KnowledgeBrowser() {
  const [atoms, setAtoms] = useState<KnowledgeAtom[]>([]);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'default' | 'newest'>('default');
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem('mingdao-bookmarks') || '[]')); } catch { return new Set(); }
  });
  const [loading, setLoading] = useState(true);

  const toggleBookmark = (id: string) => {
    const next = new Set(bookmarks);
    if (next.has(id)) next.delete(id); else next.add(id);
    setBookmarks(next);
    localStorage.setItem('mingdao-bookmarks', JSON.stringify([...next]));
  };

  useEffect(() => {
    Promise.all(QUERIES.map(q => searchAtoms(q.kw, q.cats, 15)))
      .then(results => {
        const seen = new Set<string>();
        setAtoms(results.flat().filter(a => seen.has(a.id) ? false : (seen.add(a.id), true)));
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = atoms.filter(a => {
      if (catFilter && a.category !== catFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q));
    });
    // Sort: bookmarked first, then by date if newest
    if (sortBy === 'newest') result = [...result].sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
    result = [...result].sort((a, b) => (bookmarks.has(b.id) ? 1 : 0) - (bookmarks.has(a.id) ? 1 : 0));
    return result;
  }, [atoms, search, catFilter, sortBy, bookmarks]);

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        加载数据库...
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">数据库</h2>
          <p className="mt-1 text-sm text-muted-foreground">{atoms.length} 条结构化数据，来自官方统计与权威报告</p>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-2.5 shadow-sm transition-colors focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/10">
            <Search className="h-4 w-4 text-muted-foreground/40" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索薪资、城市、专业..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/40" />
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => setSortBy(s => s === 'default' ? 'newest' : 'default')}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${sortBy === 'newest' ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
              {sortBy === 'newest' ? '🕐 最新' : '📌 默认'}
            </button>
            {['salary','cost','employment','education','trend','policy','life'].map(c => (
              <button key={c} onClick={() => setCatFilter(c === catFilter ? null : c)}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${c === catFilter ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                {{salary:'薪资',cost:'生活',employment:'就业',education:'教育',trend:'趋势',policy:'政策',life:'工作生活'}[c]}
              </button>
            ))}
          </div>
        </div>

        {/* Data Cards */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <Search className="mb-3 h-8 w-8 text-muted-foreground/20" />
              <p className="text-sm text-muted-foreground">没有匹配的数据</p>
              <p className="mt-1 text-xs text-muted-foreground/60">试试其他关键词</p>
            </div>
          ) : filtered.map(atom => (
            <div key={atom.id} className="group rounded-2xl border border-border/30 bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-foreground">{atom.title}</h3>
                    {atom.trustLevel === 'official' && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">官方数据</span>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); toggleBookmark(atom.id); }}
                      className={`ml-auto rounded-lg px-2 py-1 text-xs transition-colors ${bookmarks.has(atom.id) ? 'bg-amber-100 text-amber-700' : 'opacity-0 group-hover:opacity-100 text-muted-foreground hover:bg-secondary'}`}>
                      {bookmarks.has(atom.id) ? '★ 已收藏' : '☆ 收藏'}
                    </button>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{atom.content}</p>
                </div>
              </div>

              {/* Structured data as stat badges */}
              {atom.data && typeof atom.data === 'object' && (
                <div className="mb-4 rounded-xl bg-secondary/30 px-4 py-3">
                  {(() => {
                    const d = atom.data as any;
                    return (
                      <div className="space-y-2">
                        {d.nationalAverage && <StatBadge icon="📊" label="全国均薪" value={`¥${Number(d.nationalAverage).toLocaleString()}`} />}
                        {d.source && <p className="text-[10px] text-muted-foreground/50">来源：{String(d.source)}</p>}
                        {d.topMajors && <div><span className="text-[10px] font-medium text-muted-foreground tracking-wide">高薪专业 Top5</span><div className="mt-1 flex flex-wrap gap-1.5">{d.topMajors.slice(0,5).map((m:any,i:number)=><span key={i} className="inline-flex items-center gap-1 rounded-lg bg-background/80 px-2.5 py-1 text-xs"><span className="text-[10px] text-muted-foreground">#{i+1}</span><span className="font-medium">{m.name}</span><span className="tabular-nums text-primary">¥{Number(m.salary).toLocaleString()}</span></span>)}</div></div>}
                        {d.citySalaries && <div><span className="text-[10px] font-medium text-muted-foreground tracking-wide">城市薪资 Top5</span><div className="mt-1 flex flex-wrap gap-1.5">{Object.entries(d.citySalaries as Record<string,number>).slice(0,5).map(([c,s])=> <span key={c} className="inline-flex items-center gap-1 rounded-lg bg-background/80 px-2.5 py-1 text-xs"><MapPin className="h-3 w-3 text-muted-foreground/50"/>{c}<span className="tabular-nums font-medium text-primary">¥{s.toLocaleString()}</span></span>)}</div></div>}
                        {d.greenMajors && <div><span className="text-[10px] font-medium text-muted-foreground tracking-wide">绿牌专业</span><div className="mt-1 flex flex-wrap gap-1">{d.greenMajors.map((m:string)=><span key={m} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">{m}</span>)}</div></div>}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Tags & Source */}
              <div className="flex items-center gap-2 flex-wrap">
                {atom.tags.map(t => (
                  <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">{t}</span>
                ))}
                {atom.sourceUrl?.startsWith('http') && (
                  <a href={atom.sourceUrl} target="_blank" rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1 rounded-lg border border-border/40 px-3 py-1 text-xs text-foreground/60 transition-colors hover:border-primary/30 hover:text-primary">
                    <ExternalLink className="h-3 w-3" />查看来源
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
