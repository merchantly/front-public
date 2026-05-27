---
name: agent-file-placement
description: Decides where to store agent files — persistent files go in .agent/, gitignored temporary files go in .agent.local/. Use when creating rules, skills, commands, guides, memories, plans, session notes, or any agent-related file in a project.
---

# Agent File Placement

Two directories, one rule: **persistent → `.agent/`, temporary → `.agent.local/`**.

## `.agent/` — Persistent agent home

| Subdirectory | What goes here |
|---|---|
| `config/` | Optional sync skip lists; examples are `*.example` |
| `rules/` | Agent behaviour rules (`BASE.md`, etc.) |
| `skills/` | Reusable agent skills (`<name>/SKILL.md`) |
| `commands/` | Agent commands (`<name>.md`) |
| `plans/` | Task plans and spikes (committed) |
| `summaries/` | Handoffs, session notes, migration write-ups |
| `scripts/` | Shell helpers (e.g. `sync-agent.sh`) |
| `mcp/` | MCP server config fragments |

## `.agent.local/` — Temporary, gitignored

| Subdirectory | What goes here |
|---|---|
| Root files | Git diffs, logs, scratch notes, WIP spikes |

## Sync

After adding to `.agent/skills/` or `.agent/commands/`:

```bash
bash .agent/scripts/sync-agent.sh
```

Propagates to `.cursor/`, `.claude/`, `.windsurf/rules/`, `.github/instructions/`, and MCP configs.
