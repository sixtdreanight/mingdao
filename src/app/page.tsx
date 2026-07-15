'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ResourcePanel } from '@/components/chat/ResourcePanel';

const MIN_PANEL = 320;
const MAX_PANEL = 600;
const DEFAULT_PANEL = 440;

function loadWidth(): number {
  if (typeof window === 'undefined') return DEFAULT_PANEL;
  const saved = localStorage.getItem('career-maze-resource-width');
  return saved ? Math.max(MIN_PANEL, Math.min(MAX_PANEL, Number(saved))) : DEFAULT_PANEL;
}

export default function Home() {
  const [resourceWidth, setResourceWidth] = useState(DEFAULT_PANEL);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef(0);

  useEffect(() => { setResourceWidth(loadWidth()); }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    dragRef.current = e.clientX;
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const delta = dragRef.current - e.clientX;
      setResourceWidth((w) => Math.max(MIN_PANEL, Math.min(MAX_PANEL, w + delta)));
      dragRef.current = e.clientX;
    };
    const onUp = () => {
      setDragging(false);
      setResourceWidth((w) => { localStorage.setItem('career-maze-resource-width', String(w)); return w; });
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragging]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="shrink-0 border-b border-border/40 bg-[#25160C] px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-lg font-bold tracking-tight text-[#FAF4EC]">Career Maze</span>
            <span className="hidden text-xs text-white/40 sm:inline">决策教练</span>
          </div>
          <p className="text-xs text-white/25">教你怎么判断，不替你做决定</p>
        </div>
      </header>

      {/* Body: Chat + Resizer + Resources */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden"><ChatInterface /></div>
        <div
          className={`hidden shrink-0 lg:block ${dragging ? 'w-1 bg-primary/20' : 'w-[4px] bg-border/30 resize-handle'}`}
          onMouseDown={onMouseDown}
        />
        <div
          className="hidden shrink-0 overflow-hidden border-l border-border/30 bg-sidebar lg:block"
          style={{ width: resourceWidth, transition: dragging ? 'none' : 'width 200ms ease-out' }}
        >
          <ResourcePanel />
        </div>
      </div>
    </div>
  );
}
