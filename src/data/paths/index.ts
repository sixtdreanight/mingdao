import type { CareerPath } from '@/types';

// 路径注册表 — 每个 .md 文件在此注册
// 导入方式：打包时静态 import，无需运行时文件读取
const pathModules: Record<string, () => Promise<{ default: CareerPath }>> = {
  'cs-domestic-employment': () => import('./cs-domestic-employment.md'),
  'cs-domestic-postgrad': () => import('./cs-domestic-postgrad.md'),
  'cs-germany-masters': () => import('./cs-germany-masters.md'),
  'cs-japan-it': () => import('./cs-japan-it.md'),
  'cs-freelance': () => import('./cs-freelance.md'),
  'cs-civil-service-tech': () => import('./cs-civil-service-tech.md'),
  'cs-us-masters': () => import('./cs-us-masters.md'),
  'cs-uk-masters': () => import('./cs-uk-masters.md'),
  'cs-australia-masters': () => import('./cs-australia-masters.md'),
  'cs-singapore-masters': () => import('./cs-singapore-masters.md'),
  'cs-korea-masters': () => import('./cs-korea-masters.md'),
  'cs-startup-join': () => import('./cs-startup-join.md'),
  'cs-remote-overseas': () => import('./cs-remote-overseas.md'),
  'cs-digital-nomad': () => import('./cs-digital-nomad.md'),
  'cs-data-science': () => import('./cs-data-science.md'),
  'cs-devops': () => import('./cs-devops.md'),
  'cs-security': () => import('./cs-security.md'),
  'cs-game-dev': () => import('./cs-game-dev.md'),
  'cs-embedded': () => import('./cs-embedded.md'),
  'cs-tech-writer': () => import('./cs-tech-writer.md'),
  'cs-selected-transfer': () => import('./cs-selected-transfer.md'),
  'cs-teacher-cert': () => import('./cs-teacher-cert.md'),
  'cs-mba-path': () => import('./cs-mba-path.md'),
  'cs-gap-year': () => import('./cs-gap-year.md'),
  'cs-second-degree': () => import('./cs-second-degree.md'),
  'cs-exchange-program': () => import('./cs-exchange-program.md'),
  'cs-indie-hacker': () => import('./cs-indie-hacker.md'),
  'cs-blockchain': () => import('./cs-blockchain.md'),
  'cs-open-source': () => import('./cs-open-source.md'),
  'cs-france-masters': () => import('./cs-france-masters.md'),
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
