import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function ForgotPasswordPage() {
  return <main className="grid min-h-screen place-items-center px-6"><Card className="w-full max-w-md"><h1 className="text-3xl font-bold">Reset password</h1><p className="mt-3 text-slate-300">Password reset emails will be implemented in a later security phase.</p><input className="mt-8 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Email address" /><Link className="mt-6 inline-block text-brand-50" href="/login">Back to login</Link></Card></main>;
}
