# Bonus — MUI (Material UI)

**Why now:** You've learned components and props (Day 16). MUI is the highest-volume React component library in enterprise codebases — even if you prefer Tailwind + shadcn for greenfield, you'll see MUI in every other job. Knowing the patterns (`ThemeProvider`, `sx`, `styled()`) makes you employable; knowing the tradeoffs makes you dangerous.

**Reading (60 min):** [MUI — Installation](https://mui.com/material-ui/getting-started/installation/), [The `sx` prop](https://mui.com/system/getting-started/the-sx-prop/), [Theming](https://mui.com/material-ui/customization/theming/), [Next.js integration](https://mui.com/material-ui/integrations/nextjs/) (Server Component pitfalls).

## Setup

```bash
pnpm create vite@latest mui-playground -- --template react-ts
cd mui-playground
pnpm add @mui/material @emotion/react @emotion/styled
pnpm add @mui/icons-material           # optional, big icon set
pnpm dev
```

For **Next.js App Router**, you must use the official adapter — otherwise SSR styling breaks:

```bash
pnpm add @mui/material-nextjs @emotion/cache
```

Then wrap the root layout's children in `<AppRouterCacheProvider>`. Most MUI components are Client Components — push `'use client'` as deep as possible.

## Key concepts

- **`ThemeProvider` + `createTheme`** — single source of truth for tokens (palette, typography, spacing). Don't hardcode colors anywhere.
- **`sx` prop** — one-off styles inline, with full theme access (`sx={{ p: 2, color: 'primary.main' }}`). Reaches for tokens, not hex.
- **`styled()`** — when a component needs more than ~3 `sx` rules, extract it. Like `styled-components` but theme-aware.
- **`<Box>`, `<Stack>`, `<Grid>`** — layout primitives. `<Stack direction="row" spacing={2}>` is your flex 90% of the time.
- **`<TextField>` works with React Hook Form** via the `register` spread or `<Controller>` for full control.
- **Slot props** (e.g. `slotProps.input`) — the v5+ way to override sub-component props without ejecting.
- **Server Components:** MUI components import Emotion (a client-side library), so any file using them needs `'use client'`. Keep MUI confined to leaf components; let the rest of the tree stay server-rendered.

## When to choose MUI vs alternatives

| You want | Pick |
|----------|------|
| Material Design out of the box, big team, accessibility done for you | **MUI** |
| Full design control, tiny bundle, Tailwind-native | **shadcn/ui** (copy-paste) |
| Headless logic + your own styles | **Radix UI** / **Headless UI** / **Ark UI** |
| Lightweight, batteries-included, not Material | **Mantine** |

MUI's tradeoff: ~90KB gzipped for the core, opinionated visual language. If you're shipping a SaaS where the design must look custom, you'll fight the theme. If you're shipping internal tools or anything where "looks like Google products" is fine or desired, you'll move twice as fast.

## Exercise

Rebuild your Day 18 todo list with MUI:

- `<AppBar>` with title + theme toggle
- `<Container maxWidth="sm">` for the body
- `<TextField>` + `<Button>` form
- `<List>` / `<ListItem>` with `<Checkbox>` + `<IconButton>` (delete)
- A custom `<ThemeProvider>` with primary color overridden
- Dark mode toggle that swaps `theme.palette.mode` between `'light'` and `'dark'`

Then compare bundle size to a Tailwind-only version of the same UI (`pnpm build` + check the network tab). The gap is the cost of MUI; the savings is the time you didn't spend designing buttons.

## Run it

A starter `App.tsx` is included. Copy it into a fresh Vite app's `src/`.
