'use client';
import Link from 'next/link';
import { useAuth } from '@/components/auth/auth-context';

export function TopNav() {
  const { user, logout } = useAuth();
  return <header className="flex items-center justify-between border-b border-white/10 px-6 py-4"><div><p className="text-sm text-slate-400">Welcome back</p><h1 className="text-2xl font-bold">{user?.fullName ?? 'Career Command Center'}</h1></div><div className="flex items-center gap-3"><Link className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300" href="/dashboard/profile">Profile</Link><button className="rounded-xl bg-white/10 px-4 py-2 text-sm" onClick={logout}>Logout</button></div></header>;
}
