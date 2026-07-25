import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
 codex/set-up-project-structure-for-ai-career-mentor-agent-7da4ey

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl',
        className,
      )}
      {...props}
    />
  );
}
=======
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn('rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur', className)} {...props} />; }
 main
