# Cloud handoff — welcome page design

**Repo:** `/Users/alexander/.var/.cd/merchantly/front-public`  
**Package manager:** Yarn 4 only  
**Transcript context:** [493a321a-f475-4d3d-ac15-ed928350e824](493a321a-f475-4d3d-ac15-ed928350e824) (Yarn migration — background only)

## What already happened

- Yarn 4 is the target; do not assume Yarn 1/Bower
- `.ai/` removed; **`.agent/`** is canonical for rules/skills/plans
- Welcome-page subagents were **aborted** — no design work to inherit:
  - Welcome page 3 design iterations
  - Complete welcome page plan

## Task to continue

Improve **welcome page design only**.

| Requirement | Detail |
|-------------|--------|
| Copy | Keep all content/copy unchanged |
| Scope | Design/layout only |
| Breakpoints | Mobile, tablet, desktop |
| Tools | Browser MCP + vision, `frontend-design` skill |
| Process | Critique → 3 iterations → visual validation each time |

## Paste-ready prompt

```text
Work in /Users/alexander/.var/.cd/merchantly/front-public.
Use yarn 4.

Task: improve the welcome page design only. Keep all existing content and copy unchanged.
Fix design only, with strong responsive behavior across mobile, tablet, and desktop.

Use Browser + vision to inspect and validate each change. Follow frontend-design skill:
clear aesthetic direction, typography, spacing, hierarchy, composition, color, responsive layout.

Process:
1. Find welcome page; open in browser (Storybook: yarn storybook, port 9001, WelcomePage story).
2. Critique existing design.
3. Three iterations with browser critique after each.
4. Preserve copy exactly.
5. Final summary of changes and remaining issues.

Constraints: no git unless asked; prefer IDE tools; keep scope to design only.

Plans: .agent/plans/welcome-page-design.plan.md
Ignore aborted subagent outputs; start from current code.
```

## Agent paths

- Rules: `.agent/rules/BASE.md`
- Plans: `.agent/plans/`
- Summaries: `.agent/summaries/`
- Sync: `bash .agent/scripts/sync-agent.sh`
