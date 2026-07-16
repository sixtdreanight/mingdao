'use client';

import { useSearchParams } from 'next/navigation';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ResourceBrowser } from '@/components/chat/ResourceBrowser';
import { ProfileDashboard } from '@/components/profile/ProfileDashboard';

/** Placeholder for Knowledge module — renders existing resource browser for now */
function KnowledgeView() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <p className="text-sm text-muted-foreground">数据库模块即将上线</p>
      <p className="mt-1 text-xs text-muted-foreground/60">浏览各维度的职业数据</p>
    </div>
  );
}

export function ContentRouter() {
  const params = useSearchParams();
  const tab = params.get('tab') || 'coach';

  return (
    <div className="flex-1 overflow-hidden transition-opacity duration-150" key={tab}>
      {tab === 'coach' && <ChatInterface />}
      {tab === 'profile' && <ProfileDashboard />}
      {tab === 'knowledge' && <KnowledgeView />}
      {tab === 'resources' && <ResourceBrowser />}
    </div>
  );
}
