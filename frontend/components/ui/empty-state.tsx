import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

export function EmptyState({ title, description, action, icon }: { title: string; description: string; action?: { label: string; onClick: () => void }; icon?: ReactNode }) {
  return <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center"><div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-brand-50">{icon ?? '✨'}</div><h3 className="text-lg font-semibold text-white">{title}</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">{description}</p>{action ? <Button className="mt-5" onClick={action.onClick}>{action.label}</Button> : null}</div>;
}
