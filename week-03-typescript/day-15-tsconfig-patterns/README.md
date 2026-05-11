# Day 15 — tsconfig, Modules, and Real-World Patterns

**Reading:** [TS tsconfig reference](https://www.typescriptlang.org/tsconfig), [Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html), and Matt Pocock's [TSConfig Cheat Sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet).

## Key flags

- `"strict": true` — always. Non-negotiable.
- `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride` — common companions.
- Use `unknown` over `any`. `any` turns off the type checker; `unknown` forces you to narrow.
- Prefer `type` for unions/aliases, `interface` for object shapes that may be extended. Both work most places.
- The `satisfies` operator (TS 4.9+) — typecheck a value against a type without widening it.

## Run it

```bash
npx tsx config.ts
```
