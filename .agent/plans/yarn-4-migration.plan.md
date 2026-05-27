---
name: Yarn 4 migration
overview: Remove Bower-style @bower_components git deps; Yarn 4 only; npm/git replacements; update imports.
status: in_progress
---

# Yarn 4 migration

## Goal

Migrate off `@bower_components/*` (Bower git syntax) to Yarn 4 with npm packages or `github:` deps. No Bower, no Yarn 1.

## Config

- `.mise.toml`: `yarn = "4"`
- `.yarnrc.yml`: `nodeLinker: node-modules`, `approvedGitRepositories: ["**"]`, `enableScripts: true`
- `package.json`: `packageManager` yarn@4.x, `engines.yarn >= 4.0.0`
- Remove: `postinstall` bower symlink, `bower` devDep, all `@bower_components/*` entries

## Bower → replacement map

| Legacy | Replacement |
|--------|----------------|
| bootstrap-sass-official | `bootstrap-sass@3.2.0` |
| jQuery.mmenu | `jquery.mmenu.4.7.5` |
| fancybox | `fancybox@2.1.7` → `dist/js/jquery.fancybox.js` |
| sticky-kit | `sticky-kit@1.1.2` → `dist/sticky-kit.js` |
| accounting.js | `accounting@0.4.1` |
| eventEmitter | `wolfy87-eventemitter@4.2.11` |
| jquery-mousewheel | `jquery-mousewheel@3.1.13` |
| OwlCarousel | Prefer `github:BrandyMint/OwlCarousel#v1.3.4` if owl v2 breaks SCSS |
| entypo-plus | `github:chancancode/entypo-plus` (not on npm) |
| font-awesome, compass-mixins | Add only if imports exist |

## Files to update

- `app/scripts/libs.js`, `app/scripts/widget.js`
- `app/stylesheets/sass/bundle.scss` (~ paths)
- `webpack/base.js`, `webpack/rules.js`, `webpack.config.babel.js`, `.storybook/webpack.config.babel.js`
- `.babelrc.js` — remove `@bower_components` from module-resolver roots

## Import path examples

```
~bootstrap-sass-official/...  →  ~bootstrap-sass/...
~jQuery.mmenu/...             →  ~jquery.mmenu.4.7.5/...
@bower_components/fancybox/source/jquery.fancybox  →  fancybox/dist/js/jquery.fancybox
@bower_components/sticky-kit/jquery.sticky-kit    →  sticky-kit/dist/sticky-kit
```

## Verify

```bash
mise install && yarn -v && yarn install && yarn storybook
```

## Remaining

- Rebuild `dist/*` after source migration (stale bundles may still reference `@bower_components`)
- Update `CLAUDE.md` path alias note if it still mentions `@bower_components`
