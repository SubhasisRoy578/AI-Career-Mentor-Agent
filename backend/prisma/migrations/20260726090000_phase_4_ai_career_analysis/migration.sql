CREATE TABLE "CareerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentEducation" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "yearOfStudy" TEXT NOT NULL,
    "currentSkills" TEXT[],
    "preferredTechnologies" TEXT[],
    "careerGoal" TEXT NOT NULL,
    "preferredIndustry" TEXT NOT NULL,
    "experienceLevel" "ExperienceLevel" NOT NULL,
    "certifications" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "projects" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CareerProfile_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "CareerAnalysis" ("id" TEXT NOT NULL,"userId" TEXT NOT NULL,"profileId" TEXT NOT NULL,"summary" TEXT NOT NULL,"result" JSONB NOT NULL,"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,CONSTRAINT "CareerAnalysis_pkey" PRIMARY KEY ("id"));
CREATE TABLE "SkillGapAnalysis" ("id" TEXT NOT NULL,"userId" TEXT NOT NULL,"profileId" TEXT NOT NULL,"targetCareer" TEXT NOT NULL,"result" JSONB NOT NULL,"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,CONSTRAINT "SkillGapAnalysis_pkey" PRIMARY KEY ("id"));
CREATE TABLE "LearningRoadmap" ("id" TEXT NOT NULL,"userId" TEXT NOT NULL,"profileId" TEXT NOT NULL,"targetCareer" TEXT NOT NULL,"duration" TEXT NOT NULL,"result" JSONB NOT NULL,"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,CONSTRAINT "LearningRoadmap_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "CareerProfile_userId_key" ON "CareerProfile"("userId");
CREATE INDEX "CareerAnalysis_userId_createdAt_idx" ON "CareerAnalysis"("userId", "createdAt");
CREATE INDEX "SkillGapAnalysis_userId_createdAt_idx" ON "SkillGapAnalysis"("userId", "createdAt");
CREATE INDEX "LearningRoadmap_userId_createdAt_idx" ON "LearningRoadmap"("userId", "createdAt");
ALTER TABLE "CareerProfile" ADD CONSTRAINT "CareerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CareerAnalysis" ADD CONSTRAINT "CareerAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CareerAnalysis" ADD CONSTRAINT "CareerAnalysis_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CareerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SkillGapAnalysis" ADD CONSTRAINT "SkillGapAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SkillGapAnalysis" ADD CONSTRAINT "SkillGapAnalysis_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CareerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LearningRoadmap" ADD CONSTRAINT "LearningRoadmap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LearningRoadmap" ADD CONSTRAINT "LearningRoadmap_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CareerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
