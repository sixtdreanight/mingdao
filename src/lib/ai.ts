import Anthropic from '@anthropic-ai/sdk';
import type { ChatMessage, UserProfile } from '@/types';
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
  userProfile?: Partial<UserProfile>
): Promise<string> {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUserMessage) {
    return '请先告诉我你的情况，我来帮你看看有哪些路可以走。';
  }

  // RAG：检索相关路径（用最新的用户消息 + 画像信息检索）
  const searchQuery = buildSearchQuery(lastUserMessage.content, userProfile);
  const relevantPaths = await searchRelevantPaths(searchQuery);

  // 如果没有匹配的路径，继续引导收集信息
  if (relevantPaths.length === 0) {
    return '目前知识库中还没有完全匹配你问题的路径信息。你可以试试换个方向描述你的需求，或者告诉我你对哪类专业/行业感兴趣？';
  }

  // 将画像转为可读字符串传给 system prompt
  const profileStr = profileToString(userProfile);
  const systemPrompt = buildSystemPrompt(relevantPaths, profileStr);

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

function buildSearchQuery(
  latestMsg: string,
  profile?: Partial<UserProfile>
): string {
  const parts = [latestMsg];
  if (profile?.major) parts.push(profile.major);
  if (profile?.targetCity) parts.push(profile.targetCity);
  if (profile?.interests) parts.push(...profile.interests);
  return parts.join(' ');
}

function profileToString(profile?: Partial<UserProfile>): string {
  if (!profile) return '';
  const lines: string[] = [];
  if (profile.grade) lines.push(`- 年级：${profile.grade}`);
  if (profile.major) lines.push(`- 专业：${profile.major}`);
  if (profile.universityTier) lines.push(`- 学校层次：${profile.universityTier}`);
  if (profile.targetCity) lines.push(`- 目标城市：${profile.targetCity}`);
  if (profile.householdBudget) lines.push(`- 教育预算：${profile.householdBudget}元`);
  if (profile.interests?.length) lines.push(`- 兴趣偏好：${profile.interests.join('、')}`);
  if (profile.lifestyle?.length) lines.push(`- 生活方式：${profile.lifestyle.join('、')}`);
  if (profile.redLines?.length) lines.push(`- 底线红线：${profile.redLines.join('、')}`);
  return lines.length > 0 ? `## 已收集的用户信息\n${lines.join('\n')}` : '';
}
