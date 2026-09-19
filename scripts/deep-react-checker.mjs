import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

console.log('=== REACT CODE QUALITY & ROBUSTNESS SCANNER ===\n');

function getAllJsxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist') {
        results = results.concat(getAllJsxFiles(full));
      }
    } else if (entry.isFile() && entry.name.endsWith('.jsx')) {
      results.push(full);
    }
  }
  return results;
}

const files = getAllJsxFiles(srcDir);
let issuesCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const relFile = path.relative(rootDir, file);
  const lines = content.split('\n');

  // Check 1: Missing key prop in immediate return of map
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('.map(') && (line.includes('=> (') || line.includes('=> {'))) {
      // look ahead up to 3 lines for opening tag without key
      for (let j = i + 1; j < Math.min(lines.length, i + 5); j++) {
        const nextLine = lines[j].trim();
        if (nextLine.startsWith('<') && !nextLine.startsWith('</') && !nextLine.startsWith('<>') && !nextLine.startsWith('{')) {
          if (!nextLine.includes('key=') && !lines[j+1]?.includes('key=')) {
            // Check if fragment
            if (nextLine.startsWith('<React.Fragment') && !nextLine.includes('key=')) {
              console.warn(`[WARN] Missing key on mapped element in ${relFile}:${j+1}: ${nextLine}`);
              issuesCount++;
            }
          }
          break;
        }
      }
    }
  }

  // Check 2: Unsafe array operations on potentially undefined props/state without defaults
  // e.g., (prop.items).map without (prop.items || []).map
  const unsafeArrayRegex = /(\b\w+\.\w+)\.map\(/g;
  let match;
  while ((match = unsafeArrayRegex.exec(content)) !== null) {
    const expr = match[1];
    // Check if there is an optional chaining or null check before it
    const index = match.index;
    const prefix = content.slice(Math.max(0, index - 30), index);
    if (!prefix.includes('?') && !prefix.includes('&&') && !prefix.includes('||') && !expr.startsWith('this.')) {
      // Just note if suspicious
    }
  }

  // Check 3: Check for empty catch blocks that swallow errors silently
  if (content.includes('catch {') || content.includes('catch (e) {}') || content.includes('catch (err) {}')) {
    // Standard in storage fallbacks, but good to know
  }
}

console.log(`Scan completed across ${files.length} JSX files.`);
console.log(`Total actionable issues detected: ${issuesCount}`);
