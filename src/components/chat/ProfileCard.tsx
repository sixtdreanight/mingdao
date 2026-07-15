'use client';

import { useState } from 'react';
import type { UserProfile } from '@/types';

interface ProfileCardProps {
  profile: Partial<UserProfile>;
}

interface FieldDef {
  key: keyof UserProfile;
  label: string;
  icon: string;
  format: (v: unknown) => string;
}

const FIELDS: FieldDef[] = [
  { key: 'grade', label: '年级', icon: '🎓', format: (v) => String(v) },
  { key: 'major', label: '专业', icon: '📚', format: (v) => String(v) },
  { key: 'universityTier', label: '学校', icon: '🏫', format: (v) => String(v) },
  { key: 'targetCity', label: '城市', icon: '📍', format: (v) => String(v) },
  { key: 'householdBudget', label: '预算', icon: '💰', format: (v) => `${(Number(v) / 10000).toFixed(0)}万` },
  { key: 'interests', label: '兴趣', icon: '🎯', format: (v) => Array.isArray(v) ? (v as string[]).join('、') : String(v) },
  { key: 'lifestyle', label: '方式', icon: '🌿', format: (v) => Array.isArray(v) ? (v as string[]).join('、') : String(v) },
  { key: 'redLines', label: '底线', icon: '🚫', format: (v) => Array.isArray(v) ? (v as string[]).join('、') : String(v) },
];

function countFilled(profile: Partial<UserProfile>): number {
  return FIELDS.filter((f) => {
    const v = profile[f.key];
    if (v === undefined || v === null) return false;
    if (typeof v === 'string') return v.trim().length > 0;
    if (typeof v === 'number') return true;
    if (Array.isArray(v)) return v.length > 0;
    return false;
  }).length;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const filled = countFilled(profile);
  const total = FIELDS.length;
  const pct = Math.round((filled / total) * 100);

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="flex w-full items-center gap-2 rounded-lg border border-paper-line bg-white px-3 py-2 text-left text-sm shadow-card transition-all hover:shadow-card-hover"
      >
        <span className="text-base">📋</span>
        <span className="font-medium text-ink">角色卡</span>
        <span className="text-ink-muted">({filled}/{total})</span>
        <span className="ml-auto text-xs text-ink-faint">展开 ▾</span>
      </button>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-paper-line bg-white shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-paper-line bg-paper px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-base">📋</span>
          <span className="text-sm font-semibold text-ink">角色卡</span>
          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-ink-muted border border-paper-line">
            {filled}/{total}
          </span>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="rounded p-0.5 text-ink-faint transition-colors hover:text-ink-muted"
          aria-label="收起"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-px bg-paper-line/30 p-3">
        {FIELDS.map((f) => {
          const value = profile[f.key];
          const isFilled = value !== undefined && value !== null && value !== ''
            && !(Array.isArray(value) && value.length === 0);

          return (
            <div key={f.key} className={`rounded-lg px-2.5 py-2 ${isFilled ? 'bg-white' : 'bg-white/40'}`}>
              <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </div>
              <div className={`mt-0.5 text-sm ${isFilled ? 'font-medium text-ink' : ''}`}
                style={isFilled ? {} : { color: '#B8B0A4' }}>
                {isFilled ? f.format(value) : '—'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress */}
      <div className="border-t border-paper-line px-4 py-2.5">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span>了解程度</span>
          <span className={`font-medium ${filled >= 6 ? 'text-sage' : filled >= 4 ? 'text-brass' : 'text-ink-faint'}`}>
            {pct}%
          </span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-paper-line/50">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              filled >= 6 ? 'bg-sage' : filled >= 4 ? 'bg-brass' : 'bg-paper-line'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-1 text-center text-xs">
          {filled >= 6 ? (
            <span className="text-sage">可以开始分析了</span>
          ) : filled >= 4 ? (
            <span className="text-brass">继续了解中</span>
          ) : (
            <span className="text-ink-faint">慢慢来</span>
          )}
        </div>
      </div>
    </div>
  );
}
