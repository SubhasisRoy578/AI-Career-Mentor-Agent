import { api } from '@/lib/api';
import { Resume, ResumeAnalysis } from '@/types/resume';

type ApiResponse<T> = { success: boolean; message: string; data: T };

export const resumeApi = {
  async upload(file: File, onProgress?: (progress: number) => void) { const form = new FormData(); form.append('file', file); const { data } = await api.post<ApiResponse<Resume>>('/resumes', form, { headers: { 'Content-Type': 'multipart/form-data' }, onUploadProgress: (event) => { if (event.total) onProgress?.(Math.round((event.loaded / event.total) * 100)); } }); return data.data; },
  async list() { const { data } = await api.get<ApiResponse<Resume[]>>('/resumes'); return data.data; },
  async view(id: string) { const { data } = await api.get<ApiResponse<Resume>>(`/resumes/${id}`); return data.data; },
  async remove(id: string) { const { data } = await api.delete<ApiResponse<{ deleted: boolean }>>(`/resumes/${id}`); return data.data; },
  async analyze(id: string) { const { data } = await api.post<ApiResponse<ResumeAnalysis>>(`/resumes/${id}/analyze`); return data.data; },
  async regenerate(id: string) { const { data } = await api.post<ApiResponse<ResumeAnalysis>>(`/resumes/${id}/regenerate`); return data.data; },
  async reports(id?: string) { const { data } = await api.get<ApiResponse<ResumeAnalysis[]>>(id ? `/resumes/${id}/reports` : '/resumes/reports'); return data.data; },
};
