'use client';

import { CONSTRAINT_ORDER } from '@/lib/filter';

const CONSTRAINT_LABELS: Record<string, string> = {
  economy: '经济条件',
  language: '语言要求',
  'degree-gate': '学历门槛',
  'graduation-difficulty': '毕业难度',
  'location-lock': '地域限制',
  'time-cost': '时间成本',
  'living-standard': '生活标准',
  'degree-value': '学历价值',
  geopolitics: '地缘政治',
};

interface ConstraintFilterProps {
  enabledConstraints: string[];
  onToggle: (id: string) => void;
}

export function ConstraintFilter({
  enabledConstraints,
  onToggle,
}: ConstraintFilterProps) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-medium text-gray-500">硬约束筛选</h3>
      <div className="flex flex-wrap gap-2">
        {CONSTRAINT_ORDER.map((id) => {
          const isActive = enabledConstraints.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => onToggle(id)}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                isActive
                  ? 'bg-brand-100 text-brand-700'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {CONSTRAINT_LABELS[id] || id}
            </button>
          );
        })}
      </div>
    </div>
  );
}
