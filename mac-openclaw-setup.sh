#!/usr/bin/env bash
set -euo pipefail

if ! command -v openclaw >/dev/null 2>&1; then
  echo "OpenClaw fehlt auf diesem Mac. Bitte erst installieren." >&2
  exit 1
fi

echo "== OpenClaw Node auf dem Mac installieren =="
openclaw node install --host 100.125.38.70 --port 18789

echo
echo "== Danach in macOS freigeben =="
echo "1. System Settings -> Privacy & Security -> Accessibility -> OpenClaw erlauben"
echo "2. System Settings -> Privacy & Security -> Screen Recording -> OpenClaw erlauben"
echo "3. Optional fuer Shell-Zugriff: General -> Sharing -> Remote Login aktivieren"
echo
echo "Dann Leo sagen: 'Mac fertig'"
