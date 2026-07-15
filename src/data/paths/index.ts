import type { CareerPath } from '@/types';

// 路径注册表 — 每个 .md 文件在此注册
// 导入方式：打包时静态 import，无需运行时文件读取
const pathModules: Record<string, () => Promise<{ default: CareerPath }>> = {
  'cs-domestic-employment': () => import('./cs-domestic-employment.md'),
  'cs-domestic-postgrad': () => import('./cs-domestic-postgrad.md'),
  'cs-germany-masters': () => import('./cs-germany-masters.md'),
  'cs-japan-it': () => import('./cs-japan-it.md'),
  'cs-freelance': () => import('./cs-freelance.md'),
};

export async function loadAllPaths(): Promise<CareerPath[]> {
  const paths: CareerPath[] = [];
  for (const loader of Object.values(pathModules)) {
    const mod = await loader();
    paths.push(mod.default);
  }
  return paths;
}

export function getPathSlugs(): string[] {
  return Object.keys(pathModules);
}
