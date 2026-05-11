# Bonus — DOM APIs (the parts React hides from you)

**Why now:** The curriculum jumps from HTML/CSS straight into React, which abstracts the DOM behind a virtual tree. You should still know the underlying APIs — for debugging React in DevTools, for the rare third-party widget, for vanilla mini-projects, and for understanding *why* React works the way it does.

**Reading (45 min):** [MDN — Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), [MDN — Event reference](https://developer.mozilla.org/en-US/docs/Web/Events).

## What to know cold

- **Querying:** `document.querySelector` / `querySelectorAll` (returns NodeList, not array — spread or `Array.from` to map).
- **Events:** `addEventListener(type, handler, options)`. `event.target` vs `event.currentTarget`. `preventDefault()`, `stopPropagation()`.
- **Event delegation:** one listener on a parent that handles events from many children. Faster than N listeners.
- **Mutating:** `element.classList.add/remove/toggle`, `dataset.foo` for `data-foo` attrs, `textContent` (safe) vs `innerHTML` (XSS-risky).
- **Forms:** `new FormData(formEl)` then `Object.fromEntries(formData)`.
- **Fetch in the browser:** same `fetch` API as Node 18+, returns `Response` — call `.json()` / `.text()` / `.formData()`.
- **Observers** — the modern way to react to layout/visibility:
  - `IntersectionObserver` — "is this element in the viewport?" (lazy loading, infinite scroll)
  - `ResizeObserver` — "did this element change size?" (container-query polyfills, responsive canvases)
  - `MutationObserver` — "did the DOM change?" (last resort)

## Exercise

Build the same little todo app **twice** in `index.html` — once with `innerHTML` rebuilds (simple, slow on big lists) and once with surgical DOM updates + event delegation (verbose, fast). Time them with `performance.now()` for 10,000 items. The gap is exactly the gap React closes for you.

## Run it

```bash
pnpm dlx serve .
```
