import { Injectable } from '@nestjs/common';
@Injectable()
export class PromptBuilderService {
  careerAnalysis(profile: object) {
    return this.build('career analysis', profile, '{"careerSummary":"string","strengths":["string"],"weaknesses":["string"],"recommendedCareerPaths":["string"],"recommendedTechnologies":["string"],"recommendedCertifications":["string"],"suggestedProjects":["string"],"suggestedOpenSourceContributions":["string"],"internshipRecommendations":["string"],"portfolioImprovements":["string"]}');
  }

  skillGap(profile: object, targetCareer: string) {
    return this.build(`skill gap analysis for target career: ${targetCareer}`, profile, '{"targetCareer":"string","missingSkills":[{"skill":"string","priority":1,"level":"BEGINNER|INTERMEDIATE|ADVANCED","estimatedLearningTime":"string","recommendedResources":["string"]}],"summary":"string"}');
  }

  roadmap(profile: object, targetCareer: string, duration: string) {
    return this.build(`${duration} learning roadmap for target career: ${targetCareer}`, profile, '{"duration":"string","targetCareer":"string","weeks":[{"week":1,"goals":["string"],"skillsToLearn":["string"],"recommendedPractice":["string"],"miniProjects":["string"],"milestones":["string"]}]}');
  }

  private build(task: string, profile: object, schema: string) {
    return `You are an expert career mentor. Generate a personalized ${task}. Return only valid JSON matching this schema: ${schema}. Student profile: ${JSON.stringify(profile)}.`;
  }
}
