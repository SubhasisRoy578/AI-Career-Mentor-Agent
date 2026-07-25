import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { AuthModule } from './auth/auth.module';
import { CareerModule } from './career/career.module';
import { ChatModule } from './chat/chat.module';
import { CommonModule } from './common/common.module';
import { ResumeModule } from './resume/resume.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { UsersModule } from './users/users.module';
@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule, AuthModule, UsersModule, CareerModule, ResumeModule, AiModule, ChatModule, RoadmapModule] })
export class AppModule {}
