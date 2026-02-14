const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath, ext);
    const dirName = path.dirname(filePath);
    
    // Get original file size
    const stats = await fs.stat(filePath);
    const originalSize = (stats.size / 1024 / 1024).toFixed(2);
    
    // Skip if file is already small (< 1MB)
    if (stats.size < 1024 * 1024) {
      console.log(`✓ Skipping ${fileName}${ext} (already small: ${originalSize}MB)`);
      return;
    }
    
    console.log(`🔄 Optimizing ${fileName}${ext} (${originalSize}MB)...`);
    
    // Create backup
    const backupPath = path.join(dirName, `${fileName}.backup${ext}`);
    const backupExists = await fs.access(backupPath).then(() => true).catch(() => false);
    if (!backupExists) {
      await fs.copyFile(filePath, backupPath);
    }
    
    // Optimize based on file type
    let optimizer = sharp(filePath);
    
    if (ext === '.png') {
      // Convert large PNGs to WebP or optimize PNG
      optimizer = optimizer
        .resize(1920, 1920, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .png({ 
          quality: 80, 
          compressionLevel: 9,
          palette: true 
        });
    } else if (['.jpg', '.jpeg'].includes(ext)) {
      optimizer = optimizer
        .resize(1920, 1920, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .jpeg({ 
          quality: 85, 
          progressive: true 
        });
    }
    
    // Save optimized image
    await optimizer.toFile(filePath + '.tmp');
    await fs.rename(filePath + '.tmp', filePath);
    
    // Check new size
    const newStats = await fs.stat(filePath);
    const newSize = (newStats.size / 1024 / 1024).toFixed(2);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`✅ ${fileName}${ext}: ${originalSize}MB → ${newSize}MB (saved ${savings}%)`);
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
  }
}

async function findAndOptimizeImages(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await findAndOptimizeImages(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.png', '.jpg', '.jpeg'].includes(ext) && !entry.name.includes('.backup')) {
          await optimizeImage(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  const imageDirs = [
    path.join(__dirname, 'public', 'assets', 'images'),
    path.join(__dirname, 'assets', 'images')
  ];
  
  for (const dir of imageDirs) {
    const exists = await fs.access(dir).then(() => true).catch(() => false);
    if (exists) {
      console.log(`📁 Optimizing images in: ${dir}\n`);
      await findAndOptimizeImages(dir);
    }
  }
  
  console.log('\n✨ Image optimization complete!');
  console.log('💡 Tip: Original files are backed up with .backup extension');
}

main().catch(console.error);
