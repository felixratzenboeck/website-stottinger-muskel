#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/leo/.openclaw/workspace/skills/agent-browser-dashboard/scripts"
LOG_DIR="/home/leo/.openclaw/workspace/tmp/agent-browser"
PROXY_PORT="${AGENT_BROWSER_TAILNET_PORT:-4849}"
mkdir -p "$LOG_DIR"

if ! command -v agent-browser >/dev/null 2>&1; then
  npm install -g agent-browser
fi

agent-browser dashboard install >/dev/null 2>&1 || true
agent-browser install >/dev/null 2>&1 || true
agent-browser dashboard start >/dev/null 2>&1 || true

if [[ -f "$LOG_DIR/tailnet-proxy.pid" ]] && kill -0 "$(cat "$LOG_DIR/tailnet-proxy.pid")" 2>/dev/null; then
  echo "tailnet proxy already running on 127.0.0.1:${PROXY_PORT}"
else
  nohup node "$ROOT/agent-browser-tailnet-proxy.mjs" >"$LOG_DIR/tailnet-proxy.log" 2>&1 &
  echo $! >"$LOG_DIR/tailnet-proxy.pid"
  sleep 1
  echo "started tailnet proxy on 127.0.0.1:${PROXY_PORT}"
fi

echo "Dashboard local:  http://127.0.0.1:4848"
echo "Tailnet proxy:    http://127.0.0.1:${PROXY_PORT}"
