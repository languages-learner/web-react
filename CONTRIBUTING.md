# Contributing

Thank you for your interest in improving Languages Learner.

## Prerequisites

- Node.js 20 (see [`.nvmrc`](.nvmrc))
- pnpm 10.6.2 — enable Corepack (`corepack enable`) so the version from the root `package.json` is used

## Setup for development in this repo

```bash
pnpm install
```

The public tree does **not** ship database migrations or a guaranteed-local backend. Use your own Supabase project (or mocks) when your change requires API access.

## Checks before a pull request

From the repository root:

```bash
pnpm lint
pnpm typecheck
pnpm test:unit
```

Run package-level scripts (lint, typecheck, tests) when your change touches a specific app or package — see each folder’s `README.md` and `package.json` `scripts`.

## Pull requests

- **Pull request titles** are validated with [semantic / conventional format](https://github.com/amannn/action-semantic-pull-request) (see [`.github/workflows/check-pr-title.yml`](.github/workflows/check-pr-title.yml)). Use a title such as `feat: …`, `fix: …`, or `chore: …`.
- Keep changes focused and match existing code style and tooling (ESLint, Prettier, Stylelint).

## Questions

Open a [GitHub issue](https://github.com/languages-learner/web-react/issues) for bugs or feature discussions. Update the issue link if the repository is under a different owner or name.
