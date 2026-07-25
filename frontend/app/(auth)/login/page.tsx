import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  return <main className="grid min-h-screen place-items-center px-6"><Card className="w-full max-w-md"><h1 className="text-3xl font-bold">Welcome back</h1><p className="mt-2 text-slate-400">Sign in to continue to your career dashboard.</p><LoginForm /><div className="mt-6 flex justify-between text-sm text-slate-400"><Link className="text-brand-50" href="/forgot-password">Forgot password?</Link><Link className="text-brand-50" href="/register">Create account</Link></div></Card></main>;
}
