# State patterns

## Goal

Keep one browser session reusable across dashboard work, OAuth flows, and follow-up automation.

## Recommended layout

Store state files in a stable directory, for example:

```bash
mkdir -p /home/leo/.openclaw/workspace/browser-state
```

Suggested names:

- `browser-state/replit-github.json`
- `browser-state/google-workspace.json`
- `browser-state/default.json`

## Pattern

1. Load state if the file exists.
2. Open the target site.
3. Perform login only if the session is clearly unauthenticated.
4. Save state immediately after successful authentication.
5. Reuse the same state file for downstream sites in the same auth chain.

## Example

```bash
agent-browser state load browser-state/replit-github.json || true
agent-browser open https://replit.com/
# ... log in if needed ...
agent-browser state save browser-state/replit-github.json
```

## GitHub-linked auth

If Replit uses GitHub OAuth and the login completes in the same browser session, save the state after the full round-trip finishes. That captures both the Replit and GitHub cookies that survived the OAuth redirect chain.

## Important limits

- State files do not bypass CAPTCHAs or Cloudflare blocks.
- Expired sessions still need re-authentication.
- If a site shows a blank or blocked page, verify with `snapshot` before assuming the login is missing.
