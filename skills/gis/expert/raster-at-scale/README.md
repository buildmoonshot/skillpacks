# raster-at-scale

**Fixes:** raster jobs that crash with out-of-memory on a multi-gigabyte GeoTIFF, grind through full resolution when an overview would do, or silently corrupt a categorical raster with the wrong resampling.

**Discipline:** GIS · **Level:** Production / Enterprise · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add raster-at-scale
```

## Before / After

**Task:** *"Reproject this 12 GB land-cover raster to Web Mercator and compute class areas."*

| ❌ Without | ✅ With raster-at-scale |
|-----------|------------------------|
| `rasterio.open(...).read()` → tries to pull 12 GB into a NumPy array and the process is killed. After "fixing" it with more RAM, it reprojects with **bilinear** resampling — inventing fractional land-cover classes that never existed. | Reprojects with `gdalwarp -r near -multi` (nearest, because the data is categorical), reads in **windows** to tally class areas tile by tile, and never materializes the full array. Fast, in-memory-safe, and the class values stay intact. |

## Why the trigger works

Scoped to *large raster/imagery processing* — where memory limits and resampling choices, not logic, decide whether the job finishes and whether the output is correct.

## Pairs well with

[`crs-discipline`](../../beginner/crs-discipline) — confirm the CRS before warping — and [`keep-it-simple`](../../../engineering/intermediate/keep-it-simple) — windowed processing over clever in-memory tricks.
