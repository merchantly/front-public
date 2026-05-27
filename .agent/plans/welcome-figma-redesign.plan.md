---
name: welcome figma redesign
overview: Recreate the current `kiiiosk.store` welcome page in the provided Figma file for desktop and mobile, then run three critique/refinement passes using Figma screenshots plus live-site comparison. Stop after the Figma design is solid and ask for review before any Storybook or code work.
todos:
  - id: audit-figma-file
    content: Inspect the target Figma file structure, libraries, and design-system assets before creating anything
    status: pending
  - id: capture-live-page
    content: Capture the live `kiiiosk.store` page into the target Figma file as visual reference material
    status: pending
  - id: build-editable-frames
    content: Create editable desktop and mobile welcome-page frames using reusable components, variables, and styles
    status: pending
  - id: iterate-three-passes
    content: Run 3 critique/refinement passes using Figma screenshots and live-site comparison
    status: pending
  - id: pause-for-review
    content: Stop after the Figma passes and ask for user review before any Storybook or code work
    status: pending
  - id: plan-code-followup
    content: Prepare the follow-up Storybook and welcome-page implementation plan based on the approved Figma design
    status: pending
isProject: false
---

# Welcome Page Figma Recreation And Refinement

## Goal
Rebuild the live `https://kiiiosk.store/` welcome page inside the provided Figma file (`3f7iNCo0w0uefRFOvkmCo1`) as desktop and mobile layouts, then refine it across 3 design passes with a **moderate redesign**: keep the core structure/content, but improve hierarchy, spacing, accessibility, legibility, and polish.

## Execution Constraints
- Planning stays on `GPT-5.4`.
- All Figma interactions use `Claude Sonnet 4.6`.
- Later coding/implementation work uses `Composer 2.5`.
- `Max mode` is forbidden for this task.
- Do not substitute a different model unless explicitly approved.

## Figma Execution Plan

### 1. Audit the target Figma file first
- Use `get_metadata` on the file to list pages and understand whether there is an existing landing-page area to update or whether a new page/section should be created.
- Use `get_libraries` and `search_design_system` before drawing anything to discover reusable components, variables, text styles, and effect styles already available to the file.
- Inspect existing file conventions with `use_figma` in read-only mode so the new work matches naming, layout, and token patterns already used in the file.

### 2. Capture the live welcome page as a reference
- Use `Claude Sonnet 4.6` for `generate_figma_design` against `https://kiiiosk.store/` into the existing file as a pixel reference, because the page contains real imagery and live spacing that should be preserved as reference material.
- In parallel, use `Claude Sonnet 4.6` with `use_figma` to create a proper editable screen built from imported components, variables, and styles instead of flat screenshot-only shapes.
- Keep the generated capture only as a measurement/image reference while refining; delete or archive it after the editable version is validated.

### 3. Build editable desktop and mobile screens
- Create separate desktop and mobile frames in the target file.
- Structure them section-by-section with Auto Layout, imported components, and bound variables/styles where possible.
- Prefer design-system assets for buttons, cards, text styles, colors, spacing, shadows, and radii. Only create new local tokens/components if the file truly lacks suitable primitives.
- Reuse captured imagery/image hashes from the reference capture where needed instead of leaving blank image areas.

### 4. Run 3 critique/refinement passes
For each pass:
- Compare the editable Figma frames against the live site in browser and against fresh Figma screenshots.
- Critique these areas explicitly: text overlap, contrast, body-text legibility, heading hierarchy, CTA prominence, spacing rhythm, responsive stacking, touch-target sizing, image crops, and visual balance.
- Apply focused fixes in Figma with `Claude Sonnet 4.6` via `use_figma`, then re-screenshot and validate before moving to the next pass.

Pass emphasis:
- Pass 1: structural accuracy and responsive layout safety.
- Pass 2: visual polish, stronger hierarchy, consistent spacing, token cleanup.
- Pass 3: accessibility and finish: no overlap, readable text on all key surfaces, cleaner mobile flow, better CTA clarity.

### 5. Stop for review before code
- Once the 3rd pass is complete, prepare the Figma result for review and pause.
- Ask you to review the desktop and mobile frames before proceeding to any implementation work.

## Planned Code Follow-Up After Approval
This is planned only; no code changes until the Figma review is approved.

### Storybook update plan
- Use the existing welcome story in [`/Users/alexander/.var/.cd/merchantly/front-public/stories/index.stories.js`](/Users/alexander/.var/.cd/merchantly/front-public/stories/index.stories.js) as the primary visual dev surface.
- Add welcome variants for the redesigned state if needed, likely around the fixture in [`/Users/alexander/.var/.cd/merchantly/front-public/test/fixtures/welcome/page-sample.json`](/Users/alexander/.var/.cd/merchantly/front-public/test/fixtures/welcome/page-sample.json).
- Add or use viewport coverage for desktop/tablet/mobile review so the redesigned hero and below-the-fold layout can be checked quickly.

### Welcome page code update plan
- Use `Composer 2.5` for implementation once the Figma review is approved.
- Main implementation surface: [`/Users/alexander/.var/.cd/merchantly/front-public/app/scripts/react/components/Welcome/Welcome.jsx`](/Users/alexander/.var/.cd/merchantly/front-public/app/scripts/react/components/Welcome/Welcome.jsx)
- Main styling surface: [`/Users/alexander/.var/.cd/merchantly/front-public/app/stylesheets/sass/partials/lead-text.sass`](/Users/alexander/.var/.cd/merchantly/front-public/app/stylesheets/sass/partials/lead-text.sass)
- Supporting layout/slider adjustments if required: [`/Users/alexander/.var/.cd/merchantly/front-public/app/stylesheets/sass/partials/b-page.sass`](/Users/alexander/.var/.cd/merchantly/front-public/app/stylesheets/sass/partials/b-page.sass), [`/Users/alexander/.var/.cd/merchantly/front-public/app/stylesheets/sass/partials/b-slider.sass`](/Users/alexander/.var/.cd/merchantly/front-public/app/stylesheets/sass/partials/b-slider.sass)
- Keep the SSR/browser constraints in mind: the welcome page must still render acceptably before JS and must not depend on browser-only layout behavior.
- Only touch [`/Users/alexander/.var/.cd/merchantly/front-public/test/fixtures/welcome/page-sample.json`](/Users/alexander/.var/.cd/merchantly/front-public/test/fixtures/welcome/page-sample.json) if the new hero structure truly requires updated wrapper classes/HTML; avoid unnecessary copy/content churn.
- Decide during implementation whether [`/Users/alexander/.var/.cd/merchantly/front-public/app/scripts/react/components/WelcomeChildren/WelcomeChildren.jsx`](/Users/alexander/.var/.cd/merchantly/front-public/app/scripts/react/components/WelcomeChildren/WelcomeChildren.jsx) should remain out of scope or receive parity updates in a follow-up.

## Risks To Watch
- The live hero text is injected HTML (`preProductsText`), so code parity later may require careful mapping between Figma structure and CMS-driven markup.
- The repo has separate `Welcome` and `WelcomeChildren` page patterns; only the main welcome page is in scope for the initial design work unless a parity pass is explicitly approved.
- The editable Figma result should not rely on ad hoc values when file-level variables/styles already exist.
- The final Figma frames must be visually clean at desktop and mobile with no text collisions or unreadable overlays.