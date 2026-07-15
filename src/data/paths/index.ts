import type { CareerPath } from '@/types';

// 路径注册表 — 每个路径文件在此注册
// 导入方式：打包时静态 import，无需运行时文件读取
const pathModules: Record<string, () => Promise<{ default: CareerPath }>> = {
  'cs-domestic-employment': () => import('./cs-domestic-employment'),
  'cs-domestic-postgrad': () => import('./cs-domestic-postgrad'),
  'cs-germany-masters': () => import('./cs-germany-masters'),
  'cs-japan-it': () => import('./cs-japan-it'),
  'cs-freelance': () => import('./cs-freelance'),
  'cs-civil-service-tech': () => import('./cs-civil-service-tech'),
  'cs-us-masters': () => import('./cs-us-masters'),
  'cs-uk-masters': () => import('./cs-uk-masters'),
  'cs-australia-masters': () => import('./cs-australia-masters'),
  'cs-singapore-masters': () => import('./cs-singapore-masters'),
  'cs-korea-masters': () => import('./cs-korea-masters'),
  'cs-startup-join': () => import('./cs-startup-join'),
  'cs-remote-overseas': () => import('./cs-remote-overseas'),
  'cs-digital-nomad': () => import('./cs-digital-nomad'),
  'cs-data-science': () => import('./cs-data-science'),
  'cs-devops': () => import('./cs-devops'),
  'cs-security': () => import('./cs-security'),
  'cs-game-dev': () => import('./cs-game-dev'),
  'cs-embedded': () => import('./cs-embedded'),
  'cs-tech-writer': () => import('./cs-tech-writer'),
  'cs-selected-transfer': () => import('./cs-selected-transfer'),
  'cs-teacher-cert': () => import('./cs-teacher-cert'),
  'cs-mba-path': () => import('./cs-mba-path'),
  'cs-gap-year': () => import('./cs-gap-year'),
  'cs-second-degree': () => import('./cs-second-degree'),
  'cs-exchange-program': () => import('./cs-exchange-program'),
  'cs-indie-hacker': () => import('./cs-indie-hacker'),
  'cs-blockchain': () => import('./cs-blockchain'),
  'cs-open-source': () => import('./cs-open-source'),
  'cs-france-masters': () => import('./cs-france-masters'),
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
