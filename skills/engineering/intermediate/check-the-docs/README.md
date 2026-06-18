# check-the-docs

**Fixes:** the agent confidently calls `array.removeWhere(...)` or passes a `timeout` option that doesn't exist — a plausible, hallucinated API that wastes your afternoon.

**Level:** Intermediate · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
mkdir -p .claude/skills/check-the-docs
cp SKILL.md .claude/skills/check-the-docs/
```

## Before / After

**Task:** *"Add a 5-second timeout to the fetch call using our HTTP client."*

| ❌ Without | ✅ With check-the-docs |
|-----------|------------------------|
| Writes `client.get(url, { timeout: 5000 })` from memory. The client actually uses `{ signal: AbortSignal.timeout(5000) }`. Runtime error, no idea why. | Checks the installed client's docs/types first, sees there's no `timeout` option, and writes the real `AbortSignal.timeout(5000)` pattern — or copies how the codebase already does it. |
| You debug a wrong signature for 40 minutes. | It works the first time. |

## Why the trigger works

Scoped to *external library/API calls you're not certain of* — exactly where hallucination lives. It doesn't slow down plain application logic; it kicks in at the boundary with someone else's code, where memory is least trustworthy.

> 🔌 **Pro move:** pair this with an MCP docs server (like Context7) so the agent can fetch *version-specific* docs automatically instead of guessing.

## Pairs well with

[`verify-before-done`](../../beginner/verify-before-done) — check the API is real, then prove the code runs.
