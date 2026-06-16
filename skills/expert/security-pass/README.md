# security-pass

**Fixes:** the agent ships SQL injection, a hardcoded API key, or a missing authorization check — not from malice, but because nobody looked before calling it done.

**Level:** Expert · **Type:** Claude Code skill (`SKILL.md`) or `CLAUDE.md` rule-pack

## Install

```bash
npx skillpacks-cli add security-pass
```

## Before / After

**Task:** *"Add an endpoint to fetch an order by ID."*

| ❌ Without | ✅ With security-pass |
|-----------|----------------------|
| `db.query("SELECT * FROM orders WHERE id = " + req.params.id)` and returns it to any logged-in user. Two bugs: SQL injection **and** no check that the order belongs to the caller. | Uses a parameterized query, and adds `WHERE id = $1 AND user_id = $2` so a user can't read someone else's order by guessing IDs. Notes both fixes in the summary. |

## Why the trigger works

Scoped to *security-sensitive code* — untrusted input, auth, secrets, queries, file paths. It runs the self-review exactly where vulnerabilities are born, and stays out of the way for plain logic that has no attack surface.

## Pairs well with

[`verify-before-done`](../../beginner/verify-before-done) — security-pass checks the change is *safe*, verify-before-done checks it *works*. Both gates before "done."
