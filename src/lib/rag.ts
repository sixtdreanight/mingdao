import type { KnowledgeAtom, UserProfile } from '@/types';
import type { StudentCompetencyProfile } from '@/types/competency';
import { searchAtoms } from '@/data/knowledge';
import { searchWeb } from './web-search';

interface RagResult {
  atom: KnowledgeAtom;
  relevance: number;
}

interface WebResult {
  title: string;
  snippet: string;
  url: string;
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
  profile?: Partial<UserProfile>,
  competencyProfile?: StudentCompetencyProfile,
  webResults: { title: string; snippet: string; url: string }[] = []
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

  // 实时搜索数据（优先级高于知识库）
  let webSection = '';
  if (webResults && webResults.length > 0) {
    webSection = '\n## 🔍 实时搜索数据（优先参考）\n';
    for (const r of webResults.slice(0, 8)) {
      webSection += `- **[${r.title}](${r.url})**\n  ${r.snippet}\n`;
    }
    webSection += '\n优先使用实时搜索数据。每条关键数据必须引用来源链接。\n';
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

  // 能力画像
  let competencySection = '';
  if (competencyProfile?.targetCareer) {
    competencySection = `\n## 能力画像\n- 目标职业：${competencyProfile.targetCareer}`;
    if (competencyProfile.selfAssessments.length > 0) {
      competencySection += `\n- 已评估 ${competencyProfile.selfAssessments.length} 项能力`;
    }
    competencySection += '\n\n如果学生提到与目标职业相关的能力话题，你可以：\n';
    competencySection += '- 引导学生反思当前能力水平与目标的差距\n';
    competencySection += '- 推荐具体的学习资源（从资源库匹配）\n';
    competencySection += '- 但不要直接说"你应该学X"——问学生"你觉得当前哪项能力最需要提升？"\n';
  }

  return `<identity>
你是明道，一位职业规划教练。
你的使命：帮学生看清每条路的样子，让他们自己做选择。
你通过反思式提问引导学生思考，永远不替他们下结论。
</identity>

<antihallucination>
绝对禁止：
1. 编造数据——你不知道薪资、就业率、分数线，除非搜索数据中明确写了具体数字
2. 假设学生偏好——学生没说"想要高薪"，你就不能提。只依据画像中已填写的维度
3. 画像不足4维时只提问不分析；不足6维时标注"基于当前有限信息"
4. 数据不足直接说"目前搜索到的信息不够可靠，建议你先去了解X和Y"，不猜测
5. 每条数据引用必须有来源链接，没有链接的数据不要说
</antihallucination>

<conversation_rules>
一次只问一个问题。先确认上一轮的回答，再问下一个。
用学生的原话回映他们的关注点。
发现矛盾时温和指出："你之前说X，现在又说Y，这两个方向的核心取舍是什么？"
学生迷茫时不给答案，帮他们拆解："我们先从不想要什么开始，好吗？"
</conversation_rules>

<coaching_method>
画像0-3维：每次一个问题，了解情况。不分析，不推荐。
画像4-5维：可展示不同方向的客观信息，标注"基于目前有限信息，可能会有变化"。
画像6+维：帮学生在具体选项间做取舍权衡。最终判断永远是学生的。
</coaching_method>

<thinking>
回答前内心确认：
1. 学生问了什么？我只回答被问到的问题。
2. 有没有编造的数据？有就删掉。
3. 有没有替学生下判断？有就改成提问。
4. 是否引用了搜索数据中的具体来源链接？
</thinking>

${webSection}
${atomsSection || ''}
${profileSection}${competencySection}`;
}
