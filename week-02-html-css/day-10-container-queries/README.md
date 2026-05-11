# Day 10 — Container Queries, Cascade Layers, Modern Tricks

**Reading (60 min):** [web.dev — Container queries](https://web.dev/articles/cq-stable), [MDN — @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), [CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting).

## Key concepts

- **Container queries** let a component respond to its *container's* size, not the viewport. Game-changer for component libraries.
- `@layer` lets you control cascade order explicitly — e.g., framework styles in one layer, your overrides in another that always wins.
- **CSS nesting** (native, no Sass needed) ships in all modern browsers.
- **Logical properties:** `margin-inline-start` instead of `margin-left` — RTL-friendly and future-proof.

## Exercise

Build a `<Card>` component that:

- Stacks vertically when its container is narrow
- Lays out horizontally (image left, text right) when its container is wide
- Uses zero media queries

## Run it

Open `index.html`. Resize the green resize-handle to see the card respond.
