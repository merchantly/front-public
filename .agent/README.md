# Agent Rules

Rules and skills for AI agents working in MerchantlyFrontApp.

## Files

- **rules/BASE.md** — behaviour rules (markdown)
- **skills/** — reusable agent skills (`<name>/SKILL.md`)
- **plans/** — task plans and spikes (persistent)
- **summaries/** — session handoffs and migration notes
- **scripts/sync-agent.sh** — sync skills/commands to `.cursor/`, `.claude/`, etc.

## Commands

See `package.json` and `CLAUDE.md` for build/test/storybook commands.

## Philosophy

Keep it simple. Most information is in the codebase:

- Commands: `package.json`
- Stack/architecture: `CLAUDE.md`
- Structure: folder layout

Only document what is unique and not discoverable elsewhere.
