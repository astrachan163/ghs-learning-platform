/**
 * Fails if a page or runtime module loads the brand kit from the network.
 * Vendored files belong in the repo. Documentation may name the kit.
 */
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { walkTextFiles } from './walk-text.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const needle = 'nonartificialsi.com/brand/';

const files = walkTextFiles(root, (rel) => {
  if (rel === 'scripts/check-brand-hotlink.mjs') return true;
  if (rel.startsWith('docs/')) return true;
  if (rel.endsWith('.md')) return true;
  return false;
});

/** @type {string[]} */
const hits = [];

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].includes(needle)) {
      hits.push(`${relative(root, file)}:${i + 1}`);
    }
  }
}

if (hits.length > 0) {
  console.error(`Brand kit is hotlinked from a runtime file: ${hits.length}`);
  for (const hit of hits) console.error(hit);
  process.exit(1);
}

console.log(`Brand hotlink gate passed (${files.length} files).`);
