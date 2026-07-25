import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Alert({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="status" className={cn('rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm text-slate-200', className)} {...props} />;
}
