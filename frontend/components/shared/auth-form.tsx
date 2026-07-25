'use client';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

type AuthFormValues = { name?: string; email: string; password: string };

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  // UI-only form wiring proves React Hook Form is configured without implementing auth logic yet.
  const { register, handleSubmit } = useForm<AuthFormValues>();
  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit(() => undefined)}>
      {mode === 'register' ? <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Full name" {...register('name')} /> : null}
      <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Email" {...register('email')} />
      <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Password" type="password" {...register('password')} />
      <Button className="w-full">{mode === 'login' ? 'Sign in' : 'Create account'}</Button>
    </form>
  );
}
