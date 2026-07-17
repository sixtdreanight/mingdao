'use client';

import { useEffect, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string; type: ToastType; message: string; exiting?: boolean;
}

let addToastFn: ((type: ToastType, message: string) => void) | null = null;

export function toast(type: ToastType, message: string) {
  addToastFn?.(type, message);
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 200);
    }, 3000);
  }, []);

  useEffect(() => { addToastFn = add; return () => { addToastFn = null; }; }, [add]);

  if (toasts.length === 0) return null;

  const icons = { success: CheckCircle, error: XCircle, info: Info };
  const colors = { success: 'border-emerald-200 bg-emerald-50 text-emerald-800', error: 'border-red-200 bg-red-50 text-red-800', info: 'border-blue-200 bg-blue-50 text-blue-800' };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map(t => {
        const Icon = icons[t.type];
        return (
          <div key={t.id}
            className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur-sm transition-all duration-200 ${colors[t.type]} ${t.exiting ? 'opacity-0 translate-x-4' : 'opacity-100 spring-in'}`}>
            <Icon className="h-4 w-4 shrink-0" />
            <span className="font-medium">{t.message}</span>
            <button onClick={() => { setToasts(prev => prev.map(x => x.id === t.id ? { ...x, exiting: true } : x)); setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 200); }}
              className="ml-2 rounded p-0.5 hover:bg-black/5"><X className="h-3.5 w-3.5" /></button>
          </div>
        );
      })}
    </div>
  );
}
