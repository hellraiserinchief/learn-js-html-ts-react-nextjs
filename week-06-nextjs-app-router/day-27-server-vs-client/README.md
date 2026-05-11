# Day 27 — Server vs Client Components

**Reading:** [Next.js — Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns), then [React docs — Server Components](https://react.dev/reference/rsc/server-components).

**This is the single most important concept in modern Next.js.**

## The rule

- **Server Components (default):** run on the server. No `useState`, no `useEffect`, no event handlers. Can fetch data directly. Don't ship JS to the client.
- **Client Components:** opt-in with `'use client'` at the top of the file. Can use hooks and event handlers. Ship JS to the client.

**Server by default, Client when you need interactivity.** Push `'use client'` as deep into the tree as possible.

## Reference

```tsx
// app/components/LikeButton.tsx
'use client';
import { useState } from 'react';

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>{liked ? '♥' : '♡'}</button>;
}

// app/post/[id]/page.tsx — Server Component using a Client Component
import { LikeButton } from '@/components/LikeButton';

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return (
    <article>
      <h1>{post.title}</h1>
      <LikeButton />
    </article>
  );
}
```

## Exercise

Take your Day 26 app. Add a like button to the post detail page as a **Client Component** while keeping the page itself a Server Component.
