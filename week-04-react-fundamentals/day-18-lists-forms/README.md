# Day 18 — Lists, Keys, Conditional Rendering, Forms

**Reading:** [Rendering Lists](https://react.dev/learn/rendering-lists), [Conditional Rendering](https://react.dev/learn/conditional-rendering), [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state).

## Keys

Must be **stable**, **unique among siblings**, and ideally come from data (an ID). **Never** use array index unless the list never reorders.

## Exercise

Build a `<TodoList>` with:

- An add form (controlled input)
- A toggle for "done"
- A delete button per item
- Conditional rendering: show "no todos yet" when empty

## Setup

```bash
pnpm create vite@latest day-18 -- --template react-ts
```
