import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const publicDir = path.join(rootDir, 'public');

console.log('====================================================');
console.log('   POLAR-AI DEEP CODEBASE AUDIT & VERIFICATION');
console.log('====================================================\n');

function getAllFiles(dir, exts = ['.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist') {
        results = results.concat(getAllFiles(full, exts));
      }
    } else if (entry.isFile() && exts.some(ext => entry.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

const allSrcFiles = getAllFiles(srcDir);
console.log(`[CHECK 1] Scanning ${allSrcFiles.length} files in src/ for broken import statements...`);

let totalErrors = 0;
let totalWarnings = 0;

// Resolve file extension
const NODE_BUILTINS = new Set([
  'url', 'node:url', 'fs', 'node:fs', 'path', 'node:path', 'http', 'node:http',
  'https', 'node:https', 'crypto', 'node:crypto', 'os', 'node:os', 'stream', 'node:stream',
  'events', 'node:events', 'util', 'node:util', 'child_process', 'node:child_process'
]);

function resolveFile(baseDir, importPath) {
  if (NODE_BUILTINS.has(importPath) || importPath.startsWith('virtual:')) return true;

  if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
    // node_modules package - check if package.json exists in node_modules or package is in dependencies
    const pkgName = importPath.startsWith('@') 
      ? importPath.split('/').slice(0, 2).join('/')
      : importPath.split('/')[0];
    const nodeModulesPath = path.join(rootDir, 'node_modules', pkgName);
    if (fs.existsSync(nodeModulesPath)) {
      return true;
    }
    return false;
  }

  const absoluteTarget = importPath.startsWith('/')
    ? path.join(rootDir, importPath)
    : path.resolve(baseDir, importPath);

  const extensions = ['', '.js', '.jsx', '.json', '.css', '.png', '.jpg', '.jpeg', '.svg'];
  for (const ext of extensions) {
    const p = absoluteTarget + ext;
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return true;
  }

  // Check index file
  for (const ext of ['.js', '.jsx']) {
    const p = path.join(absoluteTarget, 'index' + ext);
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return true;
  }

  return false;
}

// 1. Check all imports
for (const file of allSrcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const fileDir = path.dirname(file);
  const relFile = path.relative(rootDir, file);

  // Match: from '...' or import '...'
  const importRegex = /(?:from\s+['"]([^'"]+)['"]|import\s+['"]([^'"]+)['"])/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1] || match[2];
    if (!resolveFile(fileDir, importPath)) {
      console.error(`[ERROR: Broken Import] In ${relFile}: Cannot resolve "${importPath}"`);
      totalErrors++;
    }
  }
}

console.log(`[CHECK 1 COMPLETE] Import resolution checked.`);

// 2. Check JSX Component Identifiers
console.log(`\n[CHECK 2] Scanning JSX components for missing imports or declarations...`);

for (const file of allSrcFiles) {
  if (!file.endsWith('.jsx')) continue;
  const content = fs.readFileSync(file, 'utf8');
  const relFile = path.relative(rootDir, file);

  // Find all JSX tags starting with Uppercase: <([A-Z]\w+)
  const jsxTagRegex = /<([A-Z]\w+)(?:[\s>/]|$)/g;
  let tagMatch;
  const usedTags = new Set();
  while ((tagMatch = jsxTagRegex.exec(content)) !== null) {
    usedTags.add(tagMatch[1]);
  }

  // Common globals or React built-ins
  const globals = new Set([
    'React', 'Fragment', 'Suspense', 'StrictMode', 'Profiler',
    'HTML', 'SVG', 'Math', 'Array', 'Object', 'String', 'Number', 'Boolean', 'RegExp', 'Date', 'Error'
  ]);

  for (const tag of usedTags) {
    if (globals.has(tag)) continue;
    
    // Check if tag is declared in content
    const isImported = new RegExp(`\\b${tag}\\b.*from\\s+['"]`).test(content) ||
                       new RegExp(`from\\s+['"][^'"]*['"]\\s*;?\\s*(?:\\/\\/.*)?$`, 'm').test(content) && content.includes(tag);
    const isDeclared = new RegExp(`(?:const|let|var|function|class)\\s+${tag}\\b`).test(content);
    const isParam = new RegExp(`\\b${tag}\\b`).test(content);

    // More precise check: does import contain tag?
    const hasImportMention = new RegExp(`\\b${tag}\\b`).test(content.slice(0, Math.max(1000, content.indexOf('export default'))));
    
    if (!hasImportMention && !isDeclared) {
      console.warn(`[WARN: Possible Missing Component] In ${relFile}: <${tag}> used but might not be declared/imported.`);
      totalWarnings++;
    }
  }
}

console.log(`[CHECK 2 COMPLETE] JSX component declarations checked.`);

// 3. Check public assets referenced in code
console.log(`\n[CHECK 3] Checking referenced static assets in public/ ...`);
for (const file of allSrcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relFile = path.relative(rootDir, file);

  // Match "/something.ext" (images, audio, icons)
  const assetRegex = /['"](\/[a-zA-Z0-9_\-./]+\.(?:jpg|jpeg|png|webp|svg|mp3|wav|ogg|ico|json|pdf))['"]/g;
  let assetMatch;
  while ((assetMatch = assetRegex.exec(content)) !== null) {
    const assetPath = assetMatch[1];
    const fullPublicPath = path.join(publicDir, assetPath.slice(1));
    if (!fs.existsSync(fullPublicPath)) {
      console.error(`[ERROR: Missing Asset] In ${relFile}: Static asset "${assetPath}" does not exist in public/ folder!`);
      totalErrors++;
    }
  }
}
console.log(`[CHECK 3 COMPLETE] Public asset references checked.`);

// 4. Check navigation view mapping in App.jsx vs navigation.js
console.log(`\n[CHECK 4] Checking View IDs across navigation and App.jsx...`);
const navFile = path.join(srcDir, 'lib', 'navigation.js');
const appFile = path.join(srcDir, 'App.jsx');

if (fs.existsSync(navFile) && fs.existsSync(appFile)) {
  const navContent = fs.readFileSync(navFile, 'utf8');
  const appContent = fs.readFileSync(appFile, 'utf8');

  // Extract navigation IDs
  const idRegex = /id:\s*['"]([^'"]+)['"]/g;
  let idMatch;
  const navIds = new Set();
  while ((idMatch = idRegex.exec(navContent)) !== null) {
    navIds.add(idMatch[1]);
  }

  // Check that App.jsx handles each navId in its switch statement
  for (const id of navIds) {
    if (!appContent.includes(`case '${id}':`) && !appContent.includes(`case "${id}":`)) {
      console.warn(`[WARN: Unhandled Navigation ID] Navigation ID "${id}" from navigation.js has no explicit case in App.jsx renderPage switch!`);
      totalWarnings++;
    }
  }
}
console.log(`[CHECK 4 COMPLETE] Navigation view mappings checked.`);

console.log('\n====================================================');
console.log(`AUDIT SUMMARY: ${totalErrors} Errors, ${totalWarnings} Warnings`);
console.log('====================================================');

process.exit(totalErrors > 0 ? 1 : 0);
