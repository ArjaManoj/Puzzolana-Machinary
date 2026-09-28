/**
 * Puzzolana Platform Setup Verification Script
 * Validates existence of critical files, folder hierarchies, and configuration files.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const REQUIRED_PATHS = [
  '.gitignore',
  '.env.example',
  'README.md',
  'package.json',
  'docs/ARCHITECTURE.md',
  'docs/MODULE_TRACKER.md',
  'backend/package.json',
  'backend/tsconfig.json',
  'backend/src/server.ts',
  'backend/src/app.ts',
  'frontend/package.json',
  'frontend/tsconfig.json',
  'frontend/tailwind.config.ts',
  'frontend/app/layout.tsx',
  'frontend/app/page.tsx',
  'frontend/app/globals.css'
];

console.log('\n========================================');
console.log('🏗️  PUZZOLANA PLATFORM SETUP VERIFIER');
console.log('========================================\n');

let missingCount = 0;

for (const relPath of REQUIRED_PATHS) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (fs.existsSync(fullPath)) {
    console.log(` ✅ FOUND: ${relPath}`);
  } else {
    console.error(` ❌ MISSING: ${relPath}`);
    missingCount++;
  }
}

console.log('\n----------------------------------------');
if (missingCount === 0) {
  console.log('✨ All required scaffolding files verified successfully!\n');
  process.exit(0);
} else {
  console.error(`⚠️  Found ${missingCount} missing required files.\n`);
  process.exit(1);
}
