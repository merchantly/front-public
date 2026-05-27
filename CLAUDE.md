# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Canonical agent rules:** see [`.agent/rules/BASE.md`](.agent/rules/BASE.md) and [AGENTS.md](AGENTS.md).

## Project Overview

MerchantlyFrontApp — React/Redux e-commerce storefront with server-side rendering (SSR) via Ruby MiniRacer (V8). Components render both in browser and on server through `react_ujs`. Props pass from server via `data-react-props` HTML attributes.

## Commands

```bash
yarn install              # Install dependencies (postinstall creates bower_components symlink)
yarn build                # Full build: clean + production + development
yarn build:production     # Production webpack build
yarn build:development    # Development webpack build
yarn test                 # All tests: browser + prerender + mini_racer
yarn test:prerender       # SSR tests only (mocha + babel/register)
yarn test:browser         # Browser tests (mocha-chrome, requires Chrome)
yarn test:mini_racer      # Ruby V8 tests (requires Ruby + mini_racer gem)
yarn storybook            # Component dev server on port 9001
yarn profile              # Bundle analyzer (generates stats.json)
```

CI runs `yarn build` then `yarn test:prerender` on Node 22.

## Architecture

### Dual Rendering Model

The app has two rendering paths sharing the same React components:

- **Browser** (`store_app.js`): Loads libs, bundle, `react_ujs`. jQuery initializes page behaviors. Redux store at `global.redux`.
- **SSR** (`store_app_prerender.js`): Registers every renderable component on `global.*` for MiniRacer. Stubs `setTimeout`/`setInterval`. Aliases `reqwest` to noop. Separate Redux store via `prerender_redux.js`.

Components must work in both environments. Avoid browser-only APIs without guards.

### Webpack Entry Points

| Entry | Target | Purpose |
|-------|--------|---------|
| `widget` | web | Embeddable widget |
| `store_app` | web | Main storefront app |
| `store_app_styles` | web | Production CSS (from SCSS) |
| `libs` | web | Third-party libraries |
| `store_app_prerender` | node | SSR bundle for MiniRacer |
| `tests` | web | Test bundle |

Output: `dist/[name].[env].js`

### Redux

- Store created in `app/scripts/react/application.js`, exposed as `global.redux`
- Middleware: `redux-thunk` + custom `api` middleware (`app/scripts/react/middleware/api.js`)
- Server data bootstraps from `global.gon.__data`
- Immutable updates via `timm` library (lodash still present but being phased out)

### Global Objects

- `global.gon` — Server-injected config/data
- `global.redux` — Redux store singleton
- `global.Kiosk` — App metadata (version)
- `Bugsnag` — Error tracking (production/staging)

## Path Aliases (Babel module-resolver)

```
scripts → ./app/scripts
r       → ./app/scripts/react
rc      → ./app/scripts/react/components
test    → ./test
styles  → ./app/stylesheets
```

Bower components resolved via `node_modules/@bower_components/`.

## Key Directories

```
app/scripts/react/
├── components/     # React components (50+), each typically has Container + Page variants
├── actions/        # Redux action creators
├── reducers/       # Redux reducers
├── middleware/     # Custom Redux middleware (api)
├── helpers/        # Business logic helpers
├── services/       # Service layer
├── constants/      # Action types, storage keys
├── schemas/        # Data schemas
└── models/         # Data models

test/
├── fixtures/       # JSON fixtures (extracted from live data-react-props)
├── react/          # Component tests
└── mocks/          # Test mocks
```

## Style Conventions

- ESLint: Airbnb config, max line length 150 chars
- Trailing commas in multiline arrays/objects, no trailing commas in imports/exports/functions
- SCSS with Bootstrap 3.2 grid, PostCSS + cssnano in production
- Custom icon font: KioskPublicIcons (managed via icomoon.io)

## Tech Stack Notes

- React 16.2, Redux 3.6, react-router 5 — legacy versions, be careful with API compatibility
- jQuery 3.4 coexists with React (legacy patterns)
- CoffeeScript support still present (coffee-loader)
- Node 22 for builds (.mise.toml)
- Dart-sass (replaced node-sass)

## Collecting Test Fixtures

Extract props from live site via browser console:
```js
JSON.stringify(JSON.parse(document.querySelector('[data-react-props=<ComponentName>]').getAttribute('data-react-props')), null, 2)
```
