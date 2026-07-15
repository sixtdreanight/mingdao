import type { Metadata } from 'next';
import { getAllPaths } from '@/lib/knowledge-base';
import { PathComparator } from '@/components/compare/PathComparator';

export const metadata: Metadata = {
  title: '路径对比 — Career Maze',
  description: '并排比较不同的职业发展路径，找到最适合你的选择',
};

export default async function ComparePage() {
  const paths = await getAllPaths();

  return (
    <main className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div>
            <h1 className="text-lg font-bold text-brand-900">Career Maze</h1>
            <p className="text-xs text-gray-500">找到属于你的路</p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a
              href="/paths"
              className="text-gray-600 transition-colors hover:text-brand-500"
            >
              路径库
            </a>
            <a
              href="/"
              className="text-gray-600 transition-colors hover:text-brand-500"
            >
              对话
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">路径对比</h2>
        <PathComparator paths={paths} />
      </div>
    </main>
  );
}
