import { readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const SKIP_DIRS = new Set(['node_modules', 'dist', 'coverage', '.git']);
const TEXT_EXT = new Set([
  '.md',
  '.txt',
  '.ts',
  '.tsx',
  '.js',
  '.mjs',
  '.cjs',
  '.yml',
  '.yaml',
  '.html',
  '.css',
  '.tf',
  '.sh',
  '.json',
  '.example',
]);

/**
 * @param {string} root
 * @param {(rel: string) => boolean} [skipFile]
 * @returns {string[]} absolute paths
 */
export function walkTextFiles(root, skipFile) {
  /** @type {string[]} */
  const files = [];

  /**
   * @param {string} dir
   */
  function walk(dir) {
    for (const name of readdirSync(dir)) {
      if (SKIP_DIRS.has(name)) continue;
      const full = join(dir, name);
      const info = statSync(full);
      if (info.isDirectory()) {
        walk(full);
        continue;
      }
      if (name === 'package-lock.json' || name.endsWith('.lock')) continue;
      const ext = extname(name);
      if (!TEXT_EXT.has(ext)) continue;
      const rel = relative(root, full);
      if (skipFile && skipFile(rel)) continue;
      files.push(full);
    }
  }

  walk(root);
  return files;
}
