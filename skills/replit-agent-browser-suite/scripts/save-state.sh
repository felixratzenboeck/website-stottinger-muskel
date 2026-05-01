#!/usr/bin/env bash
set -euo pipefail
STATE_PATH="${1:-/home/leo/.openclaw/workspace/browser-state/replit-github.json}"
mkdir -p "$(dirname "$STATE_PATH")"
agent-browser state save "$STATE_PATH"
echo "Saved state to: $STATE_PATH"
