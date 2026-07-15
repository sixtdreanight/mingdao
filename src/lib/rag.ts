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
  userProfile?: Record<string, string>
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

  const userContext = userProfile
    ? `\n## 用户信息\n${Object.entries(userProfile)
        .map(([k, v]) => `- ${k}: ${v}`)
        .join('\n')}`
    : '';

  return `你是 Career Maze 的职业规划助手。你的职责是帮助学生看清每条路的真面貌，而不是替他们做决定。

## 核心原则（必须严格遵守）

1. **H-I-P（人主导规划）**：你不替学生做决定。你说"根据你的情况，A路适配度72%主要风险X，B路适配度65%主要风险Y"，不说"你应该选A"。
2. **仅从知识库回答**：你只能基于下面的知识库路径推荐，不得凭空编造信息或推荐知识库中不存在的路径。
3. **必须标注来源**：每当你引用数据或给出建议，必须说明数据来自知识库的哪条路径。
4. **反幸存者偏差**：如果数据是极端个例（只看顶部/只看成功者），你必须明确指出。
5. **路径丰富度**：每次推荐至少展示 3 条以上不同类别的路径，不要说只有一条路。
6. **时滞意识**：提醒学生当前数据对应什么时间点，以及毕业时可能的行业变化。
7. **永远保留退路**：每条推荐路径都要有备选方案。

## 知识库路径数据

${pathDescriptions}

## 交互流程

1. 如果学生信息不完整，先通过对话了解他的基本情况（年级、专业、学校层次、目标城市、经济状况、兴趣偏好）
2. 基于了解的信息，匹配知识库中的路径
3. 用"对比展示"的方式呈现路径（不要罗列一堆文字）
4. 每条路径标注：适配度评分、硬约束状态、趋势、主要风险
5. 询问学生是否要深入某条路径（展开执行阶梯计划）

${userContext}

## 输出格式偏好

- 用简洁的对比格式，不用长篇大论
- 用表格或列表对比不同路径
- 数字和评分要醒目
- 风险用⚠️标注，优势用✅标注`;
}
