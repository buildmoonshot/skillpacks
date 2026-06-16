#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const LEVELS = ['beginner', 'intermediate', 'expert'];

// --- tiny color helpers (respect NO_COLOR and non-TTY) ---
const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const c = (code, s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s);
const bold = (s) => c('1', s);
const dim = (s) => c('2', s);
const green = (s) => c('32', s);
const cyan = (s) => c('36', s);
const yellow = (s) => c('33', s);
const red = (s) => c('31', s);

const LEVEL_TAG = {
  beginner: green('● beginner'),
  intermediate: yellow('● intermediate'),
  expert: red('● expert'),
};

function findSkills() {
  const out = [];
  for (const level of LEVELS) {
    const dir = path.join(SKILLS_DIR, level);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir).sort()) {
      const sdir = path.join(dir, name);
      let isDir = false;
      try {
        isDir = fs.statSync(sdir).isDirectory();
      } catch {
        continue;
      }
      if (isDir && fs.existsSync(path.join(sdir, 'SKILL.md'))) {
        out.push({ name, level, dir: sdir });
      }
    }
  }
  return out;
}

function installOne(skill, destRoot) {
  const dest = path.join(destRoot, '.claude', 'skills', skill.name);
  const target = path.join(dest, 'SKILL.md');
  const existed = fs.existsSync(target);
  fs.mkdirSync(dest, { recursive: true });
  fs.copyFileSync(path.join(skill.dir, 'SKILL.md'), target);
  return { rel: path.relative(destRoot, target), existed };
}

function cmdList() {
  const skills = findSkills();
  console.log('\n' + bold('🪐 Skillpacks') + dim(' — available skills\n'));
  for (const level of LEVELS) {
    const inLevel = skills.filter((s) => s.level === level);
    if (!inLevel.length) continue;
    console.log('  ' + LEVEL_TAG[level]);
    for (const s of inLevel) console.log('    ' + cyan(s.name));
    console.log('');
  }
  console.log(dim('  Add one:           ') + 'npx skillpacks-cli add <name>');
  console.log(dim('  Add a whole pack:  ') + 'npx skillpacks-cli add beginner\n');
}

function cmdAdd(arg) {
  if (!arg) {
    console.error(red('Usage: skillpacks add <skill-name | level>'));
    process.exit(1);
  }
  const skills = findSkills();
  const cwd = process.cwd();
  let targets;

  if (LEVELS.includes(arg)) {
    targets = skills.filter((s) => s.level === arg);
    if (!targets.length) {
      console.error(red(`No skills found in level "${arg}".`));
      process.exit(1);
    }
    console.log('\n' + bold(`Installing the ${arg} pack`) + dim(` (${targets.length} skills)\n`));
  } else {
    const skill = skills.find((s) => s.name === arg);
    if (!skill) {
      console.error('\n' + red(`Unknown skill: "${arg}"`) + '\n');
      console.error(dim('Available: ') + skills.map((s) => s.name).join(', '));
      console.error(dim('List them: ') + 'npx skillpacks-cli list\n');
      process.exit(1);
    }
    targets = [skill];
  }

  for (const s of targets) {
    const r = installOne(s, cwd);
    const tag = r.existed ? yellow('updated') : green('added');
    console.log(`  ${green('✓')} ${tag}  ${cyan(s.name)}  ${dim('→ ' + r.rel)}`);
  }
  console.log('\n' + dim('  Your agent loads skills from .claude/skills/ automatically.'));
  console.log(dim('  Prefer a CLAUDE.md rule? Open the SKILL.md and paste its rules in.\n'));
}

function cmdHelp() {
  const pkg = require(path.join(ROOT, 'package.json'));
  console.log(`
${bold('🪐 Skillpacks')} ${dim('v' + pkg.version)} — drop-in skills for Claude Code, Codex & coding agents

${bold('Usage')}
  npx skillpacks-cli <command>

${bold('Commands')}
  ${cyan('list')}              Show all available skills, grouped by level
  ${cyan('add')} ${dim('<name>')}       Add a skill to ./.claude/skills/
  ${cyan('add')} ${dim('<level>')}      Add a whole pack: beginner | intermediate | expert
  ${cyan('help')}              Show this help

${bold('Examples')}
  npx skillpacks-cli list
  npx skillpacks-cli add surgical-edits
  npx skillpacks-cli add beginner

${dim('Repo: https://github.com/buildmoonshot/skillpacks')}
`);
}

const cmd = process.argv[2];
const arg = process.argv[3];

switch (cmd) {
  case 'list':
    cmdList();
    break;
  case 'add':
    cmdAdd(arg);
    break;
  case 'help':
  case '--help':
  case '-h':
  case undefined:
    cmdHelp();
    break;
  default:
    console.error(red(`Unknown command: ${cmd}\n`));
    cmdHelp();
    process.exit(1);
}
