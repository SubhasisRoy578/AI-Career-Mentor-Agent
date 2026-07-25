'use client';
import Link from 'next/link';
import { ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-context';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { MobileSidebar } from '@/components/layout/mobile-sidebar';
import { Avatar } from '@/components/ui/avatar';
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';

const menuLinkClass = 'flex w-full items-center rounded-xl px-3 py-2 text-left text-sm text-slate-200 hover:bg-white/10';

export function TopNav() {
  const { user, logout } = useAuth();
  return <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-slate-950/75 px-4 py-4 backdrop-blur-xl md:px-6"><div className="flex items-center gap-3"><MobileSidebar /><div><Breadcrumbs /><h1 className="mt-1 text-xl font-bold md:text-2xl">{user?.fullName ? `Welcome, ${user.fullName.split(' ')[0]}` : 'Career Command Center'}</h1></div></div><Dropdown trigger={<div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] p-1 pr-3"><Avatar name={user?.fullName} src={user?.profileImage} /><span className="hidden text-sm text-slate-200 sm:block">{user?.fullName ?? 'Profile'}</span><ChevronDown size={16} /></div>}><Link className={menuLinkClass} href="/dashboard/profile"><UserCircle className="mr-2" size={16} /> Profile</Link><Link className={menuLinkClass} href="/dashboard/settings"><Settings className="mr-2" size={16} /> Settings</Link><DropdownItem onClick={logout}><LogOut className="mr-2" size={16} /> Logout</DropdownItem></Dropdown></header>;
}
