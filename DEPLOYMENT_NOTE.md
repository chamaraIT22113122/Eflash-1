# Deployment Workflow

## Important Files

- **`index.html`** - Production build file (deployed to GitHub Pages)
  - This contains the compiled JavaScript bundles with hashed filenames
  - **DO NOT** manually edit this file
  - It gets automatically overwritten during deployment

- **`index.dev.html`** - Development template
  - This is the source HTML template used by Vite
  - Edit this file if you need to modify the HTML structure
  - It contains `<script type="module" src="/src/main.jsx"></script>` for development

## Workflow

### Local Development
```bash
npm run dev
```
- Automatically copies `index.dev.html` → `index.html` before starting
- Vite dev server uses `index.html` for hot module reloading

### Building
```bash
npm run build
```
- Automatically copies `index.dev.html` → `index.html` before building
- Vite builds the project and outputs to `dist/`
- The build process transforms `index.html` with production assets

### Deploying to GitHub Pages
```bash
npm run deploy
```
- Runs the build process
- Copies built files from `dist/` to root (including `dist/index.html` → `index.html`)
- Commits and pushes to GitHub
- GitHub Pages serves the production `index.html` with all assets

## Why This Workflow?

GitHub Pages serves files from the repository root. Since we can't use a separate build branch efficiently, we:
1. Keep the production build (`index.html`) in the root for GitHub Pages
2. Keep the development template (`index.dev.html`) for the build process
3. Automatically restore the dev template before builds/dev server starts
4. Overwrite with production build during deployment

## Editing HTML

To modify the HTML structure:
1. Edit `index.dev.html`
2. Run `npm run build` to test
3. Run `npm run deploy` to deploy changes

**Never directly edit `index.html`** - your changes will be overwritten on the next deployment!
