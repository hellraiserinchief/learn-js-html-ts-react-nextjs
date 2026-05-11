# Day 28 — Data Fetching, Caching, Revalidation

**Reading:** [Next.js — Fetching Data](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching), [Caching](https://nextjs.org/docs/app/building-your-application/caching).

Next.js extends `fetch` with caching options.

## Reference

```ts
// Cached indefinitely (default)
const data = await fetch('https://api.example.com/data');

// Revalidate every 60 seconds
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 },
});

// Never cache
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store',
});

// Tag-based revalidation (revalidate on demand)
const data = await fetch('https://api.example.com/posts', {
  next: { tags: ['posts'] },
});
// Later, from a Server Action: revalidateTag('posts');
```

## Exercise

In your Week 6 app, add three pages with three different caching strategies. Hit `/posts` (cached 60s), `/posts/live` (`no-store`), and `/posts/static` (default cache). Watch the network tab.
