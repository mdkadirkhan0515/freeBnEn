const fs = require('fs');
const path = require('path');

const appCode = fs.readFileSync(path.join(__dirname, 'App.tsx'), 'utf8');
const importRegex = /from\s+['"](\.\/src\/[^'"]+)['"]/g;
let match;
const paths = new Set();

while ((match = importRegex.exec(appCode)) !== null) {
  const fullPath = path.dirname(match[1]);
  paths.add(fullPath);
}

paths.forEach(dir => {
  const fullDir = path.join(__dirname, dir);
  if (!fs.existsSync(fullDir)) {
    fs.mkdirSync(fullDir, { recursive: true });
    console.log(`Created missing directory: ${dir}`);
  }
});
console.log('All required directories verified successfully!');
