'use client';

import { useState } from 'react';
import { MessageSquare, Library, Compass } from 'lucide-react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ResourceBrowser } from '@/components/chat/ResourceBrowser';

type View = 'chat' | 'resources';

export default function Home() {
  const [view, setView] = useState<View>('chat');

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Top navigation */}
      <header className="shrink-0 border-b border-border/40 bg-[#25160C]">
        <div className="flex h-12 items-center justify-between px-5">
          <div className="flex items-center gap-6">
            <div className="flex items-baseline gap-2">
              <Compass className="h-5 w-5 text-primary" />
              <span className="text-base font-bold tracking-tight text-[#FAF4EC]">明道</span>
            </div>
            <nav className="flex items-center gap-1">
              <button
                onClick={() => setView('chat')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  view === 'chat'
                    ? 'bg-primary/20 text-primary'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                对话
              </button>
              <button
                onClick={() => setView('resources')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  view === 'resources'
                    ? 'bg-primary/20 text-primary'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                <Library className="h-4 w-4" />
                资源库
              </button>
            </nav>
          </div>
          <p className="hidden text-xs text-white/25 md:block">
            把路看清楚，决定你自己做
          </p>
        </div>
      </header>

      {/* View content */}
      <div className="flex-1 overflow-hidden">
        {view === 'chat' ? <ChatInterface /> : <ResourceBrowser />}
      </div>
    </div>
  );
}
