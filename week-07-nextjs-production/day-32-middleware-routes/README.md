# Day 32 — Middleware, Route Handlers, Edge Runtime

**Reading:** [Next.js — Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware), [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers).

## Reference

```ts
// middleware.ts — runs before every matching request
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: Request) {
  const session = await auth();
  if (!session && request.url.includes('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*'] };

// app/api/posts/route.ts — REST endpoint
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await db.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const post = await db.post.create({ data: body });
  return NextResponse.json(post, { status: 201 });
}
```

## Exercise

Add middleware that redirects unauthenticated users away from `/admin` to `/login`. Also expose a public REST `/api/posts` route handler.
