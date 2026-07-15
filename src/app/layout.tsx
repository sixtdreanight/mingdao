import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Career Maze — 找到属于你的路',
  description: '一个帮大学生在信息迷雾中找到方向的引导式决策工具',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-surface font-sans text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
