'use client';

import { useSearchParams } from 'next/navigation';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ResourceBrowser } from '@/components/chat/ResourceBrowser';
import { ProfileDashboard } from '@/components/profile/ProfileDashboard';

function KnowledgeView() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <p className="text-sm text-muted-foreground">数据库模块即将上线</p>
      <p className="mt-1 text-xs text-muted-foreground/60">浏览各维度的职业数据</p>
    </div>
  );
}

/**
 * 所有模块同时挂载，通过 display 切换，避免切换时丢失状态。
 */
export function ContentRouter() {
  const params = useSearchParams();
  const tab = params.get('tab') || 'coach';

  return (
    <div className="flex-1 overflow-hidden">
      <div className={tab === 'coach' ? 'h-full' : 'hidden'}>
        <ChatInterface />
      </div>
      <div className={tab === 'profile' ? 'h-full' : 'hidden'}>
        <ProfileDashboard />
      </div>
      <div className={tab === 'knowledge' ? 'h-full' : 'hidden'}>
        <KnowledgeView />
      </div>
      <div className={tab === 'resources' ? 'h-full' : 'hidden'}>
        <ResourceBrowser />
      </div>
    </div>
  );
}
