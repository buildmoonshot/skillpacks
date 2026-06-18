---
name: arcpy-vs-arcgis-api
description: Use when starting an Esri/ArcGIS automation task and choosing how to connect — deciding between ArcPy and the ArcGIS API for Python. Makes the agent pick the right library for the environment (local Pro/desktop geoprocessing vs web/Enterprise/Online feature services) instead of forcing the wrong one.
---

# ArcPy vs. ArcGIS API for Python

Esri has two Python doors, and picking the wrong one means a missing license, an impossible deploy, or a 10x-harder script. Choose deliberately before writing code.

## ArcPy — local Pro/Desktop + geoprocessing

- Runs inside the **ArcGIS Pro/Desktop** Python environment; needs a Pro license and install.
- Best for: heavy **geoprocessing** tools, editing **local file geodatabases and enterprise (SDE)** data, raster analysis, script/model tools, anything that leans on the desktop toolbox.
- Auth/context comes from the Pro install.

## ArcGIS API for Python (`arcgis`) — web GIS over REST

- Talks to **ArcGIS Online / Enterprise / Portal** over REST; **no Pro install required.**
- Best for: querying and editing **hosted feature layers/services**, portal/content/user administration, web maps, publishing, and running in a **server, notebook, or CI** without a desktop license.
- Auth is explicit: `GIS(url, user, pwd)` / tokens.

## The decision

- Local/SDE geodatabase + geoprocessing tools? → **ArcPy.**
- Hosted feature service / portal content / web layer, or running license-free on a server? → **ArcGIS API for Python.**
- Both are legitimate in one pipeline (e.g., ArcPy to process locally, the API to publish the result) — just don't force one into the other's job.

## Don't do this

- Don't reach for ArcPy in a license-less server/CI context — it won't import.
- Don't try to push heavy local geoprocessing through the web API, or hand-roll REST calls when `arcgis` already wraps them.

## Why this matters

This choice is made *before* any code, and it's expensive to reverse: discover it late and you've written a script that can't run where it needs to. Naming the environment (desktop vs web, licensed vs not) and the data (local gdb vs hosted service) up front picks the right tool the first time.
