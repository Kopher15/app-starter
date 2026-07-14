<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# App Starter — agent guide

## Default stack (locked)

- **Framework:** Next.js App Router + TypeScript (strict)
- **UI:** Tailwind CSS + shadcn/ui
- **Auth:** Auth.js v5 (Google OAuth) — not Clerk
- **DB:** Drizzle ORM + Neon Postgres
- **Host:** Vercel Hobby

New apps should be cloned from this template (`Kopher15/app-starter`), not scaffolded from scratch with a different stack.

## Rules of the road

1. Keep secrets in env only (`.env.local` / Vercel). Never commit keys.
2. Prefer server components; add `"use client"` only when needed.
3. Protect private routes with Auth.js middleware / `auth()`.
4. Use `getDb()` / `requireDb()` from `lib/db` — handle missing `DATABASE_URL` clearly.
5. Ask before production deploys or destructive DB changes.
6. Extend `lib/db/schema.ts` for new tables; run `npm run db:push` when ready.
7. Keep UI consistent with existing shadcn components under `components/ui`.

## Key paths

| Path | Purpose |
|------|---------|
| `auth.ts` | Auth.js config |
| `middleware.ts` | Protects `/dashboard`, `/api/me` |
| `lib/db/` | Drizzle client + schema |
| `lib/env.ts` | Config readiness helpers |
| `app/api/health` | Liveness + env/DB probe |
| `.env.example` | Required env vars |

## Commands

```bash
npm run dev
npm run build
npm run db:push
npm run db:studio
```
