---
name: spec-driven-development
description: Use when starting a substantial feature or change — something that spans multiple files, has non-trivial design decisions, or is expensive to get wrong. Makes the agent write a short spec (goal, approach, key decisions, edge cases) and confirm it before implementing, instead of discovering the design by writing code.
---

# Spec-Driven Development

For substantial work, **write a short spec and agree on it before writing code.** The design decisions are cheapest to change as text, before they're encoded across a dozen files.

## Write the spec first

Keep it short — a focused page, not a document. Cover:

1. **Goal** — what this needs to accomplish, in one or two sentences. What does "done" look like?
2. **Approach** — the high-level shape: the main pieces, where they live, how data flows. Enough that someone could predict the file structure.
3. **Key decisions** — the choices that matter, each with a one-line rationale: data model, the library or pattern picked, API shape, where state lives. Note the alternatives you rejected and why.
4. **Edge cases & failure modes** — the inputs and conditions that will break a naive version (empty, concurrent, error, large, malicious). How each is handled.
5. **Out of scope** — what this deliberately does *not* do, so scope doesn't creep mid-build.

## Get alignment, then build

Present the spec and confirm direction before implementing. A wrong assumption caught in the spec costs one sentence; caught after implementation it costs a rewrite. Once agreed, the spec becomes the checklist you build and verify against.

## Match the effort to the work

This is for substantial, multi-file, or hard-to-reverse work. A one-file change doesn't need a spec — that's what lightweight planning is for. Don't turn every task into a design doc; reserve this for when the design genuinely carries risk.

## Why this matters

The most expensive mistakes are architectural — chosen early, discovered late, and woven through everything by the time they surface. A short spec surfaces those decisions while they're still one paragraph to change, and turns implementation into execution against a plan instead of design-by-accident.
