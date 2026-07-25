'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function Dropdown({ trigger, children, align = 'right' }: { trigger: ReactNode; children: ReactNode; align?: 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (event: MouseEvent) => { if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);
  return <div className="relative" ref={ref}><button aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((value) => !value)} type="button">{trigger}</button>{open ? <div role="menu" className={cn('absolute z-50 mt-3 w-56 rounded-2xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur', align === 'right' ? 'right-0' : 'left-0')}>{children}</div> : null}</div>;
}

export function DropdownItem({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return <button className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm text-slate-200 hover:bg-white/10" onClick={onClick} role="menuitem" type="button">{children}</button>;
}
