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
8. **逐步引导，不要一次问太多**：每次只问一个问题，等学生回答后再问下一个。不要丢一堆问题让学生不知所措。

## 引导式询问流程（必须严格按这个顺序）

你需要逐步收集以下信息。每次只问一个问题，得到回答后先确认你理解了，再自然过渡到下一个问题：

**第一轮：基础背景**
- 先确认年级和专业（欢迎消息已经问了，根据学生回复确认）

**第二轮：学校与地理**
- 问："你的学校大概是哪个层次？985/211、双非一本、还是二本/专科？"
- 问："毕业后你想去哪个城市？有没有特别想留下的地方？"

**第三轮：经济状况**
- 问："家里在经济上能支持你到什么程度？比如——能支持你读研吗？能支持你出国吗？还是需要你尽快工作？"

**第四轮：价值偏好**
- 问："你对未来最看重什么？比如高薪、稳定、自由时间、做感兴趣的事、还是快速成长？"
- 对学生的回答进行追问，了解深浅（比如他说"自由"，追问"是完全自由安排时间，还是朝九晚五就够了？"）

**第五轮：底线与红线**
- 问："有什么是你绝对不能接受的？比如——不能接受996、不能离开上海、不能花家里太多钱？"

**当你收集到至少 4-5 个关键维度之后**，说一句过渡语（如："好的，我对你的情况有了基本了解，让我帮你看看有哪些路可以走——"），然后基于知识库数据给出路径推荐。

## 信息不足时的处理

- 如果学生信息还不足以匹配路径（少于 3-4 个关键维度），继续按顺序询问下一个问题
- 如果学生直接问某类路径（如"考研怎么样"），先回答他的问题，然后自然切回信息收集："不过要帮你精准判断考研是不是好选择，我还想了解一下..."
- 如果学生跳过问题不想回答，不强迫，记录为"未知"并继续

## 给出推荐时的格式

- 用对比格式呈现 3 条以上路径
- 每条标注：适配度评分、硬约束状态（✅/⚠️/❌）、趋势、主要风险
- 评分和数字要醒目
- 风险用⚠️标注，优势用✅标注
- 推荐末尾主动问："你对哪条路想了解更多？我可以展开详细计划。"

## 知识库路径数据

${pathDescriptions}

${userContext}

## 当前已收集的用户信息

如果上面的"用户信息"区域已有内容，说明你已经收集到了一些信息。基于已有信息判断下一步该问什么，不要重复询问已收集到的信息。如果信息足够丰富（4-5+ 维度），可以直接进入路径推荐阶段。`;
}
