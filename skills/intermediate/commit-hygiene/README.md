# commit-hygiene

**Fixes:** the agent stuffs a bug fix, a rename, and a half-finished feature into one commit messaged `update`, leaving a history nobody can bisect, revert, or review.

**Level:** Intermediate · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add commit-hygiene
```

## Before / After

**Task:** *"Fix the login timeout and also clean up the auth helper while you're in there."*

| ❌ Without | ✅ With commit-hygiene |
|-----------|------------------------|
| One commit: `update auth` — mixing the timeout fix with an unrelated refactor. Later, the refactor breaks something and you can't revert it without losing the fix too. | Two commits: `fix: extend login timeout to 30s` and `refactor: simplify auth helper`. Each reverts cleanly on its own. `git log` reads like a changelog. |

## Why the trigger works

Scoped to *git commit operations*. It kicks in exactly when messages get written — the moment good habits are cheap and bad ones get baked into permanent history.

## Pairs well with

[`surgical-edits`](../../beginner/surgical-edits) (small diffs) and [`test-first`](../test-first) (each fix arrives with its proof). Clean changes make clean commits.
