'use client';
import type { CompetencyGap, CompetencyGapAnalysis, ProficiencyLevel } from '@/types/competency';
import { PROFICIENCY_LABELS, GAP_PRIORITY_LABELS } from '@/types/competency';
import type { ResourceLink } from '@/data/resources';

interface GapPanelProps {
  analysis: CompetencyGapAnalysis;
  resourceMap: Map<string, ResourceLink[]>;  // competencyId → 匹配的资源
  onSelectGap: (gap: CompetencyGap) => void;
  selectedGapId?: string;
}

function prioritySort(a: CompetencyGap, b: CompetencyGap): number {
  const order = { blocker: 0, critical: 1, important: 2, nice_to_have: 3 };
  return order[a.priority] - order[b.priority] || b.gap - a.gap;
}

export function GapPanel({ analysis, resourceMap, onSelectGap, selectedGapId }: GapPanelProps) {
  const sorted = [...analysis.gaps].sort(prioritySort);

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="border-b border-border/50 bg-secondary/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-base">📊</span>
          <span className="text-sm font-semibold">能力差距分析</span>
          <span className="text-xs text-muted-foreground">
            ({sorted.filter((g) => g.gap > 0).length} 项需提升)
          </span>
        </div>
      </div>

      <div className="divide-y divide-border/30">
        {sorted.map((gap) => {
          const isSelected = selectedGapId === gap.competency.id;
          const resources = resourceMap.get(gap.competency.id) || [];

          return (
            <div key={gap.competency.id}>
              <button
                onClick={() => onSelectGap(gap)}
                className={`w-full text-left px-4 py-3 transition-colors hover:bg-secondary/30 ${
                  isSelected ? 'bg-secondary/40' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-medium truncate">{gap.competency.name}</span>
                    <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                      {PROFICIENCY_LABELS[gap.targetLevel as ProficiencyLevel].label}
                    </span>
                  </div>
                  <span className="shrink-0 ml-2 text-xs text-muted-foreground">
                    {GAP_PRIORITY_LABELS[gap.priority].split(' ')[0]}
                  </span>
                </div>

                {/* 展开资源列表 */}
                {isSelected && (
                  <div className="mt-3 space-y-2">
                    {resources.length > 0 ? (
                      <div className="space-y-1.5">
                        <p className="text-xs font-medium text-muted-foreground">
                          学习路径（建议按顺序）：
                        </p>
                        {resources.slice(0, 5).map((r, i) => (
                          <a
                            key={i}
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-md border border-border/50 bg-background px-3 py-2 text-sm hover:border-primary/30 transition-colors"
                          >
                            <span className="text-xs text-muted-foreground">{i + 1}.</span>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{r.description}</p>
                            </div>
                            <span className="shrink-0 text-xs text-muted-foreground">↗</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">
                        暂无匹配资源，建议在资源库中搜索「{gap.competency.name}」相关关键词
                      </p>
                    )}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
