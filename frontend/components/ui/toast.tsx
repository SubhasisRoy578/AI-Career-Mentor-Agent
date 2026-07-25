'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

type Toast = { id: number; title: string; description?: string; type?: 'success' | 'error' | 'info' };
type ToastContextValue = { notify: (toast: Omit<Toast, 'id'>) => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const notify = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now();
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 3500);
  };
  return <ToastContext.Provider value={{ notify }}>{children}<div className="fixed bottom-4 right-4 z-50 space-y-3" aria-live="polite">{toasts.map((toast) => <div className="w-80 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur" key={toast.id}><p className="font-semibold text-white">{toast.title}</p>{toast.description ? <p className="mt-1 text-sm text-slate-400">{toast.description}</p> : null}</div>)}</div></ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider');
  return context;
}
