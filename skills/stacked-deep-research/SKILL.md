---
name: stacked-deep-research
description: Use only when Felix explicitly says "mach deep research".
---

# Stacked Deep Research

Use this skill only when Felix explicitly says **"mach deep research"**.
Do not activate it for vague requests like "recherchiere mal", "prüf das", or normal question answering.

## Goal

Run a higher-confidence research workflow before giving the final answer.
The purpose is to improve context quality, reduce one-sided conclusions, and surface uncertainty clearly.

## Workflow

1. Extract the exact research question and success criteria.
2. Run a first deep research pass with **Gemini Deep Research**.
   - Use Felix's Gemini account/session when needed.
   - If browser access is required, complete that in the browser rather than asking Felix for manual steps unless blocked.
   - Use the best available Gemini model/workflow that still keeps turnaround time reasonable.
3. Run a second independent pass with **ChatGPT Deep Research**.
   - Use the available ChatGPT workspace/session.
   - Use the best available ChatGPT model/workflow that still keeps turnaround time reasonable.
4. Compare both passes and identify:
   - strong agreements
   - important disagreements
   - unclear or weakly supported claims
   - missing context
5. Synthesize the best-supported conclusion.
6. Only then provide the final answer, recommendation, or next-step plan.

## Time and quality guardrails

- Prefer the strongest available model/workflow on both sides, but do not choose a path that is unnecessarily slow.
- Optimize for a high-confidence result with clean time bounds, not maximum waiting.
- If a platform offers multiple deep-research modes, prefer the best one that is realistically fast enough for an interactive request.
- If one side is temporarily blocked or degraded, say so explicitly rather than silently downgrading quality.

## Output expectations

When reporting back, prefer this structure:

- Short conclusion
- What appears well-supported
- Where the passes disagree
- What remains uncertain
- Recommended next step

## Notes

- Keep the existing trigger behavior: only activate this skill when Felix explicitly says **"mach deep research"**.
- Prefer depth and quality, but stay time-conscious.
- Be explicit about confidence and uncertainty.
- Do not present weakly supported claims as facts.
- Treat Gemini and ChatGPT as genuinely independent passes; do not collapse them into one source.
- If the second pass materially changes the conclusion, say so clearly.
