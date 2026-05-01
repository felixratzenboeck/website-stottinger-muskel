---
name: replit-project-flow
description: Log into Replit, detect whether an account/session already exists, ask for a new account only when the session is clearly empty or unusable, create a new Replit project, and preserve the same browser session for linked GitHub auth. Use when asked to automate Replit setup, create a fresh repl/project, reuse stored login state, connect GitHub in the same browser session, or turn this workflow into a repeatable browser automation pattern.
---

# Replit Project Flow

Use this skill after `agent-browser` itself is installed and working.

## Workflow

1. Load an existing state file if one exists.
2. Open Replit.
3. Snapshot the page and classify the state:
   - already logged in
   - login page visible
   - empty/new-account state
   - blocked by bot protection
4. If blocked, stop and report the exact blocker.
5. If logged out but the login form is available, log in with the provided credentials.
6. If there is no usable account context, ask for a fresh account instead of guessing.
7. After successful login, save state immediately.
8. Create the new project/repl.
9. If GitHub linking is needed, keep the same session alive and save state again after OAuth finishes.

## Rules for account handling

- Do not ask for a new account unless the page clearly indicates there is no usable session or the provided credentials fail.
- If the site is blank, blocked, or mid-redirect, investigate first with `snapshot`, `get url`, and `screenshot`.
- Reuse the same state file for Replit and GitHub when the flow depends on OAuth cookies surviving the redirect chain.
- Never claim project creation succeeded without checking the resulting URL/title/editor state.

## Detection heuristics

### Already logged in

Signals can include:

- Replit dashboard/home is visible
- account avatar/profile menu is present
- create/new project actions are visible

Action:

- proceed to project creation
- save state if it was newly refreshed

### Logged out with login UI

Signals can include:

- email/password form
- `Continue with GitHub`
- `Log in` or `Sign up`

Action:

- use provided login path
- after landing in the authenticated workspace, save state

### Empty or unusable account state

Signals can include:

- onboarding loops without an accessible workspace
- explicit account-not-found / signup-only state
- provided credentials rejected

Action:

- ask for a new/fresh account

### Blocked automation

Signals can include:

- Cloudflare block page
- CAPTCHA wall
- anti-bot interstitial

Action:

- stop and report blocker
- do not burn credentials on repeated retries

## Project creation checklist

- Verify authenticated workspace is loaded.
- Use the visible `Create` / `New repl` / equivalent action.
- Choose the requested template/runtime.
- Name the project if the user gave a name; otherwise ask.
- Wait until the editor/workspace URL is stable.
- Confirm success with title, URL, and a final snapshot or screenshot.

## GitHub persistence

When GitHub auth is part of the workflow:

1. Stay in the same browser session.
2. Complete GitHub auth in that same session.
3. Save the shared state file after returning to Replit.
4. Reuse that state file for future project creation runs.

Read `references/replit-selectors.md` for common UI targets and `references/failure-modes.md` for decision points.
