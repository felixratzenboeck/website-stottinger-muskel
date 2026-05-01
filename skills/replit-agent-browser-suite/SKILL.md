---
name: replit-agent-browser-suite
description: End-to-end workflow for setting up Vercel agent-browser, starting its dashboard, loading or saving persistent browser state, logging into Replit, preserving the same session for GitHub OAuth, detecting when the account/session is empty, and creating a new Replit project only after the authenticated workspace is confirmed. Use when asked to automate Replit project creation with agent-browser, keep GitHub login inside the same browser session, recover from missing state, or package this browser workflow as a reusable skill.
---

# Replit Agent Browser Suite

Use this skill when the goal is not just to install `agent-browser`, but to make the whole Replit workflow repeatable.

## Main flow

1. Ensure `agent-browser` is installed.
2. Install dashboard + Chrome + Linux deps.
3. Start the dashboard.
4. Load an existing shared state file if present.
5. Open Replit and inspect the actual page state.
6. Classify the result:
   - authenticated workspace
   - login screen
   - empty/unusable account state
   - blocked by Cloudflare/CAPTCHA/anti-bot
7. If authenticated, create the project.
8. If login is needed, log in with the provided credentials.
9. If GitHub auth is part of the path, stay in the same browser session.
10. Save state after successful auth and again after GitHub linking if it changes the session.
11. Confirm project creation by URL/title/editor state.

## Non-negotiable rules

- Do not pretend success when the site is blocked or ambiguous.
- Do not ask for a fresh account unless the current account/session is clearly unusable.
- Do not split Replit and GitHub across separate browser sessions when OAuth persistence matters.
- Save state explicitly; do not rely on implicit runtime memory.
- If Replit is blocked by Cloudflare, stop and report that exact blocker.

## State handling

Default shared state path:

```bash
/home/leo/.openclaw/workspace/browser-state/replit-github.json
```

Pattern:

```bash
agent-browser state load /home/leo/.openclaw/workspace/browser-state/replit-github.json || true
agent-browser open https://replit.com/
# inspect, log in if needed
agent-browser state save /home/leo/.openclaw/workspace/browser-state/replit-github.json
```

Read `references/session-strategy.md` before changing the persistence model.

## Login / account decision tree

### Replit workspace already visible

Proceed directly to project creation.

### Login UI visible

Use the provided credentials or the requested GitHub login path.

### Empty or broken account situation

Ask for a fresh account only when one of these is true:

- provided credentials are rejected
- the flow lands in a signup-only state
- the workspace cannot be reached after a normal login attempt

### Bot protection visible

Stop and surface the blocker. Capture `title`, `url`, `snapshot`, and optionally a screenshot.

Read `references/blockers.md` for handling rules.

## Project creation checklist

- Verify authenticated workspace exists.
- Trigger `Create` / `New repl` / `New project`.
- Select runtime/template requested by the user.
- Set project name if given.
- Wait for stable editor/workspace state.
- Save session state after the editor is reachable.

## Recommended scripts

- `scripts/setup-agent-browser.sh` installs and starts the local environment.
- `scripts/replit-open.sh` loads state and opens Replit.
- `scripts/save-state.sh` saves the shared Replit/GitHub session.

## References

- `references/session-strategy.md` for shared-session persistence
- `references/replit-flow.md` for page-state classification and project creation checks
- `references/blockers.md` for Cloudflare/CAPTCHA handling
