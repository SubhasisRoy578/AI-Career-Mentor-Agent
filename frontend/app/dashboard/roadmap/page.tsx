'use client';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { aiApi, RoadmapDuration } from '@/lib/ai';

const durations: RoadmapDuration[] = ['30_DAYS', '60_DAYS', '90_DAYS', '6_MONTHS'];

export default function RoadmapPage() {
  const mutation = useMutation({ mutationFn: (input: { duration: RoadmapDuration; targetCareer?: string }) => aiApi.generateRoadmap(input) });
  return <main className="space-y-6 p-4 md:p-6"><Card><h2 className="text-3xl font-bold">Learning Roadmap</h2><p className="mt-2 text-slate-400">Generate a timeline with weekly goals, practice, projects, and milestones.</p><form className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_auto]" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); mutation.mutate({ targetCareer: String(data.get('targetCareer') ?? ''), duration: data.get('duration') as RoadmapDuration }); }}><Input name="targetCareer" placeholder="Target career" /><select className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white" name="duration">{durations.map((duration) => <option key={duration} value={duration}>{duration.replace('_', ' ')}</option>)}</select><Button disabled={mutation.isPending}>{mutation.isPending ? <><Spinner /> Building...</> : 'Generate roadmap'}</Button></form></Card>{mutation.isError ? <Card className="border-red-400/20 text-red-200">Roadmap generation failed. Complete your career assessment or check AI configuration.</Card> : null}{mutation.data ? <div className="space-y-4"><Card><h3 className="text-xl font-bold">{mutation.data.result.duration ?? mutation.data.duration} roadmap for {mutation.data.result.targetCareer ?? mutation.data.targetCareer}</h3></Card>{mutation.data.result.weeks?.map((week) => <Card className="border-l-4 border-l-brand-500" key={week.week}><p className="text-sm text-brand-50">Week {week.week}</p><div className="mt-4 grid gap-4 md:grid-cols-2"><List title="Goals" items={week.goals} /><List title="Skills" items={week.skillsToLearn} /><List title="Practice" items={week.recommendedPractice} /><List title="Mini projects" items={week.miniProjects} /><List title="Milestones" items={week.milestones} /></div></Card>)}</div> : null}</main>;
}

function List({ title, items }: { title: string; items: string[] }) { return <div><h4 className="font-semibold">{title}</h4><ul className="mt-2 space-y-1 text-sm text-slate-300">{items?.map((item) => <li key={item}>• {item}</li>)}</ul></div>; }
