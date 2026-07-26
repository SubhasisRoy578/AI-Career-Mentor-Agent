import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { PromptBuilderService } from './prompt-builder.service';
import { AiProviderService } from './providers/ai-provider.service';

codex/clone-and-analyze-existing-github-repository-1j9xth
@Module({ controllers: [AiController], providers: [AiService, PromptBuilderService, AiProviderService], exports: [AiProviderService] })
=======
@Module({ controllers: [AiController], providers: [AiService, PromptBuilderService, AiProviderService] })
 main
export class AiModule {}
