'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
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
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const clearTimers = (id: string) => {
    const t = timersRef.current;
    if (t.has(id)) { clearTimeout(t.get(id)!); t.delete(id); }
  };

  const add = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => {
      const next = [...prev, { id, type, message }];
      if (next.length > 5) {
        const removed = next.shift()!;
        setTimeout(() => { clearTimers(removed.id); clearTimers(removed.id + ':remove'); }, 0);
      }
      return next;
    });
    const exitTimer = setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
      const removeTimer = setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
        timersRef.current.delete(id);
      }, 200);
      timersRef.current.set(id + ':remove', removeTimer);
    }, 3000);
    timersRef.current.set(id, exitTimer);
  }, []);

  const manualClose = useCallback((id: string) => {
    clearTimers(id);
    clearTimers(id + ':remove');
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 200);
  }, []);

  useEffect(() => {
    addToastFn = add;
    return () => {
      addToastFn = null;
      timersRef.current.forEach((tid) => clearTimeout(tid));
      timersRef.current.clear();
    };
  }, [add]);

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
            <button onClick={() => manualClose(t.id)}
              className="ml-2 rounded p-0.5 hover:bg-black/5"><X className="h-3.5 w-3.5" /></button>
          </div>
        );
      })}
    </div>
  );
}
