# Skillpacks — gis discipline install demo. Rendered with VHS. See demo/README.md.
#   docker run --rm -v "$PWD":/vhs skillpacks-vhs demo/gis.tape

Output assets/gis.gif

Set Shell bash
Set FontSize 19
Set Width 1180
Set Height 620
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
Type "npx skillpacks-cli add gis"
Sleep 500ms
Enter
Sleep 4000ms
