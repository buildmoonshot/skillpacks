# keep-it-simple

**Fixes:** you ask for a small feature and the agent delivers a configurable, abstracted, plugin-ready framework — 200 lines of speculative complexity where 20 would do.

**Level:** Intermediate · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add keep-it-simple
```

## Before / After

**Task:** *"Add a function to format a price as USD."*

| ❌ Without | ✅ With keep-it-simple |
|-----------|------------------------|
| Builds a `CurrencyFormatter` class with a locale registry, a config object, a plugin hook for custom symbols, and a factory — "in case you need other currencies later." | `const usd = n => \`$${n.toFixed(2)}\`` — one line. If a second currency is ever needed, generalize *then*, with the real requirement in hand. |

## Why the trigger works

Scoped to *the moment of temptation* — implementing something while reaching for abstraction or options nobody asked for. It nudges toward the direct solution without stopping you from adding real structure when there's a real reason.

## Pairs well with

[`surgical-edits`](../../beginner/surgical-edits) and [`plan-then-build`](../../beginner/plan-then-build) — plan the simple version, build only that.
