 codex/set-up-project-structure-for-ai-career-mentor-agent-7da4ey
'use client';
import Link from 'next/link';
import { Bell, Moon, Shield, Trash2, UserRound } from 'lucide-react';
import { ChangePasswordForm } from '@/components/auth/change-password-form';
import { useAuth } from '@/components/auth/auth-context';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';

export default function SettingsPage() {
  const { user } = useAuth();
  return <main className="space-y-6 p-4 md:p-6"><Card><Badge>Account control</Badge><h2 className="mt-4 text-3xl font-bold">Settings</h2><p className="mt-2 text-slate-400">Manage profile, password, display preferences, notifications, and account safety.</p></Card><Tabs tabs={[{ id: 'profile', label: 'Profile', content: <Card><h3 className="flex items-center gap-2 text-xl font-bold"><UserRound size={18} /> Profile settings</h3><p className="mt-3 text-slate-300">Signed in as {user?.fullName} ({user?.email}).</p><Link href="/dashboard/profile/edit"><Button className="mt-5">Edit profile</Button></Link></Card> }, { id: 'password', label: 'Password', content: <Card><h3 className="flex items-center gap-2 text-xl font-bold"><Shield size={18} /> Password settings</h3><p className="mb-5 mt-2 text-slate-400">Change your password through the protected backend endpoint.</p><ChangePasswordForm /></Card> }, { id: 'preferences', label: 'Preferences', content: <div className="grid gap-6 md:grid-cols-2"><Card><h3 className="flex items-center gap-2 text-xl font-bold"><Moon size={18} /> Theme preference</h3><div className="mt-5 grid gap-3"><label className="rounded-2xl border border-white/10 p-4"><input className="mr-3" name="theme" type="radio" /> Light</label><label className="rounded-2xl border border-white/10 p-4"><input className="mr-3" defaultChecked name="theme" type="radio" /> Dark</label><label className="rounded-2xl border border-white/10 p-4"><input className="mr-3" name="theme" type="radio" /> System</label></div></Card><Card><h3 className="flex items-center gap-2 text-xl font-bold"><Bell size={18} /> Notifications</h3><div className="mt-5 space-y-3 text-slate-300"><label className="flex items-center justify-between rounded-2xl border border-white/10 p-4">Product updates <input defaultChecked type="checkbox" /></label><label className="flex items-center justify-between rounded-2xl border border-white/10 p-4">Career reminders <input type="checkbox" /></label></div><p className="mt-4 text-sm text-slate-500">Notification preferences are UI-only in this phase.</p></Card></div> }, { id: 'danger', label: 'Danger zone', content: <Card><h3 className="flex items-center gap-2 text-xl font-bold text-red-200"><Trash2 size={18} /> Delete Account</h3><Alert className="mt-4 border-red-400/20 bg-red-500/10 text-red-100">Account deletion is intentionally UI-only in Phase 3. A confirmation workflow will be added later.</Alert><Button className="mt-5" variant="danger">Request account deletion</Button></Card> }]} /></main>;
}
=======
import { Card } from '@/components/ui/card';
export default function SettingsPage(){return <main className="p-6"><Card><h2 className="text-3xl font-bold">Settings</h2><p className="mt-3 text-slate-300">Account, preferences, and integration settings will be added in later phases.</p></Card></main>}
 main
