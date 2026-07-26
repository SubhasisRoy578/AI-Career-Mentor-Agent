'use client';
import Link from 'next/link';
import { Mail, Pencil, University } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-context';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';

export default function ProfilePage() {
  const { user } = useAuth();
  return <main className="space-y-6 p-4 md:p-6"><Card className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-5"><Avatar className="h-20 w-20 text-xl" name={user?.fullName} src={user?.profileImage} /><div><Badge>{user?.experienceLevel ?? 'BEGINNER'}</Badge><h2 className="mt-3 text-3xl font-bold">{user?.fullName}</h2><p className="mt-1 flex items-center gap-2 text-slate-400"><Mail size={16} />{user?.email}</p></div></div><Link href="/dashboard/profile/edit"><Button><Pencil size={16} /> Edit profile</Button></Link></Card><div className="grid gap-6 lg:grid-cols-3"><Card><h3 className="flex items-center gap-2 text-lg font-bold"><University size={18} /> Education</h3><p className="mt-4 text-slate-300">{user?.education || 'Not added yet'}</p><p className="mt-2 text-sm text-slate-500">{user?.university || 'University not added'}</p></Card><Card className="lg:col-span-2"><h3 className="text-lg font-bold">Career direction</h3>{user?.careerGoal || user?.currentSkills ? <div className="mt-4 grid gap-4 md:grid-cols-2"><div><p className="text-sm text-slate-400">Goal</p><p className="mt-2 text-slate-200">{user?.careerGoal || 'Not added yet'}</p></div><div><p className="text-sm text-slate-400">Skills</p><p className="mt-2 text-slate-200">{user?.currentSkills || 'Not added yet'}</p></div></div> : <EmptyState title="Profile needs career context" description="Add your goal and current skills to make the dashboard more useful." />}</Card></div></main>;
}
