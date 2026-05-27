---
name: Mirror agent setup
overview: Mirror reusable agent/setup structure from ld-dev-local into this repo, add frontend-design skill, fix welcome page in Storybook, verify desktop/mobile in browser.
todos:
  - id: mirror-agent-baseline
    content: Add AGENTS.md and .agent/ baseline (rules, scripts, skills) adapted for single-app repo.
    status: completed
  - id: add-frontend-design-skill
    content: Add frontend-design skill + LICENSE.txt under .agent/skills/; run sync-agent.sh.
    status: completed
  - id: prepare-local-preview
    content: After mise install, yarn install (Yarn 4), start Storybook; use WelcomePage story as dev surface.
    status: pending
  - id: fix-welcome-layout
    content: Update Welcome.jsx and Sass partials to match target hero on desktop/tablet/mobile without changing stack.
    status: pending
  - id: browser-verify
    content: Browser-check Storybook welcome page at desktop/tablet/mobile; fix responsive regressions.
    status: pending
source: ~/.cursor/plans/mirror_agent_setup_16cdc98b.plan.md
---

# Mirror agent setup and fix welcome page

## Goal

Bring this repo to a practical agent-file baseline (like ld-dev-local, minus monorepo-specific MCP/hooks), then fix the storefront welcome page using React 16 + Sass and verify in Storybook/browser.

## Agent setup (done / in `.agent/`)

- `AGENTS.md` — repo entrypoint
- `.agent/README.md`, `.agent/rules/BASE.md`
- `.agent/scripts/sync-agent.sh` + `.agent/config/sync-agent-skip-skills.example`
- `.agent/skills/agent-file-placement/`, `.agent/skills/frontend-design/`
- `.cursorignore`, `.claudeignore`, `.agentsignore` (if present)
- `CLAUDE.md` points at `.agent/rules/BASE.md`

Skipped (not this repo): Shopify commands, monorepo routing, CocoIndex/Mongo MCP.

## Welcome page surface

- `app/scripts/react/components/Welcome/Welcome.jsx`
- `app/scripts/react/components/Welcome/WelcomePage.jsx`
- `app/stylesheets/sass/partials/b-slider.sass`
- `app/stylesheets/sass/partials/lead-text.sass`
- `app/stylesheets/sass/partials/b-page.sass`
- `stories/index.stories.js` — WelcomePage story
- `test/fixtures/welcome/page-sample.json`

Hero is slider + CMS HTML (`preProductsText` / `lead-text`). Stay inside existing composition; no new CSS framework.

## Dev loop

1. `mise install` → `yarn install` (Yarn 4)
2. `yarn storybook` (port 9001)
3. Fix markup/Sass desktop first, then `palm`/`lap` breakpoints
4. Adjust welcome fixture if needed
5. Browser MCP: desktop / tablet / mobile
6. IDE lint on edited files only

## Expected welcome changes

- Minimal markup changes in `Welcome.jsx`
- Keep `ImageSlider` and page containers
- Sass in existing partials only
- Preserve SSR and product list below hero
- Reuse Storybook fixture, no separate preview app
