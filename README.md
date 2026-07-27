# AI Career Mentor Agent

Production-ready full-stack SaaS portfolio application for AI-powered career mentorship, authentication, professional dashboards, career analysis, resume ATS analysis, mentor chat, mock interviews, job tracking, goals, analytics, notifications, and report exports.

## Architecture

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS, React Query, Axios.
- **Backend:** NestJS, TypeScript, Prisma, PostgreSQL, JWT auth, Swagger, Helmet, CORS.
- **AI:** External AI provider configured by environment variables (`AI_PROVIDER`, `AI_API_KEY`, `AI_BASE_URL`, `AI_MODEL`). Responses are generated dynamically and are never hardcoded.

## Implemented Phases

1. Project foundation and architecture.
2. Authentication and user management.
3. SaaS dashboard UI/UX.
4. AI career analysis, skill gap, and roadmap generation.
5. Resume upload, parsing, ATS analysis, history, and reports.
6. AI career mentor chat, persistent conversations, interview question generation, and mock interview sessions.
7. Career productivity platform: job tracker, resources, goals, milestones, notifications, analytics, and exports.
8. Production readiness: validation, ownership checks, security middleware, Swagger, Render/Netlify preparation, and documentation.

## Folder Structure

```text
backend/          NestJS API, Prisma schema, migrations, services, DTOs, controllers
frontend/         Next.js application, dashboard pages, shared UI components, API clients
docs/             Architecture and project documentation
scripts/          Local verification helpers
```

## Installation

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
npm run prisma:generate -w backend
```

## Required Environment Variables

### Backend

- `DATABASE_URL` PostgreSQL connection string.
- `JWT_SECRET` long random signing secret.
- `JWT_EXPIRES_IN` token lifetime, for example `7d`.
- `PORT` backend port, default `4000`.
- `CORS_ORIGIN` allowed frontend origin.
- `AI_PROVIDER` `openai`, `gemini`, or OpenAI-compatible provider name.
- `AI_API_KEY` provider API key.
- `AI_BASE_URL` OpenAI-compatible base URL.
- `AI_MODEL` provider model.
- `MAX_UPLOAD_MB` resume upload limit.

### Frontend

- `NEXT_PUBLIC_API_URL` public backend URL.

## Development

```bash
npm run dev:backend
npm run dev:frontend
```

Swagger is available at `/docs`; health checks are available at `/health`.

## Production Build

```bash
npm run build
```

## Deployment Preparation

### Render Backend

- Create a PostgreSQL database and set `DATABASE_URL`.
- Set all backend environment variables listed above.
- Build command: `npm install && npm run prisma:generate -w backend && npm run build -w backend`.
- Start command: `npm run start -w backend`.
- Run migrations with `npx prisma migrate deploy --schema backend/prisma/schema.prisma`.

### Netlify Frontend

- Base directory: `frontend`.
- Build command: `npm run build`.
- Publish directory: `.next` or use the official Next.js Netlify adapter.
- Set `NEXT_PUBLIC_API_URL` to the Render backend URL.

## API Documentation

Major authenticated endpoint groups:

- `/auth` register and login.
- `/users` profile and settings.
- `/ai` career profile, analysis, skill gap, and roadmap.
- `/resumes` upload, history, ATS reports, regeneration, deletion.
- `/chat/conversations` start, continue, search, retrieve, and delete mentor conversations.
- `/interviews/questions` generate technical, HR, behavioral, resume, and career questions.
- `/interviews/sessions` save and retrieve mock interview sessions.
- `/productivity/jobs` job tracker CRUD with search/filter.
- `/productivity/resources` career resources.
- `/productivity/goals` goals and milestones.
- `/productivity/notifications` in-app notifications.
- `/analytics/dashboard` real user-data analytics.
- `/exports` JSON/PDF-ready report payload exports.

## Troubleshooting

- Run `npm run prisma:generate -w backend` after schema changes.
- Ensure `CORS_ORIGIN` exactly matches the frontend origin.
- AI features return service-unavailable errors if `AI_API_KEY` is not configured.
- Keep uploads under `MAX_UPLOAD_MB` to stay compatible with Render 512 MB instances.
