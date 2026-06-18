# Demos

Every discipline gets its own *"this is how easy it is"* install GIF. They're generated with [VHS](https://github.com/charmbracelet/vhs) so they're reproducible — no screen recording.

## Tapes

| Tape | Output | Shows |
|------|--------|-------|
| `hero.tape` | `assets/demo.gif` | Adding a single skill (top of the README) |
| `engineering.tape` | `assets/engineering.gif` | `npx skillpacks-cli add engineering` |
| `gis.tape` | `assets/gis.gif` | `npx skillpacks-cli add gis` |

**Convention: when you add a new discipline, add a `demo/<discipline>.tape` and embed its GIF under that discipline in the README.**

## Rendering

The stock VHS image has no Node, and the tapes run the real CLI (`bin/cli.js`), so build a tiny Node-enabled image once:

```bash
docker build -t skillpacks-vhs - <<'DOCKER'
FROM ghcr.io/charmbracelet/vhs:latest
RUN apt-get update && apt-get install -y --no-install-recommends nodejs
DOCKER
```

Then render any tape from the repo root:

```bash
docker run --rm -v "$PWD":/vhs skillpacks-vhs demo/gis.tape
```

The `npx()` shim inside each tape maps `npx skillpacks-cli …` to the local `bin/cli.js`, so the demo shows genuine output with no network needed.
