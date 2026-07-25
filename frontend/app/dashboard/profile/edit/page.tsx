'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
 codex/set-up-project-structure-for-ai-career-mentor-agent-7da4ey
import { Input, Textarea } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/toast';
=======
 main
import { authApi, ProfileInput } from '@/lib/auth';

export default function EditProfilePage() {
  const { user } = useAuth();
 codex/set-up-project-structure-for-ai-career-mentor-agent-7da4ey
  const { notify } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<ProfileInput>({ values: user });
  const mutation = useMutation({ mutationFn: authApi.updateProfile, onSuccess: (updated) => { queryClient.setQueryData(['me'], updated); notify({ title: 'Profile updated', description: 'Your dashboard now reflects the latest details.' }); router.push('/dashboard/profile'); } });
  return <main className="p-4 md:p-6"><Card><div className="max-w-3xl"><p className="text-sm text-brand-50">Profile settings</p><h2 className="mt-2 text-3xl font-bold">Edit profile</h2><p className="mt-2 text-slate-400">Keep this information accurate so future AI features can personalize guidance.</p></div><form className="mt-8 grid gap-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}><div className="grid gap-4 md:grid-cols-2"><Input placeholder="Full name" {...register('fullName')} /><Input placeholder="Profile image URL" {...register('profileImage')} /><Input placeholder="Education" {...register('education')} /><Input placeholder="University" {...register('university')} /></div><Textarea placeholder="Current skills" {...register('currentSkills')} /><Input placeholder="Career goal" {...register('careerGoal')} /><select className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-brand-500/70" {...register('experienceLevel')}><option value="BEGINNER">Beginner</option><option value="INTERMEDIATE">Intermediate</option><option value="ADVANCED">Advanced</option><option value="PROFESSIONAL">Professional</option></select><div className="flex flex-col gap-3 sm:flex-row"><Button disabled={mutation.isPending}>{mutation.isPending ? <><Spinner /> Saving...</> : 'Save profile'}</Button><Button onClick={() => router.push('/dashboard/profile')} type="button" variant="secondary">Cancel</Button></div>{mutation.isError ? <p className="text-sm text-red-300">Profile update failed. Please try again.</p> : null}</form></Card></main>;
=======
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<ProfileInput>({ values: user });
  const mutation = useMutation({ mutationFn: authApi.updateProfile, onSuccess: (updated) => { queryClient.setQueryData(['me'], updated); router.push('/dashboard/profile'); } });
  return <main className="p-6"><Card><h2 className="text-3xl font-bold">Edit profile</h2><form className="mt-8 grid gap-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}><input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Full name" {...register('fullName')} /><input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Education" {...register('education')} /><input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="University" {...register('university')} /><textarea className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Current skills" {...register('currentSkills')} /><input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Career goal" {...register('careerGoal')} /><Button disabled={mutation.isPending}>{mutation.isPending ? 'Saving...' : 'Save profile'}</Button>{mutation.isSuccess ? <p className="text-sm text-green-300">Profile updated successfully.</p> : null}</form></Card></main>;
main
}
