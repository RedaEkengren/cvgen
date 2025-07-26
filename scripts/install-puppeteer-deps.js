#!/usr/bin/env node

const { execSync } = require('child_process');
const os = require('os');

console.log('Checking for Puppeteer dependencies...');
console.log('Platform:', os.platform());
console.log('Node version:', process.version);

// Only run on Linux (DigitalOcean)
if (os.platform() !== 'linux') {
  console.log('Not on Linux, skipping Chromium installation');
  process.exit(0);
}

// Check if we're on DigitalOcean or similar
const isProduction = process.env.NODE_ENV === 'production' || 
                    process.env.DO_APP_ID || 
                    process.env.DIGITALOCEAN;

if (!isProduction) {
  console.log('Not in production, skipping Chromium installation');
  process.exit(0);
}

console.log('Production environment detected, installing Chromium...');

try {
  // Try to install Chromium
  console.log('Attempting to install chromium via apt...');
  execSync('apt-get update && apt-get install -y --no-install-recommends chromium', { 
    stdio: 'inherit' 
  });
  console.log('Chromium installed successfully!');
} catch (error) {
  console.warn('Failed to install via apt, Puppeteer will use bundled Chromium');
}