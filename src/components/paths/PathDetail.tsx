'use client';

import type { CareerPath } from '@/types';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { TrendBadge } from '@/components/ui/TrendBadge';
import { ConstraintList } from './ConstraintList';

interface PathDetailProps {
  path: CareerPath;
}

interface PreferenceItem {
  key: keyof CareerPath['preferenceScores'];
  label: string;
  description: string;
}

const PREFERENCE_ITEMS: PreferenceItem[] = [
  {
    key: 'interestMatch',
    label: '兴趣匹配',
    description: '与该路径所需技能和日常工作的兴趣契合度',
  },
  {
    key: 'timeFlexibility',
    label: '时间弹性',
    description: '路径对时间安排的自由度与灵活度',
  },
  {
    key: 'lifestyleCompat',
    label: '生活方式兼容',
    description: '路径与目标生活方式的适配程度',
  },
  {
    key: 'growthCurve',
    label: '成长曲线',
    description: '路径的长期发展与上升空间',
  },
];

function renderMarkdown(md: string): string {
  // Escape HTML entities to prevent XSS
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks (```...```)
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    '<pre class="my-3 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code>$2</code></pre>'
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-rose-600">$1</code>'
  );

  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-brand-500 underline hover:text-brand-700">$1</a>'
  );

  // Split into lines for block processing
  const lines = html.split('\n');
  const result: string[] = [];
  let inList = false;
  let listType: 'ul' | 'ol' | null = null;
  let inBlockquote = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Heading
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeList();
      closeBlockquote();
      const level = headingMatch[1].length;
      const sizes: Record<number, string> = {
        1: 'text-2xl font-bold mt-6 mb-3',
        2: 'text-xl font-semibold mt-5 mb-2',
        3: 'text-lg font-semibold mt-4 mb-2',
        4: 'text-base font-semibold mt-3 mb-1',
        5: 'text-sm font-semibold mt-3 mb-1',
        6: 'text-xs font-semibold mt-2 mb-1',
      };
      result.push(
        `<h${level} class="${sizes[level] || sizes[6]}">${headingMatch[2]}</h${level}>`
      );
      continue;
    }

    // Blockquote
    const blockquoteMatch = trimmed.match(/^>\s?(.*)$/);
    if (blockquoteMatch) {
      if (!inBlockquote) {
        inBlockquote = true;
        result.push('<blockquote class="my-3 border-l-4 border-brand-300 bg-brand-50 py-1 pl-4 italic text-gray-700">');
      }
      result.push(`<p class="my-1">${blockquoteMatch[1]}</p>`);
      continue;
    } else if (inBlockquote) {
      closeBlockquote();
    }

    // Horizontal rule
    if (trimmed.match(/^(-{3,}|\*{3,})$/)) {
      closeList();
      result.push('<hr class="my-5 border-gray-200" />');
      continue;
    }

    // Unordered list
    const ulMatch = trimmed.match(/^[-*+]\s+(.+)$/);
    if (ulMatch) {
      if (!inList || listType !== 'ul') {
        closeList();
        result.push('<ul class="my-2 list-disc space-y-1 pl-6 text-gray-700">');
        inList = true;
        listType = 'ul';
      }
      result.push(`<li>${ulMatch[1]}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        closeList();
        result.push('<ol class="my-2 list-decimal space-y-1 pl-6 text-gray-700">');
        inList = true;
        listType = 'ol';
      }
      result.push(`<li>${olMatch[1]}</li>`);
      continue;
    }

    closeList();

    // Empty line
    if (trimmed === '') {
      result.push('<div class="h-3"></div>');
      continue;
    }

    // Regular paragraph
    result.push(`<p class="my-1.5 leading-relaxed text-gray-700">${trimmed}</p>`);
  }

  closeList();
  closeBlockquote();

  return result.join('\n');

  function closeList() {
    if (inList) {
      result.push(listType === 'ol' ? '</ol>' : '</ul>');
      inList = false;
      listType = null;
    }
  }

  function closeBlockquote() {
    if (inBlockquote) {
      result.push('</blockquote>');
      inBlockquote = false;
    }
  }
}

function formatDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, score));
  const colorClass =
    clamped >= 70
      ? 'bg-emerald-500'
      : clamped >= 40
        ? 'bg-amber-500'
        : 'bg-red-500';

  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-sm text-gray-600">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all ${colorClass}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="w-10 text-right text-sm font-medium text-gray-800">
        {clamped}
      </span>
    </div>
  );
}

export function PathDetail({ path }: PathDetailProps) {
  const descriptionHtml = renderMarkdown(path.description);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Header */}
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <TrustBadge level={path.trustLevel} />
          <TrendBadge trend={path.trend} detail={path.trendDetail} />
          <span className="text-xs text-gray-400">
            更新于 {formatDate(path.lastUpdated)}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {path.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-gray-600">
          {path.summary}
        </p>

        {path.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {path.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Preference Scores */}
      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">偏好评估</h2>
        <div className="space-y-3">
          {PREFERENCE_ITEMS.map((item) => (
            <div key={item.key}>
              <ScoreBar
                score={path.preferenceScores[item.key]}
                label={item.label}
              />
              <p className="mt-0.5 pl-28 text-xs text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hard Constraints */}
      {path.constraints.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            硬约束评估
          </h2>
          <ConstraintList constraints={path.constraints} />
        </section>
      )}

      {/* Description */}
      {path.description && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">详细说明</h2>
          <div
            className="prose-custom rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </section>
      )}

      {/* Exclusivity Warning */}
      {path.exclusivity.length > 0 && (
        <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-3 text-lg font-semibold text-amber-800">
            选择此路径意味着
          </h2>
          <ul className="list-disc space-y-1 pl-6 text-amber-700">
            {path.exclusivity.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Action Plan */}
      {path.actionPlan.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            执行时间线
          </h2>
          <div className="relative space-y-0">
            {path.actionPlan.map((phase, i) => (
              <div key={phase.year} className="flex gap-4">
                {/* Timeline rail */}
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-500 bg-white text-sm font-semibold text-brand-700">
                    {i + 1}
                  </div>
                  {i < path.actionPlan.length - 1 && (
                    <div className="w-0.5 flex-1 bg-brand-200" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-6 pt-1">
                  <h3 className="font-semibold text-gray-900">{phase.year}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                    {phase.tasks.map((task, j) => (
                      <li key={j}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Source URLs */}
      {path.sourceUrls.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">数据来源</h2>
          <ul className="space-y-1">
            {path.sourceUrls.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-sm text-brand-500 underline hover:text-brand-700"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related / Alternative Paths */}
      {path.alternatives.length > 0 && (
        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            相关路径
          </h2>
          <p className="mb-3 text-sm text-gray-500">
            以下路径可能也适合你的情况，可以作为备选参考。
          </p>
          <div className="flex flex-wrap gap-2">
            {path.alternatives.map((slug) => (
              <a
                key={slug}
                href={`/paths/${slug}`}
                className="rounded-lg border border-gray-200 bg-surface-muted px-3 py-1.5 text-sm text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                {slug}
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
