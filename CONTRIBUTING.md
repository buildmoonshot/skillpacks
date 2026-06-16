# Contributing to Skillpacks

Thanks for wanting to make agents better for everyone. **New to GitHub? You're welcome here** — issues labeled `good-first-issue` are designed for a first contribution, and we'll help you through your first PR.

## What makes a good skill

A skill earns its place if it reliably changes agent behavior for the better. Before proposing one, ask:

1. **Does it fix a real, recurring failure?** "The agent keeps doing X when I want Y." Not a hypothetical.
2. **Is it focused?** One skill, one behavior. Split "be a better engineer" into specific, triggerable skills.
3. **Is the trigger right?** The `description` decides *when* the agent loads it. It should fire in the right situation and stay quiet otherwise.
4. **Can you show a before/after?** If you can't demonstrate the behavior change, it's not ready.

## Skill anatomy

Every skill lives in `skills/<level>/<name>/` with two files:

```
skills/<level>/<name>/
├── SKILL.md     # the artifact: YAML frontmatter (name, description) + the rules
└── README.md    # problem it fixes, install, before/after, pairs-well-with
```

**Levels:** `beginner` (steering fundamentals), `intermediate` (quality bar), `expert` (advanced workflows). Unsure? Propose one in your PR and we'll figure it out together.

### `SKILL.md` template

```markdown
---
name: your-skill-name
description: Use when <the exact situation that should trigger this>. <One line on what it makes the agent do.>
---

# Your Skill Name

<One-sentence statement of the rule.>

## What to do
1. ...
2. ...

## Why this matters
<The cost of not doing it.>
```

The `description` is the most important line — write it as *"Use when …"* describing the concrete trigger situation, not a summary of the skill.

## How to contribute

1. **Open an issue first** for a new skill or a big change, so we can align before you write it. Small fixes (typos, clearer wording) can go straight to a PR.
2. Fork, branch, add your `skills/<level>/<name>/` folder.
3. Update the catalog table in `README.md` and bump the skill-count badge.
4. Open a PR. Include your before/after in the description.

## Ground rules

- **Tested, not theoretical.** Skills should reflect behavior you've actually observed and improved.
- **Keep it model-agnostic** where you can — these should help Claude Code, Codex, Cursor, and others.
- **Be kind.** Beginners ship their first-ever PR here. Review like you'd want to be reviewed.
