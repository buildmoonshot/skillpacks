# read-before-edit

**Fixes:** the agent changes a function without reading it (or its callers), matches a guessed pattern instead of the real one, and breaks something that was working fine.

**Level:** Beginner · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add read-before-edit
```

## Before / After

**Task:** *"Make `getUser` also return the user's role."*

| ❌ Without | ✅ With read-before-edit |
|-----------|-------------------------|
| Changes `getUser` to return `{ user, role }`. But 11 call sites expected a bare `user` object — half the app now reads `undefined`. The agent never looked at the callers. | Reads `getUser`, greps its 11 call sites first, sees they expect a bare user, and instead adds `role` *onto* the returned user object — so every caller keeps working. |

## Why the trigger works

Scoped to *editing unfamiliar or existing code*. It front-loads understanding exactly when the risk of breaking something is highest — and doesn't get in the way when you're writing brand-new code with no callers to break.

## Pairs well with

[`surgical-edits`](../surgical-edits) — read first to understand the scope, then change only what's needed.
