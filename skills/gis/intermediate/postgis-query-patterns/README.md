# postgis-query-patterns

**Fixes:** spatial SQL that's silently wrong (mismatched SRID, bbox-only test mistaken for exact) or silently slow (a missing index turning a query into a full table scan).

**Discipline:** GIS · **Level:** Analysis · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add postgis-query-patterns
```

## Before / After

**Task:** *"Find every customer within 500 meters of a store."*

| ❌ Without | ✅ With postgis-query-patterns |
|-----------|-------------------------------|
| `WHERE ST_Distance(c.geom, s.geom) < 500` — on `geometry` columns still in EPSG:4326. Two bugs: the index can't be used (full cross scan, minutes), and "500" is **degrees**, not meters, so the radius is enormous. | `WHERE ST_DWithin(c.geog, s.geog, 500)` on `geography` columns — index-assisted and genuinely 500 meters. Sub-second, correct. |

## Why the trigger works

Scoped to *writing PostGIS/spatial SQL* — exactly where SRID, index usage, and `ST_` function choice decide whether the query is correct and fast or wrong and slow.

## Pairs well with

[`validate-geometry`](../../beginner/validate-geometry) (clean geometry before overlays) and [`crs-discipline`](../../beginner/crs-discipline) (right SRID for the job).
