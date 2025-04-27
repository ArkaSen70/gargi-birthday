const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Path to the images directory
const imagesDir = path.join(__dirname, '../public/images');

// Extensions to convert
const extensions = ['.jpg', '.jpeg', '.png'];

// Function to walk through the directory and process images
async function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      
      // Check if the file is an image with an extension we want to convert
      if (extensions.includes(ext)) {
        const fileName = path.basename(file, ext);
        const webpPath = path.join(directory, `${fileName}.webp`);
        
        // Skip if WebP version already exists
        if (fs.existsSync(webpPath)) {
          console.log(`Skipping ${filePath}, WebP already exists`);
          continue;
        }
        
        try {
          // Process the image with sharp and save as WebP
          await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(webpPath);
          
          console.log(`Converted ${filePath} to WebP format`);
        } catch (error) {
          console.error(`Error converting ${filePath}:`, error);
        }
      }
    }
  }
}

// Start processing
console.log('Starting image conversion to WebP...');
processDirectory(imagesDir)
  .then(() => {
    console.log('Image conversion complete!');
  })
  .catch((error) => {
    console.error('Error processing images:', error);
  }); 