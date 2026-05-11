# The Fast Track — Modern Frontend in 7 Weeks

> JavaScript · CSS · HTML → TypeScript → React → Next.js

A 7-week, 35-day curriculum for the **experienced developer** returning to (or catching up on) modern frontend. ~2 hours per day. The full source curriculum is in [`curriculum.pdf`](./curriculum.pdf); this repo is the scaffold you work in.

## Who this is for

You've been writing code for years (any stack). You can read documentation and pick up syntax fast. What you need is a structured path through the modern frontend stack — what's worth learning, in what order, and what to build to make it stick.

## The non-negotiable rule

**You build something every single day.** Reading without typing is the failure mode for experienced devs — you will recognize concepts and assume you know them. You don't, until your fingers do.

## How to use this repo

```bash
./setup.sh                                              # check Node/pnpm, print extension list
cd week-01-modern-javascript/day-01-variables-scope-modules
cat README.md                                           # reading + concepts + exercise
node app.js                                             # run the starter
# ... type the exercise
```

Each day's folder has a `README.md` (reading links, key concepts, exercise) and starter files you can run immediately. Weeks 4–7 mostly use `pnpm create vite` / `pnpm create next-app` instead of stubs — the day READMEs give you the exact command.

## The 7 weeks

| Week | Theme | Days | Capstone |
|------|-------|------|----------|
| [1](./week-01-modern-javascript/) | Modern JavaScript Core | ES2015–2024 syntax, modules, async, event loop, classes | Node CLI tool that hits a public API |
| [2](./week-02-html-css/) | HTML5 + Modern CSS | Semantic HTML, box model, Flexbox, Grid, container queries | Rebuild a real product landing page |
| [3](./week-03-typescript/) | TypeScript | Inference, narrowing, generics, utility/mapped types, tsconfig | Typed REST API client library |
| [4](./week-04-react-fundamentals/) | React Fundamentals | JSX, hooks, custom hooks, context, reducer, memo | Kanban board (Trello-lite) with dnd |
| [5](./week-05-react-real-world/) | React in the Real World | TanStack Query, Zustand, routing, testing, forms + Zod | GitHub repo search dashboard, deployed |
| [6](./week-06-nextjs-app-router/) | Next.js: App Router | Server Components, fetching, caching, Server Actions, layouts | Blog with admin (Postgres + Drizzle/Prisma) |
| [7](./week-07-nextjs-production/) | Next.js: Production | Auth, middleware, performance, SEO, deployment | Ship a SaaS-grade app end-to-end |

### Bonus tracks (optional but recommended)

Each one is self-contained — pick the ones that match the kind of work you want to do.

| Week | Bonus |
|------|-------|
| 2 | [DOM APIs](./week-02-html-css/bonus-dom-apis/) — the parts React hides from you |
| 4 | [Tailwind CSS](./week-04-react-fundamentals/bonus-tailwind/), [MUI](./week-04-react-fundamentals/bonus-mui/), [shadcn/ui](./week-04-react-fundamentals/bonus-shadcn-ui/), [Browser DevTools](./week-04-react-fundamentals/bonus-browser-devtools/) |
| 5 | [A11y patterns](./week-05-react-real-world/bonus-a11y-patterns/), [Animation](./week-05-react-real-world/bonus-animation/), [Web Workers](./week-05-react-real-world/bonus-web-workers/) |
| 6 | [i18n](./week-06-nextjs-app-router/bonus-i18n/), [PWAs / Service Workers](./week-06-nextjs-app-router/bonus-pwa-service-workers/) |
| 7 | [Web security](./week-07-nextjs-production/bonus-web-security/), [Core Web Vitals](./week-07-nextjs-production/bonus-web-vitals/), [Monorepos](./week-07-nextjs-production/bonus-monorepos/), [CI + Conventional Commits](./week-07-nextjs-production/bonus-ci-conventional-commits/) |

Each week has 5 weekday lessons + a weekend capstone you push to GitHub.

## Realistic budget

| Tier | What you buy | Cost |
|------|--------------|------|
| Zero-cost | Everything free (MDN, web.dev, official docs, react.dev, nextjs.org/learn) | **$0** |
| Recommended | + *Exploring JavaScript* paid bundle + *Effective TypeScript* | **~$80** |
| Premium | + Josh Comeau's *CSS for JS Devs* + Matt Pocock's *Total TypeScript* | **~$700+** |

The **recommended tier (~$80)** is the sweet spot. Don't fall into the paid-course trap of buying material faster than you consume it.

## Things to consciously skip

- **jQuery, Bootstrap, Webpack tutorials, Gulp, Grunt** — historical
- **Redux** — only if a job needs it; most new code doesn't
- **Class components** — you'll see them in old codebases, that's it
- **Pages Router** for Next.js — App Router is the present and future
- **CSS-in-JS** (styled-components, Emotion) — slowly being replaced by Tailwind + CSS Modules

## Mindset

You have years of intuition about programs. Don't let "I should know this" embarrass you when CSS Grid clicks on day 9 instead of day 1, or when Server Components make you re-learn what a component "is." You're not learning to program — you're learning where modern frontend chose to put the complexity.
