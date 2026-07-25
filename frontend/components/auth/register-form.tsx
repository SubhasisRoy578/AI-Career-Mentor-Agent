'use client';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
 codex/set-up-project-structure-for-ai-career-mentor-agent-7da4ey
import { Input, Textarea } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/toast';
import { authApi, RegisterInput } from '@/lib/auth';

export function RegisterForm() {
  const { notify } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>();
  const mutation = useMutation({ mutationFn: authApi.register, onSuccess: ({ accessToken }) => { authApi.saveToken(accessToken); notify({ title: 'Account created', description: 'Your secure workspace is ready.' }); window.location.assign('/dashboard'); } });
  return <form className="mt-8 grid gap-4" onSubmit={handleSubmit((values) => mutation.mutate(values))} noValidate><div><Input placeholder="Full name" {...register('fullName', { required: 'Full name is required' })} />{errors.fullName ? <p className="mt-2 text-sm text-red-300">{errors.fullName.message}</p> : null}</div><Input placeholder="Email" type="email" {...register('email', { required: 'Email is required' })} /><Input placeholder="Password" type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Use at least 8 characters' } })} /><div className="grid gap-4 sm:grid-cols-2"><Input placeholder="Education" {...register('education')} /><Input placeholder="University" {...register('university')} /></div><Textarea placeholder="Current skills e.g. TypeScript, React, SQL" {...register('currentSkills')} /><Input placeholder="Career goal" {...register('careerGoal')} />{mutation.isError ? <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200">Registration failed. The email may already be registered.</p> : null}<Button className="w-full" disabled={mutation.isPending}>{mutation.isPending ? <><Spinner /> Creating account...</> : 'Create account'}</Button></form>;
=======
import { authApi, RegisterInput } from '@/lib/auth';

export function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>();
  const mutation = useMutation({ mutationFn: authApi.register, onSuccess: ({ accessToken }) => { authApi.saveToken(accessToken); window.location.assign('/dashboard'); } });
  return <form className="mt-8 space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
    <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Full name" {...register('fullName', { required: 'Full name is required' })} />
    {errors.fullName ? <p className="text-sm text-red-300">{errors.fullName.message}</p> : null}
    <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Email" {...register('email', { required: 'Email is required' })} />
    <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Password" type="password" {...register('password', { required: 'Password is required', minLength: 8 })} />
    <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Current skills" {...register('currentSkills')} />
    <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Career goal" {...register('careerGoal')} />
    {mutation.isError ? <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200">Registration failed. The email may already be registered.</p> : null}
    <Button className="w-full" disabled={mutation.isPending}>{mutation.isPending ? 'Creating account...' : 'Create account'}</Button>
  </form>;
 main
}
