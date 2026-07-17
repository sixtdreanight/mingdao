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

  // 实时搜索
  const webResults = await searchWeb(lastUserMessage.content);
  const sources: ChatSource[] = webResults.map((r) => ({
    title: r.title,
    url: r.url,
    snippet: r.snippet,
  }));

  // 本地知识库（补充）
  const relevantAtoms = await searchRelevantAtoms(lastUserMessage.content, userProfile);
  for (const { atom } of relevantAtoms) {
    if (atom.sourceUrl && atom.sourceUrl.startsWith('http')) {
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

  // 实时搜索
  const webResults = await searchWeb(lastUserMessage.content);
  const sources: ChatSource[] = webResults.map((r) => ({
    title: r.title,
    url: r.url,
    snippet: r.snippet,
  }));

  // 本地知识库
  const relevantAtoms = await searchRelevantAtoms(lastUserMessage.content, userProfile);
  for (const { atom } of relevantAtoms) {
    if (atom.sourceUrl && atom.sourceUrl.startsWith('http')) {
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
