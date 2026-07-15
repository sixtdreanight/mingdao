'use client';

import { useState } from 'react';
import { RESOURCE_INDEX, type ResourceCategory } from '@/data/resources';

export function ResourcePanel() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = search
    ? RESOURCE_INDEX.map((cat) => ({
        ...cat,
        links: cat.links.filter(
          (l) =>
            l.name.toLowerCase().includes(search.toLowerCase()) ||
            l.description.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter((cat) => cat.links.length > 0)
    : RESOURCE_INDEX;

  return (
    <>
      {/* Toggle button — mobile only */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed right-4 top-16 z-40 flex items-center gap-1.5 rounded-full border border-amber-light/60 bg-white px-3 py-1.5 text-sm font-medium text-ink shadow-sm transition-all hover:shadow-md lg:hidden ${
          open ? 'opacity-0 pointer-events-none' : ''
        }`}
      >
        <span>📚</span>
        <span>资源</span>
      </button>

      {/* Panel overlay — mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel — sliding on mobile, static sidebar on desktop */}
      <aside
        className={`fixed right-0 top-14 z-30 flex h-[calc(100vh-3.5rem)] w-full max-w-sm flex-col border-l border-amber-light/30 bg-white shadow-lg transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        } lg:static lg:z-0 lg:h-full lg:w-full lg:max-w-none lg:translate-x-0 lg:border-l-0 lg:shadow-none`}
      >
        {/* Panel header */}
        <div className="border-b border-amber-light/20 px-4 py-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 text-sm font-semibold text-ink">
              <span>📚</span>
              <span>资源索引</span>
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="rounded p-0.5 text-ink-faint transition-colors hover:text-ink-muted lg:hidden"
              aria-label="关闭"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="mb-2 text-xs text-ink-muted">
            不搬运数据，只告诉你权威数据在哪。自己去查，最可靠。
          </p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索资源..."
            className="w-full rounded-lg border border-amber-light/40 bg-paper px-3 py-1.5 text-xs text-ink placeholder-ink-faint focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/20"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-amber-light/20 px-3 py-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
              !activeCategory
                ? 'bg-amber text-white'
                : 'bg-amber-light/40 text-ink-muted hover:bg-amber-light/60'
            }`}
          >
            全部
          </button>
          {RESOURCE_INDEX.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                cat.id === activeCategory
                  ? 'bg-amber text-white'
                  : 'bg-amber-light/40 text-ink-muted hover:bg-amber-light/60'
              }`}
            >
              {cat.icon} {cat.title}
            </button>
          ))}
        </div>

        {/* Resource list */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {filtered
            .filter((cat) => !activeCategory || cat.id === activeCategory)
            .map((cat) => (
              <CategorySection key={cat.id} category={cat} />
            ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-ink-faint">
              没有匹配的资源
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-amber-light/20 px-4 py-2 text-center text-xs text-ink-faint">
          链接指向外部网站，数据由各平台维护
        </div>
      </aside>
    </>
  );
}

function CategorySection({ category }: { category: ResourceCategory }) {
  return (
    <div className="mb-4">
      <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        <span>{category.icon}</span>
        <span>{category.title}</span>
      </h3>
      <p className="mb-2 text-xs text-ink-faint">{category.description}</p>
      <div className="space-y-1">
        {category.links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg px-2.5 py-2 transition-colors hover:bg-amber-light/20"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-medium text-ink">
                {link.name}
                {link.needProxy && (
                  <span className="ml-1 text-xs text-ink-faint" title="需科学上网">
                    🔗
                  </span>
                )}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="mt-0.5 shrink-0 text-ink-faint"
              >
                <path
                  d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="mt-0.5 text-xs text-ink-muted">{link.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
