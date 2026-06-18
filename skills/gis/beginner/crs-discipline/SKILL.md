---
name: crs-discipline
description: Use when working with spatial data — before a spatial join, a distance or area measurement, an overlay, or combining two datasets. Makes the agent confirm every dataset's coordinate reference system (CRS), refuse to assume an undefined one, and reproject everything to a common, operation-appropriate CRS first.
---

# CRS Discipline

Coordinate reference systems are the #1 source of silent, serious GIS errors. Before any spatial operation, **know the CRS of every dataset, and make them match.**

## Rules

1. **Determine the CRS of every input before using it.** Check it explicitly — the `.prj` for a shapefile, the SRID in PostGIS, the spatial reference of a feature class, `gdf.crs` in GeoPandas. Never start a spatial operation on data whose CRS you haven't confirmed.

2. **Treat an undefined CRS as a stop sign, not a default.** Data with no embedded CRS — a shapefile missing its `.prj`, an SRID of 0 or "unknown" — is the classic trap: it lines up perfectly on the author's machine but is meaningless anywhere else. **Do not assume it's WGS84.** Infer the likely CRS from the coordinate ranges (values in −180..180 → geographic degrees; large numbers in meters or feet → projected) and **confirm with the source before proceeding.**

3. **Reproject to a common CRS before combining data.** Spatial joins, overlays, clips, and distance/area math require all inputs in the *same* CRS. Align them first — don't let a library silently compare coordinates in two different systems.

4. **Match the CRS to the operation.** Use a geographic CRS (e.g., EPSG:4326) for storage and web display; use an appropriate *projected* CRS (the right UTM zone, State Plane, or an equal-area projection) for distance, area, and buffer calculations. Measuring length or area in degrees is a bug.

5. **Never confuse "define" with "project."** *Defining* a CRS labels data whose coordinates are already correct but unlabeled. *Projecting* transforms the coordinates. Mixing them up corrupts data: defining a new CRS onto already-correct data teleports it to the wrong place. This is `Define Projection` vs `Project` in ArcPy, `ST_SetSRID` vs `ST_Transform` in PostGIS, `.set_crs()` vs `.to_crs()` in GeoPandas. Know which one the situation calls for.

## Why this matters

A CRS mismatch rarely throws an error — it returns confident, wrong answers: features that don't intersect when they should, distances off by orders of magnitude, layers stacked in the wrong hemisphere. These bugs look like valid output, so they pass review and reach the map, where someone in the field catches them. Thirty seconds of CRS checking prevents an entire class of them.
