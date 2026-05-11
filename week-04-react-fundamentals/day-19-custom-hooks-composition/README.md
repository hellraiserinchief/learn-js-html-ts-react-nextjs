# Day 19 — Custom Hooks, Composition, Lifting State

**Reading:** [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks), [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components).

A custom hook is just a function whose name starts with `use` and which calls other hooks. They're how you share **stateful logic**.

## Exercise

Write a `useLocalStorage<T>` hook with this signature:

```ts
function useLocalStorage<T>(key: string, initial: T): [T, (next: T) => void]
```

It should hydrate from `localStorage` on mount and persist on every change.

Then **lift state**: when two components need the same state, move it to their closest common ancestor.

## Reference

```tsx
function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
```

## Setup

```bash
pnpm create vite@latest day-19 -- --template react-ts
```
