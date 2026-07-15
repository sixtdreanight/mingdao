interface TrendBadgeProps {
  trend: 'rising' | 'stable' | 'declining' | 'substitution-risk';
  detail?: string;
}

const TREND_CONFIG = {
  rising: { label: '上升', icon: '↑', className: 'trend-rising' },
  stable: { label: '稳定', icon: '→', className: 'trend-stable' },
  declining: { label: '下降', icon: '↓', className: 'trend-declining' },
  'substitution-risk': {
    label: '替代风险',
    icon: '⚠',
    className: 'trend-risk',
  },
};

export function TrendBadge({ trend, detail }: TrendBadgeProps) {
  const config = TREND_CONFIG[trend];
  return (
    <span className={config.className} title={detail}>
      {config.icon} {config.label}
    </span>
  );
}
