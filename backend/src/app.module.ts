import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuthModule } from './auth/auth.module';
import { CareerModule } from './career/career.module';
import { ChatModule } from './chat/chat.module';
import { CommonModule } from './common/common.module';
import { ExportModule } from './export/export.module';
import { HealthModule } from './health/health.module';
import { InterviewModule } from './interview/interview.module';
import { ProductivityModule } from './productivity/productivity.module';
import { ResumeModule } from './resume/resume.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { UsersModule } from './users/users.module';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule, HealthModule, AuthModule, UsersModule, CareerModule, ResumeModule, AiModule, ChatModule, InterviewModule, ProductivityModule, AnalyticsModule, ExportModule, RoadmapModule] })
export class AppModule {}
