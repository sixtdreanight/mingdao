'use client';

import { cn } from '@/lib/utils';

interface ProgressRingProps {
  /** Current count (e.g., unlocked badges) */
  value: number;
  /** Total count (e.g., 20 total badges) */
  total: number;
  /** Diameter in px */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  className?: string;
}

function ringColor(pct: number): string {
  if (pct >= 0.75) return '#f59e0b'; // gold
  if (pct >= 0.5)  return '#10b981'; // green
  if (pct >= 0.25) return '#c96442'; // primary/terracotta
  return '#d9c9b0';                   // border taupe
}

export function ProgressRing({ value, total, size = 36, strokeWidth = 3, className }: ProgressRingProps) {
  const pct = total > 0 ? Math.min(value / total, 1) : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn('shrink-0 transition-transform duration-200 hover:scale-110', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`${value}/${total} 成就`}
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-border/30"
      />
      {/* Progress arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={ringColor(pct)}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.3s ease' }}
      />
    </svg>
  );
}
