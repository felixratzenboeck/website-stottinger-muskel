# gogcli setup

Installed binary:

- `/home/leo/.local/bin/gog`
- Version: `v0.12.0`

## Quick start

1. In Google Cloud Console, create a **Desktop app** OAuth client.
2. Download the JSON file.
3. Enable the APIs you actually want to use, e.g.:
   - Gmail API
   - Google Calendar API
   - Google Drive API
   - People API
4. If the OAuth app is still in **Testing**, add your Google account as a test user.
5. Run:

```bash
gog-google-connect you@gmail.com ~/Downloads/client_secret_xxx.json gmail,calendar,drive,contacts
```

That helper will:

- import your OAuth client credentials
- start a manual OAuth flow
- prompt you to paste back the full redirect URL
- verify the stored token

## Direct commands

Import OAuth client credentials:

```bash
gog auth credentials ~/Downloads/client_secret_xxx.json
```

Start login:

```bash
gog auth add you@gmail.com --services gmail,calendar,drive,contacts --manual
```

Verify:

```bash
gog auth list --check
gog auth status
```

## Notes

- Config path: `/home/leo/.config/gogcli/config.json`
- Default keyring backend: `auto`
- Stored refresh tokens should auto-refresh after first successful login.
- `gog` is already in `PATH` on this machine.
