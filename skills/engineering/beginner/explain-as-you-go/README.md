# explain-as-you-go

**Fixes:** the agent hands you working code you don't understand. It runs — until it breaks, and now you're stuck because you never learned what any of it does.

**Level:** Beginner · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

> 💡 **The learner's skill.** If you're new to coding agents, install this one first. It turns the agent from a vending machine into a tutor.

## Install

```bash
mkdir -p .claude/skills/explain-as-you-go
cp SKILL.md .claude/skills/explain-as-you-go/
```

## Before / After

**Task:** *"Make this button save the form to the database."*

| ❌ Without | ✅ With explain-as-you-go |
|-----------|--------------------------|
| Drops 30 lines of code. It works. You have no idea why, what an "async handler" is, or what to do when it fails. | *"I'll add a click handler that sends the form data to the database. **Quick note:** I'm marking it `async` because saving to a database takes time — `async`/`await` lets the app stay responsive while it waits. **Gotcha:** I wrapped it in try/catch so a failed save shows an error instead of crashing silently."* Then the 30 lines — which now teach you something. |

## Why the trigger works

Scoped to *learning contexts* ("the user is new to the language, framework, or coding agents"). It won't slow down an expert who just wants the diff — but for someone building understanding, every task becomes a lesson.

## Pairs well with

[`plan-then-build`](../plan-then-build) — see the plan in plain English first, then learn from each step as it's built.
