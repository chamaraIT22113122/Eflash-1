# 🚀 Deploy to GitHub Pages - Quick Start

## Step 1: Update Homepage URL
1. Open `package.json`
2. Replace `yourusername` with your GitHub username:
   ```json
   "homepage": "https://YOUR-GITHUB-USERNAME.github.io/E-Flash-1.2"
   ```

## Step 2: Update Vite Base Path
1. Open `vite.config.js`
2. If your repository name is different, update the base path:
   ```javascript
   base: '/YOUR-REPOSITORY-NAME/'
   ```

## Step 3: Deploy
Run this command:
```bash
npm run deploy
```

That's it! Your site will be live at:
`https://YOUR-GITHUB-USERNAME.github.io/E-Flash-1.2/`

---

## Alternative: Automatic Deployment with GitHub Actions

### Enable GitHub Actions
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Under "Build and deployment", select "GitHub Actions"
4. Push to main branch - it will auto-deploy!

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
npm run deploy
```

---

For detailed instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
