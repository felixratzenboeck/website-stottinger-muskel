#!/usr/bin/env bash
set -euo pipefail

STATE_PATH="${1:-/home/leo/.openclaw/workspace/browser-state/replit-github.json}"
mkdir -p "$(dirname "$STATE_PATH")"

if [ -f "$STATE_PATH" ]; then
  agent-browser state load "$STATE_PATH" || true
fi

agent-browser open https://replit.com/
agent-browser get title
agent-browser get url
agent-browser snapshot -i
