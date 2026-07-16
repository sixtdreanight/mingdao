'use client';

import { X } from 'lucide-react';

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

/** Stub — will be fully implemented in Task 5 */
export function HistoryDrawer({ open, onClose }: HistoryDrawerProps) {
  if (!open) return null;

  return (
    <>
      {/* backdrop */}
      <div className="fixed inset-0 z-40 bg-black/10" onClick={onClose} />

      {/* drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-screen w-80 flex-col border-l border-border bg-card shadow-xl">
        {/* 头部 */}
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">历史记录</h3>
          <button onClick={onClose} className="rounded p-1 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 空状态 */}
        <div className="flex flex-1 items-center justify-center">
          <p className="text-xs text-muted-foreground">暂无活动记录</p>
        </div>
      </div>
    </>
  );
}
