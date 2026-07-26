import { ProtectedRoute } from '@/components/auth/protected-route';
import { Sidebar } from '@/components/layout/sidebar';
import { TopNav } from '@/components/layout/top-nav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute><div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(52,120,246,.18),transparent_32rem),#020617]"><div className="flex min-h-screen"><div className="hidden w-72 shrink-0 border-r border-white/10 lg:block"><Sidebar /></div><section className="min-w-0 flex-1"><TopNav />{children}</section></div></div></ProtectedRoute>;
}
