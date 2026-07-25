'use client';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
 codex/set-up-project-structure-for-ai-career-mentor-agent-7da4ey
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/toast';
import { authApi, LoginInput } from '@/lib/auth';

export function LoginForm() {
  const { notify } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>();
  const mutation = useMutation({ mutationFn: authApi.login, onSuccess: ({ accessToken }) => { authApi.saveToken(accessToken); notify({ title: 'Welcome back', description: 'Redirecting to your dashboard.' }); window.location.assign('/dashboard'); } });
  return <form className="mt-8 space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))} noValidate><div><label className="mb-2 block text-sm text-slate-300" htmlFor="email">Email</label><Input id="email" placeholder="you@example.com" type="email" {...register('email', { required: 'Email is required' })} />{errors.email ? <p className="mt-2 text-sm text-red-300">{errors.email.message}</p> : null}</div><div><label className="mb-2 block text-sm text-slate-300" htmlFor="password">Password</label><Input id="password" placeholder="••••••••" type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Use at least 8 characters' } })} />{errors.password ? <p className="mt-2 text-sm text-red-300">{errors.password.message}</p> : null}</div>{mutation.isError ? <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200">Unable to sign in. Check your credentials and try again.</p> : null}<Button className="w-full" disabled={mutation.isPending}>{mutation.isPending ? <><Spinner /> Signing in...</> : 'Sign in'}</Button></form>;
=======
import { authApi, LoginInput } from '@/lib/auth';

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>();
  const mutation = useMutation({ mutationFn: authApi.login, onSuccess: ({ accessToken }) => { authApi.saveToken(accessToken); window.location.assign('/dashboard'); } });
  return <form className="mt-8 space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
    <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Email" {...register('email', { required: 'Email is required' })} />
    {errors.email ? <p className="text-sm text-red-300">{errors.email.message}</p> : null}
    <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Password" type="password" {...register('password', { required: 'Password is required', minLength: 8 })} />
    {mutation.isError ? <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200">Unable to sign in. Check your credentials and try again.</p> : null}
    <Button className="w-full" disabled={mutation.isPending}>{mutation.isPending ? 'Signing in...' : 'Sign in'}</Button>
  </form>;
 main
}
