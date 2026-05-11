# Day 29 — Mutations with Server Actions

**Reading:** [Next.js — Updating Data with Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).

Server Actions are functions that run on the server but are called from the client. They **replace most API routes**.

## Reference

```ts
// app/actions.ts
'use server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  await db.post.create({ data: { title } });
  revalidatePath('/posts');
}

// app/posts/new/page.tsx
import { createPost } from '@/app/actions';

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button>Create</button>
    </form>
  );
}
```

## Exercise

Add a "create post" form to your Week 6 app using a Server Action. No API route, no `useEffect`. The form posts directly to the action.
