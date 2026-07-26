'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ReportSection } from '@/components/ai/report-section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { Spinner } from '@/components/ui/spinner';
import { aiApi } from '@/lib/ai';

export default function AiReportPage() {
  const queryClient = useQueryClient();
  const latest = useQuery({ queryKey: ['career-analysis-latest'], queryFn: aiApi.latestCareerAnalysis });
  const history = useQuery({ queryKey: ['ai-reports'], queryFn: aiApi.reports });
  const mutation = useMutation({ mutationFn: () => aiApi.generateCareerAnalysis(), onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ['career-analysis-latest'] }); void queryClient.invalidateQueries({ queryKey: ['ai-reports'] }); } });
  const report = mutation.data ?? latest.data;
  return <main className="space-y-6 p-4 md:p-6"><Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-sm text-brand-50">AI Career Report</p><h2 className="mt-2 text-3xl font-bold">Personalized career analysis</h2><p className="mt-2 text-slate-400">Generate, save, regenerate, and review AI career guidance based on your assessment.</p></div><Button disabled={mutation.isPending} onClick={() => mutation.mutate()}>{mutation.isPending ? <><Spinner /> Generating...</> : <><Sparkles size={16} /> Generate report</>}</Button></Card>{mutation.isError ? <Card className="border-red-400/20 text-red-200">AI generation failed. Check backend AI provider configuration and try again.</Card> : null}{!report ? <EmptyState title="No AI report yet" description="Complete your career assessment, then generate your first AI career report." action={{ label: 'Open career assessment', onClick: () => window.location.assign('/dashboard/career-assessment') }} /> : <><Card><h3 className="text-xl font-bold">Career Summary</h3><p className="mt-3 leading-7 text-slate-300">{report.result.careerSummary ?? report.summary}</p></Card><div className="grid gap-6 md:grid-cols-2"><ReportSection title="Strengths" items={report.result.strengths} /><ReportSection title="Weaknesses" items={report.result.weaknesses} /><ReportSection title="Career Paths" items={report.result.recommendedCareerPaths} /><ReportSection title="Technologies" items={report.result.recommendedTechnologies} /><ReportSection title="Certifications" items={report.result.recommendedCertifications} /><ReportSection title="Portfolio Improvements" items={report.result.portfolioImprovements} /><ReportSection title="Suggested Projects" items={report.result.suggestedProjects} /><ReportSection title="Open Source Contributions" items={report.result.suggestedOpenSourceContributions} /></div></>}{history.data?.careerAnalyses.length ? <Card><h3 className="text-xl font-bold">Report history</h3><div className="mt-4 space-y-3">{history.data.careerAnalyses.map((item) => <Link className="block rounded-2xl bg-white/[0.05] p-4 text-sm text-slate-300" href="#" key={item.id}>{new Date(item.createdAt).toLocaleString()} — {item.summary || 'Saved career report'}</Link>)}</div></Card> : null}</main>;
}
