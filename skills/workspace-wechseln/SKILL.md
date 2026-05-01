---
name: Workspace wechseln
description: Switch OpenClaw to a new workspace and re-verify auth/exec behavior so the system works without annoying approvals. Use when Felix says OpenClaw should use a different workspace or when OpenClaw stopped working after auth/approval issues.
---

# Workspace wechseln

This skill captures the exact "make it work again" flow we just used:
switch workspace (if requested), ensure exec approvals are truly off, re-auth
OAuth, restart gateway, and confirm a real test run works.

## When to use

- Felix wants OpenClaw to use a different workspace.
- OpenClaw is failing because OAuth refresh failed.
- Commands are blocked by "approval required" or "allowlist miss".
- Felix wants minimal prompts and direct execution.

## Core rules

- Do not ask Felix to run host commands manually if you can run them.
- Execute normal/admin commands directly. Only pause for catastrophic actions.

## Step 1: Confirm current status

```bash
openclaw config validate
systemctl --user is-active openclaw-gateway.service
openclaw approvals get --gateway
openclaw models status
```

## Step 2: Ensure exec approvals are effectively off

Check and enforce these values:

- `~/.openclaw/openclaw.json`
  - `tools.exec.host = "gateway"`
  - `tools.exec.security = "full"`
  - `tools.exec.ask = "off"`
  - `approvals.exec.enabled = false`

- `~/.openclaw/exec-approvals.json`
  - `defaults.security = "full"`
  - `defaults.ask = "off"`
  - `defaults.autoAllowSkills = true`
  - same for `agents.main`

Restart gateway after changes:

```bash
systemctl --user restart openclaw-gateway.service
```

## Step 3: Re-auth OAuth if needed

If logs show `refresh_token_reused` or auth refresh failure:

```bash
openclaw models auth login --provider openai-codex
```

Open the URL on Felix's local machine and paste the full redirect URL.

Confirm:

```bash
openclaw models status
```

## Step 4: Test a real run

```bash
openclaw agent --agent main --message "Antworte nur mit OK"
```

Expect `OK`.

## Step 4b: If Felix has no working ChatGPT/Workspace access

If Felix says his ChatGPT workspace is expired or he has no active provider:

1. Explain clearly what a "KI Provider" is:
   - A provider is the service that supplies the model (the API/OpenAI/OpenRouter/etc.).
   - OpenClaw itself does not include a model; it connects to a provider.
   - Without a provider, OpenClaw cannot answer.

2. Recommend a free option, using OpenRouter as the primary example:
   - OpenRouter offers free‑tier models and a single API key that can route to multiple models.
   - You can start free and later switch to paid models without changing OpenClaw.

3. Provide the exact high‑level steps, in simple language:
   - Create an account at OpenRouter.
   - Generate an API key.
   - Add the key to OpenClaw.
   - Set a default model.
   - Test with a short prompt.

4. If Felix asks for alternatives:
   - Mention Perplexity Comet or other free‑tier providers if relevant.
   - Offer to quickly browse and pick the best open‑source free option if he wants.
   - If he wants browsing, do it directly and return a concrete recommendation.

5. After setup, verify:
   - Run a short test message.
   - Confirm responses work and no auth errors appear.

## Provider setup (OpenRouter example)

Explain and do this only if Felix approves:

```bash
openclaw models auth add
```

Then select OpenRouter and paste the API key when prompted.

Set a default model:

```bash
openclaw models set --primary openrouter/<model-id>
```

Test:

```bash
openclaw agent --agent main --message "Antworte nur mit OK"
```

If OK, confirm provider is working.

## Step 5: If a Telegram topic is stuck on old rules

Backup and reset only the affected topic session:

- Backup:
  - `~/.openclaw/agents/main/sessions/<session>.jsonl`
  - `~/.openclaw/agents/main/sessions/sessions.json`
- Remove the stuck topic entry from `sessions.json`
- Move the old jsonl into a backup folder
- Restart the gateway

## Workspace switch notes (only if Felix wants it)

If Felix provides a new workspace path:

- Create it if missing
- Copy the core workspace files if desired:
  - `AGENTS.md`, `SOUL.md`, `USER.md`, `TOOLS.md`, `MEMORY.md`
- Update OpenClaw config to point to the new workspace (agent defaults)
- Restart the gateway

## Done definition

- `openclaw config validate` passes
- `openclaw approvals get --gateway` shows `security=full`, `ask=off`
- `openclaw models status` shows openai-codex OAuth OK
- A test `openclaw agent` returns `OK`
