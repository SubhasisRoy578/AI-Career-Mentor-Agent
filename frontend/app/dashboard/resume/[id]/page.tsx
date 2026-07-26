'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/toast';
import { resumeApi } from '@/lib/resume';

export default function ResumeDetailsPage() {
  const id = String(useParams().id);
  const router = useRouter();
  const { notify } = useToast();
  const resume = useQuery({ queryKey: ['resume', id], queryFn: () => resumeApi.view(id) });
  const analyze = useMutation({ mutationFn: () => resumeApi.analyze(id), onSuccess: () => router.push(`/dashboard/resume/${id}/ats-report`) });
  const remove = useMutation({ mutationFn: () => resumeApi.remove(id), onSuccess: () => { notify({ title: 'Resume deleted' }); router.push('/dashboard/resume-history'); } });
  if (resume.isLoading) return <main className="p-6 text-slate-300">Loading resume...</main>;
  if (!resume.data) return <main className="p-6 text-red-300">Resume not found.</main>;
  const data = resume.data.parsedData;
  return <main className="space-y-6 p-4 md:p-6"><Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-sm text-brand-50">Resume Details</p><h2 className="mt-2 text-3xl font-bold">{resume.data.originalName}</h2><p className="mt-2 text-slate-400">Uploaded {new Date(resume.data.createdAt).toLocaleString()}</p></div><div className="flex flex-wrap gap-3"><Button disabled={analyze.isPending} onClick={() => analyze.mutate()}>{analyze.isPending ? <><Spinner /> Analyzing...</> : 'Generate ATS report'}</Button><Link href={`/dashboard/resume/${id}/ats-report`}><Button variant="secondary">View report</Button></Link><Button disabled={remove.isPending} onClick={() => remove.mutate()} variant="danger">Delete</Button></div></Card>{analyze.isError ? <Card className="border-red-400/20 text-red-200">ATS analysis failed. Check AI provider configuration and try again.</Card> : null}<div className="grid gap-6 md:grid-cols-2"><Info title="Contact" items={[data.name, data.email, data.phone].filter(Boolean) as string[]} /><Info title="Skills" items={data.skills} /><Info title="Education" items={data.education} /><Info title="Experience" items={data.experience} /><Info title="Projects" items={data.projects} /><Info title="Certifications" items={data.certifications} /><Info title="Languages" items={data.languages} /><Info title="Links" items={data.links} /></div><Card><h3 className="text-xl font-bold">Extracted Summary</h3><p className="mt-3 text-slate-300">{data.summary || 'No summary detected.'}</p></Card></main>;
}

function Info({ title, items }: { title: string; items?: string[] }) { return <Card><h3 className="text-lg font-bold">{title}</h3>{items?.length ? <ul className="mt-3 space-y-2 text-sm text-slate-300">{items.map((item) => <li className="rounded-2xl bg-white/[0.05] p-3" key={item}>{item}</li>)}</ul> : <p className="mt-3 text-sm text-slate-500">Not detected.</p>}</Card>; }
