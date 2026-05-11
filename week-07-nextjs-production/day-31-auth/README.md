# Day 31 — Authentication with Auth.js (NextAuth v5)

**Reading:** [Auth.js — Get Started with Next.js](https://authjs.dev/getting-started/installation?framework=next.js).

The standard for auth in Next.js. Supports OAuth, magic links, credentials.

## Reference

```ts
// auth.ts
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
});

// app/api/auth/[...nextauth]/route.ts
export { GET, POST } from '@/auth';

// In a Server Component
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  if (!session) return <p>Please sign in</p>;
  return <p>Hello, {session.user?.name}</p>;
}
```

## Exercise

Add GitHub OAuth to your Week 6 blog. Protect the `/admin` route. Show the signed-in user's avatar in the header.

## Setup

```bash
cd blog  # or wherever your Week 6 capstone lives
pnpm add next-auth@beta
# Then create auth.ts, app/api/auth/[...nextauth]/route.ts
# Set AUTH_SECRET, AUTH_GITHUB_ID, AUTH_GITHUB_SECRET in .env.local
```
