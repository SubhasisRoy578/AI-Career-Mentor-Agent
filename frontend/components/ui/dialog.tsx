'use client';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

export function Dialog({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return <div aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-6 backdrop-blur" role="dialog"><div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">{title}</h2><Button aria-label="Close dialog" onClick={onClose} variant="ghost">×</Button></div><div className="mt-4">{children}</div></div></div>;
}
