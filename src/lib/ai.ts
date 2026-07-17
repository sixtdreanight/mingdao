import type { ChatMessage, UserProfile, ChatSource } from '@/types';
import type { StudentCompetencyProfile } from '@/types/competency';
import { buildSystemPrompt, searchRelevantAtoms } from './rag';
import { chatStream } from './ai-client';
import { searchWeb } from './web-search';
import { getStage, nextMissingDimension, profileFillCount } from './session';
/* Note: hasRoutes is client-only (localStorage); accepted from request body */

const MAX_MESSAGES = 30;
const KEEP_RECENT = 20;

function windowMessages(
  messages: ChatMessage[]
): { role: 'user' | 'assistant'; content: string }[] {
  const filtered = messages.filter((m) => m.role !== 'system');
  if (filtered.length <= MAX_MESSAGES) {
    return filtered.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));
  }
  const win = filtered.slice(-KEEP_RECENT).map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));
  // Anthropic requires first message to be user; trim leading assistant messages
  while (win.length > 0 && win[0].role !== 'user') {
    win.shift();
  }
  return win;
}

function userWantsPlan(text: string): boolean {
  return /帮我规划|有什么路|怎么走|方向|路径|路线|规划一下|分析一下/.test(text);
}

export async function chatWithAIStream(
  messages: ChatMessage[],
  userProfile?: Partial<UserProfile>,
  competencyProfile?: StudentCompetencyProfile,
  hasRoutesFlag: boolean = false,
): Promise<{ stream: ReadableStream<Uint8Array>; sources: ChatSource[] }> {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUserMessage) {
    const enc = new TextEncoder();
    return { stream: new ReadableStream({ start(c) { c.enqueue(enc.encode('请先告诉我你的情况')); c.close(); } }), sources: [] };
  }

  const profile = userProfile || {};
  const stage = getStage(profile, hasRoutesFlag, userWantsPlan(lastUserMessage.content));

  // 搜索
  const trimmed = lastUserMessage.content.trim();
  const isSubstantive = trimmed.length > 4 &&
    !/^(你好[!！。~～\s]*|hi[!！]*|hello[!！]*|嗯|哦|好[的了]?|可以|行|是的|[是对对]|谢谢|ok|哈哈)$/i.test(trimmed);
  const webResults = isSubstantive ? await searchWeb(lastUserMessage.content) : [];
  const sources: ChatSource[] = webResults.map((r) => ({ title: r.title, url: r.url, snippet: r.snippet }));

  const relevantAtoms = await searchRelevantAtoms(lastUserMessage.content, userProfile);
  for (const { atom } of relevantAtoms) {
    if (atom.trustLevel === 'official' && atom.sourceUrl?.startsWith('http')) {
      sources.push(atom);
    }
  }

  // 按阶段构建 prompt
  let stageGuidance = '';
  if (stage === 'collect') {
    const next = nextMissingDimension(profile);
    const filled = profileFillCount(profile);
    stageGuidance = `<stage>信息采集阶段</stage>
<instruction>
你正在了解学生的基本情况。已收集 ${filled}/8 维信息。
${next ? `现在问：${next}` : '了解得差不多了，可以问学生想不想开始规划。'}
一次只问一个问题。先肯定学生的回答，再自然地过渡到下一个问题。
学生说"不知道"或跳过时，不追问，继续下一个维度。
</instruction>`;
  } else if (stage === 'plan') {
    stageGuidance = `<stage>路线规划阶段</stage>
<instruction>
学生的画像信息已足够。现在基于他的情况，结合搜索数据，给他展示 2-3 条可行的职业路线。
每条路线说清楚：这个方向需要什么条件、大概能拿多少薪资、要付出什么代价、适合什么样的人。
如果学生想深入了解某条路线，告诉他可以在个人画像页面点击"生成路线图"获得完整的里程碑规划。
最后问他想深入了解哪个方向。
</instruction>`;
  } else {
    stageGuidance = `<stage>调整阶段</stage>
<instruction>
学生已有路线规划。根据他的反馈调整建议——排除不合适的，补充新的方向，或者深入某条路线。
</instruction>`;
  }

  const basePrompt = buildSystemPrompt(relevantAtoms, userProfile, competencyProfile, webResults);
  const systemPrompt = basePrompt + '\n' + stageGuidance;

  const stream = chatStream({
    systemPrompt,
    maxTokens: 2048,
    messages: windowMessages(messages),
  });

  return { stream, sources };
}
