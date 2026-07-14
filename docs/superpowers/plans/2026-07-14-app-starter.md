# App Starter Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax.

**Goal:** Scaffold a free-first Next.js full-kit starter and deploy it to Vercel.

**Architecture:** App Router + Auth.js + Drizzle/Neon + shadcn, env-gated so marketing runs without secrets.

**Tech Stack:** Next.js, TypeScript, Tailwind, shadcn/ui, Auth.js v5, Drizzle, Neon, Vercel

---

### Task 1: Scaffold Next.js + Tailwind

**Files:** project root via `create-next-app`

- [ ] Create Next.js app (TS, App Router, Tailwind, ESLint, `src/` optional — use no src for simplicity)
- [ ] Verify `npm run build` succeeds

### Task 2: Add shadcn/ui + marketing/dashboard shells

**Files:**
- Create: `components/ui/*`, `app/page.tsx`, `app/dashboard/page.tsx`, `components/site-header.tsx`

- [ ] Init shadcn with defaults
- [ ] Landing page + protected dashboard placeholder

### Task 3: Auth.js + middleware

**Files:**
- Create: `auth.ts`, `app/api/auth/[...nextauth]/route.ts`, `middleware.ts`, `app/signin/page.tsx`
- Modify: dashboard layout/page for session

- [ ] Configure Auth.js with Google provider (env-gated)
- [ ] Protect `/dashboard` and `/api/me`

### Task 4: Drizzle + Neon stub

**Files:**
- Create: `lib/db/index.ts`, `lib/db/schema.ts`, `drizzle.config.ts`

- [ ] Schema stub + client that no-ops/errors clearly without `DATABASE_URL`

### Task 5: API routes + env + README

**Files:**
- Create: `app/api/health/route.ts`, `app/api/me/route.ts`, `.env.example`, `README.md`

- [ ] Health reports auth/db configured flags
- [ ] Document local + Vercel setup and troubleshooting

### Task 6: Deploy to Vercel

- [ ] `vercel` link/deploy (Hobby)
- [ ] Return production URL
