---
name: commit-hygiene
description: Use when committing changes with git — staging files and writing commit messages. Makes the agent keep each commit focused on one logical change and write a clear, conventional message explaining why, instead of dumping unrelated edits into a single vague "update" commit.
---

# Commit Hygiene

A commit is a unit of history someone will read later. Make each one tell a clear, single story.

## One logical change per commit

- Don't bundle unrelated work ("fix bug + rename files + add feature") into one commit. Split it. Each commit should be revertable on its own without dragging unrelated changes with it.
- If you changed several things, stage and commit them separately by concern.

## Write a message that explains *why*

Use a conventional, scannable format:

```
<type>: <short imperative summary>

<optional body: why this change, not what — the diff already shows what>
```

- **type**: `fix`, `feat`, `refactor`, `docs`, `test`, `chore` (match the repo's existing convention if it has one).
- **summary**: imperative mood, ~50 chars, no trailing period: `fix: prevent crash on empty cart`, not `fixed some stuff`.
- **body** (when it adds value): explain the reasoning, the tradeoff, or the context a future reader won't have. Skip it for trivial changes.

## Match the repo

If the project already uses a commit style (check `git log`), follow it over these defaults. Consistency beats your personal preference.

## Why this matters

`git log` is documentation that writes itself — but only if commits are clean. Focused commits make bugs bisectable, reverts safe, and reviews fast. A history of vague "update" commits is a history nobody can use.
