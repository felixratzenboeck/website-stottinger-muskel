#!/usr/bin/env bash
set -euo pipefail
LOG_DIR="$HOME/.local/state/openclaw-backup"
mkdir -p "$LOG_DIR"
exec 9>"$LOG_DIR/autosync.lock"
if ! flock -n 9; then
  echo "autosync already running"
  exit 0
fi
{
  echo "== autosync started $(date --iso-8601=seconds) =="
  if git -C "$HOME/.openclaw/workspace" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    if [[ -n "$(git -C "$HOME/.openclaw/workspace" status --porcelain)" ]]; then
      git -C "$HOME/.openclaw/workspace" add -A
      if ! git -C "$HOME/.openclaw/workspace" diff --cached --quiet; then
        git -C "$HOME/.openclaw/workspace" commit -m "autosync: $(date '+%Y-%m-%d %H:%M')"
      fi
      if git -C "$HOME/.openclaw/workspace" remote get-url origin >/dev/null 2>&1; then
        git -C "$HOME/.openclaw/workspace" push origin main
      fi
    else
      echo "workspace git tree clean"
    fi
  fi
  "$HOME/.openclaw/workspace/backup/run-restic-backup.sh"
  echo "== autosync finished $(date --iso-8601=seconds) =="
} > "$LOG_DIR/latest-autosync.log" 2>&1
