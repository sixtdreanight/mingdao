'use client';

import { useSearchParams } from 'next/navigation';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ResourceBrowser } from '@/components/chat/ResourceBrowser';
import { ProfileDashboard } from '@/components/profile/ProfileDashboard';
import { RouteBoard } from '@/components/routes/RouteBoard';
import { KnowledgeBrowser } from '@/components/knowledge/KnowledgeBrowser';
import { SalaryCompare } from '@/components/explore/SalaryCompare';
import { DecisionTree } from '@/components/explore/DecisionTree';

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
        <KnowledgeBrowser />
      </div>
      <div className={tab === 'resources' ? 'h-full' : 'hidden'}>
        <ResourceBrowser />
      </div>
      <div className={tab === 'routes' ? 'h-full overflow-auto' : 'hidden'}>
        <RouteBoard />
      </div>
      <div className={tab === 'explore' ? 'h-full' : 'hidden'}>
        <SalaryCompare />
      </div>
      <div className={tab === 'sim' ? 'h-full' : 'hidden'}>
        <DecisionTree />
      </div>
    </div>
  );
}
