import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPathBySlug, getAllPaths } from '@/lib/knowledge-base';
import { PathDetail } from '@/components/paths/PathDetail';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const paths = await getAllPaths();
  return paths.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const path = await getPathBySlug(params.slug);
  if (!path) {
    return { title: '路径未找到 — Career Maze' };
  }
  return {
    title: `${path.title} — Career Maze`,
    description: path.summary,
  };
}

export default async function PathPage({ params }: PageProps) {
  const path = await getPathBySlug(params.slug);
  if (!path) {
    notFound();
  }
  return (
    <main className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <div>
            <a href="/" className="text-lg font-bold text-brand-900">Career Maze</a>
            <p className="text-xs text-gray-500">路径详情</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="/paths" className="text-gray-600 transition-colors hover:text-brand-500">路径库</a>
            <a href="/" className="text-gray-600 transition-colors hover:text-brand-500">对话</a>
          </div>
        </div>
      </header>
      <PathDetail path={path} />
    </main>
  );
}
