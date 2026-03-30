# Languages Learner (web-react)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Main](https://github.com/languages-learner/web-react/actions/workflows/main.yml/badge.svg)](https://github.com/languages-learner/web-react/actions/workflows/main.yml)

Monorepo for **Languages Learner** — a language-learning web application built with React, Vite, and Supabase.

| Resource    | URL                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| Live app    | [languages-learner.chernigin.tech](https://languages-learner.chernigin.tech/)                            |
| Storybook   | [Deployed Storybook](https://languages-learner-static.website.yandexcloud.net/prod/storybook/index.html) |
| Source code | [github.com/languages-learner/web-react](https://github.com/languages-learner/web-react)                 |

> **Note:** If you publish under a different GitHub owner or repository name, update links in this file, root `package.json` (`repository` / `bugs`), and badges above.

This repository is shared as a **reference implementation**: it does **not** include database migrations or a turnkey path to reproduce production data. Use the links above for the running product and UI docs.

## Tech stack

- **Runtime / UI:** React 19, React Router 7, Tailwind CSS 4, HeroUI
- **Build / SSR:** Vite 6, Express, TypeScript
- **Data:** Supabase, TanStack Query, Gravity UI DataSource
- **i18n:** react-intl, FormatJS
- **Tooling:** Nx, pnpm, ESLint, Prettier, Stylelint, Vitest, Playwright, Storybook 9

## Technical highlights

- **Custom SSR with Express + Vite** — In development, Vite runs in `middlewareMode` and the server loads the SSR bundle via `ssrLoadModule`. In production, separate client and server builds (`vite build` + `vite build --ssr`) feed a shared HTML shell; responses merge `<!--app-head-->`, `<!--app-html-->`, theme class on `<html>`, and a `window.CLIENT` payload from server `locals`.
- **Bundle size tracking in CI** — `rollup-plugin-bundle-stats` compares builds against a baseline (including Docker-based baseline workflows and helper scripts under `apps/web/scripts/bundle-stats`).
- **Dependency and graph hygiene** — Circular imports in UI code are checked with **Madge**; unused files and dependencies are tracked with **Knip** ([`knip.config.ts`](knip.config.ts)), including workspace-aware entries and asset-compiler stubs for static imports.
- **Data layer** — **Gravity UI DataSource** (`DataManagerContext`, shared `dataManager` from `@languages-learner/data-source`) works alongside **TanStack Query**; [**@normy/react-query**](https://www.npmjs.com/package/@normy/react-query) wraps the client with `QueryNormalizerProvider` for normalized cache updates.
- **UI docs and component tests** — A dedicated **Storybook 9** app hosts shared UI; **Playwright component testing** targets `@languages-learner/uikit`, with workspace orchestration for running/updating tests inside Docker (`component-tests:*` at the repo root).
- **Monorepo discipline** — **pnpm** workspaces, **Nx** (including **affected** checks in PR workflows), and **syncpack** to keep dependency versions consistent across packages.
- **Supporting tooling** — Workspace script to **sanitize HAR** files for fixtures; **Stylelint** for CSS/SCSS; PRs enforce **semantic / conventional titles** ([`check-pr-title.yml`](.github/workflows/check-pr-title.yml)).

## Repository layout

| Path                               | Purpose                                                |
| ---------------------------------- | ------------------------------------------------------ |
| [`apps/web`](apps/web)             | Main SSR web application                               |
| [`apps/storybook`](apps/storybook) | Storybook instance for UI documentation                |
| [`apps/web-e2e`](apps/web-e2e)     | End-to-end / integration test package                  |
| [`packages/*`](packages)           | Shared libraries (API client, UI kit, utilities, etc.) |

Each app and package includes its own **README** with package-specific scripts and context.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for maintainers and contributors working in this repo (workspace checks, PR conventions). That is separate from running a full production-like stack locally.

## Security

See [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE).
