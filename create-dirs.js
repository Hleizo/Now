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

dirs.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
  console.log('✓ Created: ' + dir);
});

console.log('\nDirectory structure created successfully!');
