# Skillpacks — hero demo (top of README). Rendered with VHS. See demo/README.md.
#   docker run --rm -v "$PWD":/vhs skillpacks-vhs demo/hero.tape

Output assets/demo.gif

Set Shell bash
Set FontSize 20
Set Width 1180
Set Height 470
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
Type "npx skillpacks-cli add surgical-edits"
Sleep 500ms
Enter
Sleep 2500ms

Type "ls .claude/skills"
Sleep 500ms
Enter
Sleep 2500ms
