# Session strategy

## Goal

Keep Replit and GitHub inside one persistent browser session so OAuth state survives and future runs can reuse the same cookies.

## Shared state file

Use one stable file:

```bash
/home/leo/.openclaw/workspace/browser-state/replit-github.json
```

## Pattern

1. Load state if present.
2. Open Replit.
3. Inspect before acting.
4. Log in only if necessary.
5. Save state immediately after successful auth.
6. If GitHub OAuth runs, do not restart the browser in between.
7. Save state again after returning to Replit.

## Why this matters

If GitHub login happens in a different browser/session, the OAuth chain may complete but the Replit side may not inherit the expected cookies. One shared session avoids that mismatch.

## Limits

- State files do not bypass anti-bot systems.
- Expired or revoked auth still needs a fresh login.
- If the page is blocked, stop before burning credentials on retries.
