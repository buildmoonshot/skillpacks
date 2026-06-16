<div align="center">

# 🪐 Skillpacks

### A beginner-to-expert curriculum of drop-in skills for Claude Code, Codex, and any coding agent.

Install a skill, your agent gets better. Climb the levels, *you* get better.
Copy-paste ready. Tested. Not a link farm.

[![npm](https://img.shields.io/npm/v/skillpacks-cli.svg)](https://www.npmjs.com/package/skillpacks-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-7-blue.svg)](#-the-catalog)
[![Levels](https://img.shields.io/badge/levels-beginner%20%E2%86%92%20expert-8a2be2.svg)](#-the-catalog)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## The problem

Coding agents are powerful and *wildly* inconsistent. The same model writes a surgical 3-line fix one minute and refactors your whole file unprompted the next. The fix isn't a smarter model — it's better **instructions**. Expert users quietly accumulate a private stash of rules and skills that reliably steer the agent.

**Skillpacks is that stash — made public, tested, leveled, and one copy-paste away.** And because it's organized beginner → expert, it doubles as a way to *learn* how to drive a coding agent well.

## 🌱 New to all this? Start here (60 seconds)

Never used a "skill" or a `CLAUDE.md` before? You're exactly who the Beginner pack is for.

- **What's a skill?** A small `SKILL.md` file with instructions your agent loads automatically. Its `description` tells the agent *when* to use it. You drop it in your project's `.claude/skills/` folder — that's it.
- **What's a `CLAUDE.md`?** A plain-text file in your project where you write standing rules for the agent ("always do X"). Every skill here also works as a `CLAUDE.md` rule — just paste it in.
- **How do I use one?** Pick a skill below → copy its `SKILL.md` into `.claude/skills/<name>/` → done. Your agent now follows it.

```bash
# Add your first skill — one command, nothing to install
npx skillpacks-cli add explain-as-you-go
```

That drops the skill into `.claude/skills/` and your agent picks it up automatically. Want to see what you're getting first? Every skill is a plain file you can also copy by hand — see [How to use a skill](#how-to-use-a-skill).

## 📚 The catalog

Climb from the bottom. Get comfortable with a level, then level up.

### 🟢 Beginner — *learn to steer the agent*
| Skill | Fixes |
|-------|-------|
| [**explain-as-you-go**](skills/beginner/explain-as-you-go) | Agent hands you code you don't understand — start here if you're learning |
| [**plan-then-build**](skills/beginner/plan-then-build) | Agent dives in on a vague request and builds the wrong thing |
| [**surgical-edits**](skills/beginner/surgical-edits) | Agent changes code you didn't ask it to touch |
| [**verify-before-done**](skills/beginner/verify-before-done) | Agent says "Fixed! ✅" without actually checking |

### 🟡 Intermediate — *raise the quality bar*
| Skill | Fixes |
|-------|-------|
| [**check-the-docs**](skills/intermediate/check-the-docs) | Agent invents plausible-but-fake API calls from memory |
| [**test-first**](skills/intermediate/test-first) | Agent "fixes" a bug with no test and it quietly comes back |

### 🔴 Expert — *advanced workflows*
| Skill | Fixes |
|-------|-------|
| [**refactor-safely**](skills/expert/refactor-safely) | A "harmless cleanup" silently changes behavior and breaks prod |

*More expert skills landing soon: spec-driven development, security passes, subagent patterns. [Suggest one →](CONTRIBUTING.md)*

## How to use a skill

**The easy way — the CLI** (nothing to install, runs via `npx`):
```bash
npx skillpacks-cli list                  # browse everything
npx skillpacks-cli add surgical-edits    # add one skill
npx skillpacks-cli add beginner          # add a whole level pack
```
Skills land in `./.claude/skills/`, which Claude Code loads automatically.

**By hand** (if you'd rather copy the file yourself):
```bash
mkdir -p .claude/skills/<name>
cp skills/<level>/<name>/SKILL.md .claude/skills/<name>/
```

**As a `CLAUDE.md` rule** (always on): open the skill's `SKILL.md`, copy the rules, paste them into your project's `CLAUDE.md`.

## Why trust these?

Every skill ships with:
- ✅ A one-sentence **problem** it solves
- ✅ A **before/after** showing the exact behavior change
- ✅ A **trigger description** tuned so the agent invokes it at the right moment — and stays out of the way otherwise
- ✅ **Pairs-well-with** links so skills compose into a workflow

## Contributing

Got a rule or skill that reliably makes your agent better? That's the whole point — [open a PR](CONTRIBUTING.md). Issues labeled `good-first-issue` are a friendly place to start, even if you're new to GitHub.

## License

MIT — see [LICENSE](LICENSE). Use these anywhere, commercially or not.

---

<div align="center">
<sub>Built for everyone who's tired of telling their agent the same three rules every session. ⭐ it so you can find it again.</sub>
</div>
