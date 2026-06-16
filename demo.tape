# Skillpacks — install demo (rendered with VHS: https://github.com/charmbracelet/vhs)
#
# Render (Docker, from repo root). The stock VHS image has no Node, and this demo
# runs the real CLI (bin/cli.js), so build a tiny Node-enabled image first:
#
#   docker build -t skillpacks-vhs - <<'DOCKER'
#   FROM ghcr.io/charmbracelet/vhs:latest
#   RUN apt-get update && apt-get install -y --no-install-recommends nodejs
#   DOCKER
#   docker run --rm -v "$PWD":/vhs skillpacks-vhs demo.tape
#
# The npx() shim below maps `npx skillpacks-cli ...` to the local bin/cli.js so the
# demo shows genuine output with no network needed while rendering.

Output assets/demo.gif

Set Shell bash
Set FontSize 20
Set Width 1180
Set Height 720
Set Padding 30
Set Theme "Catppuccin Mocha"
Set TypingSpeed 55ms

Hide
Type "mkdir -p /tmp/demo && cd /tmp/demo"
Enter
Type 'npx() { shift; node /vhs/bin/cli.js "$@"; }'
Enter
Type "export PS1='$ '"
Enter
Type "clear"
Enter
Show

Sleep 800ms
Type "npx skillpacks-cli list"
Sleep 500ms
Enter
Sleep 3s

Type "npx skillpacks-cli add surgical-edits"
Sleep 500ms
Enter
Sleep 2500ms

Type "npx skillpacks-cli add beginner"
Sleep 500ms
Enter
Sleep 4s
