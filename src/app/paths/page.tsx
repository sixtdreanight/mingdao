import { getAllPaths } from '@/lib/knowledge-base';
import { PathExplorer } from '@/components/paths/PathExplorer';

export default async function PathsPage() {
  const paths = await getAllPaths();

  return (
    <main className="min-h-screen bg-surface-muted">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <div>
            <h1 className="text-lg font-bold text-brand-900">路径库</h1>
            <p className="text-xs text-text-secondary">浏览所有职业发展路径</p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a
              href="/"
              className="text-text-secondary transition-colors hover:text-brand-500"
            >
              ← 回到对话
            </a>
          </nav>
        </div>
      </header>

      <PathExplorer paths={paths} />
    </main>
  );
}
