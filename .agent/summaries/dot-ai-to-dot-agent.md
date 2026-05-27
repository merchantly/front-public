# .ai → .agent migration

**Date:** 2026-05-27

## What moved

| From | To |
|------|-----|
| `.ai/skills/frontend-design/LICENSE.txt` | `.agent/skills/frontend-design/LICENSE.txt` |
| (empty `.ai/` dirs) | removed |

`.agent/` already held: `README.md`, `rules/BASE.md`, `scripts/sync-agent.sh`, `skills/*`.

## Post-migration layout

```
.agent/
├── README.md
├── config/
├── rules/BASE.md
├── scripts/sync-agent.sh
├── skills/
├── plans/       ← session plans (this migration)
└── summaries/   ← handoffs and session notes
```

## Sync

```bash
bash .agent/scripts/sync-agent.sh
```

Updates symlinks: `.cursor/skills/`, `.claude/skills/`, `.windsurf/rules/`, `.github/instructions/`.

## User action

Update Cursor **user rules** if they still reference `.ai/README.md` or `.ai/rules/BASE.md` → use `.agent/` paths instead.

## Scratch (unchanged)

`.agent.local/` — gitignored; ephemeral diffs, logs, spikes (not copied here).
