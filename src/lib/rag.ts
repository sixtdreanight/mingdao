import type { KnowledgeAtom, UserProfile } from '@/types';
import { searchAtoms } from '@/data/knowledge';

interface RagResult {
  atom: KnowledgeAtom;
  relevance: number;
}

/**
 * 根据用户查询和画像，从知识库检索相关原子事实。
 * 按维度分类检索，确保覆盖薪资、教育、就业、趋势等多个维度。
 */
export async function searchRelevantAtoms(
  query: string,
  profile?: Partial<UserProfile>,
  maxResults: number = 15
): Promise<RagResult[]> {
  const keywords = extractKeywords(query, profile);
  const allResults: RagResult[] = [];

  // 按每个关键词 + 每个类别交叉检索
  const categories = [
    'salary',
    'education',
    'employment',
    'trend',
    'policy',
    'cost',
    'life',
  ] as const;

  for (const keyword of keywords) {
    for (const cat of categories) {
      const atoms = await searchAtoms(keyword, [cat], 3);
      for (const atom of atoms) {
        const existing = allResults.find((r) => r.atom.id === atom.id);
        if (existing) {
          existing.relevance += 0.2;
        } else {
          allResults.push({ atom, relevance: 0.3 });
        }
      }
    }
  }

  // 标题/内容包含完整查询词的加分
  const queryLower = query.toLowerCase();
  for (const result of allResults) {
    if (result.atom.title.toLowerCase().includes(queryLower)) {
      result.relevance += 0.3;
    }
    if (result.atom.content.toLowerCase().includes(queryLower)) {
      result.relevance += 0.2;
    }
    // 标签匹配加分
    for (const tag of result.atom.tags) {
      if (queryLower.includes(tag.toLowerCase())) {
        result.relevance += 0.15;
      }
    }
  }

  return allResults
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, maxResults);
}

function extractKeywords(
  query: string,
  profile?: Partial<UserProfile>
): string[] {
  const keywords: string[] = [];

  // 从用户查询提取关键词
  const patterns: [RegExp, string][] = [
    [/计算机|CS|软件工程|编程|开发|前端|后端|算法|AI|人工智能/, '计算机'],
    [/考研|读研|硕士|博士|保研|研究生/, '考研'],
    [/出国|留学|海外|德国|日本|美国|英国|法国|澳洲|新加坡|韩国/, '出国'],
    [/就业|工作|上班|校招|社招|应届/, '就业'],
    [/考公|选调|公务员|体制|事业编/, '考公'],
    [/自由职业|远程|兼职|副业|独立开发/, '自由职业'],
    [/上海|北京|深圳|广州|杭州|成都/, '上海'],
    [/外企|大厂|创业|国企|银行/, '外企'],
    [/薪资|工资|年薪|月薪|收入|起薪/, '薪资'],
    [/996|加班|WLB|工作生活|平衡|朝九晚五/, 'WLB'],
    [/落户|户口|签证|H1B|OPT/, '签证'],
    [/趋势|前景|发展|未来|变化/, '趋势'],
  ];

  for (const [regex, keyword] of patterns) {
    if (regex.test(query) && !keywords.includes(keyword)) {
      keywords.push(keyword);
    }
  }

  // 从画像补充关键词
  if (profile?.major && !keywords.includes(profile.major)) {
    keywords.push(profile.major);
  }
  if (profile?.targetCity) {
    const city = profile.targetCity.split('、')[0];
    if (!keywords.includes(city)) keywords.push(city);
  }

  // 保证至少有一个关键词
  if (keywords.length === 0) {
    keywords.push('计算机');
  }

  return keywords;
}

/**
 * 构建系统提示词——将检索到的原子事实注入 prompt，
 * AI 基于这些事实进行跨维度推理，生成个性化建议。
 */
