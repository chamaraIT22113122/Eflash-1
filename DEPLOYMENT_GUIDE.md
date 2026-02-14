# GitHub Pages Deployment Guide

## 🚀 Quick Deploy Steps

### 1. Install gh-pages package
```bash
npm install --save-dev gh-pages
```

### 2. Update package.json
Replace `yourusername` with your actual GitHub username:
```json
"homepage": "https://yourusername.github.io/E-Flash-1.2"
```

### 3. Deploy to GitHub Pages
```bash
npm run deploy
```

## 📋 Manual Deployment Steps

### Option A: Using gh-pages (Simpler)

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update homepage in package.json**:
   ```json
   "homepage": "https://YOUR-GITHUB-USERNAME.github.io/E-Flash-1.2"
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

### Option B: Using GitHub Actions (Automatic)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: **GitHub Actions**
   - Save

3. **Automatic deployment**:
   - Every push to `main` branch will automatically deploy

## 🔧 Configuration Details

### Vite Config (vite.config.js)
- `base`: Set to your repository name
- `outDir`: Build output directory (dist)
- `assetsDir`: Assets directory within dist

### Package.json Scripts
- `dev`: Run development server
- `build`: Create production build
- `preview`: Preview production build locally
- `predeploy`: Run before deploy (builds the project)
- `deploy`: Deploy to GitHub Pages

## 📁 Project Structure After Build
```
dist/
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── ...
```

## 🌐 Access Your Site

After deployment, your site will be available at:
```
https://YOUR-GITHUB-USERNAME.github.io/E-Flash-1.2/
```

## 🔍 Troubleshooting

### Issue: Blank page after deployment
**Solution**: Check the `base` path in `vite.config.js` matches your repo name

### Issue: Images not loading
**Solution**: Use relative paths in your code:
```jsx
// Correct
<img src="/assets/images/logo.png" />

// Not recommended
<img src="./assets/images/logo.png" />
```

### Issue: Routing not working (404 on refresh)
**Solution**: Add a custom 404.html that redirects to index.html
```bash
cp dist/index.html dist/404.html
```

### Issue: CSS/JS not loading
**Solution**: Ensure `base` in vite.config.js is set correctly

## 📊 Check Deployment Status

1. Go to your repository on GitHub
2. Click on **Actions** tab
3. See the latest workflow run

## 🔄 Update Deployment

To update your site:
```bash
# Make your changes
git add .
git commit -m "Update website"
git push origin main

# Or manually deploy
npm run deploy
```

## 🎯 Custom Domain (Optional)

1. Add a `CNAME` file to `public/` folder:
   ```
   yourdomain.com
   ```

2. Configure DNS:
   - Add CNAME record pointing to: `YOUR-USERNAME.github.io`

3. Enable custom domain in GitHub Pages settings

## ⚙️ Environment Variables

If you have environment variables:

1. Create `.env.production`:
   ```
   VITE_API_URL=your-api-url
   ```

2. Add to GitHub Secrets (for GitHub Actions):
   - Settings → Secrets → Actions → New repository secret

## 📱 Testing Before Deploy

Test the production build locally:
```bash
npm run build
npm run preview
```

Visit: `http://localhost:4173`

## 🚨 Important Notes

- Make sure all image paths use leading slash `/`
- Update WhatsApp links if needed
- Test all routes after deployment
- Check browser console for errors
- Clear browser cache if changes don't appear

## 🔐 Security

- Don't commit `.env` files
- Keep sensitive data in GitHub Secrets
- Use environment variables for API keys

---

## Need Help?

- Check GitHub Actions logs for errors
- Verify all paths are correct
- Ensure `base` path matches repository name
- Test locally with `npm run preview` first
