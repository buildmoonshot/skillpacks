# ask-dont-assume

**Fixes:** the agent takes a vague request, silently picks one interpretation, and builds the wrong thing — confidently — while you find out at the end.

**Level:** Beginner · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add ask-dont-assume
```

## Before / After

**Task:** *"Add a delete button to the user row."*

| ❌ Without | ✅ With ask-dont-assume |
|-----------|------------------------|
| Builds a hard delete that wipes the user and cascades to all their orders. You meant a soft "deactivate." Data's gone. | *"Quick check: hard delete (row removed) or soft delete (mark inactive, keep history)? I'd default to soft delete since orders reference these users. Going with that unless you say otherwise."* |

## Why the trigger works

Scoped to *ambiguous or underspecified requests*. It's calibrated, not naggy — it surfaces the fork when there's a real one, and stays quiet on clear instructions. The win is catching the wrong interpretation *before* the code, not after.

## Pairs well with

[`plan-then-build`](../plan-then-build) — surface the ambiguity, then sketch the plan, then build the right thing once.
