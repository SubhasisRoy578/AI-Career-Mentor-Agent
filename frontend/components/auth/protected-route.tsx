'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/auth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!authApi.hasToken()) router.replace('/login');
    setReady(true);
  }, [router]);

  if (!ready) return <div className="grid min-h-screen place-items-center text-slate-300">Loading secure workspace...</div>;
  if (!authApi.hasToken()) return <div className="grid min-h-screen place-items-center text-slate-300">Redirecting to login...</div>;
  return <>{children}</>;
}
