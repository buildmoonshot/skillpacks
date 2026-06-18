---
name: postgis-query-patterns
description: Use when writing PostGIS or spatial SQL — distance, proximity, intersection, or geometry storage queries. Makes the agent use correct SRIDs, spatial indexes, and the right ST_ functions, so spatial SQL is both correct and fast instead of silently slow or wrong.
---

# PostGIS Query Patterns

PostGIS rewards correct spatial SQL and quietly punishes the rest with wrong answers or full table scans. Follow the patterns.

## Storage & SRID

- Store geometry with a known SRID (typmod like `geometry(Point, 4326)` or `ST_SetSRID`). Operations between different SRIDs error or mislead — `ST_Transform` to align.
- Choose **`geography`** for accurate distances over large/global areas (meters on a sphere); **`geometry`** in an appropriate projected CRS for fast planar math.

## Make queries use the index

- Put a **GiST index** on every geometry column you query.
- Use index-assisted operators/functions: `&&`, `ST_Intersects`, `ST_DWithin`. These hit the index.
- **Avoid `ST_Distance(a, b) < x` in a WHERE clause** — it can't use the index and forces a full scan. Use `ST_DWithin(a, b, x)` instead.

## Correctness gotchas

- `&&` is **bounding-box only** — fast but approximate. Use it as a prefilter, then `ST_Intersects` for the exact test.
- Validate geometry before overlays (`ST_IsValid` / `ST_MakeValid`) — see `validate-geometry`.
- `ST_DWithin` distance units follow the type: meters for `geography`, CRS units for `geometry` (degrees if you left it in 4326 — usually not what you want for a distance).

## Why this matters

Spatial SQL fails quietly in two directions: wrong SRID or wrong function gives a confident wrong answer, and a missing index turns a sub-second query into a minutes-long table scan that still "works" in testing and falls over in production. The patterns above keep queries both correct and fast.
