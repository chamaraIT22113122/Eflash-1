import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const projectRoot = resolve(__dirname, '..');

const distPath = resolve(projectRoot, 'dist');
const docsPath = resolve(projectRoot, 'docs');

if (!existsSync(distPath)) {
  console.log('dist folder not found. Building the project first...');
  process.exitCode = 1;
  throw new Error('Run "npm run build" before preparing Pages output.');
}

if (existsSync(docsPath)) {
  rmSync(docsPath, { recursive: true, force: true });
}

mkdirSync(docsPath, { recursive: true });
cpSync(distPath, docsPath, { recursive: true });

const indexFile = resolve(docsPath, 'index.html');
const notFoundFile = resolve(docsPath, '404.html');
cpSync(indexFile, notFoundFile);

console.log('GitHub Pages branch output is ready in docs/.');
