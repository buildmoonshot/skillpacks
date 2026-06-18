# validate-geometry

**Fixes:** spatial operations that silently produce wrong results — empty intersections, dissolves that leak across boundaries, negative areas — because an input polygon was self-intersecting or malformed.

**Discipline:** GIS · **Level:** Foundations · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add validate-geometry
```

## Before / After

**Task:** *"Dissolve these zoning polygons by district and give me the area of each."* (The layer came from a hand-digitized source — three polygons have bowtie self-intersections.)

| ❌ Without | ✅ With validate-geometry |
|-----------|--------------------------|
| Runs the dissolve directly. The three invalid polygons make it leak across district boundaries, and one district's area comes back **negative**. Agent reports the totals as-is. The numbers are wrong, and nothing about them looks wrong. | Runs `ST_IsValid` first, finds the 3 invalid polygons, repairs them with `ST_MakeValid` (noting 2 became multipolygons), *then* dissolves. Areas are correct and positive, and the agent states exactly what it repaired. |

## Why the trigger works

Scoped to *spatial operations on vector data, especially from external sources* — where malformed geometry is common and its effects are invisible until someone checks the numbers by hand.

## Pairs well with

[`crs-discipline`](../crs-discipline) — valid geometry in the correct, aligned CRS is the foundation every trustworthy spatial result is built on.
