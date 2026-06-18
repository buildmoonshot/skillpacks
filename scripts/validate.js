#!/usr/bin/env node
'use strict';

// Validates the skill catalog: every skill (under skills/<discipline>/<level>/)
// has the required files, valid frontmatter, and the README's skill-count badge
// stays in sync. Run in CI.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const LEVELS = ['beginner', 'intermediate', 'expert'];

const errors = [];
let count = 0;

function parseFrontmatter(text) {
  if (!text.startsWith('---')) return null;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return null;
  const fm = {};
  for (const line of text.slice(3, end).split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (m) fm[m[1]] = m[2].trim();
  }
  return fm;
}

const disciplines = fs.existsSync(SKILLS_DIR)
  ? fs.readdirSync(SKILLS_DIR).filter((d) => fs.statSync(path.join(SKILLS_DIR, d)).isDirectory())
  : [];

for (const discipline of disciplines) {
  for (const level of LEVELS) {
    const dir = path.join(SKILLS_DIR, discipline, level);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      const sdir = path.join(dir, name);
      if (!fs.statSync(sdir).isDirectory()) continue;
      count++;
      const id = `${discipline}/${level}/${name}`;
      const skillMd = path.join(sdir, 'SKILL.md');
      if (!fs.existsSync(skillMd)) { errors.push(`${id}: missing SKILL.md`); continue; }
      if (!fs.existsSync(path.join(sdir, 'README.md'))) errors.push(`${id}: missing README.md`);

      const fm = parseFrontmatter(fs.readFileSync(skillMd, 'utf8'));
      if (!fm) { errors.push(`${id}: SKILL.md missing YAML frontmatter`); continue; }
      if (!fm.name) errors.push(`${id}: frontmatter missing 'name'`);
      else if (fm.name !== name) errors.push(`${id}: name '${fm.name}' != folder '${name}'`);
      if (!fm.description) errors.push(`${id}: frontmatter missing 'description'`);
      else if (fm.description.length < 30) errors.push(`${id}: description too short to be a useful trigger`);
    }
  }
}

if (count === 0) errors.push('no skills found under skills/<discipline>/<level>/');

const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
const badge = readme.match(/skills-(\d+)-blue/);
if (!badge) errors.push('README: skills-N badge not found');
else if (Number(badge[1]) !== count) errors.push(`README badge says ${badge[1]} skills, but found ${count} — update the badge`);

if (errors.length) {
  console.error('✗ Validation failed:\n  - ' + errors.join('\n  - '));
  process.exit(1);
}
console.log(`✓ ${count} skills across ${disciplines.length} disciplines validated — files, frontmatter, and README badge consistent.`);
