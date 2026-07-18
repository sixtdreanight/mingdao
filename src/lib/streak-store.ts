// src/lib/streak-store.ts
/** 连续访问天数追踪 — localStorage */

const STORAGE_KEY = 'mingdao-streak';

function guard(): boolean {
  return typeof localStorage !== 'undefined';
}

export function formatDateKey(d: Date): string {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

/**
 * 记录一次当日访问。幂等 — 同一天多次调用只记一次。
 */
export function recordVisit(): void {
  if (!guard()) return;
  const today = formatDateKey(new Date());
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const dates: string[] = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(dates)) { localStorage.removeItem(STORAGE_KEY); return; }
    if (!dates.includes(today)) {
      dates.push(today);
      // 保留过去 365 天
      const cutoff = formatDateKey(new Date(Date.now() - 365 * 86400000));
      const filtered = dates.filter(d => d >= cutoff).sort();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch { /* ignore */ }
}

/**
 * 返回当前连续访问天数（从今天往前数，直到遇到中断）。
 */
export function getStreak(): number {
  if (!guard()) return 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const dates: string[] = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(dates) || dates.length === 0) return 0;

    const sorted = [...dates].sort().reverse(); // 最新在前
    const today = formatDateKey(new Date());
    const yesterday = formatDateKey(new Date(Date.now() - 86400000));

    // 今天或昨天必须有记录，否则连续中断
    if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

    let streak = 1;
    const startDate = new Date(sorted[0]);
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(startDate);
      prev.setDate(prev.getDate() - i);
      if (sorted[i] === formatDateKey(prev)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  } catch {
    return 0;
  }
}

/**
 * 返回过去 180 天的访问日期列表。
 */
export function getStreakHistory(): string[] {
  if (!guard()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const dates: string[] = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(dates)) return [];
    const cutoff = formatDateKey(new Date(Date.now() - 180 * 86400000));
    return dates.filter(d => d >= cutoff).sort();
  } catch {
    return [];
  }
}
