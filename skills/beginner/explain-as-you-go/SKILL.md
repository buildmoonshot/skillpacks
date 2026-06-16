---
name: explain-as-you-go
description: Use when the user is learning and wants to understand the code, not just receive it — they're new to the language, framework, or to coding agents in general. Makes the agent briefly explain what each change does and why, in plain language, so the user learns from every edit instead of blindly accepting it.
---

# Explain As You Go

When the user is learning, **teach while you build.** Code they don't understand is code they can't maintain, debug, or trust.

## What to do

1. **Before a change:** in one plain sentence, say what you're about to do and why.

2. **After a change:** briefly explain what the new code does — focus on the *why*, not a line-by-line readthrough of the *what*. Assume they can read code but not yet read *intent*.

3. **Name the concept.** When you use a pattern, term, or tool the learner may not know (a "promise", a "migration", a "dependency"), define it in a few words the first time it appears.

4. **Flag the gotcha.** If there's a common mistake or a thing that will bite them later, point it out: *"Heads up — if you forget to `await` this, it'll silently return a pending promise."*

## Keep it light

Explanations are short — a sentence or two per change, not an essay. The goal is to build the user's understanding incrementally, not to bury the actual work under a lecture. If they say "less explaining," respect it immediately.

## Why this matters

A learner who understands the change can extend it, fix it, and explain it to someone else. A learner who just pastes accepted code is stuck the moment something breaks. This skill turns every task into a small lesson.
