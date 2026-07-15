import type { KnowledgeAtom } from '@/types';

// 原子事实注册表 — 每个 .ts 文件在此注册
const atomModules: Record<string, () => Promise<{ default: KnowledgeAtom }>> = {
  // salary
  'shanghai-cs-bachelor-foreign-2024': () =>
    import('./salary/shanghai-cs-bachelor-foreign-2024'),
  'shanghai-cs-master-bigtech-2024': () =>
    import('./salary/shanghai-cs-master-bigtech-2024'),
  'shanghai-cs-bachelor-3y-2024': () =>
    import('./salary/shanghai-cs-bachelor-3y-2024'),
  'beijing-cs-bachelor-bigtech-2024': () =>
    import('./salary/beijing-cs-bachelor-bigtech-2024'),
  // education
  'domestic-cs-postgrad-sh-2024': () =>
    import('./education/domestic-cs-postgrad-sh-2024'),
  'germany-cs-masters-public-2024': () =>
    import('./education/germany-cs-masters-public-2024'),
  'us-cs-masters-top50-2024': () =>
    import('./education/us-cs-masters-top50-2024'),
  'uk-cs-masters-g5-2024': () =>
    import('./education/uk-cs-masters-g5-2024'),
  // employment
  'shanghai-tech-company-tiers-2024': () =>
    import('./employment/shanghai-tech-company-tiers-2024'),
  'degree-gate-reality-cs-2024': () =>
    import('./employment/degree-gate-reality-cs-2024'),
  'cs-junior-demand-trend-2024': () =>
    import('./employment/cs-junior-demand-trend-2024'),
  // trend
  'ai-impact-junior-dev-2024': () =>
    import('./trend/ai-impact-junior-dev-2024'),
  'cloud-native-demand-2024': () =>
    import('./trend/cloud-native-demand-2024'),
  'game-industry-trend-2024': () =>
    import('./trend/game-industry-trend-2024'),
  // policy
  'shanghai-hukou-graduate-2024': () =>
    import('./policy/shanghai-hukou-graduate-2024'),
  'selected-transfer-cs-2024': () =>
    import('./policy/selected-transfer-cs-2024'),
  'overseas-visa-summary-2024': () =>
    import('./policy/overseas-visa-summary-2024'),
  // cost
  'shanghai-living-cost-2024': () =>
    import('./cost/shanghai-living-cost-2024'),
  'beijing-living-cost-2024': () =>
    import('./cost/beijing-living-cost-2024'),
  'germany-student-living-cost-2024': () =>
    import('./cost/germany-student-living-cost-2024'),
  // life
  'work-culture-tech-companies-2024': () =>
    import('./life/work-culture-tech-companies-2024'),
  'career-ceiling-degree-cs-2024': () =>
    import('./life/career-ceiling-degree-cs-2024'),
};

let cachedAtoms: KnowledgeAtom[] | null = null;

export async function loadAllAtoms(): Promise<KnowledgeAtom[]> {
  if (!cachedAtoms) {
    const atoms: KnowledgeAtom[] = [];
    for (const loader of Object.values(atomModules)) {
      const mod = await loader();
      atoms.push(mod.default);
    }
    cachedAtoms = atoms;
  }
  return cachedAtoms;
}

export async function searchAtoms(
  query: string,
  categories?: string[],
  maxResults: number = 15
): Promise<KnowledgeAtom[]> {
  const atoms = await loadAllAtoms();
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter(Boolean);

  const scored = atoms
    .filter((a) => {
      if (categories && categories.length > 0) {
        if (!categories.includes(a.category)) return false;
      }
      return true;
    })
    .map((a) => {
      let score = 0;
      const searchText = `${a.title} ${a.content} ${a.tags.join(' ')}`.toLowerCase();

      for (const term of queryTerms) {
        if (searchText.includes(term)) score += 1;
      }
      // 标题精确匹配加分
      if (queryTerms.every((t) => a.title.toLowerCase().includes(t))) {
        score += 2;
      }

      return { atom: a, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(({ atom }) => atom);

  return scored;
}

export async function getAtomsByCategory(
  category: string
): Promise<KnowledgeAtom[]> {
  const atoms = await loadAllAtoms();
  return atoms.filter((a) => a.category === category);
}

export function getAtomSlugs(): string[] {
  return Object.keys(atomModules);
}
