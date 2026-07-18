'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { getStreak, getStreakHistory, formatDateKey } from '@/lib/streak-store';
import { cn } from '@/lib/utils';

interface StreakCalendarProps {}

const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
const DAY_NAMES = ['一', '二', '三', '四', '五', '六', '日'];

function cellColor(count: number): string {
  if (count === 0) return 'bg-secondary/40';
  if (count <= 2) return 'bg-emerald-100';
  if (count <= 4) return 'bg-emerald-200';
  if (count <= 8) return 'bg-emerald-400';
  return 'bg-emerald-600';
}

interface DayCell {
  date: string;
  count: number;
  activities: string[];
}

export function StreakCalendar(_props: StreakCalendarProps) {
  const [offset, setOffset] = useState(0); // 0 = current half, negative = past
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const streak = getStreak();
  const allDates = useMemo(() => getStreakHistory(), []);

  // Generate 180 days of cells
  const cells = useMemo(() => {
    const result: DayCell[] = [];
    const now = new Date();
    for (let i = 179 + offset * 30; i >= offset * 30; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = formatDateKey(d);
      const count = allDates.filter(dt => dt === key).length;
      result.push({ date: key, count: Math.min(count, 5), activities: [] });
    }
    return result;
  }, [allDates, offset]);

  // Group by week rows
  const weeks: DayCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  // Month labels
  const monthMarkers: { label: string; col: number }[] = [];
  let lastMonth = '';
  cells.forEach((c, i) => {
    const m = c.date.slice(5, 7);
    if (m !== lastMonth) {
      lastMonth = m;
      monthMarkers.push({ label: MONTH_NAMES[parseInt(m) - 1], col: Math.floor(i / 7) });
    }
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-bold text-foreground">活跃记录</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-primary">
            连续打卡 {streak} 天
          </span>
          {streak >= 7 && <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">🏅 七日之约</span>}
        </div>
      </div>

      {/* Month navigation */}
      <div className="flex items-center gap-2 mb-3">
        <button onClick={() => setOffset(o => o - 1)} className="p-1 rounded hover:bg-secondary transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button onClick={() => setOffset(o => o < 0 ? o + 1 : 0)} className="p-1 rounded hover:bg-secondary transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Month labels row */}
      <div className="flex ml-8 mb-1">
        {monthMarkers.map((mm, i) => (
          <span key={i} className="text-[10px] text-muted-foreground" style={{ width: `${(mm.col + 1) * 16}px` }}>
            {mm.label}
          </span>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="flex gap-0.5">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 mr-1">
          {DAY_NAMES.map((d, i) => (
            <span key={i} className="text-[9px] text-muted-foreground h-3 w-4 flex items-center">{d}</span>
          ))}
        </div>

        {/* Cells */}
        <div className="flex gap-0.5 flex-1 overflow-x-auto">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((cell, di) => {
                const todayKey = formatDateKey(new Date());
                const isToday = cell.date === todayKey;
                const isSelected = cell.date === selectedDay;

                return (
                  <button
                    key={`${wi}-${di}`}
                    onClick={() => setSelectedDay(isSelected ? null : cell.date)}
                    className={cn(
                      'w-3 h-3 rounded-sm transition-all duration-200',
                      cellColor(cell.count),
                      isToday && 'ring-1 ring-primary',
                      isSelected && 'ring-2 ring-primary/60 scale-125',
                      'hover:scale-150 hover:z-10 hover:ring-1 hover:ring-foreground/20'
                    )}
                    style={{ animationDelay: `${(wi * 7 + di) * 0.005}s` }}
                    title={`${cell.date}: ${cell.count} 次互动`}
                    aria-label={`${cell.date}: ${cell.count} 次互动`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1 mt-3 text-[10px] text-muted-foreground">
        <span>少</span>
        <span className={cn('w-3 h-3 rounded-sm', cellColor(0))} />
        <span className={cn('w-3 h-3 rounded-sm', cellColor(1))} />
        <span className={cn('w-3 h-3 rounded-sm', cellColor(3))} />
        <span className={cn('w-3 h-3 rounded-sm', cellColor(5))} />
        <span className={cn('w-3 h-3 rounded-sm', cellColor(9))} />
        <span>多</span>
      </div>

      {/* Dynamic tip */}
      {streak > 0 && streak < 7 && (
        <p className="mt-3 text-xs text-muted-foreground">
          💡 再坚持 <span className="font-semibold text-primary">{7 - streak}</span> 天就能解锁「七日之约」徽章！
        </p>
      )}
    </div>
  );
}
