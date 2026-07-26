'use client';
import { useMutation } from '@tanstack/react-query';
import { UploadCloud } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DragEvent, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/toast';
import { resumeApi } from '@/lib/resume';

export default function ResumeUploadPage() {
  const router = useRouter();
  const { notify } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const mutation = useMutation({ mutationFn: (resume: File) => resumeApi.upload(resume, setProgress), onSuccess: (resume) => { notify({ title: 'Resume uploaded', description: 'Structured resume details were extracted.' }); router.push(`/dashboard/resume/${resume.id}`); } });
  const choose = (candidate?: File) => { if (!candidate) return; if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(candidate.type)) { notify({ title: 'Unsupported file', description: 'Upload a PDF or DOCX resume.', type: 'error' }); return; } if (candidate.size > 5 * 1024 * 1024) { notify({ title: 'File too large', description: 'Resume must be 5 MB or smaller.', type: 'error' }); return; } setFile(candidate); };
  const drop = (event: DragEvent<HTMLLabelElement>) => { event.preventDefault(); choose(event.dataTransfer.files[0]); };
  return <main className="space-y-6 p-4 md:p-6"><Card><Badge>Phase 5</Badge><h2 className="mt-4 text-3xl font-bold">Resume Upload</h2><p className="mt-2 text-slate-400">Upload a PDF or DOCX resume for secure parsing and AI-powered ATS analysis.</p></Card><Card><label className="grid cursor-pointer place-items-center rounded-3xl border border-dashed border-white/20 bg-white/[0.03] p-10 text-center transition hover:bg-white/[0.06]" onDragOver={(event) => event.preventDefault()} onDrop={drop}><UploadCloud className="text-brand-50" size={42} /><p className="mt-4 text-lg font-semibold">Drag & drop your resume</p><p className="mt-2 text-sm text-slate-400">or click to browse · PDF/DOCX · max 5 MB</p><input className="hidden" type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => choose(event.target.files?.[0])} /></label>{file ? <div className="mt-6 rounded-2xl bg-white/[0.05] p-4"><p className="font-medium">{file.name}</p><p className="mt-1 text-sm text-slate-400">{Math.round(file.size / 1024)} KB</p><div className="mt-4 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-brand-500" style={{ width: `${progress}%` }} /></div></div> : null}{mutation.isError ? <p className="mt-4 text-sm text-red-300">Upload failed. Please verify the file and try again.</p> : null}<Button className="mt-6" disabled={!file || mutation.isPending} onClick={() => file && mutation.mutate(file)}>{mutation.isPending ? <><Spinner /> Uploading...</> : 'Upload resume'}</Button></Card></main>;
}
