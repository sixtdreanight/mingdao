'use client';

import { Suspense, useEffect, useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { ContentRouter } from '@/components/layout/ContentRouter';
import { HistoryDrawer } from '@/components/history/HistoryDrawer';
import { WelcomeGuide } from '@/components/onboarding/WelcomeGuide';

function MainContent() {
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    const activities = JSON.parse(localStorage.getItem('mingdao-activity') || '[]');
    if (activities.length === 0) {
      import('@/lib/activity-store').then((m) => {
        m.addActivity({ type: 'first_visit', title: '首次使用明道', detail: '开启职业探索之旅' });
      });
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar onOpenHistory={() => setHistoryOpen(true)} />
      <ContentRouter />
      <HistoryDrawer open={historyOpen} onClose={() => setHistoryOpen(false)} />
      <WelcomeGuide />
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
