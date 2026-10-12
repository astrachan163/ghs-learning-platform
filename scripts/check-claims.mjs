/**
 * Banned-claims gate.
 * Lines 1-5 are case-insensitive, except the standalone MD token.
 * The spelling line (Apple ID through MaQkRs) is case-sensitive so
 * ".md" filenames and the correct "MaQkrs" spelling do not match.
 *
 * Scans the README, docs, and user-facing source. Skips lockfiles,
 * fonts, vendored trees, and this file (it contains the patterns).
 */
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { walkTextFiles } from './walk-text.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));

/**
 * Exact URL, path, repo slug, or ID strings that contain a pattern
 * only because they are an address. None are needed in this snapshot.
 * @type {string[]}
 */
const ALLOW_EXACT = [];

const GROUPS = [
  {
    name: 'medical',
    flags: 'i',
    source:
      'Doctor of Medicine|\\bM\\.D\\.|M\\.D\\. Candidate|four years of medical school|medical school graduate',
  },
  {
    name: 'md-token',
    flags: '',
    source: '\\bMD\\b',
  },
  {
    name: 'licensing',
    flags: 'i',
    source:
      'federal licensing|two MSDH-licensed businesses|stood up two licensed|hired after licensing|required full FDA',
  },
  {
    name: 'standards-and-trial',
    flags: 'i',
    source:
      'Georgia[^.]{0,40}standards|aligned with [^.]{0,30}standards|\\bGSE\\b|Milestones aligned|30-day (free )?trial',
  },
  {
    name: 'titles-a',
    flags: 'i',
    source:
      'God Mode|Cybersecurity Systems Engineer|Clearable|\\bFellow\\b|Pre-Vetted|Tier 5|His Name|seeking internships?',
  },
  {
    name: 'titles-b',
    flags: 'i',
    source:
      'Information Security Systems Engineer|Secure Systems Architect|Tier 3|background investigations?|Operational Director|Laboratory Specialist|Montevallo[^.]{0,80}3\\.75|regulatory licensure|Master Prosector',
  },
  {
    name: 'spelling',
    flags: '',
    source: 'Apple ID|\\bGBA\\b|Game ?Boy|Nintendo|\\bMaqkrs\\b(?![-/._a-zA-Z0-9])|MaQkRs',
  },
];

const patterns = GROUPS.map((group) => ({
  name: group.name,
  re: new RegExp(group.source, group.flags),
}));

/**
 * @param {string} line
 */
function stripAllow(line) {
  let next = line;
  for (const exact of ALLOW_EXACT) {
    next = next.split(exact).join('');
  }
  return next;
}

const files = walkTextFiles(root, (rel) => rel === 'scripts/check-claims.mjs');
/** @type {string[]} */
const hits = [];

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = stripAllow(lines[i]);
    for (const pattern of patterns) {
      pattern.re.lastIndex = 0;
      const match = pattern.re.exec(line);
      if (match) {
        hits.push(
          `${relative(root, file)}:${i + 1}: [${pattern.name}] ${match[0]}`,
        );
      }
    }
  }
}

if (hits.length > 0) {
  console.error(`Banned claims: ${hits.length}`);
  for (const hit of hits) console.error(hit);
  process.exit(1);
}

console.log(`Claims gate passed (${files.length} files).`);
