# Bonus — Redux Toolkit (RTK) + RTK Query

**Why now (and the honest framing):** The curriculum skips Redux because for *new* code, [TanStack Query](../../week-05-react-real-world/day-21-tanstack-query/) owns server state and [Zustand](../../week-05-react-real-world/day-22-zustand/) covers global UI state with ~1KB and no boilerplate. But Redux is still everywhere in enterprise React — banks, fintech, big SaaS, anything older than ~2021 — and "I can land in an RTK codebase and be productive day one" is a real hiring signal. **This bonus is for working on existing codebases**, not greenfield.

**Reading (90 min):** [Redux Toolkit — Quick Start](https://redux-toolkit.js.org/tutorials/quick-start), [RTK Tutorials Overview](https://redux.js.org/tutorials/essentials/part-1-overview-concepts), [RTK Query — Overview](https://redux-toolkit.js.org/rtk-query/overview).

## Modern Redux ≠ old Redux

If you last touched Redux before 2020 and remember `mapStateToProps`, `connect()`, and writing action constants by hand — forget all of it. **Redux Toolkit (RTK) is the only Redux you should write today.**

What changed:
- **`createSlice`** generates actions + reducers from one definition. No `ACTION_TYPE` constants, no switch statements.
- **Immer baked in** — write "mutating" code in reducers; Immer produces immutable updates under the hood.
- **`useSelector` / `useDispatch`** hooks — no more HOCs.
- **RTK Query** is built into RTK and replaces ~all the data-fetching middleware (sagas, observables, thunks) for the common case.

## The minimum viable RTK app

```bash
pnpm add @reduxjs/toolkit react-redux
```

```ts
// src/store/todosSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Todo = { id: string; text: string; done: boolean };

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    add: (state, { payload }: PayloadAction<string>) => {
      state.push({ id: crypto.randomUUID(), text: payload, done: false }); // looks mutating, isn't
    },
    toggle: (state, { payload: id }: PayloadAction<string>) => {
      const t = state.find((t) => t.id === id);
      if (t) t.done = !t.done;
    },
    remove: (state, { payload: id }: PayloadAction<string>) =>
      state.filter((t) => t.id !== id),
  },
});

export const { add, toggle, remove } = todosSlice.actions;
export default todosSlice.reducer;
```

```ts
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import todos from './todosSlice';

export const store = configureStore({ reducer: { todos } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

```tsx
// src/main.tsx
import { Provider } from 'react-redux';
import { store } from './store';
// <Provider store={store}><App /></Provider>

// src/components/TodoList.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { add, toggle, remove } from '@/store/todosSlice';

export function TodoList() {
  const todos = useSelector((s: RootState) => s.todos);
  const dispatch = useDispatch<AppDispatch>();
  // ...
}
```

For TS ergonomics, define typed hooks once and import them everywhere instead of typing `RootState` at every call:

```ts
// src/store/hooks.ts
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## RTK Query — the part that actually competes with TanStack Query

```ts
// src/store/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    addPost: build.mutation<Post, { title: string }>({
      query: (body) => ({ url: 'posts', method: 'POST', body }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = api;
```

```tsx
function Posts() {
  const { data, isLoading, error } = useGetPostsQuery();
  // ... same shape you'd get from TanStack Query
}
```

You get caching, deduplication, refetching, optimistic updates — same feature set as TanStack Query, with the trade-off that it's coupled to the Redux store (which is fine if you already have one).

## Tradeoffs vs the curriculum default (TanStack Query + Zustand)

| | RTK + RTK Query | TQ + Zustand |
|--|------------------|---------------|
| Boilerplate | More — slices, store config, typed hooks | Less |
| Bundle size | ~13KB RTK + ~5KB react-redux + RTK Query | ~13KB TQ + ~1KB Zustand |
| Server + client state in one model | ✓ | Two libraries, two stores |
| Time-travel debugging | ✓ (Redux DevTools) | ✓ (Zustand has Redux DevTools middleware too) |
| "I'll see this in my next job" | likely yes if enterprise | likely no in startups |
| Greenfield rec by Vercel / Next docs | no | yes (TQ) |
| Best for | Large team, complex middleware, normalized entities at scale | Most apps |

## When Redux genuinely wins

- **Large teams** (20+ devs) — the boilerplate is a feature; conventions reduce coordination cost.
- **Normalized entity stores** at real scale — RTK's `createEntityAdapter` is excellent.
- **Complex middleware needs** — undo/redo with patches, optimistic queues, custom transports — though many of these have Zustand middleware now too.
- **Time-travel debugging is critical** to your workflow (it's good in both, but Redux DevTools have ~10 years of polish).

## What to skip even within Redux

- Old Redux (no Toolkit). Don't write a reducer with a `switch` and `ACTION_TYPE` constants in 2026.
- `connect()` HOCs — `useSelector` / `useDispatch` hooks only.
- `redux-saga`, `redux-observable` — only if a job already uses them.
- `reselect` standalone — RTK includes it (`createSelector` from `@reduxjs/toolkit`).

## Exercise

Take your Day 22 Zustand todo store. Implement it in RTK three times:

1. **Plain RTK** with `createSlice` (the snippet above).
2. **With `createEntityAdapter`** — `addOne`, `updateOne`, `removeOne`, `selectAll` for free; this is what RTK is *really* good at.
3. **With RTK Query** for a server-backed version — point at a tiny mock API (or [JSONPlaceholder](https://jsonplaceholder.typicode.com)).

Compare:
- LOC vs the Zustand version
- DX in DevTools (open Redux DevTools — step through actions, time-travel, see state diffs)
- Time to add a new mutation (e.g. "mark all done")

You'll come away knowing when Redux is the right call, and when it isn't — which is exactly the question every job interview will ask.
