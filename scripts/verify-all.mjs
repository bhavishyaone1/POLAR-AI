import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

console.log('=== POLAR-AI COMPONENT & ICON IMPORT VERIFIER ===');

function scanDir(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(scanDir(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = scanDir(srcDir);
console.log(`Scanning ${allFiles.length} files in src/ for missing lucide-react imports and syntax...`);

let issuesFound = 0;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(rootDir, file);

  // Check lucide-react import vs usage
  const lucideMatch = content.match(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/);
  if (lucideMatch) {
    const importedIcons = lucideMatch[1]
      .split(',')
      .map(s => s.trim().replace(/\s+as\s+\w+/, ''))
      .filter(Boolean);

    // Common lucide icons to check if used without import
    const commonLucideIcons = [
      'Sparkles', 'ShieldAlert', 'CheckCircle2', 'AlertTriangle', 'AlertCircle',
      'ArrowRight', 'ArrowLeft', 'ChevronRight', 'ChevronLeft', 'Clock', 'Radio',
      'Boxes', 'Package', 'Cpu', 'Users', 'Compass', 'Sliders', 'Activity',
      'Zap', 'Truck', 'HeartPulse', 'Info', 'Eye', 'ExternalLink', 'Send', 'Search'
    ];

    for (const icon of commonLucideIcons) {
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        const iconUsageRegex = new RegExp(`(<${icon}\\b|icon:\\s*${icon}\\b)`);
        if (iconUsageRegex.test(line)) {
          if (!importedIcons.includes(icon) && !content.includes(`const ${icon} =`) && !content.includes(`function ${icon}(`)) {
            console.error(`[ERROR] ${relPath}:${idx + 1}: Line "${line.trim()}" uses "${icon}" but it is NOT imported from lucide-react!`);
            issuesFound++;
          }
        }
      });
    }
  }
}

if (issuesFound === 0) {
  console.log('SUCCESS: All checked Lucide icons and common symbols are properly imported!');
} else {
  console.error(`FAILURE: Found ${issuesFound} missing import issue(s)!`);
}

process.exit(issuesFound > 0 ? 1 : 0);
