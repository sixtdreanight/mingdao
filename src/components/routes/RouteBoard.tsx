'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Route, RouteNode } from '@/lib/planner';
import { getRoutes, updateNodeStatus, abandonRoute } from '@/lib/route-store';

const NODE_W = 140;
const NODE_H = 52;
const LEVEL_GAP = 90;

function nodeColor(status: RouteNode['status']): string {
  switch (status) {
    case 'done': return 'bg-emerald-100 border-emerald-400 text-emerald-800';
    case 'active': return 'bg-primary/10 border-primary text-primary';
    case 'goal': return 'bg-amber-50 border-amber-400 text-amber-800';
    default: return 'bg-secondary border-border text-muted-foreground';
  }
}

function nodeIcon(status: RouteNode['status']): string {
  switch (status) {
    case 'done': return '✅';
    case 'active': return '⏳';
    case 'goal': return '⭐';
    default: return '🔒';
  }
}

function RouteChain({ route, onUpdate }: { route: Route & { status: string }; onUpdate: () => void }) {
  const nodes = [...route.nodes].reverse(); // 起点在底，目标在顶
  const maxW = Math.max(...nodes.map(n => n.label.length)) * 14 + 60;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 text-sm mb-1">
        <h3 className="font-semibold text-foreground">{route.title}</h3>
        {route.status === 'completed' && <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">已达成</span>}
        {route.status === 'abandoned' && <span className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">已放弃</span>}
      </div>

      <svg width={maxW + 40} height={nodes.length * LEVEL_GAP + 20}>
        {nodes.map((node, i) => {
          const y = i * LEVEL_GAP + 10;
          const x = (maxW - NODE_W) / 2 + 20;

          return (
            <g key={node.id}>
              {/* 连线到上一个节点 */}
              {i > 0 && (
                <line
                  x1={x + NODE_W / 2} y1={y}
                  x2={x + NODE_W / 2} y2={y - (LEVEL_GAP - NODE_H)}
                  stroke={node.status === 'done' ? '#10b981' : node.status === 'active' ? '#c96442' : '#d9c9b0'}
                  strokeWidth={2}
                  strokeDasharray={node.status === 'locked' ? '4 4' : 'none'}
                />
              )}
              {/* 节点 */}
              <foreignObject x={x} y={y} width={NODE_W} height={NODE_H}>
                <button
                  onClick={() => {
                    if (node.status === 'active' || node.status === 'done') {
                      updateNodeStatus(route.id, node.id, node.status !== 'done');
                      onUpdate();
                    }
                  }}
                  className={`flex w-full h-full items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-all hover:shadow-sm ${nodeColor(node.status)} ${node.status === 'locked' ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <span className="text-sm">{nodeIcon(node.status)}</span>
                  <span className="text-left leading-tight line-clamp-2">{node.label}</span>
                </button>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      <p className="text-xs text-muted-foreground">{route.tags.join(' · ')}</p>
      <div className="flex gap-2">
        <button
          onClick={() => { abandonRoute(route.id); onUpdate(); }}
          className="text-xs text-muted-foreground hover:text-red-500"
        >
          放弃
        </button>
      </div>
    </div>
  );
}

export function RouteBoard() {
  const router = useRouter();
  const [routes, setRoutes] = useState<(Route & { status: string })[]>([]);

  useEffect(() => { setRoutes(getRoutes()); }, []);
  const refresh = () => setRoutes(getRoutes());

  if (routes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-6">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-secondary">
          <svg className="h-12 w-12 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">还没有路线规划</h3>
        <p className="text-sm text-muted-foreground mb-6">完善个人画像后让 AI 为你生成专属职业路线</p>
        <button onClick={() => router.push('/main?tab=profile')} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm btn-press">
          去完善画像
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-start justify-center gap-10 p-8 overflow-x-auto">
      {routes.filter(r => r.status !== 'abandoned').map(r => (
        <RouteChain key={r.id} route={r} onUpdate={refresh} />
      ))}
      {routes.some(r => r.status === 'abandoned') && (
        <div className="w-full border-t border-border/30 pt-4 mt-2">
          <p className="text-xs text-muted-foreground text-center mb-3">已放弃的路线</p>
          <div className="flex flex-wrap justify-center gap-6 opacity-40">
            {routes.filter(r => r.status === 'abandoned').map(r => (
              <RouteChain key={r.id} route={r} onUpdate={refresh} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
