import { ChatInterface } from '@/components/chat/ChatInterface';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-paper">
      {/* Minimal header — no nav, just a wordmark. This is a coaching room, not a website. */}
      <header className="border-b border-amber-light/50 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-2xl items-center px-6">
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

      <ChatInterface />
    </main>
  );
}
