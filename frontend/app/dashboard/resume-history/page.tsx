'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { resumeApi } from '@/lib/resume';

export default function ResumeHistoryPage() {
  const resumes = useQuery({ queryKey: ['resumes'], queryFn: resumeApi.list });
  const reports = useQuery({ queryKey: ['resume-reports'], queryFn: () => resumeApi.reports() });
  if (resumes.isLoading) return <main className="grid gap-6 p-6"><Skeleton className="h-40" /><Skeleton className="h-40" /></main>;
  return <main className="space-y-6 p-4 md:p-6"><Card className="flex items-center justify-between"><div><h2 className="text-3xl font-bold">Resume History</h2><p className="mt-2 text-slate-400">View uploaded resumes and previous ATS reports.</p></div><Link href="/dashboard/resume-upload"><Button>Upload resume</Button></Link></Card>{!resumes.data?.length ? <EmptyState title="No resumes uploaded" description="Upload your first resume to generate ATS feedback." action={{ label: 'Upload resume', onClick: () => window.location.assign('/dashboard/resume-upload') }} /> : <div className="grid gap-4">{resumes.data.map((resume) => <Link className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition hover:bg-white/10" href={`/dashboard/resume/${resume.id}`} key={resume.id}><p className="font-semibold text-white">{resume.originalName}</p><p className="mt-2 text-sm text-slate-400">Uploaded {new Date(resume.createdAt).toLocaleString()} · Latest score {resume.analyses?.[0]?.score ?? 'not generated'}</p></Link>)}</div>}{reports.data?.length ? <Card><h3 className="text-xl font-bold">Previous ATS reports</h3><div className="mt-4 space-y-3">{reports.data.map((report) => <Link className="block rounded-2xl bg-white/[0.05] p-4 text-sm text-slate-300" href={`/dashboard/resume/${report.resumeId}/ats-report?analysis=${report.id}`} key={report.id}>{report.resume?.originalName ?? 'Resume'} · Score {report.score}/100 · {new Date(report.createdAt).toLocaleString()}</Link>)}</div></Card> : null}</main>;
}
