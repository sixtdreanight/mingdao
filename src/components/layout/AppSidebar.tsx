'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
  Sparkles,
  UserCircle,
  Database,
  Library,
  ChevronLeft,
  ChevronRight,
  History,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { id: 'coach',     icon: Sparkles,    label: 'AI规划师', en: 'Coach' },
  { id: 'profile',   icon: UserCircle,  label: '个人画像', en: 'Profile' },
  { id: 'knowledge', icon: Database,    label: '数据库',   en: 'Knowledge' },
  { id: 'resources', icon: Library,     label: '资源库',   en: 'Resources' },
];

const SIDEBAR_WIDTH = 220;
const SIDEBAR_COLLAPSED = 64;

export function AppSidebar({ onOpenHistory }: { onOpenHistory: () => void }) {
  const router = useRouter();
  const params = useSearchParams();
  const activeTab = params.get('tab') || 'coach';
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('mingdao-sidebar-collapsed') === 'true'; }
    catch { return false; }
  });

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    try { localStorage.setItem('mingdao-sidebar-collapsed', String(next)); }
    catch { /* ignore */ }
  };

  const navigate = (tabId: string) => {
    router.push(`/main?tab=${tabId}`);
  };

  return (
    <aside
      className="flex h-screen flex-col border-r border-border/50 bg-[var(--sidebar-background)] transition-[width] duration-200 ease-out"
      style={{ width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH }}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 border-b border-border/30 px-4">
        <button
          onClick={toggleCollapse}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
        {!collapsed && (
          <span className="text-base font-bold tracking-tight text-foreground whitespace-nowrap">
            明道
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-0.5 px-2 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={cn(
                'group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-secondary/80 text-foreground'
                  : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
              )}
            >
              {/* 左侧选中指示线 */}
              {isActive && (
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
              )}
              <item.icon
                className={cn(
                  'h-5 w-5 shrink-0',
                  isActive ? 'text-primary' : 'text-muted-foreground/60'
                )}
                strokeWidth={isActive ? 2 : 1.5}
              />
              {!collapsed && (
                <span className="flex flex-col items-start leading-tight">
                  <span>{item.label}</span>
                  <span className="text-[10px] text-muted-foreground/50">{item.en}</span>
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 底部用户区 */}
      <div className="border-t border-border/30 px-3 py-3">
        <button
          onClick={onOpenHistory}
          className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/40 hover:text-foreground"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            <User className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col items-start leading-tight">
              <span className="text-xs font-medium text-foreground">探索者</span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                <History className="h-3 w-3" /> 历史记录
              </span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
