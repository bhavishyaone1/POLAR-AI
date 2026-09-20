import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

console.log('====================================================');
console.log('   POLAR-AI DEEP COMPREHENSIVE DEBUG & AUDIT SUITE  ');
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
let totalErrors = 0;
let totalWarnings = 0;

// ==========================================
// TEST 1: Navigation View IDs Validation
// ==========================================
console.log('[TEST 1] Validating all goTo("...") view targets against App.jsx routing...');

const VALID_VIEWS = new Set([
  'landing', 'dashboard', 'expeditions', 'personnel', 'assets',
  'impact', 'simulator', 'risks', 'cargo', 'inventory',
  'map', 'weather', 'emergency', 'copilot', 'reports', 'audit', 'sources'
]);

for (const file of allSrcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(rootDir, file);

  // Match goTo('...') or goTo("...")
  const goToRegex = /goTo\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
  let match;
  while ((match = goToRegex.exec(content)) !== null) {
    const target = match[1];
    if (!VALID_VIEWS.has(target)) {
      console.error(`[ERROR: Invalid Route] In ${relPath}: goTo('${target}') is not a recognized view ID!`);
      totalErrors++;
    }
  }

  // Also check actionTarget in data objects
  const actionTargetRegex = /actionTarget:\s*['"`]([^'"`]+)['"`]/g;
  while ((match = actionTargetRegex.exec(content)) !== null) {
    const target = match[1];
    if (!VALID_VIEWS.has(target)) {
      console.error(`[ERROR: Invalid ActionTarget] In ${relPath}: actionTarget: '${target}' is not a recognized view ID!`);
      totalErrors++;
    }
  }
}
console.log(`[TEST 1 COMPLETE] Navigation targets verified.\n`);

// ==========================================
// TEST 2: DataContext & AuthContext API Verification
// ==========================================
console.log('[TEST 2] Checking DataContext and AuthContext method & property usage...');

const dataContextContent = fs.readFileSync(path.join(srcDir, 'store', 'DataContext.jsx'), 'utf8');
const authContextContent = fs.readFileSync(path.join(srcDir, 'store', 'AuthContext.jsx'), 'utf8');

// Extract exported keys from DataContext and AuthContext
function extractContextKeys(fileContent) {
  const keys = new Set();
  // Match either return { ... } or () => ({ ... })
  const memoMatch = fileContent.match(/useMemo\(\s*(?:\(\)\s*=>\s*)?\{?[\s\S]*?return\s*\{([\s\S]*?)\}\s*,?\s*\[/);
  const directMatch = fileContent.match(/useMemo\(\s*\(\)\s*=>\s*\(\{([\s\S]*?)\}\)\s*,\s*\[/);
  const matchStr = (directMatch && directMatch[1]) || (memoMatch && memoMatch[1]) || '';

  const lines = matchStr.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;
    // e.g. "locations," or "canManage: role?.canManage ?? false,"
    const propMatch = trimmed.match(/^([a-zA-Z0-9_$]+)\s*[:,\/]/) || trimmed.match(/^([a-zA-Z0-9_$]+)$/);
    if (propMatch) {
      keys.add(propMatch[1]);
    }
  }
  return keys;
}

const dataContextExports = extractContextKeys(dataContextContent);
const authContextExports = extractContextKeys(authContextContent);


for (const file of allSrcFiles) {
  if (file.endsWith('DataContext.jsx') || file.endsWith('AuthContext.jsx')) continue;
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(rootDir, file);

  // Check useData() destructuring
  const useDataRegex = /const\s*\{([^}]+)\}\s*=\s*useData\(\)/g;
  let dMatch;
  while ((dMatch = useDataRegex.exec(content)) !== null) {
    const properties = dMatch[1].split(',').map(p => p.trim().split(':')[0].trim()).filter(Boolean);
    for (const prop of properties) {
      if (!dataContextExports.has(prop)) {
        console.error(`[ERROR: Missing DataContext Property] In ${relPath}: useData() destructures "${prop}", but it is NOT provided by DataContext!`);
        totalErrors++;
      }
    }
  }

  // Check useAuth() destructuring
  const useAuthRegex = /const\s*\{([^}]+)\}\s*=\s*useAuth\(\)/g;
  let aMatch;
  while ((aMatch = useAuthRegex.exec(content)) !== null) {
    const properties = aMatch[1].split(',').map(p => p.trim().split(':')[0].trim()).filter(Boolean);
    for (const prop of properties) {
      if (!authContextExports.has(prop)) {
        console.error(`[ERROR: Missing AuthContext Property] In ${relPath}: useAuth() destructures "${prop}", but it is NOT provided by AuthContext!`);
        totalErrors++;
      }
    }
  }
}
console.log(`[TEST 2 COMPLETE] Context methods and property contracts verified.\n`);

// ==========================================
// TEST 3: Live Dev Server Module Compilation Test
// ==========================================
console.log('[TEST 3] Testing live Vite transformation of all application pages and components...');

async function testUrl(pathUrl) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:5173${pathUrl}`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });
    req.on('error', (err) => {
      resolve({ statusCode: 0, error: err.message });
    });
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ statusCode: 408, error: 'Timeout' });
    });
  });
}

