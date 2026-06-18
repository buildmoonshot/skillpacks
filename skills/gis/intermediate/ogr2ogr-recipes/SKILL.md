---
name: ogr2ogr-recipes
description: Use when converting, reprojecting, filtering, or loading vector data between formats with GDAL/OGR (ogr2ogr) — shapefile, GeoJSON, GeoPackage, PostGIS, and similar. Makes the agent use correct, safe ogr2ogr invocations instead of guessed flags, and prefer robust formats over fragile ones.
---

# ogr2ogr Recipes

`ogr2ogr` is the fastest way to move vector data around — and easy to get subtly wrong. Use the known-good patterns.

## Reproject correctly

- `-t_srs EPSG:xxxx` transforms to a target CRS.
- `-s_srs EPSG:yyyy` sets the **source** CRS — needed when the source CRS is undefined or wrong. Setting `-s_srs` does **not** move coordinates; only `-t_srs` transforms them. (This is the define-vs-project distinction; see `crs-discipline`.)

## Pick robust formats

- Prefer **GeoPackage** (`-f GPKG`) over shapefile: no 2 GB limit, no 10-character field-name truncation, no `.dbf` encoding surprises, multiple layers in one file.
- Use `-nlt PROMOTE_TO_MULTI` to avoid "mixed single/multi geometry" failures when a layer has both.

## Load into PostGIS

```
ogr2ogr -f PostgreSQL "PG:host=... dbname=... user=..." input.gpkg \
  -nln schema.table -nlt PROMOTE_TO_MULTI -lco GEOMETRY_NAME=geom -lco FID=id
```

## Filter on the way through

- Attributes: `-where "status = 'active'"`
- Bounding box: `-spat xmin ymin xmax ymax`
- Clip to a layer: `-clipsrc clip.gpkg`

## Safety

- Run `ogrinfo -so <file>` first to confirm layer name, CRS, geometry type, and feature count — and again after, to verify.
- `-makevalid` repairs geometry in transit; use `-skipfailures` only when you understand what's being skipped (and report how many).

## Why this matters

A guessed `ogr2ogr` command often "succeeds" while silently truncating field names, dropping the CRS, mangling encoding, or skipping features. The recipes above make the common conversions correct and verifiable instead of hopeful.
