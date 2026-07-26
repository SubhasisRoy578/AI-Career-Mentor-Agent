import { api } from '@/lib/api';
import { AiRecord, CareerAnalysisResult, CareerProfile, ReportHistory, RoadmapResult, SkillGapResult } from '@/types/ai';

type ApiResponse<T> = { success: boolean; message: string; data: T };
export type RoadmapDuration = '30_DAYS' | '60_DAYS' | '90_DAYS' | '6_MONTHS';

export const aiApi = {
  async getProfile() { const { data } = await api.get<ApiResponse<CareerProfile | null>>('/ai/career-profile'); return data.data; },
  async saveProfile(input: CareerProfile) { const { data } = await api.post<ApiResponse<CareerProfile>>('/ai/career-profile', input); return data.data; },
  async generateCareerAnalysis(profile?: CareerProfile) { const { data } = await api.post<ApiResponse<AiRecord<CareerAnalysisResult>>>('/ai/career-analysis', profile ? { profile } : {}); return data.data; },
  async latestCareerAnalysis() { const { data } = await api.get<ApiResponse<AiRecord<CareerAnalysisResult> | null>>('/ai/career-analysis/latest'); return data.data; },
  async generateSkillGap(input: { targetCareer?: string; profile?: CareerProfile }) { const { data } = await api.post<ApiResponse<AiRecord<SkillGapResult>>>('/ai/skill-gap', input); return data.data; },
  async generateRoadmap(input: { duration: RoadmapDuration; targetCareer?: string; profile?: CareerProfile }) { const { data } = await api.post<ApiResponse<AiRecord<RoadmapResult>>>('/ai/roadmap', input); return data.data; },
  async reports() { const { data } = await api.get<ApiResponse<ReportHistory>>('/ai/reports'); return data.data; },
};
