import { Card } from '@/components/ui/card';

export function AtsSection({ title, items }: { title: string; items?: string[] }) {
  return <details className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20" open><summary className="cursor-pointer text-lg font-bold text-white">{title}</summary>{items?.length ? <ul className="mt-4 space-y-2 text-sm text-slate-300">{items.map((item) => <li className="rounded-2xl bg-white/[0.05] p-3" key={item}>{item}</li>)}</ul> : <p className="mt-3 text-sm text-slate-500">No items returned for this section.</p>}</details>;
}

export function ScoreCard({ score }: { score?: number }) {
  const value = Math.max(0, Math.min(100, Number(score ?? 0)));
  return <Card><p className="text-sm text-slate-400">Overall ATS Score</p><div className="mt-4 flex items-end gap-2"><span className="text-6xl font-black text-white">{value}</span><span className="pb-2 text-slate-400">/100</span></div><div className="mt-5 h-3 rounded-full bg-white/10"><div className="h-3 rounded-full bg-gradient-to-r from-brand-500 to-cyan-300" style={{ width: `${value}%` }} /></div></Card>;
}
