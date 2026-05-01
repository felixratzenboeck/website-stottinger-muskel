# OpenClaw Backup Setup

## Architecture
- Private Git repo for workspace text/code history
- Encrypted restic backups for full OpenClaw state
- Google Drive (via rclone) as free remote backend

## Local files
- Backup env: `~/.config/openclaw-backup/env`
- Backup logs: `~/.local/state/openclaw-backup/latest-backup.log`
- Excludes: `~/ .openclaw/workspace/backup/restic-excludes.txt`
- Manual backup: `~/.openclaw/workspace/backup/run-restic-backup.sh`
- Manual restore: `~/.openclaw/workspace/backup/restore-openclaw-backup.sh`

## What is backed up
- `~/.openclaw/` except bulky caches, build artifacts, temp files, inbound media cache
- consistent SQLite copies from:
  - `~/.openclaw/memory/main.sqlite`
  - `~/.openclaw/flows/registry.sqlite`
  - `~/.openclaw/tasks/runs.sqlite`

## Restore on a new machine
1. Install `restic` and `rclone`
2. Restore `~/.config/rclone/rclone.conf` and `~/.config/openclaw-backup/env` from Bitwarden/manual notes
3. Run `~/.openclaw/workspace/backup/restore-openclaw-backup.sh /desired/restore/path`
4. Copy restored files back into `~/.openclaw/`
5. Reinstall OpenClaw if needed
6. Optionally clone the GitHub repo for workspace history
