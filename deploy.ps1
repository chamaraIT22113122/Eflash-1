# Deploy script for GitHub Pages
Write-Host "Building project..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful! Copying files to root..." -ForegroundColor Green
    
    # Backup source index.html
    Copy-Item "index.html" "index.source.html" -Force
    
    # Copy built files from dist to root
    Copy-Item "dist/index.html" "." -Force
    Copy-Item "dist/404.html" "." -Force
    Copy-Item "dist/assets" "." -Recurse -Force
    Copy-Item "dist/sw.js" "." -Force
    Copy-Item "dist/manifest.json" "." -Force
    Copy-Item "dist/robots.txt" "." -Force
    Copy-Item "dist/sitemap.xml" "." -Force
    Copy-Item "dist/.nojekyll" "." -Force
    
    Write-Host "Deploying to GitHub Pages..." -ForegroundColor Cyan
    
    # Stage and commit files
    git add index.html 404.html assets/ sw.js manifest.json robots.txt sitemap.xml .nojekyll
    git commit -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    git push
    
    # Restore source index.html
    Copy-Item "index.source.html" "index.html" -Force
    Remove-Item "index.source.html" -Force
    
    # Commit restored source
    git add index.html
    git commit -m "Restore source index.html"
    git push
    
    Write-Host "Deployment complete!" -ForegroundColor Green
    Write-Host "Your site will be live at: https://chamarait22113122.github.io/Eflash-1/" -ForegroundColor Yellow
    Write-Host "Note: It may take 1-2 minutes for GitHub Pages to update." -ForegroundColor Gray
} else {
    Write-Host "Build failed! Please fix errors and try again." -ForegroundColor Red
    exit 1
}
