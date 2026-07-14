# App Starter — Default Stack Design

**Date:** 2026-07-14  
**Status:** Approved  
**Location:** `E:\Work\App Projects\app-starter`

## Goal

A reusable, cost-free full-kit starter for vibe-coding shippable apps: debuggable, scalable, secure, modern UI, fast, robust.

## Stack (locked)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js App Router + TypeScript (strict) | Fast RSC, Vercel-native, clear error surfaces |
| Styling / UI | Tailwind CSS + shadcn/ui | Modern UX, inspectable components |
| Auth | Auth.js v5 (Google OAuth) | $0, open source, easy to troubleshoot |
| Database | Drizzle ORM + Neon Postgres (free tier) | Readable SQL, serverless, scalable |
| Hosting | Vercel Hobby | $0, preview deploys, runtime logs |
| Observability (v1) | `/api/health` + Vercel logs | Enough to debug; Sentry later optional |

## Architecture

```
app/
  (marketing)/page.tsx     # Public landing
  (auth)/signin/           # Auth.js sign-in
  dashboard/               # Protected shell
  api/health/              # Liveness + config readiness
  api/me/                  # Current session (auth required)
  api/auth/[...nextauth]/ # Auth.js handlers
components/                # UI (shadcn + layout)
lib/
  auth.ts                  # Auth.js config
  db/                      # Drizzle client + schema
middleware.ts              # Protect /dashboard
```

- Secrets only via env; app boots without paid keys (marketing works; auth/DB activate when configured).
- Middleware protects `/dashboard` and `/api/me`.
- Drizzle schema includes minimal `users` stub aligned with Auth.js tables as needed.

## Out of scope (v1)

Billing, email, file uploads, Sentry, real product features, Clerk.

## Success criteria

1. `npm run dev` works locally without Neon/Google keys.
2. With env filled, Google sign-in + DB queries work.
3. Deployed to Vercel with a public URL.
4. README documents setup and common failure fixes.

## Spec self-review

- No placeholders for stack choices — locked above.
- No contradiction with “cost free” (Auth.js + Neon free + Vercel Hobby).
- Scope is one starter repo, not multiple products.
