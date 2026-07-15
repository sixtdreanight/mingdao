'use client';

import { useState, useMemo } from 'react';
import type { CareerPath } from '@/types';
import { applyConstraints } from '@/lib/filter';
import { scorePaths } from '@/lib/score';
import { ConstraintFilter } from '@/components/paths/ConstraintFilter';
import { PathCard } from '@/components/chat/PathCard';

type SortMode = 'comprehensive' | 'interest' | 'flexibility' | 'growth';

const CATEGORIES: { label: string; value: string }[] = [
  { label: '全部', value: '' },
  { label: '直接就业', value: 'domestic-employment' },
  { label: '国内升学', value: 'domestic-postgrad' },
  { label: '出国', value: 'overseas-study' },
  { label: '体制', value: 'civil-service' },
  { label: '自由职业', value: 'freelance' },
];

const SORT_WEIGHTS: Record<
  SortMode,
  Record<string, number>
> = {
  comprehensive: {
    interestMatch: 0.35,
    timeFlexibility: 0.25,
    lifestyleCompat: 0.25,
    growthCurve: 0.15,
  },
  interest: {
    interestMatch: 1,
    timeFlexibility: 0,
    lifestyleCompat: 0,
    growthCurve: 0,
  },
  flexibility: {
    timeFlexibility: 1,
    interestMatch: 0,
    lifestyleCompat: 0,
    growthCurve: 0,
  },
  growth: {
    growthCurve: 1,
    interestMatch: 0,
    timeFlexibility: 0,
    lifestyleCompat: 0,
  },
};

const SORT_OPTIONS: { label: string; mode: SortMode }[] = [
  { label: '综合适配', mode: 'comprehensive' },
  { label: '兴趣', mode: 'interest' },
  { label: '弹性', mode: 'flexibility' },
  { label: '成长', mode: 'growth' },
];

interface PathExplorerProps {
  paths: CareerPath[];
}

export function PathExplorer({ paths }: PathExplorerProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [enabledConstraints, setEnabledConstraints] = useState<string[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>('comprehensive');

  const handleToggleConstraint = (id: string) => {
    setEnabledConstraints((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
  };

  const filteredPaths = useMemo(() => {
    const searchLower = search.toLowerCase();

    let filtered = paths.filter((path) => {
      if (searchLower) {
        const matchesSearch =
          path.title.toLowerCase().includes(searchLower) ||
          path.summary.toLowerCase().includes(searchLower) ||
          path.tags.some((t) => t.toLowerCase().includes(searchLower));
        if (!matchesSearch) {
          return false;
        }
      }

      if (category && path.category !== category) {
        return false;
      }

      return true;
    });

    if (enabledConstraints.length > 0) {
      const result = applyConstraints(filtered, enabledConstraints);
      filtered = result.passing;
    }

    return filtered;
  }, [paths, search, category, enabledConstraints]);

  const sortedPaths = useMemo(() => {
    const weights = SORT_WEIGHTS[sortMode];
    return scorePaths(filteredPaths, weights);
  }, [filteredPaths, sortMode]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="搜索路径名称、摘要或标签..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     placeholder-gray-400 focus:border-brand-500 focus:outline-none
                     focus:ring-1 focus:ring-brand-500"
        />
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-500">方向</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => setCategory(value)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                category === value
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Constraint Filter */}
      <ConstraintFilter
        enabledConstraints={enabledConstraints}
        onToggle={handleToggleConstraint}
      />

      {/* Sort + Results count */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">
          {sortedPaths.length} 条路径
        </span>
        <div className="flex gap-1">
          {SORT_OPTIONS.map(({ label, mode }) => (
            <button
              key={mode}
              type="button"
              onClick={() => setSortMode(mode)}
              className={`rounded-lg px-3 py-1 text-sm transition-colors ${
                sortMode === mode
                  ? 'bg-brand-100 text-brand-700'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {sortedPaths.length > 0 ? (
        <div className="grid gap-4">
          {sortedPaths.map(({ path, score }) => (
            <PathCard key={path.slug} path={path} score={score} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 py-16 text-center">
          <p className="text-text-muted">没有找到匹配的路径</p>
          <p className="mt-1 text-sm text-gray-300">
            尝试放宽搜索条件或关闭部分约束筛选
          </p>
        </div>
      )}
    </div>
  );
}
