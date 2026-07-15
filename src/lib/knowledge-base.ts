import type { CareerPath, HardConstraint } from '@/types';
import { loadAllPaths } from '@/data/paths';

let cachedPaths: CareerPath[] | null = null;

export async function getAllPaths(): Promise<CareerPath[]> {
  if (!cachedPaths) {
    cachedPaths = await loadAllPaths();
  }
  return cachedPaths;
}

export async function getPathBySlug(
  slug: string
): Promise<CareerPath | null> {
  const paths = await getAllPaths();
  return paths.find((p) => p.slug === slug) ?? null;
}

export async function searchPaths(
  query: string,
  tags: string[]
): Promise<CareerPath[]> {
  const paths = await getAllPaths();
  const queryLower = query.toLowerCase();

  return paths.filter((p) => {
    const matchesQuery =
      !query ||
      p.title.toLowerCase().includes(queryLower) ||
      p.summary.toLowerCase().includes(queryLower) ||
      p.tags.some((t) => t.toLowerCase().includes(queryLower));

    const matchesTags =
      tags.length === 0 ||
      tags.some((t) => p.tags.includes(t));

    return matchesQuery && matchesTags;
  });
}

export function filterByHardConstraints(
  paths: CareerPath[],
  constraintIds: string[]
): { passing: CareerPath[]; failed: CareerPath[] } {
  const passing: CareerPath[] = [];
  const failed: CareerPath[] = [];

  for (const path of paths) {
    const hasFailure = constraintIds.some((cid) => {
      const c = path.constraints.find((c) => c.id === cid);
      return c?.assessment === 'fail';
    });
    if (hasFailure) {
      failed.push(path);
    } else {
      passing.push(path);
    }
  }

  return { passing, failed };
}

export function getPathAlternatives(path: CareerPath): string[] {
  return path.alternatives;
}
