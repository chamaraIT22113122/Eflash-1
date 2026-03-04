const fs = require('fs');
const path = require('path');

const newUrl = process.argv[2];

if (!newUrl) {
    console.error('Error: Please provide your new Vercel URL.');
    console.log('Usage: npm run set-api <https://your-vercel-url.vercel.app/api>');
    process.exit(1);
}

// Ensure the URL does not end with a trailing slash if it's the base
const cleanUrl = newUrl.replace(/\/$/, '');

console.log(`Setting new API base URL to: ${cleanUrl}`);

const filesToUpdate = [
    '.env',
    'deploy.ps1',
    'src/utils/productService.js',
    'src/utils/projectService.js',
    'src/utils/reviewService.js',
    'MONGODB_DEPLOYMENT_GUIDE.md'
];

const patternsToReplace = [
    /https:\/\/adorable-dodol-77eb48\.netlify\.app\/api/g,
    /https:\/\/adorable-dodol-77eb48\.netlify\.app\/\.netlify\/functions/g
];

let updatedCount = 0;

filesToUpdate.forEach(file => {
    const filePath = path.join(__dirname, '..', file);

    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let initialContent = content;

        patternsToReplace.forEach(pattern => {
            content = content.replace(pattern, cleanUrl);
        });

        if (content !== initialContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated ${file}`);
            updatedCount++;
        }
    } else {
        console.warn(`⚠️ File not found: ${file}`);
    }
});

console.log(`\nMigration prep complete! Updated ${updatedCount} files.`);
console.log(`\nYou can now deploy the frontend with: npm run deploy`);
