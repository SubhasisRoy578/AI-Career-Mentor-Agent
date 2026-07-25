import Link from 'next/link';
import { RegisterForm } from '@/components/auth/register-form';
codex/set-up-project-structure-for-ai-career-mentor-agent-7da4ey
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function RegisterPage() {
  return <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,rgba(52,120,246,.22),transparent_28rem),#020617] px-6 py-10"><Card className="w-full max-w-2xl"><Badge>Start in minutes</Badge><h1 className="mt-5 text-3xl font-black md:text-4xl">Create your career workspace</h1><p className="mt-2 text-slate-400">Create a secure account and add the first profile details that power your dashboard.</p><RegisterForm /><p className="mt-6 text-sm text-slate-400">Already registered? <Link className="text-brand-50 hover:text-white" href="/login">Sign in</Link></p></Card></main>;
=======
import { Card } from '@/components/ui/card';

export default function RegisterPage() {
  return <main className="grid min-h-screen place-items-center px-6 py-10"><Card className="w-full max-w-xl"><h1 className="text-3xl font-bold">Create your workspace</h1><p className="mt-2 text-slate-400">Your account will be created through the NestJS authentication API.</p><RegisterForm /><p className="mt-6 text-sm text-slate-400">Already registered? <Link className="text-brand-50" href="/login">Sign in</Link></p></Card></main>;
 main
}
