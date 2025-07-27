// Security Test Script for Analytics API
// Tests all implemented security features

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';
const VALID_API_KEY = 'dev-analytics-key-2025';

console.log('🔒 Starting Security Test Suite...\n');

// Test 1: Input Validation - Template Names
async function testTemplateValidation() {
  console.log('📋 Test 1: Template Name Validation');
  
  const tests = [
    { templateName: 'modern', expected: 200, description: 'Valid template' },
    { templateName: 'invalid-template', expected: 400, description: 'Invalid template' },
    { templateName: '', expected: 400, description: 'Empty template' },
    { templateName: null, expected: 400, description: 'Null template' },
    { templateName: '../../../etc/passwd', expected: 400, description: 'Path traversal attempt' },
    { templateName: '<script>alert(1)</script>', expected: 400, description: 'XSS attempt' }
  ];
  
  for (const test of tests) {
    try {
      const response = await fetch(`${BASE_URL}/api/analytics/track-view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateName: test.templateName, sessionId: 'test-123' })
      });
      
      console.log(`  ${test.description}: ${response.status === test.expected ? '✅' : '❌'} (${response.status})`);
    } catch (error) {
      console.log(`  ${test.description}: ❌ (Error: ${error.message})`);
    }
  }
  console.log();
}

// Test 2: Session ID Validation
async function testSessionIdValidation() {
  console.log('📋 Test 2: Session ID Validation');
  
  const tests = [
    { sessionId: 'abc-123-xyz', expected: 200, description: 'Valid session ID' },
    { sessionId: 'a'.repeat(51), expected: 400, description: 'Too long session ID' },
    { sessionId: 'session!@#$', expected: 400, description: 'Invalid characters' },
    { sessionId: '../../../etc', expected: 400, description: 'Path traversal in session' },
    { sessionId: null, expected: 200, description: 'Null session ID (optional)' }
  ];
  
  for (const test of tests) {
    try {
      const response = await fetch(`${BASE_URL}/api/analytics/track-view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateName: 'modern', sessionId: test.sessionId })
      });
      
      console.log(`  ${test.description}: ${response.status === test.expected ? '✅' : '❌'} (${response.status})`);
    } catch (error) {
      console.log(`  ${test.description}: ❌ (Error: ${error.message})`);
    }
  }
  console.log();
}

// Test 3: Date Validation
async function testDateValidation() {
  console.log('📋 Test 3: Date Parameter Validation');
  
  const tests = [
    { date: '2025-07-26', expected: 200, description: 'Valid date' },
    { date: '2025-13-45', expected: 400, description: 'Invalid date format' },
    { date: '../../etc/passwd', expected: 400, description: 'Path traversal attempt' },
    { date: '2030-01-01', expected: 400, description: 'Future date' },
    { date: 'SELECT * FROM', expected: 400, description: 'SQL injection attempt' }
  ];
  
  for (const test of tests) {
    try {
      const response = await fetch(`${BASE_URL}/api/analytics/daily/${test.date}`, {
        headers: { 'x-analytics-api-key': VALID_API_KEY }
      });
      
      console.log(`  ${test.description}: ${response.status === test.expected ? '✅' : '❌'} (${response.status})`);
    } catch (error) {
      console.log(`  ${test.description}: ❌ (Error: ${error.message})`);
    }
  }
  console.log();
}

// Test 4: Authentication
async function testAuthentication() {
  console.log('📋 Test 4: API Key Authentication');
  
  const endpoints = [
    '/api/analytics/popularity',
    '/api/analytics/report',
    '/api/analytics/trends'
  ];
  
  for (const endpoint of endpoints) {
    // Test without API key
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      console.log(`  ${endpoint} without key: ${response.status === 401 ? '✅' : '❌'} (${response.status})`);
    } catch (error) {
      console.log(`  ${endpoint} without key: ❌ (Error: ${error.message})`);
    }
    
    // Test with valid API key
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: { 'x-analytics-api-key': VALID_API_KEY }
      });
      console.log(`  ${endpoint} with valid key: ${response.status === 200 ? '✅' : '❌'} (${response.status})`);
    } catch (error) {
      console.log(`  ${endpoint} with valid key: ❌ (Error: ${error.message})`);
    }
  }
  console.log();
}

// Test 5: Rate Limiting
async function testRateLimiting() {
  console.log('📋 Test 5: Rate Limiting');
  console.log('  Testing write endpoint rate limit (50 requests/15min)...');
  
  let successCount = 0;
  let rateLimitedCount = 0;
  
  // Make 55 requests to test write limit
  for (let i = 0; i < 55; i++) {
    try {
      const response = await fetch(`${BASE_URL}/api/analytics/track-view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateName: 'modern', sessionId: `test-${i}` })
      });
      
      if (response.status === 200) successCount++;
      if (response.status === 429) rateLimitedCount++;
    } catch (error) {
      // Ignore errors
    }
  }
  
  console.log(`  Successful: ${successCount}, Rate limited: ${rateLimitedCount}`);
  console.log(`  Rate limiting working: ${rateLimitedCount > 0 ? '✅' : '❌'}`);
  console.log();
}

// Test 6: Cache Verification
async function testCaching() {
  console.log('📋 Test 6: Report Caching');
  
  const start1 = Date.now();
  await fetch(`${BASE_URL}/api/analytics/report`, {
    headers: { 'x-analytics-api-key': VALID_API_KEY }
  });
  const time1 = Date.now() - start1;
  
  const start2 = Date.now();
  await fetch(`${BASE_URL}/api/analytics/report`, {
    headers: { 'x-analytics-api-key': VALID_API_KEY }
  });
  const time2 = Date.now() - start2;
  
  console.log(`  First request: ${time1}ms`);
  console.log(`  Second request (cached): ${time2}ms`);
  console.log(`  Caching working: ${time2 < time1 / 2 ? '✅' : '❌'}`);
  console.log();
}

// Run all tests
async function runAllTests() {
  await testTemplateValidation();
  await testSessionIdValidation();
  await testDateValidation();
  await testAuthentication();
  await testRateLimiting();
  await testCaching();
  
  console.log('🏁 Security Test Suite Complete!\n');
}

// Note: Server must be running in development mode
console.log('⚠️  Note: Run server with NODE_ENV=development for authentication tests to pass\n');

runAllTests().catch(console.error);