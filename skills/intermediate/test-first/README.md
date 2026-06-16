# test-first

**Fixes:** the agent "fixes" a bug with no test, the bug quietly returns three commits later, and nobody notices until a user does.

**Level:** Intermediate · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
mkdir -p .claude/skills/test-first
cp SKILL.md .claude/skills/test-first/
```

## Before / After

**Task:** *"Users with no last name show as 'John undefined'. Fix it."*

| ❌ Without | ✅ With test-first |
|-----------|-------------------|
| Edits the name formatter, eyeballs one example, says done. A new bug (now empty *first* names break) ships unnoticed. | Writes `formatName('John', '')` → expects `'John'`, runs it, watches it fail. Fixes it. Adds `formatName('', 'Doe')` and `formatName('','')` cases too. Full suite green. The bug can't come back. |

## Why the trigger works

Scoped to *testable changes, especially bug fixes* — where a reproduce-first test pays off most. It won't nag you to test a throwaway script, but for a real fix it insists on proof that survives future edits.

## Pairs well with

[`verify-before-done`](../../beginner/verify-before-done) — test-first writes the proof, verify-before-done makes sure it actually ran and passed.
