# Bonus — shadcn/ui

**Why now:** You learned MUI in the sister bonus. shadcn/ui is the *opposite* philosophy: components are **copy-pasted into your codebase** as plain Tailwind + Radix code. No dependency to update, no theme escape hatches needed — you own the source. Currently the dominant component story for new React/Next.js projects.

**Reading (45 min):** [shadcn/ui — Introduction](https://ui.shadcn.com/docs), [Installation (Vite)](https://ui.shadcn.com/docs/installation/vite), [Theming](https://ui.shadcn.com/docs/theming).

## Setup (in an existing Tailwind project)

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input dialog form
```

The CLI **adds files** to your repo (e.g., `src/components/ui/button.tsx`) — it doesn't install a package. Read those files; they're short and edit-friendly.

## Mental model

- **You own the components.** Need to change a hover color? Edit `button.tsx`. No `slotProps`, no overrides API, no fighting framework opinions.
- **Built on [Radix Primitives](https://www.radix-ui.com/primitives)** — the dialog, menu, combobox, etc. logic is correct out of the box (focus traps, keyboard nav, ARIA wired).
- **Styled with Tailwind + CSS variables** — theming is just swapping `--primary` etc. in CSS.
- **Composable**: shadcn's `<Form>` integrates with React Hook Form + Zod (Day 25's stack) without glue code.

## When to choose shadcn vs MUI

| | shadcn/ui | MUI |
|--|-----------|-----|
| You control the styling | ✓ | adapter dance |
| Bundle size | only what you use | ~90KB+ core |
| Design freedom | total | constrained by Material |
| Time to first button | 5 min | 5 min |
| Time to a fully custom design system | days | weeks |
| Onboarding a new dev who knows the lib | meh — every project is different | ✓ |
| Best for | greenfield SaaS, marketing sites | enterprise apps, internal tools |

## Exercise

In your Day 17/Day 22 React app, install shadcn/ui and replace your hand-rolled `<Button>` and `<Input>` with shadcn ones. Then add a `<Dialog>` (from shadcn) wired to a button — notice how the focus trap and Escape-to-close work without you writing them.

Bonus: open `src/components/ui/button.tsx` and read it. It's ~50 lines. Compare to MUI's Button source.

## Run it

```bash
pnpm create vite@latest shadcn-playground -- --template react-ts
cd shadcn-playground
pnpm add -D tailwindcss @tailwindcss/vite
# (configure Tailwind v4 — see Week 2 Tailwind bonus)
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card dialog
pnpm dev
```
