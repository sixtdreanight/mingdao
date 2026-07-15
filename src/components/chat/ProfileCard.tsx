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
  { key: 'universityTier', label: '学校层次', icon: '🏫', format: (v) => String(v) },
  { key: 'targetCity', label: '目标城市', icon: '📍', format: (v) => String(v) },
  { key: 'householdBudget', label: '教育预算', icon: '💰', format: (v) => `${(Number(v) / 10000).toFixed(0)}万` },
  { key: 'interests', label: '兴趣偏好', icon: '🎯', format: (v) => Array.isArray(v) ? (v as string[]).join('、') : String(v) },
  { key: 'lifestyle', label: '生活方式', icon: '🌿', format: (v) => Array.isArray(v) ? (v as string[]).join('、') : String(v) },
  { key: 'redLines', label: '底线红线', icon: '🚫', format: (v) => Array.isArray(v) ? (v as string[]).join('、') : String(v) },
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
        className="flex w-full items-center gap-2 rounded-lg border border-brand-200 bg-brand-50/50 px-3 py-2 text-left text-sm transition-colors hover:bg-brand-100/50"
      >
        <span className="text-base">📋</span>
        <span className="font-medium text-brand-700">角色卡</span>
        <span className="text-brand-500">({filled}/{total})</span>
        <span className="ml-auto text-xs text-gray-400">展开 ▾</span>
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-brand-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-100 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-base">📋</span>
          <span className="text-sm font-semibold text-brand-900">角色卡</span>
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-600">
            {filled}/{total}
          </span>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="rounded p-0.5 text-gray-400 transition-colors hover:text-gray-600"
          aria-label="收起角色卡"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Fields grid */}
      <div className="grid grid-cols-2 gap-px bg-brand-50 p-3">
        {FIELDS.map((f) => {
          const value = profile[f.key];
          const isFilled = value !== undefined && value !== null && value !== ''
            && !(Array.isArray(value) && value.length === 0);

          return (
            <div
              key={f.key}
              className={`rounded-lg px-2.5 py-2 ${
                isFilled
                  ? 'bg-white'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </div>
              <div
                className={`mt-0.5 text-sm ${
                  isFilled
                    ? 'font-medium text-gray-900'
                    : 'italic text-gray-350'
                }`}
                style={isFilled ? {} : { color: '#bbb' }}
              >
                {isFilled ? f.format(value) : '待探索'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="border-t border-brand-50 px-4 py-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">信息完整度</span>
          <span
            className={`font-medium ${
              filled >= 6
                ? 'text-emerald-600'
                : filled >= 4
                  ? 'text-amber-600'
                  : 'text-gray-400'
            }`}
          >
            {pct}%
          </span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              filled >= 6
                ? 'bg-emerald-500'
                : filled >= 4
                  ? 'bg-amber-400'
                  : 'bg-gray-300'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-1 text-center text-xs">
          {filled >= 6 ? (
            <span className="text-emerald-600">✓ 信息充足，可以开始分析</span>
          ) : filled >= 4 ? (
            <span className="text-amber-600">继续了解，不急着下判断</span>
          ) : (
            <span className="text-gray-400">慢慢来，先聊聊你的情况</span>
          )}
        </div>
      </div>
    </div>
  );
}
