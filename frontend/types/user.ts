export type ExperienceLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PROFESSIONAL';

export type User = {
  id: string;
  fullName: string;
  email: string;
  education?: string | null;
  university?: string | null;
  currentSkills?: string | null;
  careerGoal?: string | null;
  experienceLevel: ExperienceLevel;
  profileImage?: string | null;
  createdAt: string;
  updatedAt: string;
};
