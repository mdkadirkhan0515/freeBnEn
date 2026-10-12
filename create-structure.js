const fs = require('fs');
const path = require('path');

const dirs = [
  'src/database',
  'src/storage/DailyBank',
  'src/services/TTSEngine',
  'src/screens',
  'src/theme'
];

dirs.forEach(dir => {
  const fullDir = path.join(__dirname, dir);
  if (!fs.existsSync(fullDir)) {
    fs.mkdirSync(fullDir, { recursive: true });
    console.log(`Created folder: ${dir}`);
  }
});
console.log('Folder structure verified successfully!');
