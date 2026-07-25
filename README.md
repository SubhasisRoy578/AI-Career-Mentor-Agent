# AI Career Mentor Agent

A production-ready monorepo for an AI SaaS career platform. The application currently includes a polished SaaS frontend, secure authentication, user profile management, and a lightweight NestJS API designed for Render and PostgreSQL.

## Current Phase

Phase 3 upgrades the product experience with premium UI/UX, responsive navigation, profile-focused dashboard content, reusable interface components, settings polish, loading states, empty states, and toast notifications. AI career analysis, resume review, skill-gap analysis, AI chat, roadmaps, interview prep, and admin features remain intentionally out of scope.

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

## Phase 3 UI Highlights

- Responsive dashboard shell with desktop sidebar and mobile navigation
- Active navigation states, breadcrumbs, user dropdown, profile menu, and logout
- Profile-focused dashboard cards with meaningful empty states instead of fake analytics
- Settings tabs for profile, password, theme preference, notifications, and danger zone
- Reusable UI primitives for buttons, cards, inputs, badges, avatars, dropdowns, dialogs, tabs, alerts, toasts, spinners, skeletons, and empty states

## Environment Variables

Frontend variables are documented in `frontend/.env.example`. Backend variables, including `DATABASE_URL`, JWT settings, and CORS origin, are documented in `backend/.env.example`.

## Future Development Phases

1. Add password reset email delivery and refresh-token/session hardening.
2. Add career profile workflows and resume upload APIs.
3. Integrate AI provider adapters and chat orchestration.
4. Add billing, observability, rate limiting, and production CI/CD.
