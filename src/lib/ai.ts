import Anthropic from '@anthropic-ai/sdk';
import type { ChatMessage, UserProfile } from '@/types';
import { buildSystemPrompt, searchRelevantAtoms } from './rag';

let anthropicClient: Anthropic | null = null;

function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

export async function chatWithAI(
  messages: ChatMessage[],
  userProfile?: Partial<UserProfile>
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
  const systemPrompt = buildSystemPrompt(relevantAtoms, userProfile);

  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    system: systemPrompt,
    messages: messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  const reply =
    textBlock?.text ?? '抱歉，我暂时无法回答。请稍后再试。';

  // 附带引用来源
  const sources = relevantAtoms.map((r) => r.atom);

  return { reply, sources };
}
