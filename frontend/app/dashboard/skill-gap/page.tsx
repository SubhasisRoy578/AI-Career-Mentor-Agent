'use client';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { aiApi } from '@/lib/ai';

export default function SkillGapPage() {
  const mutation = useMutation({ mutationFn: (targetCareer: string) => aiApi.generateSkillGap({ targetCareer }) });
  return <main className="space-y-6 p-4 md:p-6"><Card><h2 className="text-3xl font-bold">Skill Gap Analysis</h2><p className="mt-2 text-slate-400">Compare your current skills against a target role.</p><form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); mutation.mutate(String(data.get('targetCareer') ?? '')); }}><Input name="targetCareer" placeholder="Target career e.g. AI Product Engineer" /><Button disabled={mutation.isPending}>{mutation.isPending ? <><Spinner /> Analyzing...</> : 'Analyze gaps'}</Button></form></Card>{mutation.isError ? <Card className="border-red-400/20 text-red-200">Skill gap analysis failed. Complete your career assessment or check AI configuration.</Card> : null}{mutation.data ? <Card><h3 className="text-xl font-bold">{mutation.data.result.targetCareer ?? mutation.data.targetCareer}</h3><p className="mt-3 text-slate-300">{mutation.data.result.summary}</p><div className="mt-6 space-y-4">{mutation.data.result.missingSkills?.map((skill) => <details className="rounded-2xl border border-white/10 bg-white/[0.05] p-4" key={skill.skill}><summary className="cursor-pointer font-semibold">#{skill.priority} {skill.skill} · {skill.level} · {skill.estimatedLearningTime}</summary><ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">{skill.recommendedResources.map((resource) => <li key={resource}>{resource}</li>)}</ul></details>)}</div></Card> : null}</main>;
}
