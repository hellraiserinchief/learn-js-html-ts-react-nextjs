# Day 24 — Testing

**Reading:** [Vitest docs](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), [Playwright](https://playwright.dev/).

**Stack:** Vitest + React Testing Library + Playwright.

## Reference

```tsx
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

test('clicking the button increments the count', async () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /0/ });
  await userEvent.click(button);
  expect(screen.getByRole('button')).toHaveTextContent('1');
});
```

**Rule:** Test **behavior**, not implementation. Query by accessible role/text, not by class names or test IDs.

## Exercise

Write 3 tests for your Day 22 todo store (Zustand). Then 1 component test that exercises the store via the UI.

## Setup

```bash
pnpm create vite@latest day-24 -- --template react-ts
cd day-24
pnpm add -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```
