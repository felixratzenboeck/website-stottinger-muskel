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
: "${RESTIC_REPOSITORY:?Missing RESTIC_REPOSITORY}"
if [[ -z "${RESTIC_PASSWORD_FILE:-}" && -z "${RESTIC_PASSWORD:-}" ]]; then
  echo "Set RESTIC_PASSWORD_FILE or RESTIC_PASSWORD in $ENV_FILE" >&2
  exit 2
fi
mkdir -p "$TARGET"
restic snapshots
restic restore latest --target "$TARGET"
echo "Restore complete: $TARGET"
