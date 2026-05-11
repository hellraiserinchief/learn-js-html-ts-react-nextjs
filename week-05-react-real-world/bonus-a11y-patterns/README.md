# Bonus — Accessibility Patterns (Beyond Semantic HTML)

**Why now:** Day 6 covered semantic HTML — the foundation. This bonus is the **practitioner layer**: the patterns you need for every dropdown, modal, autocomplete, and tab strip you'll ever build. Get this wrong and your app is unusable for ~15% of users (and the keyboard-only power users who'd otherwise love it).

**Reading (90 min):** [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/) — bookmark this; refer to it whenever you build a custom widget. Read at least: [Dialog (modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), [Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/), [Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

Plus: [WebAIM — Keyboard Accessibility](https://webaim.org/techniques/keyboard/), [MDN — Focus management](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).

## Patterns to internalize

### Focus management
- After opening a modal, **focus moves into it**. After closing, focus returns to the trigger.
- Focus must never be lost. Removing the focused element without forwarding focus is a bug.
- `tabindex="0"` makes a non-interactive element focusable. `tabindex="-1"` makes it programmatically focusable but skipped by Tab.

### Focus trap
- Inside a modal, Tab/Shift+Tab cycles only within the modal. Implement with a small helper or use the one in [`focus-trap-react`](https://github.com/focus-trap/focus-trap-react). Radix/shadcn `<Dialog>` and the native `<dialog showModal()>` give it for free.

### Roving tabindex
- For composite widgets (toolbar, listbox, tabs, menu): the **container** has one focusable item with `tabindex="0"`; the rest are `tabindex="-1"`. Arrow keys move focus *and* swap the `0` between siblings. One Tab stop for the whole widget, predictable arrow-key behavior inside.

### Live regions
- `aria-live="polite"` (default for status updates), `aria-live="assertive"` (errors only — interrupts the screen reader). Use sparingly; chatty regions are worse than none.

### Names, roles, values
- Every interactive element needs an **accessible name** — visible label, `aria-label`, or `aria-labelledby`. Test by closing your eyes and listening to your screen reader.
- Don't reinvent roles. `<button>` > `<div role="button" tabindex="0" onClick onKeyDown ...>` ten times out of ten.

## Tooling

- **axe DevTools** browser extension — catches the boring 80% (color contrast, missing labels, role mismatches). Run on every page before you ship.
- **`@axe-core/react`** — runs axe in your dev console on every render. Add it to dev builds.
- **`eslint-plugin-jsx-a11y`** — catches a11y bugs at lint time (already in `create-next-app` defaults).
- **VoiceOver** (Mac, `Cmd+F5`), **NVDA** (Windows, free). Actually use one. Five minutes of "what does my own app sound like" beats ten ARIA articles.

## Exercise

Take your Day 22 or Day 25 app and:

1. Run axe DevTools — fix everything red.
2. Add a custom dropdown menu (button + popover with options). Implement it three ways:
   - Native: `<select>`. (Boring, perfect a11y.)
   - From scratch: `<button aria-haspopup>` + custom popover. Wire roving tabindex, Esc to close, focus return.
   - With Radix `<DropdownMenu>` — read its source and notice every behavior you'd have had to write.
3. Navigate the entire app with **only the keyboard**. Anything you can't reach or operate is a bug.
4. Turn on VoiceOver and try to complete one user task. Note every place it sounds broken.

## Deliverable

A short doc in your capstone repo: "a11y review of <app name>" — what axe found, what keyboard testing found, what VO testing found, what you fixed, what you knowingly deferred.
