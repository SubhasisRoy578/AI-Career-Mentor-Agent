import { Card } from '@/components/ui/card';

export function ReportSection({ title, items }: { title: string; items?: string[] }) {
  return <Card><h3 className="text-lg font-bold">{title}</h3>{items?.length ? <ul className="mt-4 space-y-2 text-sm text-slate-300">{items.map((item) => <li className="rounded-2xl bg-white/[0.05] p-3" key={item}>{item}</li>)}</ul> : <p className="mt-3 text-sm text-slate-500">No recommendations yet.</p>}</Card>;
}
