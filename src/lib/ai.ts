import type { ChatMessage, UserProfile } from '@/types';
import type { StudentCompetencyProfile } from '@/types/competency';
import { buildSystemPrompt, searchRelevantAtoms } from './rag';
import { chat } from './ai-client';

export async function chatWithAI(
  messages: ChatMessage[],
  userProfile?: Partial<UserProfile>,
  competencyProfile?: StudentCompetencyProfile
): Promise<{ reply: string; sources: ChatMessage['sources'] }> {
  const lastUserMessage = [...messages].reverse().find(
    (m) => m.role === 'user'
  );
  if (!lastUserMessage) {
    return {
      reply: '请先告诉我你的情况，我来帮你看看有哪些路可以走。',
      sources: [],
    };
  }

  // RAG：检索相关原子事实
  const searchQuery = lastUserMessage.content;
  const relevantAtoms = await searchRelevantAtoms(searchQuery, userProfile);

  // 构建系统提示词
  const systemPrompt = buildSystemPrompt(relevantAtoms, userProfile, competencyProfile);

  const result = await chat({
    systemPrompt,
    maxTokens: 2048,
    messages: messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
  });

  const reply = result.text || '抱歉，我暂时无法回答。请稍后再试。';

  // 附带引用来源
  const sources = relevantAtoms.map((r) => r.atom);

  return { reply, sources };
}
