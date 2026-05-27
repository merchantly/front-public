#!/usr/bin/env bash
# Sync agent source dirs (.agent/, .agent.local/) skills, commands, and MCPs
# into editor-specific tool dirs (.cursor/, .claude/, .windsurf/, .vscode/, .github/).
# Usage: bash .agent/scripts/sync-agent.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

SOURCES=("$ROOT/.agent" "$ROOT/.agent.local")

skip_skill() {
  local name="$1"
  local sf="$ROOT/.agent/config/sync-agent-skip-skills"
  [ -f "$sf" ] || return 1
  grep -v '^[[:space:]]*#' "$sf" | grep -v '^[[:space:]]*$' | grep -qxF "$name"
}

symlink() {
  local target="$1" link="$2"
  mkdir -p "$(dirname "$link")"
  ln -sfn "$target" "$link"
  echo "  ✓ $link"
}

skill_body() {
  awk '/^---/{n++; if(n==2){found=1; next}} found{print}' "$1"
}

merge_mcps() {
  local servers="{}"
  local found=0

  for src in "${SOURCES[@]}"; do
    for mcp_dir in "$src/mcp" "$src/mcps"; do
      [ -d "$mcp_dir" ] || continue
      for f in "$mcp_dir"/*.json; do
        [ -f "$f" ] || continue
        local name
        name="$(basename "$f" .json)"
        servers=$(printf '%s' "$servers" | jq --arg k "$name" --slurpfile v "$f" '.[$k] = $v[0]')
        found=1
      done
    done
  done

  [ "$found" -eq 0 ] && return

  local count
  count="$(printf '%s' "$servers" | jq 'keys | length')"

  local target="$ROOT/.cursor/mcp.json"
  mkdir -p "$(dirname "$target")"
  printf '%s\n' "$servers" | jq '{ mcpServers: . }' > "$target"
  echo "  ✓ .cursor/mcp.json ($count servers)"

  target="$ROOT/.mcp.json"
  printf '%s\n' "$servers" | jq '{ mcpServers: . }' > "$target"
  echo "  ✓ .mcp.json ($count servers)"

  target="$ROOT/.windsurf/mcp.json"
  mkdir -p "$(dirname "$target")"
  printf '%s\n' "$servers" | jq '{ mcpServers: . }' > "$target"
  echo "  ✓ .windsurf/mcp.json ($count servers)"

  target="$ROOT/.vscode/mcp.json"
  mkdir -p "$(dirname "$target")"
  printf '%s\n' "$servers" \
    | jq '{ servers: (to_entries | map(.value += {"type":"stdio"}) | from_entries) }' \
    > "$target"
  echo "  ✓ .vscode/mcp.json ($count servers)"
}

echo "Syncing .agent → tool dirs..."

echo "--- MCPs ---"
merge_mcps

for src in "${SOURCES[@]}"; do
  [ -d "$src" ] || continue
  label="${src##$ROOT/}"

  echo "--- $label/skills → .cursor, .claude ---"
  for d in "$src/skills"/*/; do
    [[ -d "$d" ]] || continue
    local_name="$(basename "$d")"
    if skip_skill "$local_name"; then
      echo "  (skip $local_name — listed in sync-agent-skip-skills)"
      continue
    fi
    symlink "$d" "$ROOT/.cursor/skills/$local_name"
    symlink "$d" "$ROOT/.claude/skills/$local_name"
  done

  echo "--- $label/commands → .cursor, .claude ---"
  for f in "$src/commands"/*.md; do
    [[ -f "$f" ]] || continue
    local_name="$(basename "$f")"
    symlink "$f" "$ROOT/.cursor/commands/$local_name"
    symlink "$f" "$ROOT/.claude/commands/$local_name"
  done

  echo "--- $label/skills → .windsurf, .github ---"
  for d in "$src/skills"/*/; do
    [[ -d "$d" ]] || continue
    local_name="$(basename "$d")"
    if skip_skill "$local_name"; then
      continue
    fi
    skill_file="$d/SKILL.md"
    [[ -f "$skill_file" ]] || continue

    mkdir -p "$ROOT/.windsurf/rules"
    out="$ROOT/.windsurf/rules/${local_name}.md"
    printf "<!-- auto-generated — edit %s/skills/%s/SKILL.md -->\n%s\n" \
      "$label" "$local_name" "$(skill_body "$skill_file")" > "$out"
    echo "  ✓ $out"

    mkdir -p "$ROOT/.github/instructions"
    out="$ROOT/.github/instructions/${local_name}.instructions.md"
    printf "<!-- auto-generated — edit %s/skills/%s/SKILL.md -->\n%s\n" \
      "$label" "$local_name" "$(skill_body "$skill_file")" > "$out"
    echo "  ✓ $out"
  done
done

echo "Done."
