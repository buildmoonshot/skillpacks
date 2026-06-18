---
name: spatial-join-sanity
description: Use when performing a spatial join or location-based filter between two layers — joining attributes by location, or selecting features that intersect, contain, or fall within another layer. Makes the agent pick the correct spatial predicate, confirm CRS and geometry preconditions, and handle one-to-many matches deliberately instead of silently inflating or dropping records.
---

# Spatial Join Sanity

A spatial join is where CRS bugs, geometry bugs, and cardinality bugs all converge. Do it deliberately.

## Before the join

1. **Confirm both layers share a CRS** (see `crs-discipline`) and have **valid geometry** (see `validate-geometry`). A spatial join across mismatched CRSs returns wrong matches with no error.

2. **Pick the predicate that matches the question.** Don't default to "intersects" for everything:
   - points-in-polygons → `within` / `contains`
   - any overlap → `intersects`
   - shared boundary / adjacency → `touches`
   - "near, within N meters" → a distance predicate (`ST_DWithin`, `near`) — **not** intersects, and not a post-hoc distance filter.

## Handle cardinality on purpose

A spatial join is **one-to-many.** A point on a shared border matches *both* polygons; overlapping polygons multiply rows. Decide explicitly:
- keep all matches, or
- keep the largest-overlap / nearest / first match.

Don't let the join silently change your record count.

## Sanity-check the result

Compare input vs output row counts and state it. If a 10,000-point layer becomes 14,000 rows after a join to polygons, that's a boundary/overlap multiplication that needs an explanation — not something to hand over unnoticed. A point count that *drops* means unmatched features fell out of an inner join; decide whether that's intended.

## Why this matters

Spatial joins produce a table that looks normal whether or not it's correct. The errors — wrong predicate, CRS mismatch, silent row multiplication — don't surface as crashes; they surface as a deliverable with the wrong counts. A predicate chosen on purpose and a row-count check catch them before they ship.
