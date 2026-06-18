<div align="center">

# 🪐 Skillpacks

### Drop-in skill packs for Claude Code, Codex, and any coding agent — organized by discipline, beginner to expert.

Install a pack, your agent gets better at the job. Copy-paste ready. Tested. Not a link farm.

[![CI](https://github.com/buildmoonshot/skillpacks/actions/workflows/ci.yml/badge.svg)](https://github.com/buildmoonshot/skillpacks/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/skillpacks-cli.svg)](https://www.npmjs.com/package/skillpacks-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-21-blue.svg)](#-the-catalog)
[![Disciplines](https://img.shields.io/badge/disciplines-engineering%20%7C%20gis-8a2be2.svg)](#-the-catalog)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

<br>

<img src="assets/demo.gif" alt="Add a skill pack to your coding agent with one command" width="820">

</div>

---

## The problem

Coding agents are powerful and *wildly* inconsistent. The same model writes a surgical 3-line fix one minute and refactors your whole file unprompted the next — and it's even shakier in a specialized domain like GIS, where it'll cheerfully run a spatial join across mismatched coordinate systems. The fix isn't a smarter model — it's better **instructions**. Expert practitioners quietly accumulate a private stash of rules that reliably steer the agent.

**Skillpacks is that stash — made public, tested, and one command away.** It's organized by **discipline**, each with a beginner → expert path, so you install exactly the expertise your work needs.

## 🌱 New to all this? Start here (60 seconds)

Never used a "skill" or a `CLAUDE.md` before? You're exactly who the beginner skills are for.

- **What's a skill?** A small `SKILL.md` file with instructions your agent loads automatically. Its `description` tells the agent *when* to use it. It lives in your project's `.claude/skills/` folder.
- **What's a `CLAUDE.md`?** A plain-text file where you write standing rules for the agent ("always do X"). Every skill here also works as a `CLAUDE.md` rule — just paste it in.

```bash
# Add your first skill — one command, nothing to install
npx skillpacks-cli add explain-as-you-go
```

That drops the skill into `.claude/skills/` and your agent picks it up automatically. Want to see what you're getting first? Every skill is a plain file you can also copy by hand — see [How to use a skill](#how-to-use-a-skill).

## 📚 The catalog

Organized by **discipline**, each beginner → expert. Install a whole discipline (`add gis`), one level (`add engineering beginner`), or a single skill (`add crs-discipline`).

### 🛠️ engineering — *make any agent a better software engineer*

| Skill | Level | Fixes |
|-------|-------|-------|
| [**explain-as-you-go**](skills/engineering/beginner/explain-as-you-go) | beginner | Agent hands you code you don't understand — start here if you're learning |
| [**ask-dont-assume**](skills/engineering/beginner/ask-dont-assume) | beginner | Agent silently picks one reading of an ambiguous request |
| [**plan-then-build**](skills/engineering/beginner/plan-then-build) | beginner | Agent dives into a big task and builds the wrong approach |
| [**read-before-edit**](skills/engineering/beginner/read-before-edit) | beginner | Agent edits code it never read and breaks a hidden caller |
| [**surgical-edits**](skills/engineering/beginner/surgical-edits) | beginner | Agent changes code you didn't ask it to touch |
| [**verify-before-done**](skills/engineering/beginner/verify-before-done) | beginner | Agent says "Fixed! ✅" without actually checking |
| [**check-the-docs**](skills/engineering/intermediate/check-the-docs) | intermediate | Agent invents plausible-but-fake API calls from memory |
| [**test-first**](skills/engineering/intermediate/test-first) | intermediate | Agent "fixes" a bug with no test and it quietly comes back |
| [**commit-hygiene**](skills/engineering/intermediate/commit-hygiene) | intermediate | Agent dumps unrelated edits into one vague "update" commit |
| [**keep-it-simple**](skills/engineering/intermediate/keep-it-simple) | intermediate | Agent builds a configurable framework when you asked for a function |
| [**refactor-safely**](skills/engineering/expert/refactor-safely) | expert | A "harmless cleanup" silently changes behavior and breaks prod |
| [**security-pass**](skills/engineering/expert/security-pass) | expert | Agent ships injection, a leaked secret, or a missing auth check |
| [**spec-driven-development**](skills/engineering/expert/spec-driven-development) | expert | Agent codes a big feature first, hits the design wall, rewrites |

### 🗺️ gis — *spatial work, written by an actual GIS professional*

| Skill | Level | Fixes |
|-------|-------|-------|
| [**crs-discipline**](skills/gis/beginner/crs-discipline) | beginner | Spatial ops on mismatched/undefined coordinate systems — the #1 GIS bug |
| [**validate-geometry**](skills/gis/beginner/validate-geometry) | beginner | Self-intersecting polygons that silently corrupt joins, dissolves, areas |
| [**spatial-join-sanity**](skills/gis/intermediate/spatial-join-sanity) | intermediate | Joins that silently multiply or drop rows, or use the wrong predicate |
| [**postgis-query-patterns**](skills/gis/intermediate/postgis-query-patterns) | intermediate | Spatial SQL that's silently wrong (SRID) or slow (no index) |
| [**ogr2ogr-recipes**](skills/gis/intermediate/ogr2ogr-recipes) | intermediate | Guessed GDAL flags that drop the CRS, truncate fields, or skip features |
| [**arcpy-safe-edits**](skills/gis/expert/arcpy-safe-edits) | expert | Bare cursors that deadlock or corrupt versioned enterprise (SDE) data |
| [**arcpy-vs-arcgis-api**](skills/gis/expert/arcpy-vs-arcgis-api) | expert | Picking the wrong Esri Python library and finding out after a rewrite |
| [**raster-at-scale**](skills/gis/expert/raster-at-scale) | expert | OOM crashes and wrong resampling on multi-GB rasters |

*More disciplines and skills landing soon — data engineering next. [Suggest one →](CONTRIBUTING.md)*

## How to use a skill

**The easy way — the CLI** (nothing to install, runs via `npx`):
```bash
npx skillpacks-cli list                       # browse everything
npx skillpacks-cli add crs-discipline         # one skill by name
npx skillpacks-cli add gis                     # a whole discipline
npx skillpacks-cli add engineering beginner    # one level of a discipline
```
Skills land in `./.claude/skills/`, which Claude Code loads automatically.

**By hand** (if you'd rather copy the file yourself):
```bash
mkdir -p .claude/skills/<name>
cp skills/<discipline>/<level>/<name>/SKILL.md .claude/skills/<name>/
```

**As a `CLAUDE.md` rule** (always on): open the skill's `SKILL.md`, copy the rules, paste them into your project's `CLAUDE.md`.

## Why trust these?

Every skill ships with:
- ✅ A one-sentence **problem** it solves
- ✅ A **before/after** showing the exact behavior change
- ✅ A **trigger description** tuned so the agent invokes it at the right moment — and stays out of the way otherwise
- ✅ **Pairs-well-with** links so skills compose into a workflow

## Contributing

Got a rule or skill that reliably makes your agent better — in any discipline? That's the whole point — [open a PR](CONTRIBUTING.md). Issues labeled `good-first-issue` are a friendly place to start, even if you're new to GitHub.

## License

MIT — see [LICENSE](LICENSE). Use these anywhere, commercially or not.

---

<div align="center">
<sub>Built for everyone who's tired of telling their agent the same rules every session. ⭐ it so you can find it again.</sub>
</div>
