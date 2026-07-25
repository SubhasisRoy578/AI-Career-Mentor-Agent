import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);
  app.use(helmet());
  app.enableCors({ origin: config.get<string>('CORS_ORIGIN'), credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
 codex/set-up-project-structure-for-ai-career-mentor-agent-7da4ey
  const document = SwaggerModule.createDocument(app, new DocumentBuilder().setTitle('AI Career Mentor Agent API').setDescription('AI Career Mentor Agent API with authentication and user profile management.').setVersion('0.1.0').addBearerAuth().build());
=======
  const document = SwaggerModule.createDocument(app, new DocumentBuilder().setTitle('AI Career Mentor Agent API').setDescription('Phase 1 API foundation. Endpoints will be added later.').setVersion('0.1.0').addBearerAuth().build());
 main
  SwaggerModule.setup('docs', app, document);
  await app.listen(config.get<number>('PORT', 4000));
}
void bootstrap();
