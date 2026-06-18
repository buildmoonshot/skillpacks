---
name: surgical-edits
description: Use when editing existing code — making a fix, adding a feature, or changing behavior in a file that already has working code. Enforces minimal, scoped diffs so the agent changes only what the task requires and never refactors, reformats, or "improves" untouched code.
---

# Surgical Edits

When modifying existing code, change **only** what the task requires. Every line in your diff must trace directly back to the request.

## Rules

1. **Touch only what's required.** Do not edit, reorder, or reformat code outside the scope of the task — even if you would normally write it differently.

2. **Match the surrounding style.** Mirror the existing naming, indentation, quote style, and comment density of the file you're editing, not your personal defaults.

3. **No drive-by refactors.** Do not rename variables, extract functions, restructure logic, or "clean up" adjacent code unless the task is explicitly about that. If you spot a real problem nearby, **mention it — don't fix it.**

4. **No reformatting.** Never let an auto-formatter or your own habits reflow lines you didn't functionally change. Whitespace-only churn hides the real change in review.

5. **Clean up only your own mess.** If your change makes an import, variable, or function unused, remove it. Do not remove pre-existing dead code unless asked.

6. **Preserve what works.** Keep existing comments, error handling, and edge-case logic unless the task is to change them.

## Before acting, ask yourself

> If a reviewer read this diff, would every changed line obviously connect to the request — or would they have to ask "why did you touch *that*?"

If any line would draw that question, revert it.

## When the right fix IS a larger change

Sometimes the task genuinely requires broad changes (a real refactor, a migration). That's fine — but **say so first**: state what you're about to change and why it's in scope, then proceed. The rule isn't "never change a lot." It's "never change a lot *silently*."
