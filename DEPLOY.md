# 🚀 Deploy to GitHub Pages (Deploy from a branch)

Use this method if you want deployment from `main` branch **without GitHub Actions**.

## Step 1: Confirm config
1. Open `package.json`
2. Ensure `homepage` is your real URL:
   ```json
   "homepage": "https://YOUR-GITHUB-USERNAME.github.io/E-Flash-1.2"
   ```
3. Open `vite.config.js` and confirm base path matches repo name:
   ```javascript
   base: process.env.NODE_ENV === 'production' ? '/E-Flash-1.2/' : '/'
   ```

## Step 2: Build output for branch deployment
Run:
```bash
npm run build
npm run pages:prepare
```

This creates/updates `docs/` with production files (including `404.html`).

## Step 3: Commit and push `docs/` to `main`
```bash
git add docs package.json scripts/prepare-pages.mjs
git commit -m "Prepare GitHub Pages branch deployment"
git push origin main
```

## Step 4: Configure GitHub Pages settings
In GitHub repository:
1. Go to **Settings → Pages**
2. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/docs`
3. Save

Site URL:
`https://YOUR-GITHUB-USERNAME.github.io/E-Flash-1.2/`

---

## Troubleshooting

**Q: Site shows blank page?**
- Check if `base` path in `vite.config.js` matches your repo name

**Q: Images not loading?**
- Make sure image paths start with `/` (e.g., `/assets/images/logo.png`)

**Q: 404 on page refresh?**
- The `public/404.html` file handles this automatically

**Q: Need to update the site?**
```bash
npm run build
npm run pages:prepare
git add docs
git commit -m "Update site"
git push origin main
```

---

For detailed instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
