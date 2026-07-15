'use client';

import { useState } from 'react';
import { RESOURCE_INDEX } from '@/data/resources';

export function ResourcePanel() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = search
    ? RESOURCE_INDEX.map(cat => ({ ...cat, links: cat.links.filter(l =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.description.toLowerCase().includes(search.toLowerCase())) }))
      .filter(cat => cat.links.length > 0)
    : RESOURCE_INDEX;

  const displayCategories = activeCategory ? filtered.filter(c => c.id === activeCategory) : filtered;
  const totalLinks = RESOURCE_INDEX.reduce((s, c) => s + c.links.length, 0);

  const content = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="shrink-0 border-b border-cream-line/50 px-4 py-3">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-espresso">
            <span>📚</span><span>参考书架</span>
            <span className="rounded-full bg-cream-line/30 px-1.5 py-0.5 text-[10px] text-espresso-light">{totalLinks}</span>
          </h2>
          <button onClick={() => setOpen(false)} className="rounded p-0.5 text-espresso-light hover:text-espresso-muted lg:hidden">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <p className="mb-2 text-[11px] leading-relaxed text-espresso-light">
          不搬运数据，只索引「去哪找」。点链接去源站。
        </p>
        <div className="relative">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="搜索..."
            className="w-full rounded-lg border border-cream-line bg-white py-1.5 pl-8 pr-3 text-xs text-espresso placeholder-espresso-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta/20" />
          <svg className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-espresso-light" fill="none" viewBox="0 0 16 16">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Tabs */}
      <div className="shrink-0 flex gap-1 overflow-x-auto border-b border-cream-line/50 px-3 py-2">
        <button onClick={() => setActiveCategory(null)}
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${!activeCategory ? 'bg-espresso text-cream' : 'bg-cream-line/20 text-espresso-muted hover:bg-cream-line/40'}`}>
          全部
        </button>
        {RESOURCE_INDEX.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${cat.id === activeCategory ? 'bg-espresso text-cream' : 'bg-cream-line/20 text-espresso-muted hover:bg-cream-line/40'}`}>
            {cat.icon}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {displayCategories.length === 0 && <p className="py-12 text-center text-sm text-espresso-light">无匹配</p>}
        {displayCategories.map(cat => (
          <div key={cat.id} className="mb-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm">{cat.icon}</span>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-espresso-light">{cat.title}</h3>
            </div>
            {!activeCategory && <p className="mb-2.5 text-[11px] leading-relaxed text-espresso-light">{cat.description}</p>}
            <div className="space-y-1.5">
              {cat.links.map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="group block rounded-lg border border-cream-line bg-white p-2.5 shadow-card transition-all hover:border-terracotta/30 hover:shadow-card-hover">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[13px] font-medium text-espresso group-hover:text-terracotta-deep">{link.name}</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0 text-espresso-light group-hover:text-terracotta">
                      <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-espresso-muted">{link.description}</p>
                  {link.needProxy && <span className="mt-1 inline-block text-[10px] text-espresso-light">需科学上网</span>}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="shrink-0 border-t border-cream-line/50 px-4 py-2 text-center text-[10px] text-espresso-light">
        链接指向外部网站 · 最后更新 2026-07
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-4 z-40 flex items-center gap-1.5 rounded-full border border-terracotta/30 bg-white px-3.5 py-2 text-sm font-medium text-espresso shadow-popover transition-all hover:shadow-lg lg:hidden ${open ? 'opacity-0 pointer-events-none' : ''}`}>
        <span>📚</span><span>书架</span>
      </button>
      {open && <div className="fixed inset-0 z-30 bg-espresso/30 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />}
      <div className={`fixed inset-y-0 right-0 z-30 w-full max-w-sm bg-cream shadow-panel transition-transform duration-300 lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {content}
      </div>
      <div className="hidden lg:block lg:h-full">{content}</div>
    </>
  );
}
