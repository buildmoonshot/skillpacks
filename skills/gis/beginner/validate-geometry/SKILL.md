---
name: validate-geometry
description: Use before running spatial operations — joins, overlays, buffers, dissolves, area or length calculations — on vector data, especially data from an external or non-GIS source. Makes the agent check for invalid geometries and repair them deliberately first, instead of letting them silently corrupt the result or crash the operation.
---

# Validate Geometry

Invalid geometries are the second great source of silent GIS errors. Before spatial operations, **check validity and repair deliberately.**

## What to check

Before an overlay, join, buffer, or dissolve, verify the geometries are valid and clean:

- **Validity** — self-intersections ("bowties"), unclosed rings, wrong ring orientation. Use `ST_IsValid` (PostGIS), `.is_valid` (Shapely/GeoPandas), `Check Geometry` (ArcPy), or `ogrinfo` (GDAL).
- **Empties and nulls** — null or empty geometries that will break joins or produce surprising results.
- **Geometry-type consistency** — mixed single/multi, or polygons and lines living in one layer.
- **Duplicate vertices and slivers** that throw off topology.

## Repair deliberately, not blindly

- Use the right repair tool: `ST_MakeValid` (PostGIS), `make_valid()` (Shapely — and know the older `buffer(0)` trick can silently drop slivers), `Repair Geometry` (ArcPy), `ogr2ogr -makevalid` (GDAL).
- **Understand what the repair changed.** Repair can split a feature, drop a sliver, or turn a polygon into a multipolygon. Report it — *"repaired 14 self-intersecting polygons; 2 became multipolygons"* — instead of silently mutating the data.
- Repair a copy, or clearly flag the change. Don't quietly overwrite the source.

## Why this matters

An invalid polygon doesn't announce itself. It makes an intersection return empty, a dissolve leak across boundaries, or an area come back negative — output that *looks* valid and passes review on its way to the map. Checking validity before the operation turns a silent wrong answer into either a clean result or an explicit "here's what I had to fix."
