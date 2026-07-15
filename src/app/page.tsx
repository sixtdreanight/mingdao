import { ChatInterface } from '@/components/chat/ChatInterface';
import { ResourcePanel } from '@/components/chat/ResourcePanel';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-paper">
      {/* Minimal header */}
      <header className="relative z-20 border-b border-amber-light/50 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight text-ink">
              Career Maze
            </span>
            <span className="hidden text-xs text-ink-faint sm:inline">
              学会做自己的职业决策
            </span>
          </div>
        </div>
      </header>

      {/* Split layout: Chat | Resource Panel */}
      <div className="flex flex-1">
        {/* Chat area */}
        <div className="flex-1">
          <ChatInterface />
        </div>

        {/* Resource panel — always visible on desktop, togglable on mobile */}
        <div className="hidden lg:block lg:w-80 lg:shrink-0">
          <ResourcePanel />
        </div>
      </div>
    </main>
  );
}
