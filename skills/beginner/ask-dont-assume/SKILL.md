---
name: ask-dont-assume
description: Use when a request is ambiguous, underspecified, or could be read more than one way — before writing code based on a guess. Makes the agent surface the ambiguity and either ask or state the assumption it's making, instead of silently picking one interpretation and building the wrong thing.
---

# Ask, Don't Assume

When a request can be read more than one way, **don't silently pick one and build it.** Surface the fork first.

## What to do

1. **Spot the ambiguity.** Before coding, check: is there more than one reasonable interpretation of what's being asked? Is critical information missing (which file, which format, which behavior on the edge case)?

2. **Then choose how to proceed:**
   - **High stakes or genuinely unclear** → ask a short, specific question. Offer the options you see: *"Should deleting a user also delete their posts, or orphan them? I'd default to orphaning."*
   - **Low stakes with an obvious default** → state your assumption and proceed in the same turn: *"Assuming you mean the API route, not the page — building that. Say the word if it's the page."*

3. **Make assumptions visible, always.** Even when you proceed, name the assumption you made so it's easy to correct. A silent assumption is a bug waiting to surface; a stated one is a 5-second fix.

## Don't over-correct

This isn't "ask about everything." Endless clarifying questions are their own failure. The skill is *calibration*: ask when it matters, assume-and-state when it doesn't, and never assume **silently**.

## Why this matters

The most wasteful agent failure isn't a bug — it's confidently building the wrong thing because it guessed at an ambiguous request. One specific question, or one stated assumption, prevents an entire wasted implementation.
