# arcpy-vs-arcgis-api

**Fixes:** picking the wrong Esri Python library and discovering it too late — an `import arcpy` that fails on a license-less server, or a hand-rolled REST mess where the ArcGIS API for Python already had a one-liner.

**Discipline:** GIS · **Level:** Production / Enterprise · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add arcpy-vs-arcgis-api
```

## Before / After

**Task:** *"Write a scheduled job that updates our hosted feature layer from a nightly CSV — it'll run on a Linux server."*

| ❌ Without | ✅ With arcpy-vs-arcgis-api |
|-----------|----------------------------|
| Writes it with `arcpy.da.UpdateCursor`. It works on the dev's Pro machine, then dies on the Linux server: ArcPy isn't there and there's no Pro license. The whole job has to be rewritten. | Recognizes "hosted feature layer + license-less server" → uses the **ArcGIS API for Python**: `GIS()` + `FeatureLayer.edit_features()`/`append()`. Runs anywhere Python does, no Pro license. Right the first time. |

## Why the trigger works

Scoped to *the start of an ArcGIS automation task* — the moment the library choice is made, while it's still free to change instead of a rewrite.

## Pairs well with

[`spec-driven-development`](../../../engineering/expert/spec-driven-development) — name the environment and data sources up front, and this decision falls out of the spec.
