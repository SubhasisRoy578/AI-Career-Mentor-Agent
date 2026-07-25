import { ProtectedRoute } from '@/components/auth/protected-route';
import { Sidebar } from '@/components/layout/sidebar';
import { TopNav } from '@/components/layout/top-nav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute><div className="flex min-h-screen"><Sidebar /><section className="flex-1"><TopNav />{children}</section></div></ProtectedRoute>;
}
