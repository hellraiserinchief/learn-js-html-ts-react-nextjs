# Day 17 — useState, useEffect, the Re-render Model

**Reading:** [State: A Component's Memory](https://react.dev/learn/state-a-components-memory), [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects), [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) (this one is **crucial**).

## Crucial rules

- State updates are **asynchronous** and **batched**. `setCount(count + 1)` twice in a row only adds 1. Use the functional form: `setCount(c => c + 1)`.
- `useEffect`'s dependency array: omit nothing your effect uses. Use ESLint's `react-hooks/exhaustive-deps` rule.
- Effects clean up via the return function. Subscriptions, timers, listeners — always clean up.
- Don't use effects for things that aren't side effects. Computing derived state goes inline.

## Exercise

Build a **debounced search box**. The input updates immediately, but the "search" API call only fires 300ms after the user stops typing. This forces you to use cleanup correctly.

## Setup

```bash
pnpm create vite@latest day-17 -- --template react-ts
```

Then build the search box in `src/App.tsx`. A starter component sketch:

```tsx
function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (!query) return;
    const id = setTimeout(async () => {
      // TODO: call API, setResults
    }, 300);
    return () => clearTimeout(id); // cleanup on every re-run
  }, [query]);

  return (
    <input value={query} onChange={(e) => setQuery(e.target.value)} />
  );
}
```
