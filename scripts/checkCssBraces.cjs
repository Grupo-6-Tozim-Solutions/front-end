const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) files = files.concat(walk(full));
    else if (name.endsWith('.css')) files.push(full);
  }
  return files;
}

const root = path.join(__dirname, '..', 'src');
const cssFiles = walk(root);
let problem = false;
for (const file of cssFiles) {
  const text = fs.readFileSync(file, 'utf8');
  let balance = 0;
  let lineNum = 0;
  let firstNegative = null;
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const ch of line) {
      if (ch === '{') balance++;
      else if (ch === '}') balance--;
      if (balance < 0 && firstNegative === null) firstNegative = i + 1;
    }
  }
  if (balance !== 0 || firstNegative !== null) {
    problem = true;
    console.log(`File: ${file}`);
    if (firstNegative !== null) console.log(`  First negative balance at line ${firstNegative}`);
    console.log(`  Final balance: ${balance}\n`);
  }
}
if (!problem) console.log('All CSS files have balanced braces (per-file).');
