import { Module } from '@nestjs/common';
import { AiModule } from '../ai/ai.module';
import { CommonModule } from '../common/common.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
@Module({ imports: [CommonModule, AiModule], controllers: [ChatController], providers: [ChatService] })
export class ChatModule {}
