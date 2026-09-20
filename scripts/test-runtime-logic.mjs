import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import demoData from '../src/data/demoData.js';
import { formatCoords, formatDateTime, formatNumber, formatQuantity, nextId, timeAgo } from '../src/lib/format.js';
import { isLowStock, optionsFrom, statusLabel, stockStatus, CARGO_STATUS, STOCK_STATUS, LOCATION_TYPE, OPS_WINDOW, PERSONNEL_STATUS, PRIORITY, SEVERITY } from '../src/lib/statuses.js';
import { USERS, validateCredentials } from '../src/lib/credentials.js';
import { findNavItem, NAV_ITEMS } from '../src/lib/navigation.js';
import { assessConditions, windDirection } from '../src/services/weatherService.js';

console.log('====================================================');
console.log('   POLAR-AI RUNTIME LOGIC & DATA INTEGRITY TESTER   ');
console.log('====================================================\n');

let failedTests = 0;
let passedTests = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    failedTests++;
  } else {
    passedTests++;
  }
}

// ------------------------------------------------------------------
// 1. Data Schema & Relational Integrity
// ------------------------------------------------------------------
console.log('[SECTION 1] Checking Demo Data relational integrity...');

assert(Array.isArray(demoData.locations) && demoData.locations.length > 0, 'demoData.locations must be non-empty array');
assert(Array.isArray(demoData.expeditions) && demoData.expeditions.length > 0, 'demoData.expeditions must be non-empty array');
assert(Array.isArray(demoData.personnel) && demoData.personnel.length > 0, 'demoData.personnel must be non-empty array');
assert(Array.isArray(demoData.cargo) && demoData.cargo.length > 0, 'demoData.cargo must be non-empty array');
assert(Array.isArray(demoData.inventory) && demoData.inventory.length > 0, 'demoData.inventory must be non-empty array');
assert(Array.isArray(demoData.emergencies) && demoData.emergencies.length > 0, 'demoData.emergencies must be non-empty array');
assert(Array.isArray(demoData.assets) && demoData.assets.length > 0, 'demoData.assets must be non-empty array');
assert(Array.isArray(demoData.missions) && demoData.missions.length > 0, 'demoData.missions must be non-empty array');
assert(Array.isArray(demoData.risks) && demoData.risks.length > 0, 'demoData.risks must be non-empty array');
assert(Array.isArray(demoData.recommendations) && demoData.recommendations.length > 0, 'demoData.recommendations must be non-empty array');
assert(Array.isArray(demoData.auditLogs) && demoData.auditLogs.length > 0, 'demoData.auditLogs must be non-empty array');

const locationIds = new Set(demoData.locations.map(l => l.id));
const expeditionIds = new Set(demoData.expeditions.map(e => e.id));

// Verify Personnel references
for (const p of demoData.personnel) {
  assert(p.id && typeof p.id === 'string', `Personnel must have valid ID, got ${p.id}`);
  assert(p.name && typeof p.name === 'string', `Personnel ${p.id} must have valid name`);
  assert(locationIds.has(p.location_id), `Personnel ${p.id} has invalid location_id "${p.location_id}"`);
  if (p.expedition_id) {
    assert(expeditionIds.has(p.expedition_id), `Personnel ${p.id} has invalid expedition_id "${p.expedition_id}"`);
  }
}

// Verify Cargo references
for (const c of demoData.cargo) {
  assert(c.id && typeof c.id === 'string', `Cargo must have valid ID, got ${c.id}`);
  assert(c.item_name && typeof c.item_name === 'string', `Cargo ${c.id} must have item_name`);
  if (c.expedition_id) {
    assert(expeditionIds.has(c.expedition_id), `Cargo ${c.id} has invalid expedition_id "${c.expedition_id}"`);
  }
}

// Verify Inventory numbers
for (const item of demoData.inventory) {
  assert(item.id && typeof item.id === 'string', `Inventory item must have valid ID, got ${item.id}`);
  assert(typeof item.quantity === 'number' && !isNaN(item.quantity), `Inventory ${item.id} quantity must be a valid number`);
  assert(typeof item.minimum_quantity === 'number' && !isNaN(item.minimum_quantity), `Inventory ${item.id} minimum_quantity must be a valid number`);
}

console.log(`[SECTION 1 COMPLETE] Relational integrity verified.\n`);

// ------------------------------------------------------------------
// 2. Formatting Helpers
// ------------------------------------------------------------------
console.log('[SECTION 2] Checking formatting helper algorithms...');

assert(formatNumber(14200) === '14,200', 'formatNumber(14200) should be "14,200"');
assert(formatNumber(0) === '0', 'formatNumber(0) should be "0"');
assert(formatNumber(null) === '—', 'formatNumber(null) should be "—"');
assert(formatNumber(undefined) === '—', 'formatNumber(undefined) should be "—"');
assert(formatNumber(NaN) === '—', 'formatNumber(NaN) should be "—"');

