#!/usr/bin/env bash
set -euo pipefail
STAGE_DIR="$HOME/.local/state/openclaw-backup/staging"
LOG_DIR="$HOME/.local/state/openclaw-backup"
mkdir -p "$LOG_DIR"
"$HOME/.openclaw/workspace/backup/prepare-openclaw-backup.sh" "$STAGE_DIR"
RESTIC_REPOSITORY="$HOME/.openclaw/local-backups/restic-repo" \
RESTIC_PASSWORD_FILE="$HOME/.config/openclaw-backup/restic-password" \
restic backup \
  --verbose \
  --exclude-file "$HOME/.openclaw/workspace/backup/restic-excludes.txt" \
  --tag openclaw \
  --tag local-fallback \
  "$HOME/.openclaw" \
  "$STAGE_DIR/sqlite" \
  > "$LOG_DIR/latest-local-backup.log" 2>&1
RESTIC_REPOSITORY="$HOME/.openclaw/local-backups/restic-repo" \
RESTIC_PASSWORD_FILE="$HOME/.config/openclaw-backup/restic-password" \
restic forget --prune --keep-last 30 --keep-daily 14 --keep-weekly 8 --keep-monthly 6 >> "$LOG_DIR/latest-local-backup.log" 2>&1
