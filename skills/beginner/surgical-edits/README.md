# surgical-edits

**Fixes:** the agent changes code you didn't ask it to touch — reformatting whole files, renaming variables, "improving" adjacent functions, and burying your actual fix in 200 lines of unrelated churn.

**Type:** Claude Code skill (`SKILL.md`) — also usable as a `CLAUDE.md` rule-pack (paste the Rules section).

## Install

```bash
mkdir -p .claude/skills/surgical-edits
cp SKILL.md .claude/skills/surgical-edits/
```

Or paste the **Rules** from [`SKILL.md`](SKILL.md) directly into your project's `CLAUDE.md`.

## Before / After

**Task given to the agent:** *"The `formatDate` helper returns the wrong month — it's off by one. Fix it."*

<table>
<tr><th>❌ Without the skill</th><th>✅ With surgical-edits</th></tr>
<tr><td>

- Fixes the `+1` month bug ✅
- Also "modernizes" the function to an arrow function
- Renames `d` → `inputDate` throughout
- Reformats the whole file (single → double quotes)
- Extracts an unrelated `padZero` helper
- **Diff: 60+ lines across the file**

Reviewer has to hunt for the one line that mattered.

</td><td>

- Fixes the `+1` month bug ✅
- Nothing else changes

**Diff: 1 line.**

```diff
- month: date.getMonth(),
+ month: date.getMonth() + 1,
```

Reviewer approves in 5 seconds.

</td></tr>
</table>

## Why the trigger works

The `description` frontmatter is scoped to *editing existing code* ("making a fix, adding a feature, or changing behavior in a file that already has working code"). That's the exact situation where over-editing happens, so the agent loads the skill right when it's needed — and stays out of the way when you're writing something new from scratch.

## Testing notes

Validated against the common failure mode where an agent, asked for a one-line fix, returns a large reformatted diff. With the skill loaded, diffs stay scoped to the request; when a broad change is genuinely needed, the agent announces it first instead of doing it silently.
