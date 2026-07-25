'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { authApi, ProfileInput } from '@/lib/auth';

export default function EditProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<ProfileInput>({ values: user });
  const mutation = useMutation({ mutationFn: authApi.updateProfile, onSuccess: (updated) => { queryClient.setQueryData(['me'], updated); router.push('/dashboard/profile'); } });
  return <main className="p-6"><Card><h2 className="text-3xl font-bold">Edit profile</h2><form className="mt-8 grid gap-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}><input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Full name" {...register('fullName')} /><input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Education" {...register('education')} /><input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="University" {...register('university')} /><textarea className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Current skills" {...register('currentSkills')} /><input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Career goal" {...register('careerGoal')} /><Button disabled={mutation.isPending}>{mutation.isPending ? 'Saving...' : 'Save profile'}</Button>{mutation.isSuccess ? <p className="text-sm text-green-300">Profile updated successfully.</p> : null}</form></Card></main>;
}
