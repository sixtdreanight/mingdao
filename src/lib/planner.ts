/**
 * 路线生成器 — 基于用户画像 + 搜索数据，生成结构化路线和里程碑树。
 */

import type { UserProfile, ChatSource } from '@/types';
import { chat } from './ai-client';
import { searchWeb } from './web-search';

export interface RouteNode {
  id: string;
  label: string;
  status: 'locked' | 'active' | 'done' | 'goal';
  detail: string;
}

export interface Route {
  id: string;
  title: string;
  overview: string;
  fit: string;
  cost: string;
  salary: string;
  tags: string[];
  nodes: RouteNode[];
  sources: ChatSource[];
  generatedAt: string;
}

const PLAN_PROMPT = `<role>
你是明道的路线规划引擎。根据用户画像和搜索数据，生成 JSON 格式的职业生涯路线。
</role>

<rules>
1. 生成 2-3 条路线，每条 4-6 个里程碑节点
2. 节点从下到上是先后顺序：起点 → 中间步骤 → 最终目标
3. 每个节点标注具体的行动，不要太泛
4. 整个输出必须是合法 JSON，不要任何其他文字
</rules>

<output_format>
{
  "routes": [
    {
      "title": "路线名称（如：人工智能算法岗-大厂路线）",
      "overview": "一句话概述",
      "fit": "适合什么样的人",
      "cost": "时间/金钱代价",
      "salary": "薪资范围",
      "tags": ["标签1", "标签2"],
      "nodes": [
        { "label": "最终目标", "detail": "如何判断达成" },
        { "label": "中间步骤3", "detail": "具体要做什么" },
        { "label": "中间步骤2", "detail": "具体要做什么" },
        { "label": "中间步骤1", "detail": "具体要做什么" },
        { "label": "当前起点", "detail": "你的现状" }
      ]
    }
  ]
}
</output_format>`;


export function buildPlanQuery(profile: Partial<UserProfile>): string {
  const parts: string[] = [];
  if (profile.major) parts.push(`专业：${profile.major}`);
  if (profile.grade) parts.push(`年级：${profile.grade}`);
  if (profile.universityTier) parts.push(`学校：${profile.universityTier}`);
  if (profile.targetCity) parts.push(`目标城市：${profile.targetCity}`);
  if (profile.householdBudget) parts.push(`预算：${Math.round(profile.householdBudget / 10000)}万`);
  if (profile.interests?.length) parts.push(`兴趣：${profile.interests.join('、')}`);
  if (profile.lifestyle?.length) parts.push(`偏好：${profile.lifestyle.join('、')}`);
  if (profile.redLines?.length) parts.push(`底线：${profile.redLines.join('、')}`);
  return parts.join('，');
}

export async function generateRoutes(
  profile: Partial<UserProfile>,
): Promise<Route[]> {
  const profileText = buildPlanQuery(profile);
  const searchQuery = `${profile.major || ''} 职业方向 发展路径 薪资`.trim();

  // 搜索
  const webResults = await searchWeb(searchQuery);
  const searchSection = webResults.slice(0, 5).map(r =>
    `- ${r.title}: ${r.snippet}（来源：${r.url}）`
  ).join('\n');

  const result = await chat({
    systemPrompt: PLAN_PROMPT,
    maxTokens: 2048,
    temperature: 0.3,
    messages: [{
      role: 'user',
      content: `## 用户画像\n${profileText}\n\n## 搜索数据\n${searchSection}\n\n请生成路线。`,
    }],
  });

  const text = result.text.trim();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Planner returned invalid JSON');

  const data = JSON.parse(jsonMatch[0]);
  const routes: Route[] = (data.routes || []).map((r: Record<string, unknown>, i: number) => ({
    id: `route-${Date.now()}-${i}`,
    title: String(r.title || ''),
    overview: String(r.overview || ''),
    fit: String(r.fit || ''),
    cost: String(r.cost || ''),
    salary: String(r.salary || ''),
    tags: Array.isArray(r.tags) ? r.tags.map(String) : [],
    nodes: Array.isArray(r.nodes)
      ? r.nodes.map((n: Record<string, unknown>, j: number) => ({
          id: `node-${Date.now()}-${i}-${j}`,
          label: String(n.label || ''),
          status: (j === (r.nodes as unknown[]).length - 1 ? 'active' : 'locked') as RouteNode['status'],
          detail: String(n.detail || ''),
        }))
      : [],
    sources: webResults.map(r => ({ title: r.title, url: r.url, snippet: r.snippet })),
    generatedAt: new Date().toISOString(),
  }));

  return routes;
}
