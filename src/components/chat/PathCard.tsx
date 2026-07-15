import Link from 'next/link';
import type { CareerPath } from '@/types';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { TrendBadge } from '@/components/ui/TrendBadge';

interface PathCardProps {
  path: CareerPath;
  score?: number;
  compact?: boolean;
}

const CATEGORY_LABELS: Record<CareerPath['category'], string> = {
  'domestic-employment': '直接就业',
  'domestic-postgrad': '国内升学',
  'overseas-study': '出国出境',
  'civil-service': '体制内',
  freelance: '自由职业',
  'gap-year': '间隔年',
  other: '其他',
};

export function PathCard({ path, score, compact = false }: PathCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900">{path.title}</h3>
        <div className="flex shrink-0 items-center gap-1.5">
          <TrustBadge level={path.trustLevel} />
        </div>
      </div>

      <p className="mb-3 text-sm text-gray-600">
        {compact ? path.summary.slice(0, 120) + '...' : path.summary}
      </p>

      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <TrendBadge trend={path.trend} detail={path.trendDetail} />
        {score !== undefined && (
          <span className="rounded-full bg-brand-100 px-2 py-0.5 font-semibold text-brand-700">
            适配度 {score}%
          </span>
        )}
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-500">
          {CATEGORY_LABELS[path.category] || '其他'}
        </span>
      </div>

      {!compact && (
        <>
          <div className="mb-2 space-y-1 text-sm">
            {path.constraints
              .filter(
                (c) => c.assessment === 'at-risk' || c.assessment === 'fail'
              )
              .slice(0, 2)
              .map((c) => (
                <div
                  key={c.id}
                  className="flex items-start gap-1 text-amber-700"
                >
                  <span className="mt-0.5 shrink-0">⚠️</span>
                  <span>{c.detail.slice(0, 80)}...</span>
                </div>
              ))}
          </div>

          <div className="text-xs text-gray-400">
            <span>
              选择此路径将放弃：
              {path.exclusivity.slice(0, 2).join('；')}
            </span>
          </div>
        </>
      )}

      <Link
        href={`/paths/${path.slug}`}
        className="mt-3 inline-block text-sm font-medium text-brand-500 hover:text-brand-700"
      >
        查看详情 →
      </Link>
    </div>
  );
}
