# Architecture

AI Career Mentor Agent is a modular SaaS application split into a NestJS API and a Next.js dashboard.

## Backend Modules

- `auth`, `users`: JWT registration/login, profile management, password updates.
- `ai`: career profile, career analysis, skill gap analysis, learning roadmaps, provider abstraction.
- `resume`: upload validation, parsing, storage metadata, ATS analysis, reports, history.
- `chat`: AI mentor conversations, messages, search, persistence, deletion.
- `interview`: technical, HR, behavioral, resume, and career interview questions plus saved mock sessions.
- `productivity`: job tracker, resources, goals, milestones, and notifications.
- `analytics`: real user-data dashboard metrics.
- `export`: JSON/PDF-ready report payloads and export history.
- `health`: Render-compatible health check endpoint.

## Data Model

Prisma models are user-owned where appropriate and use cascade deletes for account-owned data. New production models include `Conversation`, `Message`, `InterviewSession`, `InterviewQuestion`, `InterviewFeedback`, `JobApplication`, `CareerResource`, `Goal`, `GoalMilestone`, `Notification`, `AnalyticsSnapshot`, and `ExportHistory`.

## Security

The API uses Helmet, strict DTO validation, JWT guards, ownership checks in services, upload size limits, Swagger bearer auth documentation, and CORS restricted by `CORS_ORIGIN`.

## AI Provider Strategy

`AiProviderService` supports OpenAI-compatible APIs and Gemini through environment variables. Services pass career profile, resume, ATS, roadmap, and analysis context into prompts so generated responses are personalized without hardcoded content.

## Render 512 MB Compatibility

The backend keeps uploads in memory only within a small configured size limit, avoids background workers, uses concise queries, paginates by recent records where applicable, and reuses Prisma's single process client.
