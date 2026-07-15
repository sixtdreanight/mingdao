import type { TrustLevel } from '@/types';

const LABELS: Record<TrustLevel, string> = {
  official: '官方数据',
  'ai-inferred': 'AI 推理',
  'community-unreviewed': '社区未审核',
};

const STYLES: Record<TrustLevel, string> = {
  official: 'trust-badge-official',
  'ai-inferred': 'trust-badge-ai',
  'community-unreviewed': 'trust-badge-community',
};

const ICONS: Record<TrustLevel, string> = {
  official: '🟢',
  'ai-inferred': '🟡',
  'community-unreviewed': '🔴',
};

interface TrustBadgeProps {
  level: TrustLevel;
  className?: string;
}

export function TrustBadge({ level, className = '' }: TrustBadgeProps) {
  return (
    <span
      className={`${STYLES[level]} ${className}`}
      title={`数据可信度：${LABELS[level]}`}
    >
      {ICONS[level]} {LABELS[level]}
    </span>
  );
}
