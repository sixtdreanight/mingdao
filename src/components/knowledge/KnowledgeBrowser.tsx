'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, ArrowUp, ArrowDown, Bookmark } from 'lucide-react';
import { loadAllAtoms } from '@/data/knowledge';
import type { KnowledgeAtom } from '@/types';

export function KnowledgeBrowser() {
  const [atoms, setAtoms] = useState<KnowledgeAtom[]>([]);
  const [search, setSearch] = useState('');
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

  const rows = useMemo(() => {
    const atom = atoms.find(a => a.id === 'massive-salary-data-2025');
    if (!atom?.data) return [];
    const disciplines = (atom.data as any).allMajors || {};
    const all: { name: string; salary: number; field: string; id: string }[] = [];
    for (const [field, majors] of Object.entries(disciplines) as [string, any][]) {
      if (majors && typeof majors === 'object') {
        for (const [name, salary] of Object.entries(majors) as [string, any][]) {
          all.push({ name, salary: Number(salary), field, id: `m-${name}` });
        }
      }
    }
    let result = search ? all.filter(r => r.name.includes(search) || r.field.includes(search)) : all;
    result = [...result].sort((a,b) => sortDir==='desc'?b.salary-a.salary:a.salary-b.salary);
    return [...result].sort((a,b) => (bookmarks.has(b.id)?1:0) - (bookmarks.has(a.id)?1:0));
  }, [atoms, search, sortDir, bookmarks]);

  const avg = 6435;
  if (loading) return <div className="flex items-center justify-center h-full"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"/></div>;

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">数据库</h2>
            <p className="text-xs text-muted-foreground">{rows.length} 个专业 · {[...new Set(rows.map(r=>r.field))].length} 个学科</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setSortDir(d=>d==='asc'?'desc':'asc')} className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              {sortDir==='desc'?<ArrowDown className="h-3 w-3"/>:<ArrowUp className="h-3 w-3"/>} 薪资排序
            </button>
            <div className="flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-muted-foreground/40"/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索专业..." className="w-40 bg-transparent text-xs outline-none"/>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/20 bg-card overflow-hidden">
          <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <tr className="border-b border-border/20">
                  <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground w-8">#</th>
                  <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground">专业</th>
                  <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground hidden sm:table-cell">学科</th>
                  <th className="px-4 py-2.5 text-right text-[11px] font-medium text-muted-foreground">月薪</th>
                  <th className="px-4 py-2.5 text-right text-[11px] font-medium text-muted-foreground hidden sm:table-cell">vs均</th>
                  <th className="px-4 py-2.5 text-center text-[11px] font-medium text-muted-foreground w-10">收藏</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id} className="border-b border-border/10 hover:bg-secondary/20">
                    <td className="px-4 py-2 text-xs text-muted-foreground/40">{i+1}</td>
                    <td className="px-4 py-2 font-medium">{r.name}</td>
                    <td className="px-4 py-2 text-xs text-muted-foreground hidden sm:table-cell">{r.field}</td>
                    <td className="px-4 py-2 text-right font-semibold tabular-nums">¥{r.salary.toLocaleString()}</td>
                    <td className={`px-4 py-2 text-right text-xs tabular-nums hidden sm:table-cell ${r.salary>=avg?'text-emerald-600':'text-red-500'}`}>
                      {r.salary>=avg?'+':''}{r.salary-avg}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button onClick={()=>toggleBookmark(r.id)}
                        className={bookmarks.has(r.id)?'text-amber-500':'text-muted-foreground/20 hover:text-amber-400'}>
                        <Bookmark className={`h-3.5 w-3.5 ${bookmarks.has(r.id)?'fill-amber-400':''}`}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
