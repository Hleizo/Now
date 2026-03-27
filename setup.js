const fs = require('fs');
const path = require('path');

// Create directory structure
const dirs = [
  'src/types',
  'src/data',
  'src/app',
  'src/components/layout',
  'src/components/home',
  'src/components/ui',
  'src/components/icons'
];

dirs.forEach(dir => {
  try {
    fs.mkdirSync(dir, { recursive: true });
    console.log('✓ Created: ' + dir);
  } catch (e) {
    console.log('✓ Exists: ' + dir);
  }
});

console.log('\n✓ Directory structure created successfully!');

// Verify the structure
console.log('\n--- Verifying Directory Structure ---');
function showDirTree(dir, prefix = '') {
  const items = fs.readdirSync(dir).sort();
  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const fullPath = path.join(dir, item);
    const isDir = fs.statSync(fullPath).isDirectory();
    
    console.log(prefix + (isLast ? '└── ' : '├── ') + item + (isDir ? '/' : ''));
    
    if (isDir) {
      showDirTree(fullPath, prefix + (isLast ? '    ' : '│   '));
    }
  });
}

showDirTree('src');
console.log('\n✓ Verification complete!');
