/**
 * Emoji gate. Fails on decorative symbols in tracked text files.
 * Arrows U+2190-U+21FF are allowed. Lockfiles, fonts, and vendored
 * code are skipped by the walker.
 */
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { walkTextFiles } from './walk-text.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));

/**
 * @param {number} codePoint
 */
function isBanned(codePoint) {
  if (codePoint >= 0x1f000 && codePoint <= 0x1faff) return true;
  if (codePoint >= 0x2600 && codePoint <= 0x27bf) return true;
  if (codePoint >= 0x2b00 && codePoint <= 0x2bff) return true;
  if (codePoint === 0xfe0f) return true;
  return false;
}

const files = walkTextFiles(root);
/** @type {string[]} */
const hits = [];

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    for (const char of line) {
      const codePoint = char.codePointAt(0);
      if (codePoint !== undefined && isBanned(codePoint)) {
        const hex = codePoint.toString(16).toUpperCase().padStart(4, '0');
        hits.push(`${relative(root, file)}:${i + 1}: U+${hex}`);
        break;
      }
    }
  }
}

if (hits.length > 0) {
  console.error(`Emoji gate: ${hits.length}`);
  for (const hit of hits) console.error(hit);
  process.exit(1);
}

console.log(`Emoji gate passed (${files.length} files).`);
