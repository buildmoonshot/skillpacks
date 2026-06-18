# spatial-join-sanity

**Fixes:** spatial joins that quietly inflate or drop records, or use the wrong predicate, and hand back a normal-looking table with the wrong numbers in it.

**Discipline:** GIS · **Level:** Analysis · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add spatial-join-sanity
```

## Before / After

**Task:** *"Join these 10,000 address points to the census block they fall in."*

| ❌ Without | ✅ With spatial-join-sanity |
|-----------|----------------------------|
| Uses an `intersects` join. Points sitting exactly on block boundaries match **two** blocks each, so the output has 10,240 rows — and nobody notices the 240 duplicated addresses now double-counted in every downstream total. | Uses `within` (a point belongs to one block), confirms shared CRS first, and checks the count: 10,000 in → 10,000 out. Flags the handful of points that landed exactly on a boundary and picks one block deliberately. |

## Why the trigger works

Scoped to *spatial joins and location-based filters* — the operation where predicate choice and cardinality silently determine whether your counts are right. It pulls in `crs-discipline` and `validate-geometry` as preconditions.

## Pairs well with

[`crs-discipline`](../../beginner/crs-discipline) and [`validate-geometry`](../../beginner/validate-geometry) — the two things that must be true before any join can be trusted.
