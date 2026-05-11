# Day 26 — Why Next.js, App Router Basics

**Reading:** [Next.js Learn — Dashboard App](https://nextjs.org/learn/dashboard-app) (start here, work through it), [Next.js docs — Getting Started](https://nextjs.org/docs/app).

## Setup

```bash
pnpm create next-app@latest day-26 --typescript --app --tailwind
cd day-26 && pnpm dev
```

## Key concepts

- **App Router is the current standard.** Pages Router is legacy — ignore old tutorials.
- File-based routing: a folder under `app/` is a route. `app/dashboard/page.tsx` serves `/dashboard`.
- Special files: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`.
- By default, components are **Server Components**. They run on the server, can be `async`, and can talk directly to databases.

## Reference

```tsx
// app/page.tsx — Server Component (default)
async function HomePage() {
  const posts = await fetch('https://api.example.com/posts').then((r) => r.json());
  return (
    <ul>
      {posts.map((p: Post) => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}
export default HomePage;
```

## Exercise

Spin up a new Next app and create three routes: `/`, `/about`, `/posts/[id]`. Fetch posts from JSONPlaceholder in a Server Component.
