import Link from 'next/link';
export default function NotFound(){return <div className="grid min-h-screen place-items-center text-center"><div><h1 className="text-6xl font-black">404</h1><p className="mt-3 text-slate-400">This page does not exist.</p><Link className="mt-6 inline-block text-brand-50" href="/">Return home</Link></div></div>}
