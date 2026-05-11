# Week 7 Capstone — The Real One

Build a **SaaS-grade app end-to-end**. Ship it to production.

## Required pieces

- **Auth** (Auth.js)
- **Billing** (Stripe — test mode is fine)
- **Database** (Postgres + Drizzle/Prisma)
- **Public marketing pages** + a blog
- **A real product feature** — pick something small but real:
  - Link shortener
  - Habit tracker
  - Invoice generator
  - Whatever you want to use yourself
- **Transactional emails** (Resend)
- **Deployment** (Vercel)

## Why

This is **the artifact that gets you hired or starts your product**. Ship something real. Don't make a tutorial clone.

## Setup

```bash
pnpm create next-app@latest saas --typescript --app --tailwind
cd saas
pnpm add next-auth@beta drizzle-orm postgres stripe resend zod
pnpm add -D drizzle-kit
```
