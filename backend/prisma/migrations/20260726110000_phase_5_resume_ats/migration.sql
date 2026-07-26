CREATE TABLE "Resume" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "originalName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "size" INTEGER NOT NULL,
  "storageKey" TEXT NOT NULL,
  "parsedText" TEXT NOT NULL,
  "parsedData" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "ResumeAnalysis" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "resumeId" TEXT NOT NULL,
  "result" JSONB NOT NULL,
  "score" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ResumeAnalysis_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "ResumeHistory" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "resumeId" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ResumeHistory_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "Resume_userId_createdAt_idx" ON "Resume"("userId", "createdAt");
CREATE INDEX "ResumeAnalysis_userId_createdAt_idx" ON "ResumeAnalysis"("userId", "createdAt");
CREATE INDEX "ResumeAnalysis_resumeId_createdAt_idx" ON "ResumeAnalysis"("resumeId", "createdAt");
CREATE INDEX "ResumeHistory_userId_createdAt_idx" ON "ResumeHistory"("userId", "createdAt");
CREATE INDEX "ResumeHistory_resumeId_createdAt_idx" ON "ResumeHistory"("resumeId", "createdAt");
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeAnalysis" ADD CONSTRAINT "ResumeAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeAnalysis" ADD CONSTRAINT "ResumeAnalysis_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeHistory" ADD CONSTRAINT "ResumeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeHistory" ADD CONSTRAINT "ResumeHistory_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
