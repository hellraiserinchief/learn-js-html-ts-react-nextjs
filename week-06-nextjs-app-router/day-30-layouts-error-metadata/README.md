# Day 30 — Layouts, Loading, Error Handling, Metadata

**Reading:** [Layouts and Pages](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts), [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling), [Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

## Reference

```tsx
// app/dashboard/layout.tsx — wraps all dashboard pages
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[200px_1fr]">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

// app/dashboard/loading.tsx — shown while page.tsx is loading
export default function Loading() { return <Spinner />; }

// app/dashboard/error.tsx — shown if page.tsx throws
'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </>
  );
}

// Metadata
export const metadata = { title: 'Dashboard', description: 'User dashboard' };
```

## Exercise

Add a `dashboard` route group to your app with its own layout, loading state, error boundary, and metadata.
