'use client';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/toast';
import { authApi, RegisterInput } from '@/lib/auth';

export function RegisterForm() {
  const { notify } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>();
  const mutation = useMutation({ mutationFn: authApi.register, onSuccess: ({ accessToken }) => { authApi.saveToken(accessToken); notify({ title: 'Account created', description: 'Your secure workspace is ready.' }); window.location.assign('/dashboard'); } });
  return <form className="mt-8 grid gap-4" onSubmit={handleSubmit((values) => mutation.mutate(values))} noValidate><div><Input placeholder="Full name" {...register('fullName', { required: 'Full name is required' })} />{errors.fullName ? <p className="mt-2 text-sm text-red-300">{errors.fullName.message}</p> : null}</div><Input placeholder="Email" type="email" {...register('email', { required: 'Email is required' })} /><Input placeholder="Password" type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Use at least 8 characters' } })} /><div className="grid gap-4 sm:grid-cols-2"><Input placeholder="Education" {...register('education')} /><Input placeholder="University" {...register('university')} /></div><Textarea placeholder="Current skills e.g. TypeScript, React, SQL" {...register('currentSkills')} /><Input placeholder="Career goal" {...register('careerGoal')} />{mutation.isError ? <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200">Registration failed. The email may already be registered.</p> : null}<Button className="w-full" disabled={mutation.isPending}>{mutation.isPending ? <><Spinner /> Creating account...</> : 'Create account'}</Button></form>;
}
