'use client';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/toast';
import { authApi } from '@/lib/auth';

type Values = { currentPassword: string; newPassword: string };

export function ChangePasswordForm() {
  const { notify } = useToast();
  const { register, handleSubmit, reset } = useForm<Values>();
  const mutation = useMutation({ mutationFn: authApi.changePassword, onSuccess: () => { reset(); notify({ title: 'Password changed', description: 'Use your new password the next time you sign in.' }); } });
  return <form className="grid gap-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}><Input placeholder="Current password" type="password" {...register('currentPassword', { required: true, minLength: 8 })} /><Input placeholder="New password" type="password" {...register('newPassword', { required: true, minLength: 8 })} />{mutation.isError ? <p className="text-sm text-red-300">Password change failed. Check your current password.</p> : null}<Button disabled={mutation.isPending}>{mutation.isPending ? <><Spinner /> Updating...</> : 'Update password'}</Button></form>;
}
