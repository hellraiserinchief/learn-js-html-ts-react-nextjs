# Bonus — Conventional Commits + GitHub Actions CI

**Why now:** You've been pushing weekly capstones. Time to wire the workflow you'll use professionally: typed commits, automated lint/test/build on every PR, automated changelogs, and (optionally) automated releases.

**Reading (45 min):** [Conventional Commits spec](https://www.conventionalcommits.org/), [GitHub Actions — Quickstart](https://docs.github.com/en/actions/quickstart), [Changesets docs](https://github.com/changesets/changesets).

## Conventional Commits

A commit message format that machines can parse:

```
<type>(<scope>)?: <description>

[optional body]

[optional footer]
```

**Types** (use these literally):
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — docs only
- `style:` — formatting only, no code change
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `perf:` — performance improvement
- `test:` — adding/fixing tests
- `build:`, `ci:`, `chore:` — tooling

**Breaking change**: `feat!:` or include `BREAKING CHANGE:` in the footer.

Example:
```
feat(auth): add GitHub OAuth provider

Closes #142
```

### Why bother

- **Automated CHANGELOG** generation (no more "what changed in v0.4 again?").
- **Automated semver bumps** — `feat:` → minor, `fix:` → patch, `feat!:` → major.
- Easier to scan `git log` and grep history.

### Enforce it

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional husky
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
pnpm exec husky init
echo "pnpm commitlint --edit \$1" > .husky/commit-msg
```

Now bad commit messages fail locally before they ever reach CI.

## GitHub Actions — the minimum viable CI

Create `.github/workflows/ci.yml`:

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck    # tsc --noEmit
      - run: pnpm test
      - run: pnpm build
```

This runs on every PR. A red check blocks merging (configure in repo settings → branches).

## Add Lighthouse CI for performance regressions

```yaml
      - run: pnpm dlx @lhci/cli@latest autorun
```

With a `lighthouserc.json` file that points at your preview URL. Pairs with the [Web Vitals bonus](../bonus-web-vitals/).

## Releases — Changesets (when you have shared packages)

```bash
pnpm add -D @changesets/cli
pnpm changeset init
```

Workflow:
1. Make a change in a package, run `pnpm changeset` → describes the change + bump type.
2. PR includes the changeset markdown file.
3. Merge to main → Changesets bot opens a "Version Packages" PR that bumps versions and updates CHANGELOG.
4. Merge that PR → publishes to npm (with the Changesets GitHub Action).

## Exercise

On any Week 4–7 capstone repo:

1. Init Changesets-style commit discipline. Add commitlint + husky. Make a few commits — break the format on purpose, confirm the hook rejects.
2. Add `.github/workflows/ci.yml` running lint + typecheck + test + build.
3. Open a PR with a deliberate type error — confirm CI goes red and blocks merge.
4. Add Lighthouse CI with a budget that fails if LCP > 2.5s on the home page.
5. (Optional) If the repo is a monorepo, wire Changesets for automated versioning.
