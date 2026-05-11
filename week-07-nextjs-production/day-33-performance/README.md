# Day 33 — Performance: Streaming, Suspense, Images, Fonts

**Reading:** [next/image](https://nextjs.org/docs/app/api-reference/components/image), [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts), [Streaming / PPR](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming).

## Tactics

- Wrap **slow Server Components** in `<Suspense>` to stream them in — the rest of the page renders immediately.
- Use **`next/image`** for automatic responsive images, lazy loading, AVIF/WebP.
- Use **`next/font`** for zero-layout-shift, self-hosted fonts.
- Use **`next/dynamic`** for code-splitting client components that aren't immediately visible.

## Reference

```tsx
import { Suspense } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Page() {
  return (
    <div className={inter.className}>
      <Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />
      <Suspense fallback={<Skeleton />}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

## Exercise

Take the slowest page in your Week 6 blog. Add `<Suspense>` around the slow part. Replace any `<img>` with `<Image>`. Switch to `next/font` for the body font. Run Lighthouse — note the score change.
