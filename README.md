# AI Career Mentor Agent

A production-ready monorepo for an AI SaaS career platform. The application currently includes a polished SaaS frontend, secure authentication, user profile management, and a lightweight NestJS API designed for Render and PostgreSQL.

## Current Phase

Phase 4 adds the AI Career Analysis Engine on top of the Phase 3 SaaS experience. The app now supports structured career assessments, AI career reports, skill-gap analysis, learning roadmap generation, and saved report history while keeping resume ATS analysis, uploads, AI chat, mock interviews, and admin features intentionally out of scope.

## Folder Structure

```text
AI Career Mentor Agent/
├── frontend/      # Next.js App Router SaaS frontend
├── backend/       # NestJS API with auth and user profile modules
├── docs/          # Architecture and phase notes
├── scripts/       # Automation helpers
├── .gitignore
├── package.json   # npm workspace root
└── README.md
```

## Technology Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, Shadcn-style UI primitives, Framer Motion, React Hook Form, TanStack React Query, Axios
- **Backend:** NestJS, TypeScript, PostgreSQL, Prisma ORM, JWT, bcrypt, Swagger, class-validator, structured API responses
- **Deployment targets:** Netlify for the frontend and Render for the lightweight backend

## Installation

```bash
npm install
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
npm run prisma:generate -w backend
```

## Running the Frontend

```bash
npm run dev:frontend
```

The app runs on `http://localhost:3000` by default.

## Running the Backend

```bash
npm run dev:backend
```

The API runs on `http://localhost:4000` and Swagger is available at `/docs`.

## Authentication Endpoints

- `POST /auth/register` — create a user account and receive a JWT access token
- `POST /auth/login` — authenticate and receive a JWT access token
- `GET /users/me` — retrieve the logged-in user profile
- `PATCH /users/me` — update the logged-in user profile
- `POST /users/change-password` — change the logged-in user password
- `GET /ai/career-profile` and `POST /ai/career-profile` — retrieve and save the AI career assessment profile
- `POST /ai/career-analysis` — generate and save a structured AI career report
- `GET /ai/career-analysis/latest` — retrieve the most recent career report
- `POST /ai/skill-gap` — generate and save a target-role skill-gap analysis
- `POST /ai/roadmap` — generate and save a personalized learning roadmap
- `GET /ai/reports` — retrieve saved AI report history

## Phase 3 UI Highlights

- Responsive dashboard shell with desktop sidebar and mobile navigation
- Active navigation states, breadcrumbs, user dropdown, profile menu, and logout
- Profile-focused dashboard cards with meaningful empty states instead of fake analytics
- Settings tabs for profile, password, theme preference, notifications, and danger zone
- Reusable UI primitives for buttons, cards, inputs, badges, avatars, dropdowns, dialogs, tabs, alerts, toasts, spinners, skeletons, and empty states

## Phase 4 AI Highlights

- Career Assessment page for education, degree, university, study year, skills, preferred technologies, goal, industry, certifications, projects, and interests
- AI Career Report page with saved reports, regeneration, strengths, weaknesses, recommendations, projects, internships, open source, and portfolio guidance
- Skill Gap Analysis page comparing current skills with a target career and returning prioritized missing skills with levels, time estimates, and resources
- Learning Roadmap page supporting 30-day, 60-day, 90-day, and 6-month plans with weekly goals, practice, mini projects, and milestones
- Provider abstraction configured with `AI_PROVIDER`, `AI_API_KEY`, `AI_MODEL`, and optional `AI_BASE_URL` for OpenAI-compatible APIs or Gemini

## Environment Variables

Frontend variables are documented in `frontend/.env.example`. Backend variables, including `DATABASE_URL`, JWT settings, and CORS origin, are documented in `backend/.env.example`.

## Future Development Phases

1. Add password reset email delivery and refresh-token/session hardening.
2. Add resume upload and ATS analysis workflows.
3. Add AI mentor chat orchestration and interview preparation modules.
4. Add billing, observability, rate limiting, and production CI/CD.
