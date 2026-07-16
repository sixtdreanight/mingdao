/**
 * 统一 AI 客户端 — 支持 DeepSeek（OpenAI 兼容）和 Anthropic。
 *
 * 通过 DEEPSEEK_API_KEY 环境变量切换：
 * - 设置了 DEEPSEEK_API_KEY → 使用 DeepSeek
 * - 未设置 → 回退到 Anthropic
 */

import Anthropic from '@anthropic-ai/sdk';

type Role = 'user' | 'assistant' | 'system';

interface AiMessage {
  role: Role;
  content: string;
}

interface ChatOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
  messages: AiMessage[];
}

interface ChatResult {
  text: string;
}

/** DeepSeek OpenAI-compatible chat */
async function chatDeepSeek(opts: ChatOptions): Promise<ChatResult> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY not configured');

  const baseUrl = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
  const model = opts.model || 'deepseek-chat';

  const messages: { role: string; content: string }[] = [];
  if (opts.systemPrompt) {
    messages.push({ role: 'system', content: opts.systemPrompt });
  }
  for (const m of opts.messages) {
    messages.push({ role: m.role, content: m.content });
  }

  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: opts.maxTokens ?? 2048,
      temperature: opts.temperature ?? 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`DeepSeek API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('DeepSeek returned no content');
  return { text };
}

/** Anthropic chat */
let anthropicClient: Anthropic | null = null;
function getAnthropic(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured');
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

async function chatAnthropic(opts: ChatOptions): Promise<ChatResult> {
  const client = getAnthropic();
  const model = opts.model || 'claude-sonnet-4-20250514';

  const response = await client.messages.create({
    model,
    max_tokens: opts.maxTokens ?? 2048,
    temperature: opts.temperature,
    system: opts.systemPrompt,
    messages: opts.messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  const text = textBlock?.text ?? '';
  return { text };
}

/** 自动选择 provider */
export async function chat(opts: ChatOptions): Promise<ChatResult> {
  if (process.env.DEEPSEEK_API_KEY) {
    return chatDeepSeek(opts);
  }
  return chatAnthropic(opts);
}

/** 检查当前使用的 provider */
export function currentProvider(): 'deepseek' | 'anthropic' {
  return process.env.DEEPSEEK_API_KEY ? 'deepseek' : 'anthropic';
}
