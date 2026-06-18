# crs-discipline

**Fixes:** spatial operations that return confidently wrong results because two datasets are in different — or undefined — coordinate systems. The single most common GIS mistake.

**Discipline:** GIS · **Level:** Foundations · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add crs-discipline
```

## Before / After

**The scenario every GIS pro has lived:** a civil engineer sends you parcel shapefiles. They open fine on *their* machine. But the `.prj` never made it across, so the CRS is undefined — and the coordinates are actually State Plane feet, not lat/long.

**Task:** *"Join these parcels to the flood zones (EPSG:4326) and tell me which parcels are at risk."*

| ❌ Without | ✅ With crs-discipline |
|-----------|------------------------|
| Loads both, runs the spatial join. The parcels have no CRS, so the library assumes 4326 — but the coordinates are State Plane feet, so the parcels land in the ocean off West Africa. The join returns **zero matches**. Agent reports *"no parcels at risk."* Confidently wrong, and dangerous. | Notices the shapefile has no `.prj`, sees coordinates like `(6,500,000, 2,100,000)` — clearly projected feet, not degrees — and **stops:** *"These parcels have no defined CRS and look like State Plane feet, not lat/long. Joining now would put them in the wrong place. Which State Plane zone is this?"* Then defines the correct CRS, reprojects both to a common one, and joins correctly. |

## Why the trigger works

Scoped to *spatial operations across multiple datasets* — exactly where CRS mismatches turn into silent, serious errors. It stays quiet on single-dataset bookkeeping and kicks in right before the join/measure/overlay where the mismatch would bite.

## Pairs well with

[`validate-geometry`](../validate-geometry) — the right CRS *and* valid geometry are the two preconditions for any spatial operation you can trust.
