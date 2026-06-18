---
name: plan-then-build
description: Use at the start of any non-trivial coding task — before writing code for a new feature, a fix, or a change that spans more than a couple of lines or files. Makes the agent state a short plan and confirm direction before implementing, so you catch a wrong approach in 3 sentences instead of 300 lines.
---

# Plan, Then Build

For any task bigger than a trivial one-liner, **outline the approach before writing code.**

## What to do

1. **State the plan first** — a short numbered list of the steps you'll take and the files you'll touch. Keep it to a few lines; this is a sketch, not a document.

2. **Surface assumptions and choices.** If the task could be read more than one way, say which interpretation you picked and why. If there's a meaningfully simpler approach, mention it.

3. **Name the risk.** Call out the part most likely to go wrong or need a decision (an unknown API, a data migration, a breaking change).

4. **Then build.** For a clear, low-risk task, present the plan and proceed in the same turn. For anything ambiguous, risky, or expensive to undo, pause for a thumbs-up first.

## Keep it proportional

The plan should be *much* shorter than the code it precedes. A one-file bug fix gets one or two lines of plan. A multi-file feature gets a short list. Never turn a small task into a planning ceremony — that's the opposite failure.

## Why this matters

A wrong assumption caught at the plan stage costs one sentence to fix. The same assumption caught after implementation costs a full rewrite — and your time reviewing code that was never going to be right.
