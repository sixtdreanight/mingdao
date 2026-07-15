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
  return <PathDetail path={path} />;
}
