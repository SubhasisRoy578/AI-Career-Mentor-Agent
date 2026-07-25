'use client';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

type Tab = { id: string; label: string; content: ReactNode };

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  return <div><div className="flex flex-wrap gap-2 rounded-2xl bg-white/[0.04] p-1" role="tablist">{tabs.map((tab) => <button className={cn('rounded-xl px-4 py-2 text-sm font-medium text-slate-400 transition', active === tab.id && 'bg-white/10 text-white shadow-lg')} key={tab.id} onClick={() => setActive(tab.id)} role="tab" type="button">{tab.label}</button>)}</div><div className="mt-6">{tabs.find((tab) => tab.id === active)?.content}</div></div>;
}
