import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { PromptBuilderService } from './prompt-builder.service';
import { AiProviderService } from './providers/ai-provider.service';

@Module({ controllers: [AiController], providers: [AiService, PromptBuilderService, AiProviderService], exports: [AiProviderService] })
export class AiModule {}
