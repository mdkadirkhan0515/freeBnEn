const { exec } = require('child_process');
const fs = require('fs');

console.log('Scanning project for TypeScript errors...');
exec('npx tsc --noEmit', (error, stdout, stderr) => {
  const output = stdout || stderr;
  if (!output) {
    console.log('No errors found!');
    return;
  }

  const lines = output.split('\n');
  let errorList = '# TypeScript Error Report\n\nTotal lines: ' + lines.length + '\n\n';
  
  lines.forEach((line, index) => {
    if (line.includes('error TS')) {
      errorList += `- ${line.trim()}\n`;
    }
  });

  fs.writeFileSync('error-summary.md', errorList);
  console.log('Error summary saved to error-summary.md successfully!');
});

