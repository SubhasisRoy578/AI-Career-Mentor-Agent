'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/auth';
import { User } from '@/types/user';

type AuthContextValue = { user?: User; isLoading: boolean; logout: () => void; refreshUser: () => void };
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [hasToken, setHasToken] = useState(false);
  useEffect(() => setHasToken(authApi.hasToken()), []);
  const query = useQuery({ queryKey: ['me'], queryFn: authApi.me, enabled: hasToken, retry: false });
  const logout = () => { authApi.clearToken(); setHasToken(false); queryClient.removeQueries({ queryKey: ['me'] }); router.push('/login'); };
  return <AuthContext.Provider value={{ user: query.data, isLoading: query.isLoading, logout, refreshUser: () => void query.refetch() }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
