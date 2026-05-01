#!/usr/bin/env bash
set -euo pipefail

if ! command -v agent-browser >/dev/null 2>&1; then
  npm install -g agent-browser
fi

agent-browser dashboard install || true
agent-browser install --with-deps
agent-browser install
agent-browser dashboard start

echo "Dashboard: http://127.0.0.1:4848"
