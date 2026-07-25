'use client';
import Link from 'next/link';
import { useAuth } from '@/components/auth/auth-context';
import { Card } from '@/components/ui/card';

export default function ProfilePage() {
  const { user } = useAuth();
  return <main className="p-6"><Card><h2 className="text-3xl font-bold">Profile</h2><dl className="mt-6 grid gap-4 md:grid-cols-2"><div><dt className="text-sm text-slate-400">Name</dt><dd>{user?.fullName}</dd></div><div><dt className="text-sm text-slate-400">Email</dt><dd>{user?.email}</dd></div><div><dt className="text-sm text-slate-400">University</dt><dd>{user?.university || 'Not added yet'}</dd></div><div><dt className="text-sm text-slate-400">Experience</dt><dd>{user?.experienceLevel}</dd></div></dl><Link className="mt-8 inline-block rounded-xl bg-brand-500 px-5 py-3 font-semibold" href="/dashboard/profile/edit">Edit profile</Link></Card></main>;
}
