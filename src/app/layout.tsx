import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Career Maze — 学会做自己的职业决策',
  description: '决策教练，不是答案提供者。教会你如何判断，不替你决定。',
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
