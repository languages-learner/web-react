# @languages-learner/storybook

Storybook workspace for shared UI components and design documentation.

## Links

- [Deployed Storybook](https://languages-learner-static.website.yandexcloud.net/prod/storybook/index.html)
- [Live product](https://languages-learner.chernigin.tech/)

## Scripts

From the monorepo root:

```bash
pnpm --filter @languages-learner/storybook storybook
pnpm --filter @languages-learner/storybook build
pnpm --filter @languages-learner/storybook typecheck
```

- `storybook` — dev server (port 6006, `--no-open` in package script)
- `build` — static build to `dist-storybook`
- `typecheck` — TypeScript check
