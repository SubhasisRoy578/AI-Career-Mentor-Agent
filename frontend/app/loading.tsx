import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return <div className="min-h-screen bg-slate-950 p-6"><div className="mx-auto grid max-w-6xl gap-6"><Skeleton className="h-40" /><div className="grid gap-6 md:grid-cols-3"><Skeleton className="h-36" /><Skeleton className="h-36" /><Skeleton className="h-36" /></div></div></div>;
}
