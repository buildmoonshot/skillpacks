# spec-driven-development

**Fixes:** the agent starts a big feature by writing code, discovers the design problems halfway through, and you end up rewriting the foundation with three files already built on it.

**Level:** Expert · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add spec-driven-development
```

## Before / After

**Task:** *"Build a notifications system — email and in-app, with user preferences."*

| ❌ Without | ✅ With spec-driven-development |
|-----------|-------------------------------|
| Starts coding the email sender. Three files in, realizes preferences need to gate *both* channels, the data model can't express "email yes, in-app no," and retries weren't considered. Rewrites the core. | Writes a half-page spec first: data model for per-channel prefs, a `Notifier` interface with email/in-app implementations, the dispatch flow, edge cases (user opted out, send fails → retry). Confirms it, then builds straight through — no foundational rewrite. |

## Why the trigger works

Scoped to *substantial, multi-file, hard-to-reverse work* — where architecture decisions are made and where getting them wrong is expensive. It stays out of the way for small changes (that's what lightweight planning is for).

## Pairs well with

[`plan-then-build`](../../beginner/plan-then-build) is the lightweight version for small tasks; this is its heavyweight sibling for big ones. Follow with [`test-first`](../../intermediate/test-first) to build against the spec.
