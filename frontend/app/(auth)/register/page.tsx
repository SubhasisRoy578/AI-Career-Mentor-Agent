import Link from 'next/link';
import { RegisterForm } from '@/components/auth/register-form';
import { Card } from '@/components/ui/card';

export default function RegisterPage() {
  return <main className="grid min-h-screen place-items-center px-6 py-10"><Card className="w-full max-w-xl"><h1 className="text-3xl font-bold">Create your workspace</h1><p className="mt-2 text-slate-400">Your account will be created through the NestJS authentication API.</p><RegisterForm /><p className="mt-6 text-sm text-slate-400">Already registered? <Link className="text-brand-50" href="/login">Sign in</Link></p></Card></main>;
}
