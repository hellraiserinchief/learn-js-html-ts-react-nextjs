# Day 22 — Client State: Zustand

**Reading:** [Zustand docs](https://zustand-demo.pmnd.rs/) (15 minutes — that's all it takes).

For global UI state (theme, modals, auth user), Redux is overkill. **Zustand is ~1KB and has no boilerplate.**

## Reference

```ts
import { create } from 'zustand';

type AuthStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const useAuth = create<AuthStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

function Header() {
  const user = useAuth((s) => s.user);
  return <div>{user?.name ?? 'Guest'}</div>;
}
```

## Exercise

Convert your Day 20 todo Context+reducer to Zustand. Note how much shorter it is.

## Setup

```bash
pnpm create vite@latest day-22 -- --template react-ts
cd day-22 && pnpm add zustand
```
