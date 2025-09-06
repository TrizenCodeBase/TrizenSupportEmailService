/**
 * Email Service Test Script
 * 
 * This script tests the standalone email service endpoints
 * Run with: node src/test.js
 */

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3002/api/email';
const API_KEY = process.env.API_KEY || 'test-api-key';

// Test data
const testEmail = 'test@example.com';
const testFirstName = 'Test User';
const testResetToken = 'test-reset-token-12345678901234567890123456789012';

// Helper function to make API calls
async function makeRequest(endpoint, method = 'GET', body = null, useAuth = true) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (useAuth) {
    options.headers['X-API-Key'] = API_KEY;
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    console.log(`\n📡 ${method} ${endpoint}`);
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    return { response, data };
  } catch (error) {
    console.error(`❌ Error calling ${endpoint}:`, error.message);
    return { error };
  }
}

// Test functions
async function testHealthCheck() {
  console.log('\n🧪 Testing Health Check...');
  const url = 'http://localhost:3002/health';
  const response = await fetch(url);
  const data = await response.json();
  
  console.log(`\n📡 GET /health`);
  console.log(`Status: ${response.status}`);
  console.log('Response:', JSON.stringify(data, null, 2));
}

async function testEmailConfig() {
  console.log('\n🧪 Testing Email Configuration...');
  await makeRequest('/test-config', 'GET');
}

async function testEmailStatus() {
  console.log('\n🧪 Testing Email Service Status...');
  await makeRequest('/status', 'GET');
}

async function testPasswordReset() {
  console.log('\n🧪 Testing Password Reset Email...');
  await makeRequest('/send-password-reset', 'POST', {
    email: testEmail,
    resetToken: testResetToken
  });
}

async function testWelcomeEmail() {
  console.log('\n🧪 Testing Welcome Email...');
  await makeRequest('/send-welcome', 'POST', {
    email: testEmail,
    firstName: testFirstName
  });
}

async function testCustomEmail() {
  console.log('\n🧪 Testing Custom Email...');
  await makeRequest('/send-custom', 'POST', {
    to: testEmail,
    subject: 'Test Custom Email',
    html: '<h1>Test Email</h1><p>This is a test custom email.</p>',
    text: 'Test Email - This is a test custom email.'
  });
}

async function testBulkEmail() {
  console.log('\n🧪 Testing Bulk Email...');
  await makeRequest('/send-bulk', 'POST', {
    emails: [testEmail, 'test2@example.com'],
    subject: 'Bulk Test Email',
    html: '<h1>Bulk Test Email</h1><p>This is a bulk test email.</p>',
    text: 'Bulk Test Email - This is a bulk test email.'
  });
}

async function testInvalidEmail() {
  console.log('\n🧪 Testing Invalid Email Format...');
  await makeRequest('/send-password-reset', 'POST', {
    email: 'invalid-email',
    resetToken: testResetToken
  });
}

async function testMissingFields() {
  console.log('\n🧪 Testing Missing Required Fields...');
  await makeRequest('/send-welcome', 'POST', {
    email: testEmail
    // Missing firstName
  });
}

async function testUnauthorizedAccess() {
  console.log('\n🧪 Testing Unauthorized Access...');
  await makeRequest('/test-config', 'GET', null, false);
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting Email Service Tests...');
  console.log('=====================================');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`API Key: ${API_KEY ? 'Set' : 'Not set'}`);
  
  try {
    // Test 1: Health check (no auth required)
    await testHealthCheck();
    
    // Test 2: Email configuration
    await testEmailConfig();
    
    // Test 3: Email service status
    await testEmailStatus();
    
    // Test 4: Password reset email
    await testPasswordReset();
    
    // Test 5: Welcome email
    await testWelcomeEmail();
    
    // Test 6: Custom email
    await testCustomEmail();
    
    // Test 7: Bulk email
    await testBulkEmail();
    
    // Test 8: Invalid email format
    await testInvalidEmail();
    
    // Test 9: Missing required fields
    await testMissingFields();
    
    // Test 10: Unauthorized access
    await testUnauthorizedAccess();
    
    console.log('\n✅ All tests completed!');
    console.log('\n📋 Test Summary:');
    console.log('- Health check endpoint');
    console.log('- Email configuration test');
    console.log('- Email service status check');
    console.log('- Password reset email sending');
    console.log('- Welcome email sending');
    console.log('- Custom email sending');
    console.log('- Bulk email sending');
    console.log('- Invalid email format validation');
    console.log('- Missing fields validation');
    console.log('- Unauthorized access protection');
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
  }
}

// Run tests if this file is executed directly
runTests();

export { runTests };

