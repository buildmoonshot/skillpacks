# plan-then-build

**Fixes:** the agent dives straight into writing code on a vague request, picks the wrong approach, and you don't find out until you've read 200 lines that solve the wrong problem.

**Level:** Beginner · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
mkdir -p .claude/skills/plan-then-build
cp SKILL.md .claude/skills/plan-then-build/
```

## Before / After

**Task:** *"Add login to the app."* (deliberately vague — like real requests)

| ❌ Without | ✅ With plan-then-build |
|-----------|------------------------|
| Immediately writes a full email/password auth system with a new database table, a JWT library, and 6 new files. | First responds: *"Quick plan: 1) email+password via the auth library you already use (Supabase?), 2) one new `/login` route, 3) protect existing routes. **Assumption:** you want email/password, not OAuth — say the word if you'd rather do Google login. Proceed?"* |
| You wanted "Sign in with Google." Now 6 files are wrong. | You catch it in one sentence before any code is written. |

## Why the trigger works

Scoped to *the start of non-trivial tasks* ("a change that spans more than a couple of lines or files"). It stays silent on trivial edits — so you get planning where planning pays off, and no ceremony where it doesn't.

## Pairs well with

[`surgical-edits`](../surgical-edits) (plan small, change small) and [`verify-before-done`](../verify-before-done) (plan it, build it, prove it).
