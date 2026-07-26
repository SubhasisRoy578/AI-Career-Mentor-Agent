import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ForgotPasswordPage() {
  return <main className="grid min-h-screen place-items-center bg-slate-950 px-6"><Card className="w-full max-w-md"><Badge>Coming soon</Badge><h1 className="mt-5 text-3xl font-bold">Reset password</h1><p className="mt-3 text-slate-300">Password reset emails will be implemented in a later security phase. This placeholder keeps the auth flow polished.</p><Input className="mt-8" placeholder="Email address" type="email" /><Link className="mt-6 inline-block text-brand-50 hover:text-white" href="/login">Back to login</Link></Card></main>;
}
