# Day 21 — Data Fetching with TanStack Query

**Reading:** [TanStack Query — Overview](https://tanstack.com/query/latest/docs/framework/react/overview), [Quick Start](https://tanstack.com/query/latest/docs/framework/react/quick-start).

`fetch` + `useEffect` is the wrong pattern for production. Use **TanStack Query** (formerly React Query) for server state. You get caching, deduplication, background refetching, optimistic updates, and pagination — for free.

## Reference

```tsx
import { useQuery } from '@tanstack/react-query';

function UserProfile({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetch(`/api/users/${id}`).then((r) => r.json()),
  });
  if (isLoading) return <Spinner />;
  if (error) return <ErrorBanner />;
  return <div>{data.name}</div>;
}
```

## Exercise

Fetch a list + detail view using TanStack Query. Add an optimistic update for one mutation.

## Setup

```bash
pnpm create vite@latest day-21 -- --template react-ts
cd day-21
pnpm add @tanstack/react-query
```
