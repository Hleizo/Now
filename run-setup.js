const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Change to the script directory
const scriptDir = 'c:\\Users\\zeind\\OneDrive\\Desktop\\Now';
process.chdir(scriptDir);

// Execute the create-dirs.js
try {
  execSync('node create-dirs.js', { stdio: 'inherit' });
  console.log('\n\n--- Verification: Directory Structure ---\n');
  
  // List the directory structure
  const srcPath = path.join(scriptDir, 'src');
  if (fs.existsSync(srcPath)) {
    const listDir = (dir, prefix = '') => {
      const files = fs.readdirSync(dir);
      files.forEach((file, index) => {
        const fullPath = path.join(dir, file);
        const isLast = index === files.length - 1;
        const connector = isLast ? '└── ' : '├── ';
        console.log(prefix + connector + file);
        
        const nextPrefix = prefix + (isLast ? '    ' : '│   ');
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
          listDir(fullPath, nextPrefix);
        }
      });
    };
    
    console.log('src/');
    listDir(srcPath);
  } else {
    console.log('ERROR: src directory was not created');
  }
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
