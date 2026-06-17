---
name: read-before-edit
description: Use when about to modify code in a file or function you haven't actually read yet — making a change in an unfamiliar or existing part of the codebase. Makes the agent read the surrounding code first so the edit matches existing patterns and doesn't break nearby logic.
---

# Read Before You Edit

Before changing existing code, **read enough of it to understand what you're touching.** Editing blind is how agents break working software.

## What to do

1. **Read the function/section you're changing** — and the code immediately around it. Understand what it does and what depends on it before you touch a line.

2. **Find the existing patterns.** How does this file name things, handle errors, structure logic? Match that, don't impose your own style.

3. **Check who calls it.** A quick look at where a function is used tells you what you might break. Changing a signature or return value without checking callers is a classic self-inflicted bug.

4. **Reuse what's there.** If the codebase already has a helper, a utility, or a pattern for what you need, use it instead of writing a parallel one. New code should look like it belongs.

## The trap to avoid

Don't pattern-match on the *name* of a function and assume it does what you'd expect. Open it and confirm. The function called `validateUser` might also mutate state, log, or throw — assumptions about unread code are where bugs hide.

## Why this matters

Most agent-introduced bugs aren't bad logic — they're good logic that didn't fit the existing code, broke an unseen caller, or duplicated something already there. Two minutes of reading prevents the kind of bug that takes an hour to trace.
