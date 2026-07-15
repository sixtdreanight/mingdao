import { NextRequest, NextResponse } from 'next/server';
import type { ChatMessage, ApiResponse, UserProfile } from '@/types';
import { chatWithAI } from '@/lib/ai';
import { extractProfile } from '@/lib/profile-extractor';

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<{ reply: string; profile: Partial<UserProfile> }>>> {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: 'messages 不能为空' },
        { status: 400 }
      );
    }

    // 从对话中提取用户画像
    const profile = extractProfile(messages);

    // RAG + AI 生成回复（传入画像用于个性化）
    const reply = await chatWithAI(messages, profile);

    return NextResponse.json({
      success: true,
      data: { reply, profile },
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
