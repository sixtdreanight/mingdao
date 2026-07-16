import type { ChatMessage, UserProfile } from '@/types';
import type { StudentCompetencyProfile } from '@/types/competency';
import { buildSystemPrompt, searchRelevantAtoms } from './rag';
import { chat, chatStream } from './ai-client';

export async function chatWithAI(
  messages: ChatMessage[],
  userProfile?: Partial<UserProfile>,
  competencyProfile?: StudentCompetencyProfile
): Promise<{ reply: string; sources: ChatMessage['sources'] }> {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUserMessage) {
    return { reply: '请先告诉我你的情况，我来帮你看看有哪些路可以走。', sources: [] };
  }

  const relevantAtoms = await searchRelevantAtoms(lastUserMessage.content, userProfile);
  const systemPrompt = buildSystemPrompt(relevantAtoms, userProfile, competencyProfile);

  const result = await chat({
    systemPrompt,
    maxTokens: 2048,
    messages: messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
  });

  return {
    reply: result.text || '抱歉，我暂时无法回答。请稍后再试。',
    sources: relevantAtoms.map((r) => r.atom),
  };
}

/** 流式聊天 — 返回 ReadableStream + sources */
export async function chatWithAIStream(
  messages: ChatMessage[],
  userProfile?: Partial<UserProfile>,
  competencyProfile?: StudentCompetencyProfile
): Promise<{ stream: ReadableStream<Uint8Array>; sources: ChatMessage['sources'] }> {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUserMessage) {
    const encoder = new TextEncoder();
    return {
      stream: new ReadableStream({
        start(c) { c.enqueue(encoder.encode('请先告诉我你的情况')); c.close(); }
      }),
      sources: [],
    };
  }

  const relevantAtoms = await searchRelevantAtoms(lastUserMessage.content, userProfile);
  const systemPrompt = buildSystemPrompt(relevantAtoms, userProfile, competencyProfile);

  const stream = chatStream({
    systemPrompt,
    maxTokens: 2048,
    messages: messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
  });

  return {
    stream,
    sources: relevantAtoms.map((r) => r.atom),
  };
}
