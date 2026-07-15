import { ChatInterface } from '@/components/chat/ChatInterface';
import { ResourcePanel } from '@/components/chat/ResourcePanel';

export default function Home() {
  return (
    <main className="flex h-screen flex-col overflow-hidden bg-paper">
      {/* Header — dark walnut, anchors the "desk" metaphor */}
      <header className="shrink-0 border-b border-walnut-light/30 bg-walnut px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-lg font-bold tracking-tight text-paper-warm">
              Career Maze
            </span>
            <span className="hidden text-xs text-walnut-surface text-paper-line sm:inline">
              决策教练
            </span>
          </div>
          <p className="text-xs text-paper-line/50">
            教你怎么判断，不替你做决定
          </p>
        </div>
      </header>

      {/* Body: Chat + Resource sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat — the coaching space */}
        <div className="flex flex-1 flex-col overflow-hidden bg-paper">
          <ChatInterface />
        </div>

        {/* Resources — wider, more usable */}
        <div className="hidden w-[440px] shrink-0 border-l border-paper-line bg-paper-warm lg:block">
          <ResourcePanel />
        </div>
      </div>
    </main>
  );
}
