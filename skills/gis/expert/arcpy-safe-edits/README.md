# arcpy-safe-edits

**Fixes:** an ArcPy script that edits enterprise (SDE) data with a bare `UpdateCursor` — deadlocking other editors, leaving half-applied transactions, or violating versioning and related-class integrity.

**Discipline:** GIS · **Level:** Production / Enterprise · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add arcpy-safe-edits
```

## Before / After

**Task:** *"Bump the `status` field to 'inspected' for these 2,000 parcels in the SDE."*

| ❌ Without | ✅ With arcpy-safe-edits |
|-----------|-------------------------|
| Opens a bare `arcpy.da.UpdateCursor` on the versioned feature class, no edit session. The edits fail silently on versioned data (or error mid-way), the cursor leaks a lock that blocks the GIS team, and there's no rollback. | Opens `arcpy.da.Editor` with `multiuser_mode=True` on the correct version, runs the `UpdateCursor` inside a `with` block, wraps it in try/except so any failure aborts the operation cleanly, and reports how many rows changed. Locks released, edit atomic. |

## Why the trigger works

Scoped to *editing enterprise/versioned geodatabase data with ArcPy* — where the difference between a file edit and a multiuser transaction is the difference between a clean update and a corrupted production database.

## Pairs well with

[`verify-before-done`](../../../engineering/beginner/verify-before-done) — confirm the row count actually changed — and [`read-before-edit`](../../../engineering/beginner/read-before-edit) — know the schema, domains, and version before you write.
