import type { ChatMessage, UserProfile } from '@/types';
import type { StudentCompetencyProfile } from '@/types/competency';
import { buildSystemPrompt, searchRelevantAtoms } from './rag';
import { chat, chatStream } from './ai-client';

/** 超过此数量的消息时，压缩旧消息 */
const COMPRESS_THRESHOLD = 12;
/** 保留最新 N 条完整消息 */
const KEEP_RECENT = 6;

/**
 * 递归摘要：将旧消息压缩为一段摘要，保留最近消息为完整上下文。
 * 基于 Wang et al. (2025) "Recursively Summarizing Enables Long-Term Dialogue Memory"
 * 和 MemGPT 的层级记忆管理范式。
 */
async function compressMessages(
  messages: ChatMessage[]
): Promise<{ compressedMessages: { role: 'user' | 'assistant' | 'system'; content: string }[]; summary: string }> {
  const filtered = messages.filter((m) => m.role !== 'system');

  if (filtered.length <= COMPRESS_THRESHOLD) {
    return {
      compressedMessages: filtered.map((m) => ({ role: m.role as 'user' | 'assistant' | 'system', content: m.content })),
      summary: '',
    };
  }

  // 旧消息压缩为摘要
  const oldMessages = filtered.slice(0, filtered.length - KEEP_RECENT);
  const recentMessages = filtered.slice(-KEEP_RECENT);

  // 获取之前的摘要（如果存在）
  const prevSummary = (messages[0]?.role === 'system' && messages[0]?.content?.startsWith('[记忆摘要]'))
    ? messages[0].content.replace('[记忆摘要] ', '')
    : '';

  const oldText = oldMessages.map((m) => `${m.role === 'user' ? '学生' : '助手'}: ${m.content}`).join('\n');

  try {
    const result = await chat({
      systemPrompt: '你是一个对话摘要器。将以下对话历史压缩为一段简洁的摘要，保留关键信息：用户的基本情况（年级、专业、学校、目标城市等）、已讨论过的职业方向、重要的偏好和底线。用中文，不超过200字。',
      maxTokens: 400,
      temperature: 0.1,
      messages: [
        { role: 'user', content: prevSummary ? `之前的摘要：${prevSummary}\n\n新对话：\n${oldText}` : oldText },
      ],
    });

    const summary = result.text.trim();

    // 压缩后的消息 = 摘要作为上下文 + 最近消息
    const summaryContext = summary
      ? [{ role: 'system' as const, content: `[记忆摘要] ${summary}` }]
      : [];

    return {
      compressedMessages: [
        ...summaryContext,
        ...recentMessages.map((m) => ({ role: m.role as 'user' | 'assistant' | 'system', content: m.content })),
      ],
      summary,
    };
  } catch {
    // 摘要失败时回退到滑动窗口
    return {
      compressedMessages: recentMessages.map((m) => ({ role: m.role as 'user' | 'assistant' | 'system', content: m.content })),
      summary: '',
    };
  }
}

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
  const { compressedMessages } = await compressMessages(messages);

  const result = await chat({
    systemPrompt,
    maxTokens: 2048,
    messages: compressedMessages,
  });

  return {
    reply: result.text || '抱歉，我暂时无法回答。请稍后再试。',
    sources: relevantAtoms.map((r) => r.atom).filter((a) => a.sourceUrl && a.sourceUrl.startsWith('http')),
  };
}

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
  const { compressedMessages } = await compressMessages(messages);

  const stream = chatStream({
    systemPrompt,
    maxTokens: 2048,
    messages: compressedMessages,
  });

  return {
    stream,
    sources: relevantAtoms.map((r) => r.atom).filter((a) => a.sourceUrl && a.sourceUrl.startsWith('http')),
  };
}
