# App Starter

Free-first, debuggable default stack for shipping apps on Vercel.

**Stack:** Next.js (App Router) · TypeScript · Tailwind · shadcn/ui · Auth.js · Drizzle · Neon · Vercel

## Use as template

This repo is a **GitHub template**: https://github.com/Kopher15/app-starter

```bash
# New app from template
gh repo create my-new-app --template Kopher15/app-starter --public --clone
cd my-new-app
npm install
cp .env.example .env.local
npm run dev
```

## Quick start (this repo)

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Marketing works without secrets.

## Configure (optional but needed for auth/DB)

1. **AUTH_SECRET** — `openssl rand -base64 32`
2. **Google OAuth** — create OAuth client; add redirect URI  
   `http://localhost:3000/api/auth/callback/google`  
   and your Vercel URL equivalent.
3. **DATABASE_URL** — Neon connection string.

Then:

```bash
npm run db:push   # apply schema to Neon
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run db:push` | Push Drizzle schema |
| `npm run db:studio` | Drizzle Studio |

## Useful endpoints

- `GET /api/health` — liveness + env readiness (+ DB probe if configured)
- `GET /api/me` — current user (auth required)
- `/dashboard` — protected shell
- `/signin` — Google sign-in (when env is set)

## Deploy to Vercel

```bash
npx vercel
```

Add the same env vars in the Vercel project settings. Set `AUTH_URL` to your production URL if redirects misbehave.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Sign in disabled | Set `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` |
| OAuth redirect error | Add exact callback URL in Google Cloud Console |
| `/api/health` `databaseReachable: false` | Check `DATABASE_URL` / Neon project awake |
| Middleware loop | Ensure `AUTH_SECRET` matches across deploys |
| Build fails on auth | Confirm `next-auth` is `@beta` (Auth.js v5) |

## Design docs

- Spec: `docs/superpowers/specs/2026-07-14-app-starter-design.md`
- Plan: `docs/superpowers/plans/2026-07-14-app-starter.md`
