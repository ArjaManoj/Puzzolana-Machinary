/**
 * Puzzolana Machinery - Production Build Verification Script
 * Validates TypeScript compilation and Next.js production artifacts.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 [PUZZOLANA OEM] Starting Production Build Verification...\n');

const rootDir = path.resolve(__dirname, '..');
const backendDistServer = path.join(rootDir, 'backend', 'dist', 'server.js');
const frontendNextDir = path.join(rootDir, 'frontend', '.next');

try {
  // 1. Build Backend
  console.log('📦 Step 1/2: Building Backend TypeScript bundle...');
  execSync('npm run build --prefix backend', { cwd: rootDir, stdio: 'inherit' });

  if (!fs.existsSync(backendDistServer)) {
    throw new Error(`Backend build failed: ${backendDistServer} not found.`);
  }
  console.log('  ✓ Backend compiled successfully to dist/server.js\n');

  // 2. Build Frontend
  console.log('📦 Step 2/2: Building Frontend Next.js production bundle...');
  execSync('npm run build --prefix frontend', { cwd: rootDir, stdio: 'inherit' });

  if (!fs.existsSync(frontendNextDir)) {
    throw new Error(`Frontend build failed: ${frontendNextDir} not found.`);
  }
  console.log('  ✓ Frontend compiled successfully to .next/\n');

  console.log('================================================================');
  console.log('🎉 [SUCCESS] All Production Build Artifacts Verified Successfully!');
  console.log('================================================================\n');
  process.exit(0);
} catch (error) {
  console.error('\n❌ [ERROR] Production build verification failed:');
  console.error(error.message);
  process.exit(1);
}
