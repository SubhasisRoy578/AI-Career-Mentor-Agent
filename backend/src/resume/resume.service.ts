import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';
import { ResumeAiService } from './resume-ai.service';
import { ResumeParserService } from './resume-parser.service';
import { ResumeRepository } from './resume.repository';
import { ResumeStorageService } from './resume-storage.service';

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

type UploadedFile = { originalname: string; mimetype: string; size: number; buffer: Buffer };

@Injectable()
export class ResumeService {
  constructor(private readonly repository: ResumeRepository, private readonly storage: ResumeStorageService, private readonly parser: ResumeParserService, private readonly ai: ResumeAiService) {}

  async upload(userId: string, file?: UploadedFile) {
    this.validateFile(file);
    const resumeId = randomUUID();
    const parsed = this.parser.parse(file.buffer);
    const storageKey = await this.storage.save(userId, resumeId, file.originalname, file.buffer);
    const resume = await this.repository.createResume({ id: resumeId, userId, originalName: file.originalname, mimeType: file.mimetype, size: file.size, storageKey, parsedText: parsed.text, parsedData: parsed.data as Prisma.InputJsonObject });
    await this.repository.addHistory({ userId, resumeId, action: 'UPLOADED', metadata: { originalName: file.originalname, size: file.size } });
    return resume;
  }

  list(userId: string) { return this.repository.listResumes(userId); }
  view(userId: string, resumeId: string) { return this.repository.getOwnedResume(userId, resumeId); }

  async remove(userId: string, resumeId: string) {
    const resume = await this.repository.getOwnedResume(userId, resumeId);
    await this.storage.remove(resume.storageKey);
    await this.repository.addHistory({ userId, resumeId, action: 'DELETED', metadata: { originalName: resume.originalName } });
    await this.repository.deleteResume(resumeId);
    return { deleted: true };
  }

  async analyze(userId: string, resumeId: string) {
    const resume = await this.repository.getOwnedResume(userId, resumeId);
    const result = await this.ai.analyze(resume.parsedData as Prisma.JsonObject, resume.parsedText);
    const score = Number(result.overallAtsScore ?? 0);
    const analysis = await this.repository.createAnalysis({ userId, resumeId, result, score: Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : 0 });
    await this.repository.addHistory({ userId, resumeId, action: 'ANALYZED', metadata: { analysisId: analysis.id, score: analysis.score } });
    return analysis;
  }

  reports(userId: string, resumeId?: string) { return this.repository.listAnalyses(userId, resumeId); }
  regenerate(userId: string, resumeId: string) { return this.analyze(userId, resumeId); }

  private validateFile(file?: UploadedFile): asserts file is UploadedFile {
    if (!file) throw new BadRequestException('Resume file is required.');
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) throw new BadRequestException('Only PDF and DOCX resumes are supported.');
    if (file.size > MAX_RESUME_SIZE) throw new BadRequestException('Resume must be 5 MB or smaller.');
  }
}
