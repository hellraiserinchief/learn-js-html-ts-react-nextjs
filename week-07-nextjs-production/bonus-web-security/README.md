# Bonus — Web Security for Frontend / Next.js

**Why now:** You're about to deploy a SaaS with auth, payments, and Server Actions. The threats below are the ones that actually hit production apps — not the theoretical OWASP list.

**Reading (90 min):** [OWASP Top 10](https://owasp.org/www-project-top-ten/), [MDN — CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), [MDN — CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), [Auth.js — Session strategies](https://authjs.dev/concepts/session-strategies), [Next.js — Security](https://nextjs.org/docs/app/building-your-application/authentication).

## Threats and what to do

### XSS (Cross-Site Scripting)
- **Don't use `dangerouslySetInnerHTML`** unless the input is sanitized with [DOMPurify](https://github.com/cure53/DOMPurify) or generated from your own Markdown pipeline.
- Don't `eval(userInput)`. Don't `new Function(userInput)`. Don't pass user input to `setTimeout(string)` (yes, that string form exists and runs as JS).
- React escapes by default — embracing JSX gets you 95% of the way.

### CSRF (Cross-Site Request Forgery)
- **Server Actions** — Next.js automatically validates the `Origin` header against `Host`. Don't disable that check. Don't accept POSTs from arbitrary origins in custom route handlers without a CSRF token or `SameSite` cookie.
- **Cookies**: set `SameSite: 'lax'` (default) or `'strict'`. Auth.js does this.

### SQL injection / NoSQL injection
- Use a parameterized query / ORM (Drizzle, Prisma). Never `` db.query(`SELECT * FROM users WHERE id = ${id}`) ``.
- Validate input with **Zod** at every boundary — even from your own forms.

### Auth pitfalls
- Store sessions as **`HttpOnly` cookies**, not in `localStorage`. JS can't read `HttpOnly`, so XSS can't steal them.
- Set `Secure: true` cookies in production (HTTPS only).
- JWTs in `localStorage` = bad. JWTs in `HttpOnly` cookies = fine. Better: opaque session tokens server-side; the JWT debate goes away.
- **Rate-limit** login + password-reset endpoints. Use Upstash Redis ([`@upstash/ratelimit`](https://github.com/upstash/ratelimit)) for serverless.

### Secrets
- `.env.local` for dev, **never committed**. Hosting provider env vars for prod.
- Validate env at boot with a Zod schema — catch the missing var on startup, not in production at request time:
  ```ts
  // env.ts
  import { z } from 'zod';
  export const env = z.object({
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(32),
    STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  }).parse(process.env);
  ```
- `NEXT_PUBLIC_*` vars are **shipped to the browser**. Only put non-secrets there.

### CSP (Content Security Policy)
- Add a strict CSP header to block inline scripts and limit allowed origins. Next.js doc: [Configuring CSP](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy).
- Use **nonces** for any unavoidable inline scripts.
- Test with [csp-evaluator.withgoogle.com](https://csp-evaluator.withgoogle.com/).

### CORS
- For your Next.js API routes, default to **same-origin** — no CORS headers needed. Only add `Access-Control-Allow-Origin` when you genuinely need a third party to call you, and never `*` for authenticated endpoints.

### Dependency hygiene
- `pnpm audit` regularly. GitHub Dependabot for free PR-based bumps.
- Be skeptical of new transitive deps. `pnpm why <pkg>` shows who pulled it in.

## Exercise

On your Week 6 blog:

1. Add the env Zod schema. Boot with a missing var to confirm it crashes loud and clear.
2. Add a strict CSP header in `next.config.ts`. Run [csp-evaluator](https://csp-evaluator.withgoogle.com/) — fix everything red.
3. Rate-limit the comment-create Server Action with `@upstash/ratelimit` (free Upstash account).
4. Audit cookies in DevTools → Application: confirm session cookie is `HttpOnly`, `Secure`, `SameSite=Lax`.
5. Run `pnpm audit` and clean any high/critical findings.
