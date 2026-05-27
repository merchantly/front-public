# Agent instructions

Single-app repo: MerchantlyFrontApp (React/Redux storefront + SSR).

## Agent rules, skills, commands, plans, summaries

Use `.agent` as the source of truth for agent data.

- `.agent/rules/` — behaviour
- `.agent/skills/` — reusable skills
- `.agent/plans/` — plans (see also `welcome-page-design`, `yarn-4-migration`, `mirror-agent-setup`)
- `.agent/summaries/` — handoffs and session notes (`cloud-handoff.md` for cloud agents)

Use `.agent.local` as temporary storage for git diffs, logs, and scratch snippets.

## Syncing agent files to Cursor / Claude / etc.

After editing `.agent/` skills or commands, run:

```bash
bash .agent/scripts/sync-agent.sh
```

This syncs into editor-specific dirs: `.cursor/`, `.claude/`, `.windsurf/`, `.vscode/`, `.github/instructions/`.

Details: `.agent/README.md`, `.agent/rules/BASE.md`.
