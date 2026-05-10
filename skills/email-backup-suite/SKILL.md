---
name: email-backup-suite
description: Set up, verify, operate, and extend Leo's local email backup stack for Gmail and GMX using mbsync, Himalaya, and notmuch. Use when Felix asks about email backup automation, local mail storage, storage usage, cleanup policy, search/retrieval, or ongoing maintenance.
---

# Email Backup Suite

## What this skill covers
- Gmail + GMX local mail backup with `mbsync`
- local mail storage as Maildir under `~/.local/share/mail/backup/`
- optional mail reading/sending with `himalaya`
- fast local search/index with `notmuch`
- automation via user-level systemd timer or cron
- storage checks and safe maintenance
- extending this workflow when new mail tasks appear

## Current reality check
Before claiming the stack is live, verify:
- `command -v mbsync`
- `command -v himalaya`
- `command -v notmuch`
- `ls -l ~/.mbsyncrc ~/.config/himalaya/config.toml ~/.notmuch-config`
- `systemctl --user list-timers --all | grep -Ei 'mail|mbsync|notmuch'`
- `du -sh ~/.local/share/mail`
- `df -h ~`

If those are missing, the stack is not live yet; only the plan/config may exist.

## Canonical paths
- mail root: `~/.local/share/mail/backup/`
- Gmail maildir: `~/.local/share/mail/backup/gmail/`
- GMX maildir: `~/.local/share/mail/backup/gmx/`
- secrets: `~/.mail-secrets/`
- mbsync config: `~/.mbsyncrc`
- Himalaya config: `~/.config/himalaya/config.toml`
- notmuch config: `~/.notmuch-config`
- optional local notes/state: `~/.openclaw/workspace/state/mail/`

## Automation model
Preferred model:
1. `mbsync gmail gmx` runs on a timer
2. `notmuch new` runs right after sync
3. logs stay small and rotate automatically
4. no mail deletion by default

Safe default backup policy:
- `Sync Pull`
- `Expunge None`
- this means pull mail down, but do not automatically delete local mail because remote changed

## Recommended automation implementation
Use a user-level systemd service + timer.

### Live implementation on this host
- sync script: `~/.local/bin/email-backup-sync`
- sync service: `~/.config/systemd/user/email-backup.service`
- sync timer: `~/.config/systemd/user/email-backup.timer`
- health script: `~/.local/bin/email-backup-healthcheck`
- health service: `~/.config/systemd/user/email-backup-health.service`
- health timer: `~/.config/systemd/user/email-backup-health.timer`

The sync script is more robust than a raw `mbsync gmail gmx` call:
- uses `flock` to prevent overlapping runs
- syncs only accounts that currently have usable secret files
- runs `notmuch new` after sync
- exits cleanly when Gmail is not fully configured yet

### Sync service
`~/.config/systemd/user/email-backup.service`
```ini
[Unit]
Description=Email backup sync for Gmail and GMX
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=/home/leo/.local/bin/email-backup-sync
Nice=10
IOSchedulingClass=best-effort
```

### Sync timer
`~/.config/systemd/user/email-backup.timer`
```ini
[Unit]
Description=Run email backup regularly

[Timer]
OnBootSec=10min
OnUnitActiveSec=30min
RandomizedDelaySec=3min
Persistent=true

[Install]
WantedBy=timers.target
```

### Health timer
`~/.config/systemd/user/email-backup-health.timer`
```ini
[Unit]
Description=Weekly email-backup health check

[Timer]
OnBootSec=20min
OnUnitActiveSec=7d
RandomizedDelaySec=30min
Persistent=true

[Install]
WantedBy=timers.target
```

### Enable
```bash
systemctl --user daemon-reload
systemctl --user enable --now email-backup.timer email-backup-health.timer
systemctl --user list-timers --all | grep email-backup
```

## First-time setup checklist
1. install packages
2. create mail directories
3. create secret files with correct permissions
4. write `~/.mbsyncrc`
5. write `~/.config/himalaya/config.toml`
6. run `mbsync gmail`
7. run `mbsync gmx`
8. run `notmuch setup`
9. run `notmuch new`
10. enable timer

## Verification commands
- sync now: `~/.local/bin/email-backup-sync`
- rebuild index: `notmuch new`
- show timers: `systemctl --user list-timers --all | grep email-backup`
- disk free: `df -h ~`
- mail size: `du -sh ~/.local/share/mail ~/.local/share/mail/backup/* 2>/dev/null`
- recent unread: `notmuch search --output=summary tag:unread`
- folders via Himalaya: `himalaya folder list --account gmx`
- Himalaya config sanity: `himalaya account list`
- GMX end-to-end check: `himalaya account doctor gmx`

## Safe maintenance policy
Do not auto-delete backed-up mail by default.

Instead, periodic maintenance should:
1. check free disk space
2. measure total maildir size per account
3. identify biggest folders
4. confirm timer/service still runs
5. confirm `notmuch` index still works
6. only suggest deletion/retention changes if storage pressure is real

### Storage triage commands
```bash
df -h ~
du -sh ~/.local/share/mail
du -sh ~/.local/share/mail/backup/*
find ~/.local/share/mail/backup -maxdepth 3 -type d | sort | head
```

### If storage pressure appears
Safe first steps:
- inspect which account/folder is large
- decide whether Spam/Trash should be excluded from sync
- decide whether sent mail / archives should stay complete
- consider longer sync interval if churn is high
- consult the weekly health snapshot at `~/.local/state/email-backup/health-latest.txt`

Not recommended by default:
- deleting mail from backup automatically
- pruning maildirs blindly
- excluding folders without Felix agreeing

## How Leo should help Felix with mail
Felix can ask things like:
- "Hol neue Mails"
- "Zeig unread von Gmail"
- "Zeig die letzten 20 GMX-Mails"
- "Such Rechnungen von letzter Woche"
- "Fass die neuen Mails zusammen"

Typical workflow:
1. run `mbsync` for the relevant account(s)
2. refresh `notmuch`
3. query locally
4. summarize only the requested mails
5. avoid exposing secrets or unrelated private mail in group chats

## Group/privacy rule
If the current surface is a group chat, avoid dumping sensitive email contents unless Felix clearly wants that there. For broad summaries, keep it concise. For secret-bearing mail or account/security mail, prefer caution.

## Current host notes
- `mbsync`, `notmuch`, and a prebuilt `himalaya` binary are installed.
- GMX is live and has already synced successfully on this host.
- Gmail config exists, but automated Gmail sync only becomes active once `~/.mail-secrets/gmail-app-password` exists.
- The sync script intentionally skips Gmail until that file is present, so GMX keeps working without noisy failures.

## Extension rule
When new email-backup knowledge, paths, service names, quirks, or recovery steps appear, update this skill instead of letting the knowledge stay only in chat.
