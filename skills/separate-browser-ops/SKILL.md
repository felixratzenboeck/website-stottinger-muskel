---
name: separate-browser-ops
description: Use when Felix wants Leo to do browser work without disturbing his normal manual browser sessions, especially for login-sensitive flows, app passwords, OAuth, and recurring authenticated tasks.
---

# Separate Browser Ops

## Goal

Keep Felix's real day-to-day browser unchanged unless he **explicitly** asks Leo to work in that real browser/session.

Default browser rule:
- Leo-started browser work -> use a **separate Leo browser/profile**
- Felix explicitly says to use his real browser/session -> allowed, but only for that specific task

## Architecture default

Preferred order:
1. **Managed OpenClaw browser** in Leo's own profile
2. Managed OpenClaw browser on the **Mac node** when visible login/passkey confirmation is needed
3. Existing-session attach to Felix's real browser **only if Felix explicitly asks for it**

Why this is the default:
- preserves Felix's real browser state
- avoids accidental logout/session corruption
- reduces blast radius
- supports persistent auth in a separate profile

## Hard rules

- Do **not** attach to Felix's real Chrome/Brave by default.
- Do **not** start/stop or remote-debug Felix's real browser unless explicitly asked.
- Do **not** ask Felix to paste one-time secrets/codes/passwords into group chat.
- If a secret appears in chat, treat it as exposed and recommend rotation.
- Prefer local secret capture directly from browser UI into local secret files.

## Login-sensitive workflow

For tasks like Google app passwords, GitHub/Replit OAuth, dashboards, or account settings:

1. Open the **managed Leo browser** first.
2. If login is required, have Felix log in **inside that separate Leo browser**.
3. Reuse that Leo browser profile/session for later tasks.
4. Read any generated code/secret directly from the UI and store it locally.
5. Do not echo the secret back into chat unless Felix explicitly asks.

## Host selection

Use Linux host managed browser when:
- headless/autonomous work is enough
- no local Mac-only auth prompt is needed

Use Mac node managed browser when:
- Felix must see or approve something
- passkey / Face ID / local browser confirmation is needed
- the site is less likely to tolerate headless behavior

## Existing-session exception

Only use `profile="user"` or another existing-session profile when Felix clearly asks for work in his real browser/session.

Before doing that, remember:
- built-in `user` defaults to the Chrome profile
- Brave needs an explicit Brave profile/userDataDir and browser-side remote debugging enabled
- existing-session is higher-risk and more fragile than the managed Leo browser

## Gmail app-password workflow

Preferred pattern:
1. Open Google Account in the separate Leo browser
2. Felix completes login / second-factor there
3. Leo navigates to App Passwords
4. Leo reads generated password from the page
5. Leo writes it directly to the local secret file
6. Leo runs the relevant verification command
7. Leo avoids posting the password in chat

## Verification checklist

Before claiming the setup is good:
- browser starts in the separate Leo profile
- target page opens
- snapshot works
- auth persists across a reopen when expected
- secret can be stored locally without chat leakage
- Felix's real browser was not touched unless he explicitly requested that

## Fallbacks

If the Linux managed browser is insufficient:
- switch to the Mac node managed browser

If the managed browser is blocked but Felix explicitly wants real-session reuse:
- use existing-session attach as a one-off exception

If a site is especially brittle:
- prefer visible/manual login in the Mac node Leo browser
- keep the browser persistent instead of redoing login in fresh sessions

## Notes

This skill is about **browser separation and session hygiene**, not generic browser usage.
It should be preferred whenever browser convenience conflicts with preserving Felix's real browser state.
