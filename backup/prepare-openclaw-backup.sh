#!/usr/bin/env bash
set -euo pipefail

STAGE_DIR="${1:-$HOME/.local/state/openclaw-backup/staging}"
mkdir -p "$STAGE_DIR/sqlite" "$STAGE_DIR/meta"
rm -f "$STAGE_DIR/sqlite"/*.sqlite

backup_sqlite() {
  local src="$1"
  local dest="$2"
  if [[ -f "$src" ]]; then
    sqlite3 "$src" ".timeout 2000" ".backup '$dest'"
  fi
}

backup_sqlite "$HOME/.openclaw/memory/main.sqlite" "$STAGE_DIR/sqlite/main.sqlite"
backup_sqlite "$HOME/.openclaw/flows/registry.sqlite" "$STAGE_DIR/sqlite/registry.sqlite"
backup_sqlite "$HOME/.openclaw/tasks/runs.sqlite" "$STAGE_DIR/sqlite/runs.sqlite"

cat > "$STAGE_DIR/meta/manifest.txt" <<MANIFEST
created_at=$(date --iso-8601=seconds)
host=$(hostname)
workspace_size=$(du -sh "$HOME/.openclaw/workspace" | awk '{print $1}')
openclaw_size=$(du -sh "$HOME/.openclaw" | awk '{print $1}')
MANIFEST
