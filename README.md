# AI Career Mentor Agent

A production-ready monorepo foundation for an AI SaaS platform that helps users manage career profile data today and will later expand into AI career mentorship, resume tooling, chat, and personalized roadmaps.

## Current Phase

Phase 2 implements real authentication and user management while intentionally excluding AI career analysis, resume review, skill-gap analysis, AI chat, roadmaps, interview prep, and admin features.

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

## Environment Variables

Frontend variables are documented in `frontend/.env.example`. Backend variables, including `DATABASE_URL`, JWT settings, and CORS origin, are documented in `backend/.env.example`.

## Future Development Phases

1. Add password reset email delivery and refresh-token/session hardening.
2. Add career profile workflows and resume upload APIs.
3. Integrate AI provider adapters and chat orchestration.
4. Add billing, observability, rate limiting, and production CI/CD.
