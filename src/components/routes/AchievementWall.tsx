'use client';

import { useState, useMemo } from 'react';
import { Trophy } from 'lucide-react';
import type { AppContext } from '@/lib/achievement-store';
import { ACHIEVEMENTS, getAchievements } from '@/lib/achievement-store';
import { cn } from '@/lib/utils';

type Category = 'all' | 'route' | 'streak' | 'explore' | 'growth' | 'special';

const FILTER_ITEMS: { key: Category; label: string; icon: string }[] = [
  { key: 'all', label: '全部', icon: '🏆' },
  { key: 'route', label: '路线', icon: '🥇' },
  { key: 'streak', label: '打卡', icon: '🔥' },
  { key: 'explore', label: '探索', icon: '🔍' },
  { key: 'growth', label: '成长', icon: '🧬' },
  { key: 'special', label: '特殊', icon: '💎' },
];

interface AchievementWallProps {
  context: AppContext;
}

export function AchievementWall({ context }: AchievementWallProps) {
  const [category, setCategory] = useState<Category>('all');
  const unlockedIds = useMemo(() => new Set(getAchievements().map(a => a.id)), [context]);
  const unlockedCount = unlockedIds.size;

  const filtered = useMemo(() => {
    let list = ACHIEVEMENTS;
    if (category !== 'all') list = list.filter(a => a.category === category);
    return list;
  }, [category]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            成就大厅
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            已解锁 <span className="font-semibold text-primary">{unlockedCount}</span> / {ACHIEVEMENTS.length} 枚徽章
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_ITEMS.map(item => (
          <button
            key={item.key}
            onClick={() => setCategory(item.key)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200',
              category === item.key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
            )}
            aria-pressed={category === item.key}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((badge, idx) => {
          const isUnlocked = unlockedIds.has(badge.id);
          const progress = badge.progress?.(context);
          const hasProgress = progress && !isUnlocked && progress.current > 0;
          const progressPct = progress ? Math.round((progress.current / progress.target) * 100) : 0;

          return (
            <button
              key={badge.id}
              disabled={!isUnlocked}
              className={cn(
                'relative flex flex-col items-center rounded-xl border p-4 text-center transition-all duration-300',
                isUnlocked
                  ? 'badge-hover border-amber-200/60 bg-gradient-to-b from-amber-50/50 to-card cursor-pointer'
                  : 'border-border/40 bg-card/50 cursor-default',
                `badge-enter badge-enter-${(idx % 20) + 1}`
              )}
              aria-label={`${badge.title}${isUnlocked ? ' — 已解锁' : ' — 未解锁'}`}
            >
              {/* Icon */}
              <div
                className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-full text-3xl transition-all duration-500',
                  isUnlocked
                    ? 'bg-amber-50 border-2 border-amber-200'
                    : 'bg-secondary/50 border border-border/30 grayscale opacity-50'
                )}
              >
                {badge.icon}
              </div>

              {/* Title */}
              <span className={cn(
                'mt-2 text-sm font-semibold',
                isUnlocked ? 'text-foreground' : 'text-muted-foreground/70'
              )}>
                {badge.title}
              </span>

              {/* Description or unlock condition */}
              <span className="mt-1 text-[11px] text-muted-foreground/60 leading-tight">
                {isUnlocked ? badge.description : badge.condition}
              </span>

              {/* Progress bar (only for in-progress badges) */}
              {hasProgress && (
                <div className="mt-2 w-full">
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
                    <span>{progress!.current}/{progress!.target}</span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Unlocked date */}
              {isUnlocked && (
                <span className="mt-2 text-[10px] text-emerald-600 font-medium">
                  ✅ 已解锁
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Empty state for filtered empty */}
      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          <p>该分类暂无徽章</p>
        </div>
      )}
    </div>
  );
}