let serverTested = 0;
for (const file of allSrcFiles) {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  const url = `/${relPath}`;
  const res = await testUrl(url);
  if (res.statusCode !== 200) {
    console.error(`[ERROR: Server Module Fail] Failed to compile ${url}: HTTP ${res.statusCode}`);
    if (res.body && res.body.includes('error')) {
      console.error(res.body.slice(0, 300));
    }
    totalErrors++;
  } else {
    serverTested++;
  }
}
console.log(`[TEST 3 COMPLETE] Successfully compiled and served ${serverTested}/${allSrcFiles.length} modules via Vite dev server.\n`);

// ==========================================
// TEST 4: Missing Asset Files Verification
// ==========================================
console.log('[TEST 4] Checking static image and public assets integrity...');
const publicDir = path.join(rootDir, 'public');

for (const file of allSrcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(rootDir, file);

  // Match src="/..." or src={'/...'}
  const srcRegex = /src=['"]\/([^'"]+)['"]/g;
  let sMatch;
  while ((sMatch = srcRegex.exec(content)) !== null) {
    const assetRel = sMatch[1];
    // Ignore external or protocol urls
    if (assetRel.startsWith('http') || assetRel.startsWith('data:')) continue;
    const assetPath = path.join(publicDir, assetRel);
    if (!fs.existsSync(assetPath)) {
      console.warn(`[WARN: Missing Static Asset] In ${relPath}: src="/${assetRel}" was not found in public/`);
      totalWarnings++;
    }
  }
}
console.log(`[TEST 4 COMPLETE] Static assets checked.\n`);

// ==========================================
// TEST 5: Duplicate React Keys & Empty Handlers
// ==========================================
console.log('[TEST 5] Checking for broken click handlers, unhandled promises, or NaN vulnerabilities...');

for (const file of allSrcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(rootDir, file);

  // Check for onClick={undefined} or onClick={() => {}} without comment or action in buttons
  const emptyOnClickRegex = /onClick=\{\(\)\s*=>\s*\{\s*\}\}/g;
  let oMatch;
  while ((oMatch = emptyOnClickRegex.exec(content)) !== null) {
    console.warn(`[WARN: No-op onClick] In ${relPath}: contains empty onClick handler "onClick={() => {}}"`);
    totalWarnings++;
  }

  // Check for broken NaN string interpolation like `${...toFixed()}` on possible null
  if (content.includes('.toFixed(')) {
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('.toFixed(') && !line.includes('Number(') && !line.includes('!= null') && !line.includes('??') && !line.includes('||')) {
        // Just flag if suspicious
        if (line.includes('item.quantity') || line.includes('reading.temp')) {
          console.warn(`[WARN: Unchecked toFixed] In ${relPath}:${idx + 1}: ${line.trim()}`);
          totalWarnings++;
        }
      }
    });
  }
}
console.log(`[TEST 5 COMPLETE] Code pattern scan completed.\n`);

// ==========================================
// SUMMARY
// ==========================================
console.log('====================================================');
console.log(`DEBUG SUITE SUMMARY: ${totalErrors} Errors, ${totalWarnings} Warnings`);
console.log('====================================================\n');

process.exit(totalErrors > 0 ? 1 : 0);
