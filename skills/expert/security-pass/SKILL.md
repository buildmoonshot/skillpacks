---
name: security-pass
description: Use after writing or modifying code that handles untrusted input, authentication, authorization, secrets, file paths, database queries, shell commands, or outbound requests — before treating it as done. Makes the agent review its own change for common vulnerabilities instead of shipping them.
---

# Security Pass

Before calling security-sensitive code done, **review your own change like an attacker would.** Most vulnerabilities are introduced by people who simply didn't look.

## Run the checklist on what you changed

- **Injection.** Any string concatenated into SQL, a shell command, HTML, or a query? Use parameterized queries / proper escaping / safe APIs — never string-build untrusted input into a command.
- **Secrets.** No API keys, tokens, or passwords hardcoded or logged. Read them from env/secret storage. Don't echo secrets into error messages or logs.
- **Authorization.** Does this endpoint/action check that *this* user is allowed to do it — not just that they're logged in? Watch for "authenticated but not authorized" (accessing other users' data by changing an ID).
- **Path / file handling.** User-controlled paths validated against traversal (`../`)? Uploads constrained by type and size?
- **Input validation.** Untrusted input validated and bounded before use? Don't trust client-side checks alone.
- **Output.** User-controlled data rendered into HTML/templates is escaped (XSS)? Errors don't leak stack traces or internals to users?
- **Dependencies & SSRF.** New outbound request to a user-supplied URL? Constrain it. New dependency? Note it for review.

## How to report

State what you checked and what you found. If you spot a risk you didn't fully fix, **flag it explicitly** rather than letting it pass silently: *"Note: the file upload doesn't yet limit size — add a cap before production."*

## Scope it

Review *the change you made* and what it touches — not the entire codebase. The goal is to not introduce a vulnerability, not to audit the whole app.

## Why this matters

Security bugs are the most expensive class to fix because they're found by attackers, not tests. A two-minute self-review at the point of change catches the overwhelmingly common ones — injection, leaked secrets, missing authorization — before they ever ship.
