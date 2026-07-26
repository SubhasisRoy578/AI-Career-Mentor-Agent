import { ExperienceLevel } from '@/types/user';

export type CareerProfile = { id?: string; currentEducation: string; degree: string; university: string; yearOfStudy: string; currentSkills: string[]; preferredTechnologies: string[]; careerGoal: string; preferredIndustry: string; experienceLevel: ExperienceLevel; certifications: string[]; projects: string[]; interests: string[]; createdAt?: string; updatedAt?: string };
export type CareerAnalysisResult = { careerSummary?: string; strengths?: string[]; weaknesses?: string[]; recommendedCareerPaths?: string[]; recommendedTechnologies?: string[]; recommendedCertifications?: string[]; suggestedProjects?: string[]; suggestedOpenSourceContributions?: string[]; internshipRecommendations?: string[]; portfolioImprovements?: string[] };
export type SkillGapResult = { targetCareer?: string; summary?: string; missingSkills?: { skill: string; priority: number; level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'; estimatedLearningTime: string; recommendedResources: string[] }[] };
export type RoadmapResult = { duration?: string; targetCareer?: string; weeks?: { week: number; goals: string[]; skillsToLearn: string[]; recommendedPractice: string[]; miniProjects: string[]; milestones: string[] }[] };
export type AiRecord<T> = { id: string; result: T; targetCareer?: string; duration?: string; summary?: string; createdAt: string };
export type ReportHistory = { careerAnalyses: AiRecord<CareerAnalysisResult>[]; skillGapAnalyses: AiRecord<SkillGapResult>[]; roadmaps: AiRecord<RoadmapResult>[] };
