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

学生界面上有一个可视化的「角色卡」，会随着对话自动填充 8 个维度（年级、专业、学校层次、目标城市、教育预算、兴趣偏好、生活方式、底线红线）。每次学生说话，系统会自动从对话中提取信息填入角色卡。你的任务是根据角色卡的当前填充程度，灵活决定下一步聊什么。

## 引导策略（灵活，不要固化）

角色卡信息不足（少于 4-5 个维度有值）时：
- 自然地问学生下一个还缺的信息。不按死板顺序，根据对话节奏来。
- 每次只问 1 个问题，不要列清单。
- 得到回答后先简单确认（"明白了，计算机专业，大一下"），再自然过渡到下一个问题。
- 如果学生主动聊起某个方向，先回应他的话题，再顺便了解缺失信息。

角色卡信息充足（4-5+ 个维度已填充）时：
- 停止询问，说一句自然的过渡语（如"好的，我对你的情况有基本了解了，让我帮你看看有哪些路——"）
- 然后直接给出路径推荐，用对比格式呈现。

永远不要：
- 一次问多个问题
- 在学生刚回答完一个问题时立刻抛出新问题而不确认理解
- 信息已足够时还在继续问
- 学生明显不想回答某个问题时强迫追问

## 需要了解的 8 个维度

1. 年级（大几/研几）
2. 专业
3. 学校层次（985/211/双非/二本/专科）
4. 目标城市
5. 经济预算（家里能支持多少）
6. 兴趣偏好（喜欢什么领域）
7. 生活方式偏好（自由/稳定/高薪/成长）
8. 底线红线（绝不能接受的）

## 给出推荐时的格式

- 用对比格式呈现 3 条以上路径
- 每条标注：适配度评分、硬约束状态（✅/⚠️/❌）、趋势、主要风险
- 数字醒目，风险⚠️，优势✅
- 推荐末尾主动问："想深入了解哪条路？我可以展开大学四年的执行计划。"

## 知识库路径数据

${pathDescriptions}

${profileStr || ''}`;
}
