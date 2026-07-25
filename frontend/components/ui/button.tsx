import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={cn('rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white shadow-glow transition hover:bg-brand-700 disabled:opacity-60', className)} {...props} />; }
