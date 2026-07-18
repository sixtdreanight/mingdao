import { NextRequest, NextResponse } from 'next/server';
import type { UserProfile } from '@/types';
import { generateRoutes } from '@/lib/planner';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const profile: Partial<UserProfile> = body.profile;

    if (!profile || typeof profile !== 'object' || Array.isArray(profile)) {
      return NextResponse.json({ success: false, error: '请提供用户画像' }, { status: 400 });
    }

    const routes = await generateRoutes(profile);
    return NextResponse.json({ success: true, data: { routes } });
  } catch (error) {
    const message = error instanceof Error ? error.message : '规划失败';
    console.error('[plan] error:', message);
    return NextResponse.json({ success: false, error: '路线生成失败，请稍后再试' }, { status: 500 });
  }
}
