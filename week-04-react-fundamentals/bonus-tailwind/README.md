# Bonus — Tailwind CSS

**Why now:** You know modern CSS (Week 2) and you've started writing React components (Days 16–17). Tailwind's value clicks when you compose utilities inside JSX — the styles live next to the markup that uses them. By Week 6, `pnpm create next-app --tailwind` and Week 7's stack both assume you know it.

**Reading (60 min):** [Tailwind — Installation (Vite)](https://tailwindcss.com/docs/installation/using-vite), [Core concepts: Utility-first](https://tailwindcss.com/docs/utility-first), [Adding custom styles](https://tailwindcss.com/docs/adding-custom-styles), [Responsive design](https://tailwindcss.com/docs/responsive-design).

## Setup

```bash
pnpm create vite@latest tw-playground -- --template react-ts
cd tw-playground
pnpm add -D tailwindcss @tailwindcss/vite
```

Tailwind v4 (current) ships a Vite plugin — no `tailwind.config.js` needed for basics; configure in CSS:

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --color-primary: #635bff;
  --font-display: "Inter", system-ui;
}
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ plugins: [react(), tailwindcss()] });
```

## Mental model

- A class like `p-4` *is* `padding: 1rem` — open DevTools and verify. Tailwind isn't magic; it's CSS with a vocabulary.
- **Mobile-first**: `md:flex` means "flex from `md` breakpoint up." Stack first, expand at breakpoints.
- **State variants**: `hover:`, `focus:`, `disabled:`, `dark:`, `[&>p]:` (arbitrary descendant), `group-hover:` (parent state cascade).
- **`@theme` block** defines design tokens — Tailwind generates the utilities (`bg-primary`, `font-display`).
- **Don't fight class soup.** Three options when a class list grows long:
  1. Extract a React component (best — colocates markup + style)
  2. Use `@apply` in a `.css` file for true reuse (`.btn-primary { @apply bg-primary text-white px-4 py-2 rounded; }`)
  3. Use `clsx` / `cva` for conditional class composition

## When to use Tailwind vs alternatives

- **Tailwind**: greenfield, design-system-from-scratch, small team, fast iteration. Pairs perfectly with shadcn/ui (copy-paste components made of Tailwind classes).
- **CSS Modules**: when you want regular CSS files but locally scoped (Next.js supports them out of the box).
- **MUI / Mantine**: when "looks like Material" or "batteries included" beats design control.
- **Plain CSS + custom properties** (Week 2): for design systems with strong theming or marketing pages.

## Exercise

Rebuild your **Week 2 weekend capstone landing page** in Tailwind — but this time wrap each section in a small React component. Same HTML structure, replace every CSS rule with utilities. Compare the two implementations side by side:

- Lines saved
- Time to add a new variant (e.g., dark mode toggle)
- Cognitive load when reading a component for the first time

You'll find: Tailwind wins for iteration speed, plain CSS wins for theming + reading at a glance. Both are correct; pick per project.

## Run it

```bash
pnpm dev
```

A starter `App.tsx` is included with a hero, a feature grid, and a card — all Tailwind. Drop into `src/App.tsx`.
