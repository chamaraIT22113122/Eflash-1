import { cpSync, existsSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const projectRoot = resolve(__dirname, '..');

const distPath = resolve(projectRoot, 'dist');

if (!existsSync(distPath)) {
  console.log('dist folder not found. Building the project first...');
  process.exitCode = 1;
  throw new Error('Run "npm run build" before preparing Pages output.');
}

// Copy built files from dist to root
// Get index.html from dist
const distIndex = resolve(distPath, 'index.html');
const rootIndex = resolve(projectRoot, 'index.html');

// Remove old assets folder in root if exists
const rootAssets = resolve(projectRoot, 'assets');
if (existsSync(rootAssets)) {
  rmSync(rootAssets, { recursive: true, force: true });
}

// Copy index.html to root
cpSync(distIndex, rootIndex);

// Copy assets folder to root
const distAssets = resolve(distPath, 'assets');
if (existsSync(distAssets)) {
  cpSync(distAssets, rootAssets, { recursive: true });
}

// Copy index.html as 404.html so SPA routing works on refresh
const notFoundFile = resolve(projectRoot, '404.html');
cpSync(distIndex, notFoundFile);

// Create .nojekyll file in root
const noJekyllFile = resolve(projectRoot, '.nojekyll');
writeFileSync(noJekyllFile, '');

console.log('GitHub Pages root deployment is ready.');
