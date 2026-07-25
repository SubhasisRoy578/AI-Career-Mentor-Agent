'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split('/').filter(Boolean);
  return <nav aria-label="Breadcrumb" className="hidden text-sm text-slate-400 md:block">{parts.map((part, index) => { const href = `/${parts.slice(0, index + 1).join('/')}`; const label = part.replace('-', ' '); const last = index === parts.length - 1; return <span key={href}>{index > 0 ? <span className="mx-2">/</span> : null}{last ? <span className="capitalize text-slate-200">{label}</span> : <Link className="capitalize hover:text-white" href={href}>{label}</Link>}</span>; })}</nav>;
}
