'use client';

import { useState, useCallback } from 'react';
import type { CareerPath } from '@/types';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_SELECT = 5;

const STATUS_ICONS: Record<string, string> = {
  pass: '✅',
  fail: '❌',
  'at-risk': '⚠️',
  unknown: '❓',
};

const TREND_CONFIG: Record<
  string,
  { label: string; icon: string }
> = {
  rising: { label: '上升', icon: '↑' },
  stable: { label: '稳定', icon: '→' },
  declining: { label: '下降', icon: '↓' },
  'substitution-risk': { label: '替代风险', icon: '⚠' },
};

const CATEGORY_LABELS: Record<string, string> = {
  'domestic-employment': '直接就业',
  'domestic-postgrad': '国内升学',
  'overseas-study': '出国出境',
  'civil-service': '体制内',
  freelance: '自由职业',
  'gap-year': '间隔年',
  other: '其他',
};

const CONSTRAINT_IDS = [
  'economy',
  'language',
  'degree-gate',
  'time-cost',
] as const;

interface ComparisonRowDef {
  label: string;
  render: (path: CareerPath) => string;
  isScore: boolean;
  isTrend: boolean;
  isCategory: boolean;
}

// ---------------------------------------------------------------------------
// Row definitions
// ---------------------------------------------------------------------------

function buildComparisonRows(): ComparisonRowDef[] {
  return [
    {
      label: '类别',
      render: (p) => CATEGORY_LABELS[p.category] || '其他',
      isScore: false,
      isTrend: false,
      isCategory: true,
    },
    ...CONSTRAINT_IDS.map((id) => ({
      label: constraintLabel(id),
      render: (p: CareerPath) => {
        const assessment =
          p.constraints.find((c) => c.id === id)?.assessment ?? 'unknown';
        return STATUS_ICONS[assessment];
      },
      isScore: false,
      isTrend: false,
      isCategory: false,
    })),
    {
      label: '趋势',
      render: (p) => {
        const cfg = TREND_CONFIG[p.trend] ?? { label: '未知', icon: '❓' };
        return `${cfg.icon} ${cfg.label}`;
      },
      isScore: false,
      isTrend: true,
      isCategory: false,
    },
    {
      label: '兴趣匹配',
      render: (p) => `${p.preferenceScores.interestMatch}/100`,
      isScore: true,
      isTrend: false,
      isCategory: false,
    },
    {
      label: '时间弹性',
      render: (p) => `${p.preferenceScores.timeFlexibility}/100`,
      isScore: true,
      isTrend: false,
      isCategory: false,
    },
    {
      label: '生活方式',
      render: (p) => `${p.preferenceScores.lifestyleCompat}/100`,
      isScore: true,
      isTrend: false,
      isCategory: false,
    },
    {
      label: '成长曲线',
      render: (p) => `${p.preferenceScores.growthCurve}/100`,
      isScore: true,
      isTrend: false,
      isCategory: false,
    },
  ];
}

function constraintLabel(id: string): string {
  const labels: Record<string, string> = {
    economy: '经济可行性',
    language: '语言要求',
    'degree-gate': '学历准入',
    'time-cost': '时间成本',
  };
  return labels[id] ?? id;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface PathSelectorProps {
  paths: CareerPath[];
  selectedSlugs: string[];
  onToggle: (slug: string) => void;
}

function PathSelector({ paths, selectedSlugs, onToggle }: PathSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-sm text-gray-500">
        选择要对比的路径（最多 {MAX_SELECT} 个，已选 {selectedSlugs.length} 个）
      </p>
      <div className="flex flex-wrap gap-2">
        {paths.map((p) => {
          const isSelected = selectedSlugs.includes(p.slug);
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => onToggle(p.slug)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? 'border-brand-500 bg-brand-500 text-white shadow-sm'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-brand-300 hover:text-brand-500'
              }`}
            >
              {p.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  selectedCount: number;
}

function EmptyState({ selectedCount }: EmptyStateProps) {
  const message =
    selectedCount === 0
      ? '请至少选择 2 条路径开始对比'
      : '请再选择至少 1 条路径进行对比';

  return (
    <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
      <p className="text-gray-400">{message}</p>
    </div>
  );
}

interface ComparisonTableProps {
  selectedPaths: CareerPath[];
}

function ComparisonTable({ selectedPaths }: ComparisonTableProps) {
  const rows = buildComparisonRows();

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="sticky left-0 z-10 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-900">
              对比维度
            </th>
            {selectedPaths.map((p) => (
              <th
                key={p.slug}
                className="px-4 py-3 text-center text-sm font-semibold"
              >
                <a
                  href={`/paths/${p.slug}`}
                  className="text-brand-500 hover:text-brand-700 hover:underline"
                >
                  {p.title}
                </a>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {rows.map((row) => (
            <TableRow
              key={row.label}
              row={row}
              selectedPaths={selectedPaths}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface TableRowProps {
  row: ComparisonRowDef;
  selectedPaths: CareerPath[];
}

function TableRow({ row, selectedPaths }: TableRowProps) {
  return (
    <tr>
      <td className="sticky left-0 z-10 bg-white px-4 py-3 text-sm font-medium text-gray-700">
        {row.label}
      </td>
      {selectedPaths.map((p) => {
        const value = row.render(p);
        return (
          <td key={p.slug} className={cellClassName(row)}>
            {value}
          </td>
        );
      })}
    </tr>
  );
}

function cellClassName(row: ComparisonRowDef): string {
  if (row.isScore) {
    return 'px-4 py-3 text-center text-sm font-mono text-gray-900';
  }
  if (row.isTrend) {
    return 'px-4 py-3 text-center text-sm text-gray-700';
  }
  if (row.isCategory) {
    return 'px-4 py-3 text-center text-sm text-gray-600';
  }
  return 'px-4 py-3 text-center text-base';
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface PathComparatorProps {
  paths: CareerPath[];
}

export function PathComparator({ paths }: PathComparatorProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  const togglePath = useCallback((slug: string) => {
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= MAX_SELECT) {
        return prev;
      }
      return [...prev, slug];
    });
  }, []);

  const selectedPaths = paths.filter((p) =>
    selectedSlugs.includes(p.slug),
  );
  const showTable = selectedPaths.length >= 2;

  return (
    <section className="space-y-6" aria-label="路径对比">
      <PathSelector
        paths={paths}
        selectedSlugs={selectedSlugs}
        onToggle={togglePath}
      />

      {showTable ? (
        <ComparisonTable selectedPaths={selectedPaths} />
      ) : (
        <EmptyState selectedCount={selectedPaths.length} />
      )}
    </section>
  );
}
