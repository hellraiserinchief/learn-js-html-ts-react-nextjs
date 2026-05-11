# Bonus — Animation: CSS, View Transitions, Motion

**Why now:** A polished SaaS UI uses ~5 carefully-chosen animations: page transitions, modal enter/exit, list reordering, hover micro-interactions, loading shimmer. Knowing what to reach for at each scale is the difference between "feels expensive" and "feels janky."

**Reading (60 min):**
- [MDN — Using CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations) (free, fast, GPU-accelerated)
- [MDN — View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) (native page/route transitions)
- [Motion docs](https://motion.dev/) (formerly Framer Motion — the React animation library)

## The hierarchy — pick the simplest tool that works

1. **CSS `transition` / `animation`** — for hover states, simple enter/exit, infinite loops. Cheapest, no JS.
2. **View Transitions API** — for single-page-app route transitions. Native, no library. Next.js 15+ supports it.
3. **CSS `@starting-style` + `transition-behavior: allow-discrete`** — animate elements to/from `display: none` without JS. Modern browsers only.
4. **Motion (Framer Motion)** — when you need: gesture-driven (drag, swipe), layout animations (`<motion.div layout>`), scroll-linked, or orchestrated sequences across components.
5. **GSAP** — for SVG/canvas-heavy timeline animations (marketing pages, data viz). Niche; only when Motion can't.

## Pitfalls

- Animate `transform` and `opacity`. **Don't** animate `width`, `height`, `top`, `left` — they trigger layout. Use `transform: translate()`/`scale()`.
- Respect **`prefers-reduced-motion`**. Wrap animations:
  ```css
  @media (prefers-reduced-motion: no-preference) {
    .card { transition: transform 200ms ease; }
  }
  ```
- Long animations (>300ms for UI feedback) feel sluggish. Marketing-hero animations can be longer; UI feedback should be ~120–250ms.

## Setup

```bash
pnpm create vite@latest motion-playground -- --template react-ts
cd motion-playground
pnpm add motion
```

```tsx
import { motion, AnimatePresence } from 'motion/react';

function Card({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          Hello
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

## Exercise

Take your Day 22 todo list:

1. **CSS only**: animate the checked-state line-through with a 150ms transition.
2. **Motion**: wrap the list `<AnimatePresence>` so deleted items fade + slide out.
3. **Layout animation**: add `<motion.li layout>` and observe items smoothly reflowing when one is deleted from the middle.
4. Add `@media (prefers-reduced-motion: reduce)` overrides that disable everything except opacity changes.

## Bonus: View Transitions

In a Next.js app, opt in:

```ts
// next.config.ts
export default { experimental: { viewTransition: true } };
```

Then routes cross-fade automatically. Mark elements with `view-transition-name: hero` for shared-element transitions.
