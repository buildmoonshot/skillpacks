# ogr2ogr-recipes

**Fixes:** guessed `ogr2ogr` commands that "succeed" while silently truncating field names, dropping the CRS, or skipping features — and the shapefile-by-default habit that causes half of it.

**Discipline:** GIS · **Level:** Analysis · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add ogr2ogr-recipes
```

## Before / After

**Task:** *"Convert this GeoJSON to load into our PostGIS database, reprojected to 3857."*

| ❌ Without | ✅ With ogr2ogr-recipes |
|-----------|------------------------|
| `ogr2ogr out.shp in.geojson` then a separate load — to a **shapefile**, truncating `customer_segment` → `customer_s`, and never reprojecting. The DB load then chokes on mixed single/multi polygons. | One correct command: `ogr2ogr -f PostgreSQL "PG:…" in.geojson -t_srs EPSG:3857 -nln public.parcels -nlt PROMOTE_TO_MULTI -lco GEOMETRY_NAME=geom`. Field names intact, reprojected, multi-promoted, loaded. Verified with `ogrinfo -so` before and after. |

## Why the trigger works

Scoped to *GDAL/OGR vector conversions and loads* — where a wrong flag fails silently rather than loudly, and where format choice (GeoPackage vs shapefile) prevents a whole class of data loss.

## Pairs well with

[`crs-discipline`](../../beginner/crs-discipline) — `-s_srs` vs `-t_srs` is the command-line face of define-vs-project.
