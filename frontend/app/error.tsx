'use client';
import { Button } from '@/components/ui/button';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <div className="grid min-h-screen place-items-center bg-slate-950 px-6 text-center"><div><p className="text-sm text-red-300">Application error</p><h1 className="mt-3 text-4xl font-bold">Something went wrong</h1><p className="mt-3 text-slate-400">Please retry the request or refresh the page.</p><Button className="mt-6" onClick={reset}>Try again</Button></div></div>;
}
