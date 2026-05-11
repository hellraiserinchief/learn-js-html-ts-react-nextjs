# Weekend 5 Capstone — GitHub Repo Search Dashboard

Build a real app: a GitHub repo search dashboard.

## Stack

- **TanStack Query** for the GitHub API
- **Zustand** for UI state (filters, theme)
- **React Hook Form + Zod** for the search form
- **React Router** (or TanStack Router) for `/search`, `/repo/:owner/:name`
- **Tests** for the core flow (Vitest + RTL)

## Ship it

Deploy to **Vercel** (free tier). This is portfolio-grade.

## Setup

```bash
pnpm create vite@latest gh-dashboard -- --template react-ts
cd gh-dashboard
pnpm add @tanstack/react-query zustand react-hook-form zod @hookform/resolvers react-router-dom
pnpm add -D vitest @testing-library/react @testing-library/user-event jsdom
```
