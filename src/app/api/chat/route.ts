import { NextRequest, NextResponse } from 'next/server';
import type { ChatMessage, ApiResponse, UserProfile, KnowledgeAtom } from '@/types';
import { chatWithAI } from '@/lib/ai';
import { extractProfile } from '@/lib/profile-extractor';

export async function POST(
  request: NextRequest
): Promise<
  NextResponse<
    ApiResponse<{ reply: string; profile: Partial<UserProfile>; sources: KnowledgeAtom[] }>
  >
> {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: 'messages 不能为空' },
        { status: 400 }
      );
    }

    const profile = extractProfile(messages);
    const { reply, sources } = await chatWithAI(messages, profile);

    return NextResponse.json({
      success: true,
      data: { reply, profile, sources: sources || [] },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI 服务暂时不可用';
    console.error('[chat] error:', message);

    return NextResponse.json(
      {
        success: false,
        error: message.includes('ANTHROPIC_API_KEY')
          ? 'AI 服务未配置，请联系管理员'
          : 'AI 服务暂时不可用，请稍后再试',
      },
      { status: 500 }
    );
  }
}
