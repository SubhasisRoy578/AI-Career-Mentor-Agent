import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return <div className="grid min-h-screen place-items-center bg-slate-950 px-6 text-center"><div><p className="text-sm text-brand-50">404</p><h1 className="mt-3 text-6xl font-black">Page not found</h1><p className="mt-3 text-slate-400">The page you requested does not exist or moved.</p><Link href="/"><Button className="mt-6">Return home</Button></Link></div></div>;
}
