import type { HardConstraint } from '@/types';

interface ConstraintListProps {
  constraints: HardConstraint[];
}

const STATUS_ICONS: Record<string, string> = {
  pass: '✅',
  fail: '❌',
  'at-risk': '⚠️',
  unknown: '❓',
};

export function ConstraintList({ constraints }: ConstraintListProps) {
  return (
    <div className="space-y-3">
      {constraints.map((c) => (
        <div
          key={c.id}
          className={`rounded-lg border p-3 ${
            c.assessment === 'fail'
              ? 'border-red-200 bg-red-50'
              : c.assessment === 'at-risk'
                ? 'border-amber-200 bg-amber-50'
                : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span>{STATUS_ICONS[c.assessment]}</span>
                <h4 className="font-medium text-gray-900">{c.label}</h4>
              </div>
              <p className="mt-1 text-sm text-gray-600">{c.detail}</p>
            </div>
          </div>
          {c.sourceUrl && (
            <a
              href={c.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-block text-xs text-brand-500 hover:underline"
            >
              数据来源 →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
