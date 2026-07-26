import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { CareerProfileDto } from './dto/career-profile.dto';
import { GenerateCareerAnalysisDto, GenerateRoadmapDto, GenerateSkillGapDto } from './dto/analysis.dto';
import { AiProviderService } from './providers/ai-provider.service';
import { PromptBuilderService } from './prompt-builder.service';

type JsonMap = Prisma.InputJsonObject;

@Injectable()
export class AiService {
  constructor(private readonly prisma: PrismaService, private readonly prompts: PromptBuilderService, private readonly provider: AiProviderService) {}

  async saveProfile(userId: string, dto: CareerProfileDto) {
    return this.prisma.careerProfile.upsert({ where: { userId }, update: dto, create: { ...dto, userId } });
  }

  async getProfile(userId: string) {
    return this.prisma.careerProfile.findUnique({ where: { userId } });
  }

  async listReports(userId: string) {
    const [careerAnalyses, skillGapAnalyses, roadmaps] = await Promise.all([
      this.prisma.careerAnalysis.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
      this.prisma.skillGapAnalysis.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
      this.prisma.learningRoadmap.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
    ]);
    return { careerAnalyses, skillGapAnalyses, roadmaps };
  }

  async generateCareerAnalysis(userId: string, dto: GenerateCareerAnalysisDto) {
    const profile = await this.resolveProfile(userId, dto.profile);
    const result = await this.provider.generateJson<JsonMap>(this.prompts.careerAnalysis(profile));
    return this.prisma.careerAnalysis.create({ data: { userId, profileId: profile.id, summary: String(result.careerSummary ?? ''), result } });
  }

  async generateSkillGap(userId: string, dto: GenerateSkillGapDto) {
    const profile = await this.resolveProfile(userId, dto.profile);
    const targetCareer = dto.targetCareer ?? profile.careerGoal;
    const result = await this.provider.generateJson<JsonMap>(this.prompts.skillGap(profile, targetCareer));
    return this.prisma.skillGapAnalysis.create({ data: { userId, profileId: profile.id, targetCareer, result } });
  }

  async generateRoadmap(userId: string, dto: GenerateRoadmapDto) {
    const profile = await this.resolveProfile(userId, dto.profile);
    const targetCareer = dto.targetCareer ?? profile.careerGoal;
    const result = await this.provider.generateJson<JsonMap>(this.prompts.roadmap(profile, targetCareer, dto.duration));
    return this.prisma.learningRoadmap.create({ data: { userId, profileId: profile.id, targetCareer, duration: dto.duration, result } });
  }

  async latestCareerAnalysis(userId: string) {
    return this.prisma.careerAnalysis.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  private async resolveProfile(userId: string, profileInput?: CareerProfileDto) {
    if (profileInput) return this.saveProfile(userId, profileInput);
    const profile = await this.getProfile(userId);
    if (!profile) throw new NotFoundException('Complete your career profile before generating AI analysis.');
    return profile;
  }
}
