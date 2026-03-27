#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dirs = [
  'src/types',
  'src/data',
  'src/app',
  'src/components/layout',
  'src/components/home',
  'src/components/ui',
  'src/components/icons'
];

// Get the directory where this script is running
const baseDir = process.cwd();

console.log('Creating directories in:', baseDir);

dirs.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  try {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log('✓ Created: ' + dir);
  } catch (err) {
    console.error('✗ Failed to create ' + dir + ':', err.message);
  }
});

console.log('\n--- Verification: Directory Structure ---\n');

// List the directory structure
const srcPath = path.join(baseDir, 'src');
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
  console.log('\n✓ Directory structure created successfully!');
} else {
  console.log('ERROR: src directory was not created');
  process.exit(1);
}
