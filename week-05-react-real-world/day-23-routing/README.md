# Day 23 — Routing

**Reading:** [React Router docs](https://reactrouter.com/) **or** [TanStack Router docs](https://tanstack.com/router/latest).

If you're going straight to Next.js after, routing in standalone React is mostly informational. Next.js handles routing differently (file-based).

Build **one small SPA** with React Router or TanStack Router so you understand the underlying primitives: route params, nested routes, navigation, loaders.

## Exercise

Build a 3-route app:

1. `/` — list of items
2. `/items/:id` — detail view (uses route param)
3. `/about` — static page

## Setup

```bash
pnpm create vite@latest day-23 -- --template react-ts
cd day-23 && pnpm add react-router-dom
# or: pnpm add @tanstack/react-router
```
