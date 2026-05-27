---
name: Welcome page design (3 iterations)
overview: Improve welcome page design only — keep all copy; responsive desktop/tablet/mobile; browser vision + frontend-design skill.
status: pending
aborted_subagents:
  - Welcome page 3 design iterations
  - Complete welcome page plan
---

# Welcome page — 3 design iterations

## Constraints

- **Design only** — do not change text/copy in `test/fixtures/welcome/page-sample.json`
- **Yarn 4** for install/run
- No git commands unless asked
- No new CSS frameworks (Bootstrap 3.2 grid, existing `palm`/`lap` queries)
- Minimal diff in existing stack

## Prerequisite

```bash
yarn install && yarn storybook
```

Storybook: http://localhost:9001 — story **Welcome page** → `WelcomePage`.

## Implementation files

| File | Role |
|------|------|
| `Welcome.jsx` | Hero structure (slider + `preProductsText` overlay) |
| `lead-text.sass` | Welcome hero styles |
| `b-page.sass`, `b-slider.sass` | Layout/slider |
| `test/fixtures/welcome/page-sample.json` | KIIIOSK hero HTML (copy frozen) |

**Reference:** kiiiosk.store — left brand/title, background image, right white CTA card.

## Design direction

Refined editorial SaaS landing: confident typography, clear two-column hero, CTA card with subtle shadow, no text-over-face overlap, mobile stack: copy → CTA → image.

## Process (repeat ×3)

1. Open Storybook `WelcomePage` in Browser MCP
2. Screenshot desktop (~1280px), tablet (~768px), mobile (~375px)
3. Critique: overlap, spacing, type hierarchy, CTA, image crop, alignment
4. Apply focused Sass/JSX fixes
5. Re-screenshot; note what improved

## Deliverable

Per-iteration critique + fixes; final assessment for desktop/tablet/mobile; confirm copy unchanged.
