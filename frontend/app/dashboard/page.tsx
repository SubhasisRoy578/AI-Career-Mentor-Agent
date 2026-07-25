'use client';
import { useAuth } from '@/components/auth/auth-context';
import { Card } from '@/components/ui/card';

const fields = [
  ['Email', 'email'],
  ['Education', 'education'],
  ['Career Goal', 'careerGoal'],
  ['Current Skills', 'currentSkills'],
] as const;

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <main className="p-6 text-slate-300">Loading your profile...</main>;
  return <main className="space-y-6 p-6"><Card><p className="text-sm text-brand-50">Authenticated dashboard</p><h2 className="mt-2 text-3xl font-bold">{user?.fullName ?? 'Complete your profile'}</h2><p className="mt-3 text-slate-300">Your dashboard displays real account data from the protected backend profile endpoint.</p></Card><div className="grid gap-6 md:grid-cols-2">{fields.map(([label, key]) => <Card key={key}><p className="text-sm text-slate-400">{label}</p><p className="mt-3 text-xl font-semibold">{user?.[key] || 'Not added yet'}</p></Card>)}</div></main>;
}
