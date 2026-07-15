import { NextRequest, NextResponse } from 'next/server';
import type { ChatMessage, ApiResponse } from '@/types';
import { chatWithAI, extractUserProfile } from '@/lib/ai';

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<{ reply: string }>>> {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: 'messages 不能为空' },
        { status: 400 }
      );
    }

    // 提取用户画像用于个性化
    const userProfile = await extractUserProfile(messages);

    // RAG + AI 生成回复
    const reply = await chatWithAI(messages, userProfile);

    return NextResponse.json({
      success: true,
      data: { reply },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI 服务暂时不可用';
    console.error('[chat] error:', message);

    // 不暴露内部错误细节
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
