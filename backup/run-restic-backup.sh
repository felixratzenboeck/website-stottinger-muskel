#!/usr/bin/env bash
set -euo pipefail
ENV_FILE="$HOME/.config/openclaw-backup/env"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE" >&2
  exit 2
fi
# shellcheck disable=SC1090
source "$ENV_FILE"
: "${RESTIC_REPOSITORY:?Missing RESTIC_REPOSITORY}"
if [[ -z "${RESTIC_PASSWORD_FILE:-}" && -z "${RESTIC_PASSWORD:-}" ]]; then
  echo "Set RESTIC_PASSWORD_FILE or RESTIC_PASSWORD in $ENV_FILE" >&2
  exit 2
fi

STAGE_DIR="$HOME/.local/state/openclaw-backup/staging"
LOG_DIR="$HOME/.local/state/openclaw-backup"
mkdir -p "$LOG_DIR"
"$HOME/.openclaw/workspace/backup/prepare-openclaw-backup.sh" "$STAGE_DIR"

restic backup \
  --verbose \
  --exclude-file "$HOME/.openclaw/workspace/backup/restic-excludes.txt" \
  --tag openclaw \
  --tag "$(hostname)" \
  "$HOME/.openclaw" \
  "$STAGE_DIR/sqlite" \
  > "$LOG_DIR/latest-backup.log" 2>&1

restic forget --prune \
  --keep-last 30 \
  --keep-daily 14 \
  --keep-weekly 8 \
  --keep-monthly 6 \
  >> "$LOG_DIR/latest-backup.log" 2>&1
