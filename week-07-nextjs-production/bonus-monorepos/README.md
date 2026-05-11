# Bonus — Monorepos (pnpm workspaces + Turborepo)

**Why now:** The moment your SaaS has a marketing site, an admin panel, and a customer dashboard sharing components — you have three repos that drift, or one monorepo. Most modern startups pick the latter.

**Reading (60 min):** [pnpm — Workspaces](https://pnpm.io/workspaces), [Turborepo handbook](https://turborepo.com/docs).

## When to reach for a monorepo

✓ Two+ apps that share UI / types / business logic (e.g. web + admin + landing).
✓ A library you want to develop alongside its first consumer.
✓ A team that wants atomic cross-cutting changes (one PR updates the API contract + frontend + backend).

✗ A solo project with one app. (Premature.)
✗ Apps that genuinely share nothing. (Just two repos.)

## pnpm workspaces — the foundation

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

Layout:
```
my-monorepo/
├── apps/
│   ├── web/             # Next.js
│   └── admin/           # Next.js or Vite
├── packages/
│   ├── ui/              # shared React components
│   ├── eslint-config/   # shared lint rules
│   ├── tsconfig/        # shared tsconfig.base.json
│   └── types/           # shared TS types
├── pnpm-workspace.yaml
└── package.json
```

In `apps/web/package.json`:
```json
{ "dependencies": { "@my-org/ui": "workspace:*" } }
```

`pnpm install` symlinks `packages/ui` into `apps/web/node_modules/@my-org/ui`. Edit a button in `packages/ui` and Vite/Next picks it up instantly — no publishing.

## Turborepo — the build orchestrator

Turbo runs scripts across packages, **caches outputs**, and skips work when nothing changed. The killer feature: remote caching means CI is dramatically faster.

```bash
pnpm add -D -w turbo
```

```json
// turbo.json
{
  "tasks": {
    "build":   { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
    "lint":    {},
    "test":    { "dependsOn": ["^build"] },
    "dev":     { "cache": false, "persistent": true }
  }
}
```

```bash
pnpm turbo build         # builds every package, in dependency order, in parallel where possible
pnpm turbo build --filter=web  # only the web app and its deps
pnpm turbo dev           # starts every dev server at once
```

## Pitfalls

- **Versioning shared packages**: pick one strategy. Either everything is `0.0.0` and lives in the monorepo (no publishing), or use [Changesets](https://github.com/changesets/changesets) for proper semver if you'll publish to npm.
- **`peerDependencies`** matter — a `packages/ui` that imports React shouldn't list it as a regular dep, only as a peer.
- **TypeScript project references** can speed up type-checking but add config complexity. Skip until type-check time hurts.
- **Don't share runtime state across apps.** Auth tokens, DB connections, etc. — apps must own those independently.

## Exercise

Take your Week 4 capstone (Kanban) and Week 5 capstone (GitHub dashboard). Migrate them into one monorepo:

1. `apps/kanban/` and `apps/dashboard/`.
2. Extract shared `<Button>`, `<Input>`, theme tokens into `packages/ui`.
3. Add Turbo. Confirm `pnpm turbo build` runs both apps and caches the second time.
4. Touch a file in `packages/ui` and re-run — only the affected app rebuilds.

## Skip if

You're shipping one Next.js app and one app only. Premature monorepoing is a real failure mode — you pay the structural cost without the cross-package benefits.
