# Day 6 — Semantic HTML and Accessibility

**Reading (90 min):** [MDN HTML element reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) (skim), [MDN Accessibility "Learn" path](https://developer.mozilla.org/en-US/docs/Learn/Accessibility) (read).

## Key concepts

- Use semantic tags: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`. Screen readers and search engines depend on them.
- Forms: every `<input>` needs a `<label>`. Use the right `type` (email, tel, number, date).
- ARIA attributes only when there's no native HTML equivalent. The rule: "no ARIA is better than bad ARIA."
- Newer interactive elements: `<dialog>` (with `showModal()`), `<details>` / `<summary>`.

## Exercise

Take any landing page screenshot. Write the **pure semantic HTML** for it — no CSS yet. Test it with a screen reader (macOS VoiceOver: Cmd+F5; Windows NVDA, free). You'll be humbled.

## Run it

Open `index.html` in your browser. Try VoiceOver: Cmd+F5.
