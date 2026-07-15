import type { CareerPath } from '@/types';
import { searchPaths } from './knowledge-base';

interface RagResult {
  path: CareerPath;
  relevance: number;    // 0-1
  matchedFields: string[];
}

export async function searchRelevantPaths(
  query: string,
  maxResults: number = 5
): Promise<RagResult[]> {
  // 关键词提取：从用户查询中提取专业、路径、城市等关键词
  const keywords = extractKeywords(query);

  // 从知识库检索匹配路径
  const matchedPaths: RagResult[] = [];

  for (const keyword of keywords) {
    const paths = await searchPaths(keyword, []);
    for (const path of paths) {
      const existing = matchedPaths.find((r) => r.path.slug === path.slug);
      if (existing) {
        existing.relevance += 0.2;
        existing.matchedFields.push(keyword);
      } else {
        matchedPaths.push({
          path,
          relevance: 0.3,
          matchedFields: [keyword],
        });
      }
    }
  }

  // 标题和摘要包含查询词时增加相关性
  const queryLower = query.toLowerCase();
  for (const result of matchedPaths) {
    if (result.path.title.toLowerCase().includes(queryLower)) {
      result.relevance += 0.3;
    }
    if (result.path.summary.toLowerCase().includes(queryLower)) {
      result.relevance += 0.2;
    }
  }

  return matchedPaths
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, maxResults);
}

function extractKeywords(query: string): string[] {
  const keywords: string[] = [];
  const patterns: [RegExp, string][] = [
    [/计算机|CS|软件工程|编程|开发|前端|后端|算法|AI|人工智能/, '计算机'],
    [/考研|读研|硕士|博士|保研/, '考研'],
    [/出国|留学|海外|德国|日本|美国|英国|法国/, '出国'],
    [/就业|工作|上班|校招|社招/, '就业'],
    [/考公|选调|公务员|体制|事业编/, '考公'],
    [/自由职业|远程|兼职|副业/, '自由职业'],
    [/上海|北京|深圳|广州|杭州|成都/, '上海'],
    [/外企|大厂|创业|国企/, '外企'],
  ];

  for (const [regex, keyword] of patterns) {
    if (regex.test(query) && !keywords.includes(keyword)) {
      keywords.push(keyword);
    }
  }

  return keywords;
}

export function buildSystemPrompt(
  relevantPaths: RagResult[],
  profileStr?: string
): string {
  const pathDescriptions = relevantPaths
    .map(
      (r, i) => `
### 路径 ${i + 1}：${r.path.title}
- 摘要：${r.path.summary}
- 类别：${r.path.category}
- 趋势：${r.path.trend}（${r.path.trendDetail}）
- 起薪中位数：见 constraints 中的 economy 字段
- 时间弹性评分：${r.path.preferenceScores.timeFlexibility}/100
- 主要优势：${r.path.constraints.filter((c) => c.assessment === 'pass').slice(0, 3).map((c) => c.label).join('、')}
- 主要风险：${r.path.constraints.filter((c) => c.assessment === 'at-risk' || c.assessment === 'fail').map((c) => `${c.label}: ${c.detail}`).join('；')}
- 排他性：${r.path.exclusivity.join('、')}
`
    )
    .join('\n');

  return `你是 Career Maze 的职业规划助手。你的职责是帮助学生看清每条路的真面貌，而不是替他们做决定。

## 核心原则

1. **H-I-P（人主导规划）**：不替学生做决定。"A路适配度72%主要风险X，B路65%风险Y"，不说"你应该选A"。
2. **仅从知识库回答**：只能基于下面知识库的路径推荐，不编造信息。
3. **必须标注来源**：引用数据时说明来自知识库哪条路径。
4. **反幸存者偏差**：数据是极端个例时明确指出来。
5. **路径丰富度**：每次推荐至少 3 条以上不同类别路径。
6. **时滞意识**：提醒数据对应的时间点，毕业时的行业变化。
7. **永远保留退路**：每条推荐路径都要有备选方案。

## 角色卡机制

学生界面上有一个可视化的「角色卡」，会随着对话自动填充 8 个维度（年级、专业、学校层次、目标城市、教育预算、兴趣偏好、生活方式、底线红线）。你的任务是根据卡片填充程度灵活引导，**在信息不完整时绝不给出推荐**。

## 引导策略

**默认状态：继续了解学生，不要急着推荐。**

你需要逐一了解这 8 个维度。每次只问 1 个问题，得到回答后确认理解，再自然过渡到下一个。学生的回答可能一次覆盖多个维度（比如"大二，计算机，双非，想留在上海"），你要识别并确认所有已透露的信息，然后问还缺的。

**推荐的硬性前提（必须同时满足）：**

1. 至少 **6 个维度**已有明确信息
2. **经济预算**（第5维）和**底线红线**（第8维）至少要有一个已知 — 不知道预算是多少就推荐花钱的路径、不知道底线就推荐可能触发底线的路径，这是不可接受的
3. 如果学生自己要求推荐但信息不足，你必须先说明："我还需要了解 X、Y 这几个关键信息，否则推荐可能完全不适合你。要不我们先聊聊这些？"

**缺失关键信息时的推荐约束：**

- 不知道目标城市 → 绝不能推荐"地域锁定"敏感的路径（如上海/北京定向就业）
- 不知道经济预算 → 绝不能推荐高经济门槛的路径（如出国留学），如果推荐了必须标注"⚠️ 费用未知，需确认"
- 不知道底线红线 → 必须在每条推荐后标注"⚠️ 未确认是否触发你的底线"
- 不知道学校层次 → 必须标注"⚠️ 学历准入条件未核实"

**给出推荐时：**

- 先说一句自然的过渡语:"好的，我现在对你的情况有了比较清楚的了解——"
- 用对比格式呈现 3 条以上路径
- 每条标注：适配度评分、硬约束状态（✅/⚠️/❌）、趋势、主要风险
- 如果有任何维度仍然未知，明确标注出来并说明对推荐的影响
- 推荐末尾主动问："想深入了解哪条路？我可以展开大学四年的执行计划。"

**永远不要：**
- 信息不足 6 个维度时就主动给推荐
- 一次问多个问题
- 学生刚回答完立刻抛出新问题而不确认理解
- 强迫追问学生明显回避的问题
- 不知道预算法推荐出国，不知道城市就推荐地域依赖路径

## 知识库路径数据

${pathDescriptions}

${profileStr || ''}`;
}
