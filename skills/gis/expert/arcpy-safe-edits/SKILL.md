---
name: arcpy-safe-edits
description: Use when editing data in an Esri enterprise geodatabase (SDE) or any versioned, networked, or topology-participating data with ArcPy — updating, inserting, or deleting features. Makes the agent use edit sessions, respect versioning and locks, and avoid corrupting multiuser geodatabase data.
---

# ArcPy Safe Edits

Editing an enterprise geodatabase is not editing a file. Versioning, locks, and related data make "just run an UpdateCursor" a way to corrupt production. Edit safely.

## Use an edit session

- Wrap edits in `arcpy.da.Editor(workspace)` with `startEditing()` / `startOperation()`. An edit session is **required** for versioned data, and for data participating in topologies, geometric/utility networks, relationship classes, or attribute rules.
- Choose the right mode: `startEditing(with_undo, multiuser_mode)` — `multiuser_mode=True` for versioned SDE, `False` for nonversioned.
- On error, `abortOperation()` / `stopEditing(save_changes=False)`; only `stopEditing(True)` after success. Wrap in try/except so a failure rolls back instead of leaving a half-applied edit.

## Manage cursors and locks

- Use `arcpy.da.UpdateCursor` / `InsertCursor` **inside** the edit session, always with a `with` block (or `del` the cursor) so it releases its lock. A leaked cursor holds a lock that blocks every other editor.
- Don't hold a schema lock longer than needed; ensure no ArcGIS Pro session or other process has the dataset open when you need exclusive access.

## Respect versioning

- Edit the **correct version**, not `DEFAULT` directly in a multiuser workflow. Understand the reconcile/post cycle; leave reconcile/post and `Compress` to the established workflow (often a DBA task), don't improvise them.

## Respect data integrity

- Honor domains, subtypes, and attribute rules — writing an out-of-domain value or bypassing a rule corrupts data quietly.
- Test on a copy or a non-default version first. Never debug edit logic against production DEFAULT.

## Why this matters

A naive cursor edit on versioned SDE can deadlock other editors, leave a half-applied transaction, or violate referential integrity across related classes — and the damage is multiuser and hard to undo. Edit sessions, scoped locks, and the right version turn risky writes into safe, atomic ones.
