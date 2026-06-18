#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const LEVELS = ['beginner', 'intermediate', 'expert'];
const DISCIPLINE_ORDER = ['engineering', 'gis']; // preferred display order; others appended alphabetically

// --- tiny color helpers (respect NO_COLOR and non-TTY) ---
const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const c = (code, s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s);
const bold = (s) => c('1', s);
const dim = (s) => c('2', s);
const green = (s) => c('32', s);
const cyan = (s) => c('36', s);
const yellow = (s) => c('33', s);
const red = (s) => c('31', s);
const magenta = (s) => c('35', s);

const LEVEL_TAG = {
  beginner: green('● beginner'),
  intermediate: yellow('● intermediate'),
  expert: red('● expert'),
};

function disciplines() {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  const found = fs.readdirSync(SKILLS_DIR).filter((d) => {
    try { return fs.statSync(path.join(SKILLS_DIR, d)).isDirectory(); } catch { return false; }
  });
  const ordered = DISCIPLINE_ORDER.filter((d) => found.includes(d));
  const rest = found.filter((d) => !DISCIPLINE_ORDER.includes(d)).sort();
  return [...ordered, ...rest];
}

function findSkills() {
  const out = [];
  for (const discipline of disciplines()) {
    for (const level of LEVELS) {
      const dir = path.join(SKILLS_DIR, discipline, level);
      if (!fs.existsSync(dir)) continue;
      for (const name of fs.readdirSync(dir).sort()) {
        const sdir = path.join(dir, name);
        let isDir = false;
        try { isDir = fs.statSync(sdir).isDirectory(); } catch { continue; }
        if (isDir && fs.existsSync(path.join(sdir, 'SKILL.md'))) {
          out.push({ name, discipline, level, dir: sdir });
        }
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

function printInstalled(targets, cwd) {
  for (const s of targets) {
    const r = installOne(s, cwd);
    const tag = r.existed ? yellow('updated') : green('added');
    console.log(`  ${green('✓')} ${tag}  ${cyan(s.name)}  ${dim('→ ' + r.rel)}`);
  }
  console.log('\n' + dim('  Your agent loads skills from .claude/skills/ automatically.'));
  console.log(dim('  Prefer a CLAUDE.md rule? Open the SKILL.md and paste its rules in.\n'));
}

function cmdList() {
  const skills = findSkills();
  const discs = disciplines();
  console.log('\n' + bold('🪐 Skillpacks') + dim(` — ${skills.length} skills across ${discs.length} disciplines\n`));
  for (const discipline of discs) {
    const inDisc = skills.filter((s) => s.discipline === discipline);
    if (!inDisc.length) continue;
    console.log('  ' + magenta(bold(discipline)));
    for (const level of LEVELS) {
      const inLevel = inDisc.filter((s) => s.level === level);
      if (!inLevel.length) continue;
      console.log('    ' + LEVEL_TAG[level]);
      for (const s of inLevel) console.log('      ' + cyan(s.name));
    }
    console.log('');
  }
  console.log(dim('  Add a discipline:  ') + 'npx skillpacks-cli add gis');
  console.log(dim('  Add one skill:     ') + 'npx skillpacks-cli add crs-discipline\n');
}

function cmdAdd(arg1, arg2) {
  if (!arg1) { console.error(red('Usage: skillpacks add <skill | discipline> [level]')); process.exit(1); }
  const skills = findSkills();
  const cwd = process.cwd();
  const discs = disciplines();

  // discipline, optionally narrowed to a level
  if (discs.includes(arg1)) {
    let targets = skills.filter((s) => s.discipline === arg1);
    let label = `the ${arg1} discipline`;
    if (arg2) {
      if (!LEVELS.includes(arg2)) { console.error(red(`"${arg2}" is not a level (beginner | intermediate | expert).`)); process.exit(1); }
      targets = targets.filter((s) => s.level === arg2);
      label = `${arg1} · ${arg2}`;
    }
    if (!targets.length) { console.error(red(`No skills found for ${label}.`)); process.exit(1); }
    console.log('\n' + bold(`Installing ${label}`) + dim(` (${targets.length} skills)\n`));
    printInstalled(targets, cwd);
    return;
  }

  // a single skill by name
  const skill = skills.find((s) => s.name === arg1);
  if (skill) {
    console.log('');
    printInstalled([skill], cwd);
    return;
  }

  // a bare level is ambiguous now that levels live inside disciplines
  if (LEVELS.includes(arg1)) {
    console.error('\n' + red(`"${arg1}" is a level, but levels now live inside disciplines.`));
    console.error(dim('Try: ') + `npx skillpacks-cli add gis ${arg1}` + dim('  (discipline + level)\n'));
    process.exit(1);
  }

  console.error('\n' + red(`Unknown skill or discipline: "${arg1}"`) + '\n');
  console.error(dim('Disciplines: ') + discs.join(', '));
  console.error(dim('List everything: ') + 'npx skillpacks-cli list\n');
  process.exit(1);
}

function cmdHelp() {
  const pkg = require(path.join(ROOT, 'package.json'));
  console.log(`
${bold('🪐 Skillpacks')} ${dim('v' + pkg.version)} — drop-in skills for Claude Code, Codex & coding agents

${bold('Usage')}
  npx skillpacks-cli <command>

${bold('Commands')}
  ${cyan('list')}                       Show all skills, grouped by discipline & level
  ${cyan('add')} ${dim('<skill>')}                Add one skill by name
  ${cyan('add')} ${dim('<discipline>')}           Add a whole discipline (e.g. engineering, gis)
  ${cyan('add')} ${dim('<discipline> <level>')}   Add one level of a discipline
  ${cyan('help')}                       Show this help

${bold('Examples')}
  npx skillpacks-cli list
  npx skillpacks-cli add crs-discipline
  npx skillpacks-cli add gis
  npx skillpacks-cli add engineering beginner

${dim('Repo: https://github.com/buildmoonshot/skillpacks')}
`);
}

const cmd = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (cmd) {
  case 'list': cmdList(); break;
  case 'add': cmdAdd(arg1, arg2); break;
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
