'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Download } from 'lucide-react';
import { useParams } from 'next/navigation';
import { AtsSection, ScoreCard } from '@/components/resume/ats-section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { Spinner } from '@/components/ui/spinner';
import { resumeApi } from '@/lib/resume';

export default function AtsReportPage() {
  const id = String(useParams().id);
  const queryClient = useQueryClient();
  const reports = useQuery({ queryKey: ['resume-reports', id], queryFn: () => resumeApi.reports(id) });
  const regenerate = useMutation({ mutationFn: () => resumeApi.regenerate(id), onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['resume-reports', id] }) });
  const report = regenerate.data ?? reports.data?.[0];
  return <main className="space-y-6 p-4 md:p-6"><Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-sm text-brand-50">ATS Analysis Report</p><h2 className="mt-2 text-3xl font-bold">Resume readiness report</h2><p className="mt-2 text-slate-400">Review score, recommendations, and a recruiter-focused improvement checklist.</p></div><div className="flex flex-wrap gap-3"><Button disabled={regenerate.isPending} onClick={() => regenerate.mutate()}>{regenerate.isPending ? <><Spinner /> Regenerating...</> : 'Regenerate report'}</Button><Button variant="secondary"><Download size={16} /> Download view</Button></div></Card>{regenerate.isError ? <Card className="border-red-400/20 text-red-200">Could not regenerate report. Check AI configuration and retry.</Card> : null}{!report ? <EmptyState title="No ATS report yet" description="Generate an ATS report from the resume details page." action={{ label: 'Back to resume', onClick: () => window.location.assign(`/dashboard/resume/${id}`) }} /> : <><div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><ScoreCard score={report.score || report.result.overallAtsScore} /><Card><h3 className="text-xl font-bold">Recruiter Readiness Summary</h3><p className="mt-4 leading-7 text-slate-300">{report.result.recruiterReadinessSummary}</p><div className="mt-5 rounded-2xl bg-white/[0.05] p-4"><p className="text-sm text-slate-400">Generated {new Date(report.createdAt).toLocaleString()}</p></div></Card></div><Card><h3 className="text-xl font-bold">Improvement Checklist</h3><div className="mt-4 grid gap-2 md:grid-cols-2">{report.result.improvementChecklist?.map((item) => <label className="rounded-2xl border border-white/10 p-3 text-sm text-slate-300" key={item}><input className="mr-3" type="checkbox" />{item}</label>)}</div></Card><div className="grid gap-5 md:grid-cols-2"><AtsSection title="Strengths" items={report.result.resumeStrengths} /><AtsSection title="Weaknesses" items={report.result.resumeWeaknesses} /><AtsSection title="Missing Keywords" items={report.result.missingKeywords} /><AtsSection title="Technical Skills" items={report.result.technicalSkillSuggestions} /><AtsSection title="Soft Skills" items={report.result.softSkillSuggestions} /><AtsSection title="Formatting" items={report.result.formattingSuggestions} /><AtsSection title="Grammar" items={report.result.grammarSuggestions} /><AtsSection title="Experience" items={report.result.experienceImprovements} /><AtsSection title="Education" items={report.result.educationSuggestions} /><AtsSection title="Certifications" items={report.result.certificationRecommendations} /><AtsSection title="Projects" items={report.result.projectRecommendations} /><AtsSection title="Portfolio" items={report.result.portfolioRecommendations} /></div></>}</main>;
}
