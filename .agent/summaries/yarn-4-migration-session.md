# Yarn 4 migration — session summary

## Timeline (transcript 493a321a)

1. **mise install** failed on Yarn 1 download (transient network) — fixed with retry / timeout
2. User ran install again; Yarn 4 auto-migrated project; `yarn install` failed on `@bower_components` git deps ("Manifest not found")
3. Brief revert to Yarn 1 proposed — user: **"no need for bower, stick to yarn 4"**
4. Investigation: map 11 Bower deps → npm/git replacements; update `libs.js`, `widget.js`, `bundle.scss`, webpack, `.babelrc.js`
5. User: **"use yarn only"** (no npm pack inspection)
6. Background subagent spawned for full migration — **aborted** before completion reported to user
7. Later session (0d57a314): subagent `7de54312` partially applied `.yarnrc.yml`, removed storybook/webpack bower paths, deleted `.bowerrc`

## Current repo signals (check before continuing)

- `.mise.toml`: `yarn = "4"`
- `.yarnrc.yml` present
- `package.json`: no `@bower_components` entries (verify `yarn install` succeeds)
- Source under `app/`: should use new package paths
- `dist/*.js`: may still embed old `@bower_components` requires until `yarn build`

## Replacement cheat sheet

See `.agent/plans/yarn-4-migration.plan.md` for full mapping.

## Verification

```bash
eval "$(mise activate zsh)"
mise install
yarn -v    # 4.x
yarn install
yarn storybook
yarn build # refresh dist if needed
```
