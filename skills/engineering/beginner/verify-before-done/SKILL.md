---
name: verify-before-done
description: Use after making a code change and before telling the user it is finished or working. Forces the agent to actually check the change — run the test, build, or a concrete trace of the logic — and report real results, instead of optimistically claiming success it hasn't confirmed.
---

# Verify Before Done

Do not say a change is "done," "fixed," or "working" until you have **evidence** that it is.

## What counts as evidence

In rough order of strength:

1. **Run it.** Execute the test, build, script, or command that exercises the change and read the actual output.
2. **Add a check.** If nothing tests this path, write a small test or assertion that would fail before your fix and pass after — then run it.
3. **Trace it.** If you genuinely can't run anything, walk the changed logic step by step with a concrete example input and show the result. Say explicitly that this is a trace, not an execution.

## How to report

- If it passed: say so, and briefly say **what you ran** ("ran `npm test` — 14 passing").
- If it failed: say that plainly and show the output. A failure you report is a problem solved; a failure you hide is a problem shipped.
- If you couldn't verify: **say "I couldn't verify this because ___"** instead of implying it works. Never let an unverified change wear the word "done."

## The rule

> "Should work" is not "works." If you didn't check, don't claim it.

## Why this matters

The most expensive bug is the one the agent confidently called "fixed." Verification converts confident guesses into either a real result or an honest "not yet" — both of which save the user from discovering the failure in production.
