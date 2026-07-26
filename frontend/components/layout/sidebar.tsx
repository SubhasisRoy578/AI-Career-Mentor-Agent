'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Compass, FileText, MessageSquare, Settings, UploadCloud, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { icon: BarChart3, label: 'Dashboard', href: '/dashboard' },
  { icon: UserCircle, label: 'Profile', href: '/dashboard/profile' },
  { icon: Compass, label: 'Assessment', href: '/dashboard/career-assessment' },
  { icon: FileText, label: 'AI Report', href: '/dashboard/ai-report' },
  { icon: MessageSquare, label: 'Skill Gap', href: '/dashboard/skill-gap' },
  { icon: Compass, label: 'Roadmap', href: '/dashboard/roadmap' },
codex/clone-and-analyze-existing-github-repository-1j9xth
  { icon: UploadCloud, label: 'Resume Upload', href: '/dashboard/resume-upload' },
  { icon: FileText, label: 'Resume History', href: '/dashboard/resume-history' },
=======
main
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
codex/clone-and-analyze-existing-github-repository-1j9xth
  return <aside className="flex h-full flex-col bg-slate-950/90 p-5"><Link className="mb-8 flex items-center gap-3" href="/dashboard" onClick={onNavigate}><span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-500 font-black">AI</span><span className="font-bold tracking-tight">Career Mentor</span></Link><nav className="space-y-1" aria-label="Primary navigation">{items.map(({ icon: Icon, label, href }) => { const active = href !== '#' && pathname === href; return <Link aria-current={active ? 'page' : undefined} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/10 hover:text-white', active && 'bg-white/10 text-white shadow-lg')} href={href} key={label} onClick={onNavigate}><Icon size={18} />{label}</Link>; })}</nav><div className="mt-auto rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400"><p className="font-semibold text-white">Future modules</p><p className="mt-2 leading-6">Chat, interviews, marketplace, and admin features remain safely disabled until later phases.</p></div></aside>;
=======
  return <aside className="flex h-full flex-col bg-slate-950/90 p-5"><Link className="mb-8 flex items-center gap-3" href="/dashboard" onClick={onNavigate}><span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-500 font-black">AI</span><span className="font-bold tracking-tight">Career Mentor</span></Link><nav className="space-y-1" aria-label="Primary navigation">{items.map(({ icon: Icon, label, href }) => { const active = href !== '#' && pathname === href; return <Link aria-current={active ? 'page' : undefined} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/10 hover:text-white', active && 'bg-white/10 text-white shadow-lg')} href={href} key={label} onClick={onNavigate}><Icon size={18} />{label}</Link>; })}</nav><div className="mt-auto rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400"><p className="font-semibold text-white">Future modules</p><p className="mt-2 leading-6">Resume, chat, interviews, and admin features remain safely disabled until later phases.</p></div></aside>;
main
}
