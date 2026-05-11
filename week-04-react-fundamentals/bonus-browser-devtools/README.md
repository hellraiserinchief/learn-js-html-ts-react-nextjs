# Bonus — Browser DevTools Mastery

**Why now:** You've started writing real React components and effects. The instant something behaves weird, DevTools is your scalpel. Most "it just works in the browser" comes from people who have these reflexes; the absence of them is what makes debugging a slog.

**Reading (60 min):** [Chrome DevTools — Overview](https://developer.chrome.com/docs/devtools/overview), [React DevTools docs](https://react.dev/learn/react-developer-tools), [Profiler](https://react.dev/reference/react/Profiler).

## What to install

- **React Developer Tools** browser extension ([Chrome](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) / [Firefox](https://addons.mozilla.org/firefox/addon/react-devtools/)) — adds the **Components** and **Profiler** panels.
- **Redux DevTools** if you ever touch a Redux app (works with Zustand too via middleware).

## Drills (do each one with a real app open)

### Sources panel
- Set a **breakpoint** by clicking a line number. Reload, hit it, step through (`F10` over, `F11` into, `F8` continue).
- **Conditional breakpoints**: right-click the line number → "Add conditional breakpoint" → e.g., `index === 5`.
- **Logpoints**: same menu — like `console.log` you don't have to commit.
- **Pretty-print** minified bundles with the `{}` button.
- **Snippets**: write reusable scripts and run them in any tab (`Cmd+Enter`).

### Network panel
- Filter by `Fetch/XHR`, `Doc`, `JS`, `Img`. Search responses with `Ctrl/Cmd+F`.
- **Disable cache** while DevTools open — your #1 source of "it works on my machine."
- **Throttling**: simulate Slow 3G to feel what your skeleton states actually do.
- **Initiator** column shows what kicked off a request — kills the "where is this fetch coming from" mystery.
- Right-click a request → **Copy as fetch / cURL** for reproducing in tests.

### Performance panel
- Hit **Record**, do the slow thing, stop. Look for:
  - **Long tasks** (>50ms, the red corners) — main thread blocked, INP suffers.
  - **Layout shift** rectangles — CLS culprits.
  - **Bottom-up** view — which functions actually cost time.
- **Lighthouse** tab for one-shot LCP/CLS/INP/TBT scores per page.

### Application panel
- Inspect / edit `localStorage`, `sessionStorage`, `IndexedDB`, **Cookies** (incl. `HttpOnly` visible here, not in JS).
- **Service Workers** tab — unregister stale ones when "old version cached" bites.

### React DevTools — Components
- Select a component → see props, state, hooks **with their values** in the right pane.
- **"Highlight updates when components render"** (gear icon) — shows you exactly which subtrees re-render. The single fastest way to spot useless re-renders.

### React DevTools — Profiler
- Hit Record → do interaction → stop. **Flamegraph** = what rendered; **Ranked** = what was slowest. Hover for *why* it rendered ("Hooks changed", "Props changed").
- Don't memoize before you profile. Don't profile in dev mode and trust the numbers — build a production preview (`pnpm build && pnpm preview`) for real timings.

## Exercise

Take your Day 18 or Day 20 app:

1. Add a `console.log` you can't easily reach by editing source — **set a logpoint** instead.
2. Find a button that re-renders the whole app on click. Use **Highlight updates** to see the cascade. Memoize one child and re-record to confirm the cascade shrank.
3. Throttle to "Slow 3G" and see how your loading states actually look.
4. Run **Lighthouse** on the page and record the four scores.
