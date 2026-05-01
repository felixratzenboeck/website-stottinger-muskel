#!/usr/bin/env bash
set -euo pipefail
REPO_NAME="${1:-openclaw-backup}"
cd "$HOME/.openclaw/workspace"
if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not authenticated yet." >&2
  exit 2
fi
if ! git remote get-url origin >/dev/null 2>&1; then
  gh repo create "$REPO_NAME" --private --source=. --remote=origin --push
else
  git push -u origin main
fi