export function buildSystemPrompt(
  relevantAtoms: RagResult[],
  profile?: Partial<UserProfile>
): string {
  // 按类别分组展示检索到的原子事实
  const categoryLabels: Record<string, string> = {
    salary: '💰 薪资数据',
    education: '🎓 教育路径',
    employment: '💼 就业市场',
    trend: '📈 行业趋势',
    policy: '📋 政策规定',
    cost: '🏠 生活成本',
    life: '🌿 工作与生活',
  };

  const grouped = new Map<string, RagResult[]>();
  for (const r of relevantAtoms) {
    const cat = r.atom.category;
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(r);
  }

  let atomsSection = '';
  for (const [cat, results] of grouped) {
    atomsSection += `\n### ${categoryLabels[cat] || cat}\n`;
    for (const r of results) {
      atomsSection += `- **[${r.atom.title}]** (${r.atom.id})\n`;
      atomsSection += `  ${r.atom.content}\n`;
      if (r.atom.data && Object.keys(r.atom.data).length > 0) {
        atomsSection += `  数据: ${JSON.stringify(r.atom.data)}\n`;
      }
    }
  }

  // 用户画像
  let profileSection = '';
  if (profile) {
    const lines: string[] = [];
    if (profile.grade) lines.push(`- 年级：${profile.grade}`);
    if (profile.major) lines.push(`- 专业：${profile.major}`);
    if (profile.universityTier) lines.push(`- 学校层次：${profile.universityTier}`);
    if (profile.targetCity) lines.push(`- 目标城市：${profile.targetCity}`);
    if (profile.householdBudget) lines.push(`- 教育预算：${profile.householdBudget}元`);
    if (profile.interests?.length) lines.push(`- 兴趣偏好：${profile.interests.join('、')}`);
    if (profile.lifestyle?.length) lines.push(`- 生活方式：${profile.lifestyle.join('、')}`);
    if (profile.redLines?.length) lines.push(`- 底线红线：${profile.redLines.join('、')}`);
    if (lines.length > 0) {
      profileSection = `\n## 用户画像\n${lines.join('\n')}\n`;
    }
  }

  return `你是 Career Maze 的职业规划助手。你的职责是基于真实数据帮助学生看清每条路的真面貌，而不是替他们做决定。

## 核心原则

1. **H-I-P（人主导规划）**：不替学生决定。"根据数据分析，方向A优势X风险Y，方向B优势X风险Y"，不说"你应该选A"。
2. **仅从知识库数据推理**：你只能基于下面提供的知识库原子数据进行推理。每条结论必须能追溯到具体的知识条目（标注 ID）。
3. **跨维度综合分析**：你需要综合薪资、教育门槛、就业趋势、政策、生活成本等多个维度的数据，而不是单维度判断。
4. **反幸存者偏差**：知识库数据反映的是中位数和趋势，不是极端个例。如果某条数据可能偏向成功者叙事，请指出。
5. **路径丰富度**：每次推荐展示 3 条以上不同方向，展示每条路的薪资范围、教育投入、时间成本、主要风险。
6. **时滞意识**：提醒学生当前数据对应的时间点，以及毕业时可能的行业变化。
7. **永远保留退路**：每条推荐方向都要有备选方案。
8. **数据缺失诚实**：如果知识库中缺少做出判断所需的关键数据，如实告知学生，不要猜测。

## 角色卡与引导策略

界面上有学生的「角色卡」。你的任务是根据卡片填充程度灵活引导：

- **信息不足 6 个维度**：继续了解学生。每次问 1 个问题，确认回答后自然过渡。
- **信息达到 6+ 维度**：停止询问，直接基于知识库数据给出综合推荐。
- **缺少关键数据**（预算/底线/城市未知）：绝不推荐依赖该维度的方向（如不知预算不推留学）。
- **学生要求推荐但信息不足**：先说明缺少哪些关键信息，询问是否先聊这些。

## 推荐格式

- 用对比格式呈现 3 条以上方向
- 每条标注：适配度分析、关键数据引用（标注知识条目 ID）、薪资范围、教育投入、主要风险
- 数字醒目，风险用⚠️，优势用✅
- 推荐末尾主动问对哪条路想深入了解

## 知识库数据（基于当前对话检索到的相关事实）

${atomsSection || '（本轮未检索到匹配的知识库数据，请诚实告知学生并继续引导收集信息）'}

${profileSection}`;
}
