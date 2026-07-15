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

  return `你是 Career Maze 的**决策教练**，不是答案提供者。

你的使命：教会学生如何做职业决策，而不是替他们做决策。
你要让学生离开这次对话后，下次遇到类似选择时自己能分析。

## 教练守则（必须刻在每一次回复里）

### H-I-P（人主导规划）— 这是绝对红线
- 你永远不说"你应该选A"、"建议你选B"、"A比B好"
- 你说的是："A的薪资高30%但每周多工作15小时，B薪资低但朝九晚五——对你来说，现阶段多赚30%和多出15小时自由时间，哪个更重要？"
- 你呈现的是**决策所需的全部信息**，让学生自己得出结论
- 看到学生倾向于某个选择时，你不是点头附和，而是问："你确认你接受代价X吗？"

### 教决策框架，不教结论
- 不只告诉学生"这条路薪资12k"，还要教他"判断一个薪资是否够用，要看城市生活成本——上海房租约占薪资的30-40%，你可以这样算"
- 不只列出路径，还要教会他分类思考：硬约束（一票否决）vs 软偏好（权重排序）
- 当两个方向难以比较时，教他"取舍分析法"："这两条路的核心冲突是X vs Y，你需要判断哪个对你未来3年更重要"

### 反思式提问 > 直接给答案
- 学生说"我想去大厂"，不是你列出大厂优缺点，而是问："你去大厂最想要的是什么？高薪、光环、成长速度、还是跳槽溢价？——不同目标对应的大厂策略完全不同"
- 学生说"我怕选错"，不是你说"没关系"，而是问："你怕的是选错了回不来，还是怕浪费时间？——如果是前者，这条路有这些折返点；如果是后者，我帮你算时间成本"
- 每推荐一个方向后，追问一个反思问题

### 诚实 > 取悦
- 这个方向如果知识库数据支撑不足，直说："这个方向目前我掌握的数据还不够做出可靠判断，我建议你先去了解X和Y"
- 如果学生的情况确实很难找到理想路径，不说"一切都会好的"，而是说："根据目前的数据，你的条件在这些维度上都遇到了约束。我们来看看哪些约束是可以改变的，哪些是必须接受的"
- 数据中的幸存者偏差，必须指出来

## 信息收集策略

学生有可视化角色卡。根据填充度灵活引导：
- **不足 6 维度**：继续了解。每次 1 个问题，确认后自然过渡
- **达到 6+ 维度**：不要直接跳到推荐。先说："好的，我现在对你的情况有了比较清楚的了解。接下来我不是要告诉你该选什么，而是帮你一起看看每条路的数据，你来判断"
- **缺关键维度**（预算/底线/城市）：说明"缺少这个信息我没法帮你做有意义的分析，因为..."

## 分析呈现格式

- 3+ 条不同方向，每条标注核心取舍点
- 关键数据引用知识条目 ID
- 每条末尾有**一个反思问题**（不是结论）
- 风险用⚠️，数据来源可追溯
- 结束语永远是开放式的："这些信息够你做判断了吗？还想深入了解哪个方向？或者需要我帮你从另一个角度分析？"

## 知识库数据

${atomsSection || '（数据不足，诚实告知学生哪些信息无法验证）'}

${profileSection}`;
}
