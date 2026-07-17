import type { ChatMessage, UserProfile, ChatSource } from '@/types';
import type { StudentCompetencyProfile } from '@/types/competency';
import { buildSystemPrompt, searchRelevantAtoms } from './rag';
import { chat, chatStream } from './ai-client';
import { searchWeb } from './web-search';

/** 超过此数量时只做滑动窗口——生涯场景保留细节，不用压缩摘要 */
const MAX_MESSAGES = 30;
const KEEP_RECENT = 20;

function windowMessages(
  messages: ChatMessage[]
): { role: 'user' | 'assistant'; content: string }[] {
  const filtered = messages.filter((m) => m.role !== 'system');
  if (filtered.length <= MAX_MESSAGES) {
    return filtered.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));
  }
  return filtered.slice(-KEEP_RECENT).map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));
}

export async function chatWithAI(
  messages: ChatMessage[],
  userProfile?: Partial<UserProfile>,
  competencyProfile?: StudentCompetencyProfile
): Promise<{ reply: string; sources: ChatSource[] }> {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUserMessage) {
    return { reply: '请先告诉我你的情况，我来帮你看看有哪些路可以走。', sources: [] };
  }

  // 只在用户问实质性问题时搜索（跳过问候/简单确认）
  const isSubstantive = lastUserMessage.content.length > 8 &&
    !/^(你好|hi|hello|嗯|哦|好|可以|行|是的|对|谢谢|ok|哈哈)/i.test(lastUserMessage.content.trim());
  const webResults = isSubstantive ? await searchWeb(lastUserMessage.content) : [];
  const sources: ChatSource[] = webResults.map((r) => ({
    title: r.title,
    url: r.url,
    snippet: r.snippet,
  }));

  // 本地知识库（仅用于 prompt 上下文，不作为来源展示——目前全是 AI 推断数据）
  const relevantAtoms = await searchRelevantAtoms(lastUserMessage.content, userProfile);
  // 仅添加官方认证的真来源
  for (const { atom } of relevantAtoms) {
    if (atom.trustLevel === 'official' && atom.sourceUrl?.startsWith('http')) {
      sources.push(atom);
    }
  }

  const systemPrompt = buildSystemPrompt(relevantAtoms, userProfile, competencyProfile, webResults);

  const result = await chat({
    systemPrompt,
    maxTokens: 2048,
    messages: windowMessages(messages),
  });

  return {
    reply: result.text || '抱歉，我暂时无法回答。请稍后再试。',
    sources,
  };
}

export async function chatWithAIStream(
  messages: ChatMessage[],
  userProfile?: Partial<UserProfile>,
  competencyProfile?: StudentCompetencyProfile
): Promise<{ stream: ReadableStream<Uint8Array>; sources: ChatSource[] }> {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUserMessage) {
    const encoder = new TextEncoder();
    return {
      stream: new ReadableStream({ start(c) { c.enqueue(encoder.encode('请先告诉我你的情况')); c.close(); } }),
      sources: [],
    };
  }

  // 只在实质性问题时搜索
  const isSubstantive = lastUserMessage.content.length > 8 &&
    !/^(你好|hi|hello|嗯|哦|好|可以|行|是的|对|谢谢|ok|哈哈)/i.test(lastUserMessage.content.trim());
  const webResults = isSubstantive ? await searchWeb(lastUserMessage.content) : [];
  const sources: ChatSource[] = webResults.map((r) => ({
    title: r.title,
    url: r.url,
    snippet: r.snippet,
  }));

  // 本地知识库（仅补充官方认证来源）
  const relevantAtoms = await searchRelevantAtoms(lastUserMessage.content, userProfile);
  for (const { atom } of relevantAtoms) {
    if (atom.trustLevel === 'official' && atom.sourceUrl?.startsWith('http')) {
      sources.push(atom);
    }
  }

  const systemPrompt = buildSystemPrompt(relevantAtoms, userProfile, competencyProfile, webResults);

  const stream = chatStream({
    systemPrompt,
    maxTokens: 2048,
    messages: windowMessages(messages),
  });

  return { stream, sources };
}
