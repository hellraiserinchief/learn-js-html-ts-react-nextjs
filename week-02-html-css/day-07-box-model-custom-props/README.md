# Day 7 — The Box Model, Selectors, Custom Properties

**Reading (60 min):** [web.dev Learn CSS](https://web.dev/learn/css) — modules 1–6 (Box model, Selectors, The cascade, Specificity, Inheritance, Color).

## Key concepts

- `box-sizing: border-box` on everything. Add it once globally.
- Specificity: inline > ID > class/attr/pseudo-class > element. `:where()` has zero specificity — use it to keep things low.
- New selectors: `:has()` (parent selector!), `:is()`, `:where()`.
- Custom properties (`--color-primary`) are runtime-evaluated and inheritable. They are the foundation of theming.

## Exercise

Build a button component with **4 variants** (primary, secondary, ghost, danger) using only custom properties. Add a dark mode toggle that swaps a single `data-theme` attribute on `<html>`.

## Run it

Open `index.html` in your browser. Toggle the theme button.
