---
name: check-the-docs
description: Use when writing or modifying code that calls an external library, framework, SDK, or API — especially one that is niche, recently updated, or whose exact method names and parameters you are not certain of. Makes the agent confirm real, current API signatures before using them, instead of inventing plausible-but-wrong calls from memory.
---

# Check the Docs

Before calling into an external library or API, **confirm the API is real and current** — do not code it from memory and hope.

## When to stop and check

- You're reaching for a method, option, or parameter and you're **not certain** it exists with that exact name/shape.
- The library has had **major version changes** (the API you remember may be gone).
- It's **niche or fast-moving** — small libraries and recent releases are where memory is least reliable.
- The user reported an error that looks like a **wrong signature** (`X is not a function`, unexpected argument).

## What to do

1. **Verify the signature** against current documentation, the installed version's types/source, or an official reference — not your recollection.
2. **Check the installed version.** Read `package.json` / lockfile / `requirements.txt`. Match the docs to *that* version, not the latest.
3. **Prefer the project's existing usage.** If the codebase already calls this library, copy that real, working pattern over anything you'd reconstruct from memory.

## When you can't verify

Say so, and mark the call as unverified: *"I used `client.search(...)` from memory — confirm this matches your installed version, as I couldn't check the docs."* An honest flag beats a confident hallucination.

## Why this matters

Hallucinated API calls are the classic agent failure: confident, plausible, and completely wrong — `array.removeWhere()`, a `timeout` option that doesn't exist, a renamed method from three versions ago. They cost a debugging session to track down. Thirty seconds of checking prevents them.
