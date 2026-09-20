import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

function getAllFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = getAllFiles(srcDir);
let issues = 0;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(rootDir, file);

  // Extract all imported names from lucide-react
  const lucideImports = new Set();
  const lucideRegex = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/g;
  let lMatch;
  while ((lMatch = lucideRegex.exec(content)) !== null) {
    const parts = lMatch[1].split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      // Handle "Map as MapIcon"
      const aliasMatch = trimmed.match(/^(\w+)\s+as\s+(\w+)$/);
      if (aliasMatch) {
        lucideImports.add(aliasMatch[2]);
      } else if (/^\w+$/.test(trimmed)) {
        lucideImports.add(trimmed);
      }
    }
  }

  // Find all <IconName ...> in JSX
  const jsxTagRegex = /<([A-Z]\w+)\b/g;
  let tagMatch;
  while ((tagMatch = jsxTagRegex.exec(content)) !== null) {
    const tag = tagMatch[1];
    // Check if this looks like a Lucide icon (e.g. single-word PascalCase or common icon like X, Menu, Search, Check, etc.)
    // and whether it's declared anywhere in the file (import, const, function, class, or React component)
    const isDeclared =
      lucideImports.has(tag) ||
      content.includes(`import ${tag}`) ||
      content.includes(`import * as ${tag}`) ||
      content.includes(`import { ${tag}`) ||
      content.includes(`const ${tag}`) ||
      content.includes(`let ${tag}`) ||
      content.includes(`var ${tag}`) ||
      content.includes(`function ${tag}`) ||
      content.includes(`class ${tag}`) ||
      tag === 'React';

    if (!isDeclared) {
      // Check if tag is in lucide-react exports by checking lucide package or common icons
      console.error(`[UNDECLARED JSX COMPONENT] In ${relPath}: <${tag}> is used but NOT declared or imported anywhere!`);
      issues++;
    }
  }
}

console.log(`\nScan complete. Total undeclared JSX components found: ${issues}`);
process.exit(issues > 0 ? 1 : 0);
