import { cn } from '@/lib/utils';

export function Avatar({ name, src, className }: { name?: string; src?: string | null; className?: string }) {
  const initials = (name ?? 'User').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  return <div className={cn('grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-brand-500 to-cyan-300 text-sm font-bold text-white', className)}>{src ? <img alt={`${name} avatar`} className="h-full w-full object-cover" src={src} /> : initials}</div>;
}
