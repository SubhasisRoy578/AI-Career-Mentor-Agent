codex/set-up-project-structure-for-ai-career-mentor-agent-7da4ey
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return <div className="min-h-screen bg-slate-950 p-6"><div className="mx-auto grid max-w-6xl gap-6"><Skeleton className="h-40" /><div className="grid gap-6 md:grid-cols-3"><Skeleton className="h-36" /><Skeleton className="h-36" /><Skeleton className="h-36" /></div></div></div>;
}
=======
export default function Loading(){return <div className="grid min-h-screen place-items-center"><div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-brand-500" /></div>}
main
