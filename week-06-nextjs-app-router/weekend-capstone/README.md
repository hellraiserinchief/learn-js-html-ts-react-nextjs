# Weekend 6 Capstone — Blog with Admin

Build a blog:

- **List page** — Server Component, fetched at build time
- **Individual post pages** — dynamic routes (`/posts/[slug]`)
- **Admin page** — create posts via Server Action
- **Proper loading and error states**

## Stack

- Postgres on **[Neon](https://neon.tech)** or **[Supabase](https://supabase.com)** (free tier)
- ORM: **[Drizzle](https://orm.drizzle.team/)** (TypeScript-first) or **[Prisma](https://www.prisma.io/)**

## Setup

```bash
pnpm create next-app@latest blog --typescript --app --tailwind
cd blog
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit
# Configure DATABASE_URL in .env.local from Neon/Supabase
```

## Ship it

Deploy to Vercel. Push to GitHub.