assert(formatQuantity(14200, 'L') === '14,200 L', 'formatQuantity(14200, "L") should be "14,200 L"');
assert(formatQuantity(null, 'kg') === '—', 'formatQuantity(null, "kg") should be "—"');

const coordsStr = formatCoords(-70.767, 11.733);
assert(coordsStr.includes('S') && coordsStr.includes('E'), `formatCoords should format latitude S and longitude E, got "${coordsStr}"`);

assert(nextId([{ id: 'C-101' }, { id: 'C-102' }, { id: 'C-103' }], 'C') === 'C-104', 'nextId should correctly calculate C-104');
assert(nextId([{ id: 'EXP-001' }, { id: 'EXP-002' }], 'EXP') === 'EXP-003', 'nextId should correctly calculate EXP-003');

console.log(`[SECTION 2 COMPLETE] Formatting helpers verified.\n`);

// ------------------------------------------------------------------
// 3. Stock Status & Threshold Engine
// ------------------------------------------------------------------
console.log('[SECTION 3] Checking Stock Status & Threshold calculations...');

assert(isLowStock({ quantity: 100, minimum_quantity: 150 }) === true, 'isLowStock should be true when quantity <= minimum_quantity');
assert(isLowStock({ quantity: 200, minimum_quantity: 150 }) === false, 'isLowStock should be false when quantity > minimum_quantity');

assert(stockStatus({ quantity: 0, minimum_quantity: 150 }) === 'OUT_OF_STOCK', 'stockStatus should return OUT_OF_STOCK for 0 quantity');
assert(stockStatus({ quantity: 120, minimum_quantity: 150 }) === 'LOW_STOCK', 'stockStatus should return LOW_STOCK for 120/150');
assert(stockStatus({ quantity: 250, minimum_quantity: 150 }) === 'AVAILABLE', 'stockStatus should return AVAILABLE for 250/150');

console.log(`[SECTION 3 COMPLETE] Stock status logic verified.\n`);

// ------------------------------------------------------------------
// 4. Credentials & Auth Logic
// ------------------------------------------------------------------
console.log('[SECTION 4] Checking authentication credentials and demo roles...');

assert(Array.isArray(USERS) && USERS.length >= 4, 'USERS must contain at least 4 demo accounts');

for (const u of USERS) {
  assert(u.id && u.password && u.name && u.role, `User ${u.id} must have id, password, name, role`);
  const matched = validateCredentials(u.id, u.password);
  assert(matched && matched.id === u.id, `validateCredentials must match valid user ${u.id}`);
}

assert(validateCredentials('nonexistent', 'wrong') === null, 'validateCredentials must reject invalid credentials');
assert(validateCredentials('commander', 'wrongpass') === null, 'validateCredentials must reject wrong password');

console.log(`[SECTION 4 COMPLETE] Auth logic verified.\n`);

// ------------------------------------------------------------------
// 5. Navigation & Registry
// ------------------------------------------------------------------
console.log('[SECTION 5] Checking Navigation registry and item resolution...');

assert(Array.isArray(NAV_ITEMS) && NAV_ITEMS.length > 0, 'NAV_ITEMS must be non-empty');

for (const item of NAV_ITEMS) {
  assert(item.id && item.label && item.title, `NAV_ITEM ${item.id} must have label and title`);
  const resolved = findNavItem(item.id);
  assert(resolved && resolved.id === item.id, `findNavItem(${item.id}) must resolve item`);
}

assert(findNavItem('nonexistent').id === 'dashboard', 'findNavItem should fall back to dashboard for nonexistent id');

console.log(`[SECTION 5 COMPLETE] Navigation registry verified.\n`);

// ------------------------------------------------------------------
// 6. Weather Ops Condition Engine
// ------------------------------------------------------------------
console.log('[SECTION 6] Checking Meteorological operations evaluation...');

assert(windDirection(0) === 'N', 'windDirection(0) should be "N"');
assert(windDirection(90) === 'E', 'windDirection(90) should be "E"');
assert(windDirection(180) === 'S', 'windDirection(180) should be "S"');
assert(windDirection(270) === 'W', 'windDirection(270) should be "W"');

const goodConditions = { temperature: -15, windChill: -10, windSpeed: 15, windGusts: 20 };
const goodOps = assessConditions(goodConditions);
assert(goodOps.key === 'CLEAR', `Mild conditions should be CLEAR ops, got ${goodOps.key}`);

const extremeChill = { temperature: -35, windChill: -55, windSpeed: 50, windGusts: 80 };
const extremeOps = assessConditions(extremeChill);
assert(extremeOps.key === 'GROUNDED', `Extreme chill (-55C) and gusts (80) must be GROUNDED, got ${extremeOps.key}`);

console.log(`[SECTION 6 COMPLETE] Meteorological engine verified.\n`);

// ------------------------------------------------------------------
// SUMMARY
// ------------------------------------------------------------------
console.log('====================================================');
console.log(`LOGIC SUITE SUMMARY: ${passedTests} Passed, ${failedTests} Failed`);
console.log('====================================================\n');

process.exit(failedTests > 0 ? 1 : 0);
