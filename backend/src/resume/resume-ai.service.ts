import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AiProviderService } from '../ai/providers/ai-provider.service';

@Injectable()
export class ResumeAiService {
  constructor(private readonly provider: AiProviderService) {}

  analyze(parsedData: object, resumeText: string) {
    const schema = '{"overallAtsScore":85,"resumeStrengths":["string"],"resumeWeaknesses":["string"],"missingKeywords":["string"],"technicalSkillSuggestions":["string"],"softSkillSuggestions":["string"],"formattingSuggestions":["string"],"grammarSuggestions":["string"],"experienceImprovements":["string"],"educationSuggestions":["string"],"certificationRecommendations":["string"],"projectRecommendations":["string"],"portfolioRecommendations":["string"],"recruiterReadinessSummary":"string","improvementChecklist":["string"]}';
    const prompt = `You are an expert ATS resume reviewer. Analyze this resume for applicant tracking systems and recruiter readiness. Return only valid JSON matching this schema: ${schema}. Parsed resume: ${JSON.stringify(parsedData)}. Resume text: ${resumeText.slice(0, 18000)}`;
    return this.provider.generateJson<Prisma.InputJsonObject>(prompt);
  }
}
