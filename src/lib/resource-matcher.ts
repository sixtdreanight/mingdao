import type { CompetencyGap } from '@/types/competency';
import type { ResourceLink } from '@/data/resources';
import { RESOURCE_INDEX } from '@/data/resources';

/**
 * 从资源库中为一条能力差距匹配学习资源。
 *
 * 策略（优先级递减）：
 * 1. 精确标签匹配：资源 description 中包含能力名称关键词
 * 2. 分类模糊匹配：能力 type 对应资源库分类（如 'professional' → 对应学科的垂直招聘/学习资源）
 * 3. 通用资源兜底：返回通识学习平台
 */
export function matchResources(gap: CompetencyGap): ResourceLink[] {
  const comp = gap.competency;
  const results: ResourceLink[] = [];
  const seen = new Set<string>();

  // 提取能力名中的关键词
  const keywords = extractKeywords(comp.name);

  // 遍历所有资源分类
  for (const cat of RESOURCE_INDEX) {
    for (const link of cat.links) {
      if (seen.has(link.url)) continue;

      // 名字或描述包含任一关键词即匹配
      const text = (link.name + link.description).toLowerCase();
      const score = keywords.filter((kw) => text.includes(kw.toLowerCase())).length;

      if (score > 0) {
        results.push(link);
        seen.add(link.url);
      }
    }
  }

  return results.slice(0, 10);  // 最多返回 10 个
}

/** 批量匹配，返回 Map */
export function batchMatch(
  gaps: CompetencyGap[]
): Map<string, ResourceLink[]> {
  const map = new Map<string, ResourceLink[]>();
  for (const gap of gaps) {
    map.set(gap.competency.id, matchResources(gap));
  }
  return map;
}

/** 从能力名中提取搜索关键词 */
function extractKeywords(name: string): string[] {
  // 按常见分隔符拆分，并保留原词
  const keywords: string[] = [name];
  const parts = name.split(/[、，,\s/·]+/).filter((p) => p.length >= 2);
  keywords.push(...parts.map((p) => p.replace(/[（）()【】\[\]]/g, '')));
  return [...new Set(keywords)];
}
