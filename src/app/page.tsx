import Link from 'next/link';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <div>
            <h1 className="text-lg font-bold text-brand-900">Career Maze</h1>
            <p className="text-xs text-gray-500">找到属于你的路</p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/paths"
              className="text-gray-600 transition-colors hover:text-brand-500"
            >
              路径库
            </Link>
            <Link
              href="/compare"
              className="text-gray-600 transition-colors hover:text-brand-500"
            >
              对比
            </Link>
          </nav>
        </div>
      </header>
      <ChatInterface />
    </main>
  );
}
