# app-web

Main **Languages Learner** web application — React, Vite, SSR, and Supabase.

## Links

- [Live app](https://languages-learner.chernigin.tech/)
- [Storybook (deployed UI docs)](https://languages-learner-static.website.yandexcloud.net/prod/storybook/index.htm)

## Scripts

Run from the monorepo root with `pnpm --filter app-web <script>`, or from this directory after `pnpm install` at the root.

| Script | Description |
| ------ | ----------- |
| `dev` | Development server (Express + Vite) |
| `preview` | Production-like server |
| `build` | Client + SSR production build |
| `build:client` / `build:server` | Individual build steps |
| `lint` / `lint:fix` | ESLint |
| `stylelint` / `stylelint:fix` | Stylelint for CSS/SCSS |
| `typecheck` | TypeScript project references |
| `i18n:extract` | Extract FormatJS messages |
| `i18n:manage` | Translation management helper |
| `circular-deps` | Detect circular imports in UI code |
| `knip` | Unused exports / dependencies (Knip) |

Docker and bundle-stats scripts are also defined in [`package.json`](package.json).

Variable names for a real backend may appear in the root [`.env.example`](../../.env.example); the repository does not include database migrations or a self-contained local stack.
