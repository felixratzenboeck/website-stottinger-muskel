#!/usr/bin/env bash
set -euo pipefail
ENV_FILE="$HOME/.config/openclaw-backup/env"
TARGET="${1:-$HOME/openclaw-restore}"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE" >&2
  exit 2
fi
# shellcheck disable=SC1090
source "$ENV_FILE"
mkdir -p "$TARGET"
restic snapshots
restic restore latest --target "$TARGET"
echo "Restore complete: $TARGET"
