---
name: raster-at-scale
description: Use when processing raster or imagery data that is large — multi-gigabyte GeoTIFFs, mosaics, satellite scenes, DEMs — where loading the whole array into memory would fail or thrash. Makes the agent work in windows/tiles, use overviews and cloud-optimized formats, and avoid out-of-memory full-array reads.
---

# Raster at Scale

A large raster will not fit in memory, and the naive `read everything into a NumPy array` is how raster jobs crash. Process big rasters the way they're built to be processed.

## Don't load the whole thing

- Read in **windows/blocks**, not all at once (`rasterio` windowed reads, GDAL block reads). Process tile by tile and write tile by tile.
- Read in the raster's **native block size** where you can — aligned reads are far faster than arbitrary windows.

## Use the right format and pyramids

- Prefer **Cloud-Optimized GeoTIFF (COG)** for efficient partial/range reads.
- Build **overviews** (`gdaladdo`) so display and downsampled analysis don't touch full resolution.
- For chunked array work, reach for `xarray`/`dask` or `rioxarray` rather than a monolithic array.

## Reproject and warp without loading

- Resample/reproject with **`gdalwarp`** (use `-multi -wo NUM_THREADS=ALL_CPUS`), not by reading arrays into Python.
- Pick the resampling method by data type: **nearest** for categorical/classified rasters (preserves class values), **bilinear/cubic** for continuous (elevation, imagery). Using bilinear on a land-cover raster invents classes that don't exist.

## Get the details right

- Honor the **NoData** value so it doesn't poison statistics or show up as real zeros.
- Confirm the CRS before warping or aligning to other layers (see `crs-discipline`).

## Why this matters

The failure modes at scale are distinct: out-of-memory crashes, hour-long full-resolution passes that should have used overviews, and silently wrong resampling that corrupts categorical data. Windowed reads, COGs/overviews, and method-appropriate resampling turn an unworkable raster job into a fast, correct one.
