'use client';

import { Suspense, useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { ContentRouter } from '@/components/layout/ContentRouter';
import { HistoryDrawer } from '@/components/history/HistoryDrawer';

function MainContent() {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar onOpenHistory={() => setHistoryOpen(true)} />
      <ContentRouter />
      <HistoryDrawer open={historyOpen} onClose={() => setHistoryOpen(false)} />
    </div>
  );
}

export default function MainPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-background"><p className="text-sm text-muted-foreground">加载中…</p></div>}>
      <MainContent />
    </Suspense>
  );
}
