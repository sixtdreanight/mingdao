import { NextRequest, NextResponse } from 'next/server';
import type { ChatMessage, ApiResponse, UserProfile, KnowledgeAtom } from '@/types';
import { chatWithAIStream } from '@/lib/ai';
import { extractProfile } from '@/lib/profile-extractor';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages;
    const competencyProfile = body.competencyProfile;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ success: false, error: 'messages 不能为空' }, { status: 400 });
    }

    const profile = extractProfile(messages);
    const { stream, sources } = await chatWithAIStream(messages, profile, competencyProfile);

    const encoder = new TextEncoder();
    const sourceChunk = encoder.encode(JSON.stringify({ type: 'sources', sources, profile }) + '\n');

    const combined = new ReadableStream({
      async start(controller) {
        controller.enqueue(sourceChunk);
        const reader = stream.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) { controller.enqueue(encoder.encode('\n[DONE]')); controller.close(); break; }
          controller.enqueue(value);
        }
      },
    });

    return new NextResponse(combined, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI 服务暂时不可用';
    console.error('[chat] error:', message);

    return NextResponse.json(
      {
        success: false,
        error: message.includes('not configured')
          ? 'AI 服务未配置，请联系管理员'
          : 'AI 服务暂时不可用，请稍后再试',
      },
      { status: 500 }
    );
  }
}
