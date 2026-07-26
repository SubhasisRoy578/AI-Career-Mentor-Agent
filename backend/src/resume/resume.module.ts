import { Module } from '@nestjs/common';
import { AiModule } from '../ai/ai.module';
import { ResumeController } from './resume.controller';
import { ResumeAiService } from './resume-ai.service';
import { ResumeParserService } from './resume-parser.service';
import { ResumeRepository } from './resume.repository';
import { ResumeService } from './resume.service';
import { ResumeStorageService } from './resume-storage.service';

@Module({ imports: [AiModule], controllers: [ResumeController], providers: [ResumeService, ResumeRepository, ResumeStorageService, ResumeParserService, ResumeAiService] })
export class ResumeModule {}
