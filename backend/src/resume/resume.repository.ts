import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Resume } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ResumeRepository {
  constructor(private readonly prisma: PrismaService) {}

  createResume(data: Prisma.ResumeUncheckedCreateInput) { return this.prisma.resume.create({ data }); }
  listResumes(userId: string) { return this.prisma.resume.findMany({ where: { userId }, include: { analyses: { orderBy: { createdAt: 'desc' }, take: 1 } }, orderBy: { createdAt: 'desc' } }); }
  async getOwnedResume(userId: string, resumeId: string): Promise<Resume> { const resume = await this.prisma.resume.findFirst({ where: { id: resumeId, userId } }); if (!resume) throw new NotFoundException('Resume was not found.'); return resume; }
  deleteResume(resumeId: string) { return this.prisma.resume.delete({ where: { id: resumeId } }); }
  createAnalysis(data: Prisma.ResumeAnalysisUncheckedCreateInput) { return this.prisma.resumeAnalysis.create({ data }); }
  listAnalyses(userId: string, resumeId?: string) { return this.prisma.resumeAnalysis.findMany({ where: { userId, ...(resumeId ? { resumeId } : {}) }, include: { resume: { select: { originalName: true } } }, orderBy: { createdAt: 'desc' } }); }
  addHistory(data: Prisma.ResumeHistoryUncheckedCreateInput) { return this.prisma.resumeHistory.create({ data }); }
}
