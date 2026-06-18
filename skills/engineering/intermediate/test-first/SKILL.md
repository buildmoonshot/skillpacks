---
name: test-first
description: Use when fixing a bug or adding behavior that can be covered by an automated test — especially bug fixes, where a test should reproduce the problem before any fix is written. Makes the agent write a failing test first, then the code that makes it pass, so the change is provably correct and stays fixed.
---

# Test First

When the change can be tested, **write the test before the implementation.**

## For a bug fix

1. **Reproduce it with a failing test.** Write a test that asserts the *correct* behavior — it should fail against the current buggy code. This proves you understand the bug.
2. **Run it and watch it fail** for the expected reason. A test that passes before you've fixed anything is testing the wrong thing.
3. **Write the minimal fix** that makes it pass.
4. **Run the full suite** to confirm the fix works and breaks nothing else.

## For a new feature

1. Write a test describing the behavior you want (it fails — the feature doesn't exist yet).
2. Implement until it passes.
3. Add tests for the obvious edge cases (empty input, boundaries, error paths).

## Keep it honest

- The test must actually fail first. "I wrote a test and it passes" on unwritten code means the test is hollow.
- Test **behavior**, not implementation details — assert *what* the code does, not *how*, so the test survives refactors.
- If something genuinely can't be tested (UI nuance, external service), say so and fall back to a concrete manual check instead of pretending.

## Why this matters

A bug with a failing-then-passing test around it is a bug that won't silently come back — the test stands guard forever. Writing the test first also forces you to define "done" before you write code, which is exactly when it's cheapest to get the definition right.
