# Day 20 — Context, useReducer, useMemo, useCallback

**Reading:** [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context), [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer), [useMemo](https://react.dev/reference/react/useMemo), [useCallback](https://react.dev/reference/react/useCallback).

## When to use each

- **`useReducer`** > `useState` for complex state with multiple update paths.
- **`Context`** for data needed deep in the tree (theme, current user, locale). Don't use it as a global store for everything.
- **`useMemo` / `useCallback`** have costs. **Don't memoize until you measure.** React 19's compiler handles most cases automatically. Profile first.

## Exercise

Convert the Day 18 todo list from `useState` + prop-drilling to `useReducer` + `Context`.

## Setup

```bash
pnpm create vite@latest day-20 -- --template react-ts
```
