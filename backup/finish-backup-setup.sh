#!/usr/bin/env bash
set -euo pipefail
ENV_FILE="$HOME/.config/openclaw-backup/env"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE" >&2
  exit 2
fi
# shellcheck disable=SC1090
source "$ENV_FILE"
restic snapshots >/dev/null 2>&1 || restic init
systemctl --user daemon-reload
systemctl --user enable --now openclaw-restic-backup.timer
systemctl --user enable --now openclaw-local-backup.timer
systemctl --user enable --now openclaw-autosync.timer
systemctl --user start openclaw-restic-backup.service
systemctl --user --no-pager --full status openclaw-restic-backup.timer || true
systemctl --user --no-pager --full status openclaw-autosync.timer || true
