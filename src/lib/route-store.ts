/** 路线存储 — localStorage 管理路线和成就状态 */

import type { Route, RouteNode } from './planner';

const ROUTES_KEY = 'mingdao-routes';

type StoredRoute = Route & { status: 'active' | 'completed' | 'abandoned' };

export function getRoutes(): StoredRoute[] {
  try { return JSON.parse(localStorage.getItem(ROUTES_KEY) || '[]'); }
  catch { return []; }
}

export function saveRoutes(routes: Route[]): void {
  const stored: StoredRoute[] = routes.map(r => ({ ...r, status: 'active' }));
  localStorage.setItem(ROUTES_KEY, JSON.stringify(stored));
}

export function updateNodeStatus(routeId: string, nodeId: string, done: boolean): void {
  const routes = getRoutes();
  const route = routes.find(r => r.id === routeId);
  if (!route) return;

  const node = route.nodes.find(n => n.id === nodeId);
  if (!node) return;
  node.status = done ? 'done' : 'active';

  // 解锁下一个节点
  if (done) {
    const idx = route.nodes.findIndex(n => n.id === nodeId);
    if (idx > 0 && route.nodes[idx - 1].status === 'locked') {
      route.nodes[idx - 1].status = 'active';
    }
  }

  // 检查是否全部完成
  if (route.nodes.every(n => n.status === 'done')) {
    route.status = 'completed';
  }

  localStorage.setItem(ROUTES_KEY, JSON.stringify(routes));
}

export function abandonRoute(routeId: string): void {
  const routes = getRoutes();
  const route = routes.find(r => r.id === routeId);
  if (route) {
    route.status = 'abandoned';
    localStorage.setItem(ROUTES_KEY, JSON.stringify(routes));
  }
}

export function hasRoutes(): boolean {
  return getRoutes().length > 0;
}
