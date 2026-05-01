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
DRIVE_ROOT="${BACKUP_DRIVE_ROOT:-OpenClaw-Backup}"
STATE_DIR="$HOME/.local/state/openclaw-backup"
STAGE_DIR="$STATE_DIR/staging"
OUT_DIR="$STATE_DIR/drive-overview"
mkdir -p "$OUT_DIR/overview" "$OUT_DIR/logs" "$OUT_DIR/restore" "$OUT_DIR/docs"
latest_snapshot="$(restic snapshots latest --compact 2>/dev/null | awk 'NR==3 {print $1}')"
cat > "$OUT_DIR/README.txt" <<EOF
OpenClaw Backup
================

This Google Drive folder is organized as follows:
- restic-repo/   encrypted full backup repository used for actual restores
- overview/      human-readable status, snapshot list, and backup inventory
- logs/          latest backup logs
- restore/       restore guide and restore script copy
- docs/          backup docs and skill notes copied from the workspace

Latest snapshot: ${latest_snapshot:-unknown}
Generated at: $(date --iso-8601=seconds)
Host: $(hostname)
Repository: $RESTIC_REPOSITORY
EOF
cp "$HOME/.openclaw/workspace/backup/BACKUP-README.md" "$OUT_DIR/docs/BACKUP-README.md"
cp "$HOME/.openclaw/workspace/backup/restore-openclaw-backup.sh" "$OUT_DIR/restore/restore-openclaw-backup.sh"
cp "$HOME/.openclaw/workspace/skills/openclaw-backup-suite/SKILL.md" "$OUT_DIR/docs/openclaw-backup-suite.SKILL.md" 2>/dev/null || true
cp "$STAGE_DIR/meta/manifest.txt" "$OUT_DIR/overview/latest-manifest.txt" 2>/dev/null || true
cp "$STATE_DIR/latest-backup.log" "$OUT_DIR/logs/latest-backup.log" 2>/dev/null || true
restic snapshots --json > "$OUT_DIR/overview/restic-snapshots.json"
restic snapshots > "$OUT_DIR/overview/restic-snapshots.txt"
restic stats latest --mode raw-data > "$OUT_DIR/overview/restic-stats.txt" 2>&1 || true
git -C "$HOME/.openclaw/workspace" remote -v > "$OUT_DIR/overview/git-remote.txt" 2>&1 || true
git -C "$HOME/.openclaw/workspace" log --oneline -n 10 > "$OUT_DIR/overview/git-history.txt" 2>&1 || true
cat > "$OUT_DIR/overview/status.txt" <<EOF
created_at=$(date --iso-8601=seconds)
host=$(hostname)
repository=$RESTIC_REPOSITORY
drive_root=$DRIVE_ROOT
latest_snapshot=${latest_snapshot:-unknown}
workspace_head=$(git -C "$HOME/.openclaw/workspace" rev-parse --short HEAD 2>/dev/null || echo unknown)
EOF
rclone mkdir "gdrive:${DRIVE_ROOT}"
rclone mkdir "gdrive:${DRIVE_ROOT}/overview"
rclone mkdir "gdrive:${DRIVE_ROOT}/logs"
rclone mkdir "gdrive:${DRIVE_ROOT}/restore"
rclone mkdir "gdrive:${DRIVE_ROOT}/docs"
rclone copy "$OUT_DIR/README.txt" "gdrive:${DRIVE_ROOT}/"
rclone copy "$OUT_DIR/overview" "gdrive:${DRIVE_ROOT}/overview"
rclone copy "$OUT_DIR/logs" "gdrive:${DRIVE_ROOT}/logs"
rclone copy "$OUT_DIR/restore" "gdrive:${DRIVE_ROOT}/restore"
rclone copy "$OUT_DIR/docs" "gdrive:${DRIVE_ROOT}/docs"
