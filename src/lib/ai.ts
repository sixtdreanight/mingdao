import Anthropic from '@anthropic-ai/sdk';
import type { CareerPath, ChatMessage } from '@/types';
import { buildSystemPrompt, searchRelevantPaths } from './rag';

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
  userProfile?: Record<string, string>
): Promise<string> {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUserMessage) {
    return '请先告诉我你的情况，我来帮你看看有哪些路可以走。';
  }

  // RAG：检索相关路径
  const relevantPaths = await searchRelevantPaths(lastUserMessage.content);

  // 如果没有匹配的路径，诚实告知
  if (relevantPaths.length === 0) {
    return '目前知识库中还没有完全匹配你问题的路径信息。你可以试试换个方向描述你的需求，或者告诉我你对哪类专业/行业感兴趣？';
  }

  const systemPrompt = buildSystemPrompt(relevantPaths, userProfile);

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
  return textBlock?.text ?? '抱歉，我暂时无法回答。请稍后再试。';
}

export async function extractUserProfile(
  messages: ChatMessage[]
): Promise<Record<string, string>> {
  // 从对话历史中提取用户画像
  const profile: Record<string, string> = {};

  const fullText = messages.map((m) => m.content).join('\n').toLowerCase();

  const patterns: [RegExp, string][] = [
    [/大[一二三四][上下]|大一|大二|大三|大四/, 'grade'],
    [/计算机|软件|数学|物理|电子|机械|土木/, 'major'],
    [/双非|985|211|一本|二本|专科/, 'universityTier'],
    [/上海|北京|深圳|广州|杭州|成都|武汉|南京/, 'targetCity'],
    [/漫展|二次元|自由|弹性|远程/i, 'lifestyle'],
  ];

  for (const [regex, key] of patterns) {
    const match = fullText.match(regex);
    if (match && !profile[key]) {
      profile[key] = match[0];
    }
  }

  return profile;
}
