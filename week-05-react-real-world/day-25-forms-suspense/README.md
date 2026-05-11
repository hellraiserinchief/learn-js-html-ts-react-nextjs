# Day 25 — Forms, Validation, Error Boundaries, Suspense

**Reading:** [React Hook Form — Get Started](https://react-hook-form.com/get-started), [Zod docs](https://zod.dev/), React's [Suspense](https://react.dev/reference/react/Suspense).

For real forms: **React Hook Form + Zod** for validation.

## Reference

```tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      <input type="password" {...register('password')} />
      <button>Sign in</button>
    </form>
  );
}
```

**Error boundaries** catch render errors. **Suspense** suspends rendering for async data (paired with libraries that support it).

## Exercise

Build a login form with email + password, full Zod validation, and an error boundary wrapping it.

## Setup

```bash
pnpm create vite@latest day-25 -- --template react-ts
cd day-25 && pnpm add react-hook-form zod @hookform/resolvers
```
