import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
 codex/set-up-project-structure-for-ai-career-mentor-agent-7da4ey

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-500 text-white shadow-glow hover:bg-brand-700',
  secondary: 'border border-white/10 bg-white/10 text-white hover:bg-white/15',
  ghost: 'text-slate-300 hover:bg-white/10 hover:text-white',
  danger: 'bg-red-500/15 text-red-100 ring-1 ring-red-400/20 hover:bg-red-500/25',
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-500/70 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
=======
export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={cn('rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white shadow-glow transition hover:bg-brand-700 disabled:opacity-60', className)} {...props} />; }
 main
