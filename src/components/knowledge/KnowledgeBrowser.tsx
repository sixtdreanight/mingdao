'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, ExternalLink, ArrowUpDown, ArrowUp, ArrowDown, Bookmark } from 'lucide-react';
import { loadAllAtoms } from '@/data/knowledge';
import type { KnowledgeAtom } from '@/types';

export function KnowledgeBrowser() {
  const [atoms, setAtoms] = useState<KnowledgeAtom[]>([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'default'|'salary'|'name'>('default');
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('desc');
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem('mingdao-bookmarks')||'[]')); } catch { return new Set(); }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadAllAtoms().then(setAtoms).finally(() => setLoading(false)); }, []);

  const toggleBookmark = (id: string) => {
    const next = new Set(bookmarks); next.has(id) ? next.delete(id) : next.add(id);
    setBookmarks(next); localStorage.setItem('mingdao-bookmarks', JSON.stringify([...next]));
  };

  const toggleSort = (key: 'salary'|'name') => {
    if (sortKey === key) setSortDir(d => d==='asc'?'desc':'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  // Extract all individual majors from massive salary atom
  const rows = useMemo(() => {
    const atom = atoms.find(a => a.id === 'massive-salary-data-2025' || a.id === 'complete-majors-db-2025');
    if (!atom?.data) return [];
    const disciplines = (atom.data as any).allMajors || (atom.data as any).disciplines || {};
    const all: { name: string; salary: number; field: string; id: string }[] = [];
    for (const [field, majors] of Object.entries(disciplines) as [string, any][]) {
      if (majors && typeof majors === 'object') {
        for (const [name, salary] of Object.entries(majors) as [string, any][]) {
          all.push({ name, salary: Number(salary), field, id: `major-${name}` });
        }
      }
    }
    // Filter + sort
    let result = search ? all.filter(r => r.name.includes(search) || r.field.includes(search)) : all;
    if (sortKey === 'salary') result = [...result].sort((a,b) => sortDir==='desc'?b.salary-a.salary:a.salary-b.salary);
    else if (sortKey === 'name') result = [...result].sort((a,b) => sortDir==='desc'?b.name.localeCompare(a.name):a.name.localeCompare(b.name));
    // Bookmarks first
    return [...result].sort((a,b) => (bookmarks.has(b.id)?1:0) - (bookmarks.has(a.id)?1:0));
  }, [atoms, search, sortKey, sortDir, bookmarks]);

  const fields = useMemo(() => [...new Set(rows.map(r => r.field))], [rows]);
  const avg = 6435;

  // Other atoms (articles)
  const articles = useMemo(() => atoms.filter(a => a.trustLevel === 'official' && a.id !== 'massive-salary-data-2025' && a.id !== 'complete-majors-db-2025'), [atoms]);

  if (loading) return <div className="flex items-center justify-center h-full"><div className="skeleton h-96 w-full max-w-3xl rounded-2xl"/></div>;

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground mb-1">数据库</h2>
        <p className="text-sm text-muted-foreground mb-6">{rows.length} 个专业薪资 · {fields.length} 个学科门类 · {articles.length} 条行业报告</p>

        <div className="mb-4 flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-2.5 shadow-sm">
            <Search className="h-4 w-4 text-muted-foreground/40"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索专业或学科..." className="flex-1 bg-transparent text-sm outline-none"/>
          </div>
        </div>

        {/* Salary table */}
        <div className="rounded-2xl border border-border/30 bg-card overflow-hidden shadow-sm mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 bg-secondary/30">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground w-8">#</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground" onClick={()=>toggleSort('name')}>
                    <span className="inline-flex items-center gap-1">专业名称 {sortKey==='name'&&(sortDir==='asc'?<ArrowUp className="h-3 w-3"/>:<ArrowDown className="h-3 w-3"/>)}</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">学科门类</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground" onClick={()=>toggleSort('salary')}>
                    <span className="inline-flex items-center gap-1">月薪(元) {sortKey==='salary'&&(sortDir==='asc'?<ArrowUp className="h-3 w-3"/>:<ArrowDown className="h-3 w-3"/>)}</span>
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">vs 均薪</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground w-12">收藏</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id} className="border-b border-border/10 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-2.5 text-xs text-muted-foreground/50">{i+1}</td>
                    <td className="px-4 py-2.5 font-medium text-foreground">{r.name}</td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{r.field}</td>
                    <td className="px-4 py-2.5 text-right font-semibold tabular-nums">¥{r.salary.toLocaleString()}</td>
                    <td className={`px-4 py-2.5 text-right text-xs tabular-nums ${r.salary>=avg?'text-emerald-600':'text-red-500'}`}>
                      {r.salary>=avg?'+':''}{r.salary-avg}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <button onClick={()=>toggleBookmark(r.id)}
                        className={`rounded p-1 transition-colors ${bookmarks.has(r.id)?'text-amber-500':'text-muted-foreground/20 hover:text-amber-400'}`}>
                        <Bookmark className={`h-4 w-4 ${bookmarks.has(r.id)?'fill-amber-400':''}`}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Article cards for reports */}
        {articles.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">行业报告与政策</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {articles.map(a => (
                <div key={a.id} className="rounded-xl border border-border/30 bg-card p-4 card-hover">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground">{a.title}</h4>
                    <span className="shrink-0 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">官方</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{a.content}</p>
                  {a.sourceUrl?.startsWith('http') && (
                    <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[11px] text-primary hover:underline">
                      <ExternalLink className="h-3 w-3"/>查看来源
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
