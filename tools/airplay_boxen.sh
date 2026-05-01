#!/usr/bin/env bash
set -euo pipefail
cmd="${1:-status}"
case "$cmd" in
  status)
    systemctl --no-pager --full status shairport-sync avahi-daemon | sed -n '1,120p'
    ;;
  restart|connect|verbinden)
    sudo systemctl restart avahi-daemon shairport-sync
    systemctl --no-pager --full status shairport-sync | sed -n '1,80p'
    ;;
  stop|disconnect|trennen)
    sudo systemctl stop shairport-sync
    systemctl --no-pager --full status shairport-sync | sed -n '1,80p'
    ;;
  *)
    echo "usage: $0 {status|restart|connect|verbinden|stop|disconnect|trennen}" >&2
    exit 2
    ;;
esac
