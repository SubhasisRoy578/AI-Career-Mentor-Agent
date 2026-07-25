'use client';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  return <><Button aria-label="Open navigation" className="lg:hidden" onClick={() => setOpen(true)} variant="ghost"><Menu size={20} /></Button>{open ? <div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Close navigation" className="absolute inset-0 bg-slate-950/70 backdrop-blur" onClick={() => setOpen(false)} type="button" /><div className="relative h-full w-80 max-w-[85vw] border-r border-white/10"><Sidebar onNavigate={() => setOpen(false)} /></div></div> : null}</>;
}
