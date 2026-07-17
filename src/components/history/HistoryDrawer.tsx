'use client';

import { useEffect, useState } from 'react';
import { X, Search } from 'lucide-react';
import { getActivities, getStats, type ActivityEntry } from '@/lib/activity-store';

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function HistoryDrawer({ open, onClose }: HistoryDrawerProps) {
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({ totalConversations: 0, competencyAssessments: 0, resourceSaves: 0 });

  useEffect(() => {
    if (open) {
      setActivities(getActivities());
      setStats(getStats());
    }
  }, [open]);

  // Esc 关闭 + focus trap
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const filtered = search.trim()
    ? activities.filter((a) => a.title.includes(search) || (a.detail || '').includes(search))
    : activities;

  if (!open) return null;

  return (
    <>
      {/* backdrop */}
      <div className="fixed inset-0 z-40 bg-black/10" onClick={onClose} />

      {/* drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-screen w-80 flex-col border-l border-border bg-card shadow-xl">
        {/* 头部 */}
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">历史记录</h3>
          <button onClick={onClose} className="rounded p-1 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 搜索 */}
        <div className="border-b border-border/30 px-4 py-2">
          <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground/50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索历史..."
              className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
          </div>
        </div>

        {/* 活动列表 */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-xs text-muted-foreground">
              {search ? '无匹配记录' : '暂无活动记录'}
            </p>
          ) : (
            <div className="space-y-2">
              {filtered.map((a) => (
                <div key={a.id} className="rounded-lg border border-border/40 bg-background px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{a.title}</span>
                    <span className="text-[10px] text-muted-foreground/60">
                      {new Date(a.timestamp).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })}
                    </span>
                  </div>
                  {a.detail && <p className="mt-0.5 text-[11px] text-muted-foreground/70">{a.detail}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 统计 */}
        <div className="border-t border-border/50 px-4 py-3">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg bg-secondary/50 px-3 py-2">
              <p className="text-lg font-bold text-foreground font-serif-hero">{stats.totalConversations}</p>
              <p className="text-[10px] text-muted-foreground">总对话</p>
            </div>
            <div className="rounded-lg bg-secondary/50 px-3 py-2">
              <p className="text-lg font-bold text-foreground font-serif-hero">{stats.competencyAssessments}</p>
              <p className="text-[10px] text-muted-foreground">能力评估</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
