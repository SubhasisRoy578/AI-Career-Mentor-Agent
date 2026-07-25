import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

export function StatCard({ title, value, helper, icon }: { title: string; value?: string | null; helper: string; icon: ReactNode }) {
  return <Card className="group transition hover:-translate-y-1 hover:border-brand-500/30"><div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-brand-50 transition group-hover:bg-brand-500/20">{icon}</div><p className="text-sm text-slate-400">{title}</p><p className="mt-2 min-h-8 text-xl font-semibold text-white">{value || 'Not added yet'}</p><p className="mt-3 text-sm leading-6 text-slate-400">{helper}</p></Card>;
}
