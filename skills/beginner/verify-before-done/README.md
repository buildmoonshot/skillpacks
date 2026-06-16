# verify-before-done

**Fixes:** the agent says *"Fixed! ✅"* — but never actually ran anything. You deploy, it's still broken, and now you trust the agent less.

**Level:** Beginner · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
mkdir -p .claude/skills/verify-before-done
cp SKILL.md .claude/skills/verify-before-done/
```

## Before / After

**Task:** *"The total is wrong on the cart page — fix it."*

| ❌ Without | ✅ With verify-before-done |
|-----------|---------------------------|
| Changes a line, says *"Fixed the rounding bug — the total is correct now! ✅"* Nothing was run. The total is still wrong for one edge case. | Changes the line, then: *"Added a test for a $0.10 × 3 cart (was the failing case), ran `npm test` — 1 new test passing, 22 total. Confirmed the displayed total is now $0.30, not $0.29."* |
| You find out it's broken in production. | You see real evidence before it ships. |

## Why the trigger works

Scoped to *"after making a change, before telling the user it's finished."* That's the exact moment the optimistic "✅ done!" slips out. The skill intercepts it and demands proof first.

## Pairs well with

[`plan-then-build`](../plan-then-build) and [`surgical-edits`](../surgical-edits) — plan it, change only what's needed, then prove it works. The full loop.
