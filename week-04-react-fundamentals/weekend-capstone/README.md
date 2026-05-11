# Weekend 4 Capstone — Kanban Board

Build a Trello-lite Kanban board:

- **3 columns** (Todo, Doing, Done)
- **Draggable cards** between columns ([`@dnd-kit/core`](https://docs.dndkit.com/))
- **Persisted** in `localStorage` via your `useLocalStorage` hook from Day 19
- **Properly typed** throughout
- **~400 lines**

This will surface every React pattern that matters: state shape, custom hooks, lifting state, context, controlled inputs, conditional rendering, keys.

## Setup

```bash
pnpm create vite@latest kanban -- --template react-ts
cd kanban
pnpm add @dnd-kit/core @dnd-kit/sortable
pnpm dev
```

## Ship it

Push to GitHub. Optional: deploy to Vercel.
