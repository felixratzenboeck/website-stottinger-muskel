---
name: agent-browser-dashboard
description: Install, start, verify, and troubleshoot Vercel's agent-browser plus its local observability dashboard on Linux hosts. Use when asked to set up agent-browser, install Chrome/dependencies, start the dashboard, verify live streaming, persist browser state, or diagnose launch issues such as missing shared libraries, dashboard not loading, or session visibility problems.
---

# Agent Browser Dashboard

Use this skill to make `agent-browser` operational on the host and ready for repeatable browser-session work.

## Quick flow

1. Ensure `agent-browser` exists. If not, install it with `npm install -g agent-browser`.
2. Install the dashboard once with `agent-browser dashboard install`.
3. On Linux, run `agent-browser install --with-deps` if Chrome fails with missing shared libraries.
4. Install or verify Chrome with `agent-browser install`.
5. Start the dashboard with `scripts/start-dashboard.sh` or `agent-browser dashboard start`.
6. Verify the dashboard at `http://127.0.0.1:4848`.
7. Open a test page with `agent-browser open <url>` and confirm snapshot/screenshot works.

## Persistent session rules

Keep auth state in explicit files instead of assuming the runtime will remember everything.

- Save state after a successful login with `agent-browser state save <path>`.
- Reuse the same state file for related sites when the workflow depends on shared cookies or GitHub OAuth.
- Prefer one state file per workflow, for example `browser-state/replit-github.json`.
- Before a login-heavy task, load existing state with `agent-browser state load <path>` when the file exists.

Use `references/state-patterns.md` when designing a reusable multi-site workflow.

## Troubleshooting decision tree

### Chrome exits early

If stderr mentions missing libraries like `libatk-1.0.so.0`, run:

```bash
agent-browser install --with-deps
```

Then retry `agent-browser open https://example.com`.

### Dashboard says install dashboard

Run:

```bash
agent-browser dashboard install
agent-browser dashboard start
```

### Site blocks automation

If snapshot/title shows Cloudflare or bot protection:

1. Capture the blocked state with `snapshot` and `screenshot`.
2. Report that the environment is being blocked.
3. Prefer a headed session or a user-controlled browser if available.
4. Do not claim the login succeeded.

### Need repeatable startup

Use `scripts/start-dashboard.sh`.

## References

- Read `references/state-patterns.md` when a workflow needs persistent auth across multiple domains.
- Read `references/troubleshooting.md` when `agent-browser` launches but the target site blocks or behaves differently than expected.
