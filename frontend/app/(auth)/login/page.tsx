import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  return <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,rgba(52,120,246,.22),transparent_28rem),#020617] px-6"><Card className="w-full max-w-md"><Badge>Secure workspace</Badge><h1 className="mt-5 text-3xl font-black">Welcome back</h1><p className="mt-2 text-slate-400">Sign in to continue to your career dashboard.</p><LoginForm /><div className="mt-6 flex justify-between text-sm text-slate-400"><Link className="text-brand-50 hover:text-white" href="/forgot-password">Forgot password?</Link><Link className="text-brand-50 hover:text-white" href="/register">Create account</Link></div></Card></main>;
}
