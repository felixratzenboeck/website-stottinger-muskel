---
name: gemini-complex-workflows
description: Prefer Gemini CLI for complex website/app generation, larger multi-file coding work, ACP launches, and deep sub-agent style tasks. Use when Felix wants a website built, a more complex implementation, ACP/OCP style agent protocol work, or a heavyweight parallel/worker task.
always: true
requires:
  bins:
    - gemini
homepage: https://github.com/google-gemini/gemini-cli
---

# Gemini Complex Workflows

Gemini CLI is installed and authenticated on this host.

Use it proactively for the following kinds of work:

- building websites or apps from scratch
- larger multi-file refactors or scaffolds
- brainstorming and executing more complex implementation plans
- ACP protocol / agent-protocol style runs
- sub-agent or worker-style deep tasks where another capable coding agent is useful

## Default behavior

- Prefer Gemini CLI before asking Felix to run anything manually.
- Assume Google OAuth is already configured unless Gemini explicitly reports an auth failure.
- Keep ownership: use Gemini as a worker/companion, then verify and integrate the result yourself.
- Treat **"Gemini Seal I" / "Seal-Eye"** as Felix's name for **Gemini CLI over ACP**.
- For website builds, UI work, visual polish, design systems, landing pages, mockups, branding-heavy tasks, or requests like "mach es schön", default to **Gemini Seal I via ACP** first.
- When routing Gemini Seal I work through OpenClaw ACP, use `runtime: "acp"` and `agentId: "gemini"`.

## Preferred commands

Quick one-shot task:

```bash
gemini -p "..."
```

Interactive project work:

```bash
gemini -i "..."
```

ACP mode:

```bash
gemini --acp
```

## Website work

For website/UI/app generation:

- use Gemini early for structure, component ideas, page flow, and multi-file scaffolding
- if the task is design-forward, aesthetic, brand-heavy, or explicitly asks for something beautiful/polished, start **Gemini Seal I via ACP** before any other agent path
- then implement, test, and refine locally
- keep Felix's preferences in mind: direct, practical, no unnecessary fluff

## ACP / sub-agent interpretation

- If Felix says `ACP`, use Gemini's ACP mode.
- If Felix says `OCP` but the context is clearly agent-protocol/sub-agent work, treat it as ACP unless Felix says otherwise.
- If Felix says `Gemini Seal I` / `Seal-Eye`, interpret that as: launch **Gemini CLI via ACP**.
- For design/website/beautiful-output requests, prefer ACP launches over plain `gemini -p` one-shots unless the task is obviously tiny.

## Reporting back

- Be explicit when Gemini was used.
- Summarize the useful result, not the raw transcript.
- If Gemini fails, continue locally instead of stalling.
