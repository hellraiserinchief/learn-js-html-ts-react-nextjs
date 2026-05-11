# Day 35 — Deployment, Observability, the Production Checklist

**Reading:** [Next.js — Deploying](https://nextjs.org/docs/app/building-your-application/deploying), [Vercel docs](https://vercel.com/docs).

**Deploy:** [Vercel](https://vercel.com) (one click from a GitHub repo). For non-Vercel, Next.js runs anywhere Node runs.

## Production checklist

- [ ] Environment variables in `.env.local`, **never committed**. Use `process.env.X` with a Zod schema to validate at boot.
- [ ] **Error tracking:** Sentry (free tier).
- [ ] **Analytics:** Vercel Analytics, Plausible, or PostHog.
- [ ] **Database:** connection pooling (Neon and Supabase handle this; bare Postgres needs PgBouncer).
- [ ] **Caching strategy** documented per route. Know what's static, what's dynamic, what revalidates.
- [ ] **Rate limiting** on Server Actions and API routes (Upstash Redis is the standard).
- [ ] **Bundle analysis:** `@next/bundle-analyzer`. Anything over 200KB gzipped on a page needs justification.
- [ ] **Accessibility audit:** Lighthouse score > 95 for accessibility on every page.

## Exercise

Run the full checklist on your Week 6 blog. Deploy to Vercel. Wire up Sentry. Add a Zod schema for env vars. Run Lighthouse, fix what's red.
