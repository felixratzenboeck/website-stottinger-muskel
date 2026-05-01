---
name: openclaw-backup-suite
description: Set up, verify, repair, and operate Leo's OpenClaw backup stack: encrypted restic backups, Google Drive via rclone, private GitHub workspace history, readable Drive overview exports, and automatic autosync. Use when Felix asks to create, fix, reorganize, or automate OpenClaw backups.
---

# OpenClaw Backup Suite

## What this skill covers
- encrypted OpenClaw backups with `restic`
- Google Drive remote via `rclone`
- private GitHub repo for workspace history
- readable Google Drive overview files so the backup is understandable at a glance
- automatic autosync of future workspace changes and backup refreshes

## Expected layout
### Local
- `~/.config/openclaw-backup/env`
- `~/.config/openclaw-backup/restic-password`
- `~/.local/state/openclaw-backup/`
- `~/.openclaw/workspace/backup/`

### Google Drive
- `OpenClaw-Backup/restic-repo/`
- `OpenClaw-Backup/overview/`
- `OpenClaw-Backup/logs/`
- `OpenClaw-Backup/restore/`
- `OpenClaw-Backup/docs/`

## Main commands
- full cloud backup: `~/.openclaw/workspace/backup/run-restic-backup.sh`
- local fallback backup: `~/.openclaw/workspace/backup/run-local-restic-backup.sh`
- autosync run: `~/.openclaw/workspace/backup/run-openclaw-autosync.sh`
- readable Drive export: `~/.openclaw/workspace/backup/export-drive-overview.sh`
- restore: `~/.openclaw/workspace/backup/restore-openclaw-backup.sh /target/path`

## Automation model
- local fallback timer stays enabled
- autosync timer stays enabled
- manual cloud backup service remains available, but the old cloud timer should stay disabled to avoid duplicate work
- autosync timer runs periodically and:
  1. commits workspace changes if present
  2. pushes to GitHub if `origin` exists
  3. runs the cloud backup
  4. refreshes readable overview files on Google Drive

## Guardrails
- never commit `.env`, tokens, keys, or `~/.config/rclone/rclone.conf`
- prefer readable overview exports instead of duplicating the whole workspace unencrypted on Drive
- for Google Drive quota problems, use Felix's own Google OAuth client instead of rclone's shared default client
- if a restic lock remains after a crashed run, inspect first, then `restic unlock`

## Verification checklist
- `gh auth status`
- `git -C ~/.openclaw/workspace remote -v`
- `source ~/.config/openclaw-backup/env && restic snapshots`
- `systemctl --user list-timers --all | grep openclaw`
- `rclone lsjson gdrive:OpenClaw-Backup --dirs-only`
