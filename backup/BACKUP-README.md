# OpenClaw Backup Setup

## Architecture
- Private Git repo for workspace text/code history
- Encrypted restic backups for full OpenClaw state
- Google Drive (via rclone) as free remote backend
- Human-readable Google Drive overview export alongside the encrypted repo
- Automatic autosync timer for future changes

## Local files
- Backup env: `~/.config/openclaw-backup/env`
- Restic password file: `~/.config/openclaw-backup/restic-password`
- Backup logs: `~/.local/state/openclaw-backup/latest-backup.log`
- Autosync logs: `~/.local/state/openclaw-backup/latest-autosync.log`
- Excludes: `~/.openclaw/workspace/backup/restic-excludes.txt`
- Manual backup: `~/.openclaw/workspace/backup/run-restic-backup.sh`
- Manual autosync: `~/.openclaw/workspace/backup/run-openclaw-autosync.sh`
- Google Drive overview export: `~/.openclaw/workspace/backup/export-drive-overview.sh`
- Manual restore: `~/.openclaw/workspace/backup/restore-openclaw-backup.sh`

## What is backed up
- `~/.openclaw/` except bulky caches, build artifacts, temp files, inbound media cache
- consistent SQLite copies from:
  - `~/.openclaw/memory/main.sqlite`
  - `~/.openclaw/flows/registry.sqlite`
  - `~/.openclaw/tasks/runs.sqlite`

## Google Drive layout
- `OpenClaw-Backup/restic-repo/` → actual encrypted backup data
- `OpenClaw-Backup/overview/` → snapshot lists, manifest, stats, git overview
- `OpenClaw-Backup/logs/` → latest backup logs
- `OpenClaw-Backup/restore/` → restore guide and script copy
- `OpenClaw-Backup/docs/` → backup docs and skill notes

## Automation
- `openclaw-local-backup.timer` → local fallback repo every 6 hours
- `openclaw-restic-backup.timer` → cloud backup every 6 hours
- `openclaw-autosync.timer` → every 30 minutes, commits/pushes workspace changes and refreshes cloud backup + Drive overview

## Restore on a new machine
1. Install `restic` and `rclone`
2. Restore `~/.config/rclone/rclone.conf`, `~/.config/openclaw-backup/env`, and `~/.config/openclaw-backup/restic-password` from Bitwarden/manual notes
3. Run `~/.openclaw/workspace/backup/restore-openclaw-backup.sh /desired/restore/path`
4. Copy restored files back into `~/.openclaw/`
5. Reinstall OpenClaw if needed
6. Optionally clone the GitHub repo for workspace history
