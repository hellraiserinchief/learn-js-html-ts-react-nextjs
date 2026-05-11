# Bonus — Core Web Vitals & Performance Budgets

**Why now:** Day 33 covered Next-specific tactics (Suspense, `next/image`, `next/font`). This bonus is the **measurement and methodology layer**: what to optimize for, how to measure it, and how to keep it from regressing.

**Reading (60 min):** [web.dev — Core Web Vitals](https://web.dev/articles/vitals), [LCP](https://web.dev/articles/lcp), [INP](https://web.dev/articles/inp), [CLS](https://web.dev/articles/cls), [Performance budgets 101](https://web.dev/articles/performance-budgets-101).

## The metrics to actually care about

| Metric | What it measures | Good | Poor |
|--------|------------------|------|------|
| **LCP** (Largest Contentful Paint) | When the biggest above-fold thing renders | <2.5s | >4s |
| **INP** (Interaction to Next Paint) | Responsiveness to user input (replaced FID in 2024) | <200ms | >500ms |
| **CLS** (Cumulative Layout Shift) | Visual stability — things jumping around | <0.1 | >0.25 |
| **TTFB** (Time to First Byte) | Server response time | <800ms | >1.8s |

These are what Google ranks on, and what real users feel.

## How to measure

### Lab (synthetic)
- **Lighthouse** in DevTools — single-page snapshot. Always run with the device emulation throttled (the default).
- **PageSpeed Insights** — Lighthouse + real-world field data from Chrome users.
- **WebPageTest.org** — multi-location, multi-device, frame-by-frame filmstrips. Indispensable for marketing pages.

### Field (real users — RUM)
- **Vercel Analytics / Speed Insights** — built-in, real users, Core Web Vitals out of the box.
- **PostHog**, **Sentry**, or **Plausible** — alternatives if you're not on Vercel.
- The `web-vitals` npm package — collect metrics yourself and ship to anywhere:
  ```ts
  import { onLCP, onINP, onCLS } from 'web-vitals';
  onLCP(({ value }) => fetch('/api/metric', { method: 'POST', body: JSON.stringify({ lcp: value }) }));
  ```

**Lab ≠ field.** Your laptop on fiber says LCP is 600ms. Your user on a 3-year-old Android in a basement reports 4.8s. Always weight field data over lab.

## Budgets

A budget is a number you commit to and fail builds when you exceed:

```js
// lighthouse-budget.json
[{
  "resourceSizes": [
    { "resourceType": "script",    "budget": 200 },
    { "resourceType": "image",     "budget": 400 },
    { "resourceType": "total",     "budget": 1000 }
  ],
  "timings": [
    { "metric": "interactive", "budget": 3500 }
  ]
}]
```

Wire into CI: [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci). PR fails if the budget is busted.

## The big LCP wins (in order)

1. **Self-host fonts** with `next/font` (no external font CSS request blocking render).
2. **`<Image priority />`** on the hero image — Next.js will preload it.
3. **Move LCP element render off any client-side data fetch.** Server Components ship the markup directly.
4. **Cache HTML** at the edge (`export const revalidate = 3600`).
5. **Eliminate render-blocking JS** — Lighthouse will name names.

## The big INP wins

1. **Break long tasks** with `await new Promise(r => setTimeout(r))` between chunks. Or use [`scheduler.yield()`](https://developer.mozilla.org/en-US/docs/Web/API/Scheduler/yield) (modern browsers).
2. **Move CPU work to a [Web Worker](../../week-05-react-real-world/bonus-web-workers/)**.
3. **Defer non-critical hydration** with `next/dynamic({ ssr: false })`.
4. **Audit your event handlers** for accidental `O(n²)` work on big lists.

## Exercise

On your Week 6 blog (or any deployed app):

1. Run **Lighthouse** on the home page and a post page. Record all four scores.
2. Run **PageSpeed Insights** on the same URLs — note differences between lab and field data.
3. Apply one fix from the LCP and one from the INP list above. Re-run and confirm a measurable delta.
4. Add `@next/bundle-analyzer` to `next.config.ts`, run `ANALYZE=true pnpm build`, and identify the largest dep. Decide: keep, replace, or lazy-load.
5. Add a `lighthouse-budget.json` and wire Lighthouse CI to fail PRs that regress past it.
