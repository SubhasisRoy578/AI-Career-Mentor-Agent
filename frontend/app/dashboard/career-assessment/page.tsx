'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input, Textarea } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/toast';
import { aiApi } from '@/lib/ai';
import { CareerProfile } from '@/types/ai';

const split = (value?: string) => value?.split(',').map((item) => item.trim()).filter(Boolean) ?? [];
type FormValues = Omit<CareerProfile, 'currentSkills' | 'preferredTechnologies' | 'certifications' | 'projects' | 'interests'> & { currentSkills: string; preferredTechnologies: string; certifications: string; projects: string; interests: string };

export default function CareerAssessmentPage() {
  const { notify } = useToast();
  const query = useQuery({ queryKey: ['career-profile'], queryFn: aiApi.getProfile });
  const { register, handleSubmit, reset } = useForm<FormValues>();
  useEffect(() => {
    if (query.data) reset({ ...query.data, currentSkills: query.data.currentSkills.join(', '), preferredTechnologies: query.data.preferredTechnologies.join(', '), certifications: query.data.certifications.join(', '), projects: query.data.projects.join(', '), interests: query.data.interests.join(', ') });
  }, [query.data, reset]);
  const mutation = useMutation({ mutationFn: aiApi.saveProfile, onSuccess: () => notify({ title: 'Career profile saved', description: 'You can now generate AI reports and roadmaps.' }) });
  return <main className="space-y-6 p-4 md:p-6"><Card><Badge>Phase 4</Badge><h2 className="mt-4 text-3xl font-bold">Career Assessment</h2><p className="mt-2 text-slate-400">Complete the structured profile used by the external AI provider.</p></Card><form className="grid gap-4" onSubmit={handleSubmit((values) => mutation.mutate({ ...values, currentSkills: split(values.currentSkills), preferredTechnologies: split(values.preferredTechnologies), certifications: split(values.certifications), projects: split(values.projects), interests: split(values.interests) }))}><div className="grid gap-4 md:grid-cols-2"><Input placeholder="Current education" {...register('currentEducation', { required: true })} /><Input placeholder="Degree" {...register('degree', { required: true })} /><Input placeholder="College / University" {...register('university', { required: true })} /><Input placeholder="Year of study" {...register('yearOfStudy', { required: true })} /><Input placeholder="Career goal" {...register('careerGoal', { required: true })} /><Input placeholder="Preferred industry" {...register('preferredIndustry', { required: true })} /></div><Textarea placeholder="Current skills (comma separated)" {...register('currentSkills', { required: true })} /><Textarea placeholder="Preferred technologies (comma separated)" {...register('preferredTechnologies', { required: true })} /><Textarea placeholder="Certifications (comma separated)" {...register('certifications')} /><Textarea placeholder="Projects (comma separated)" {...register('projects')} /><Textarea placeholder="Interests (comma separated)" {...register('interests')} /><select className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white" {...register('experienceLevel', { required: true })}><option value="BEGINNER">Beginner</option><option value="INTERMEDIATE">Intermediate</option><option value="ADVANCED">Advanced</option><option value="PROFESSIONAL">Professional</option></select>{mutation.isError ? <p className="text-sm text-red-300">Unable to save profile.</p> : null}<Button disabled={mutation.isPending}>{mutation.isPending ? <><Spinner /> Saving...</> : 'Save career profile'}</Button></form></main>;
}
