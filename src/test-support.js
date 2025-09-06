/**
 * Support Email Service Test Script
 * 
 * This script tests the support email service endpoints
 * Run with: node src/test-support.js
 */

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3002/api/support';
const API_KEY = process.env.API_KEY || 'test-api-key';

// Test data
const testClientEmail = 'client@example.com';
const testClientName = 'John Doe';
const testInquiry = 'I need help with my account setup';
const testResponse = 'Thank you for contacting us. We have reviewed your request and here is our response...';
const testActionRequired = 'Please verify your email address by clicking the link we sent you.';

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

async function testSupportEmailConfig() {
  console.log('\n🧪 Testing Support Email Configuration...');
  await makeRequest('/test-config', 'GET');
}

async function testSupportEmailStatus() {
  console.log('\n🧪 Testing Support Email Service Status...');
  await makeRequest('/status', 'GET');
}

async function testSupportResponseEmail() {
  console.log('\n🧪 Testing Support Response Email...');
  await makeRequest('/send-support-response', 'POST', {
    clientEmail: testClientEmail,
    clientName: testClientName,
    inquiry: testInquiry,
    response: testResponse,
    actionRequired: testActionRequired
  });
}

async function testWelcomeEmail() {
  console.log('\n🧪 Testing Welcome Email...');
  await makeRequest('/send-welcome', 'POST', {
    clientEmail: testClientEmail,
    clientName: testClientName
  });
}

async function testCustomEmail() {
  console.log('\n🧪 Testing Custom Email...');
  await makeRequest('/send-custom', 'POST', {
    clientEmail: testClientEmail,
    clientName: testClientName,
    subject: 'Important Update from Trizen Ventures',
    message: 'This is a custom message from our support team. Please review the attached information.',
    isHtml: false
  });
}

async function testBulkEmails() {
  console.log('\n🧪 Testing Bulk Emails...');
  await makeRequest('/send-bulk', 'POST', {
    clients: [
      { email: testClientEmail, name: testClientName },
      { email: 'client2@example.com', name: 'Jane Smith' }
    ],
    subject: 'Bulk Update from Trizen Ventures',
    message: 'This is a bulk message sent to multiple clients.',
    isHtml: false
  });
}

async function testInvalidEmail() {
  console.log('\n🧪 Testing Invalid Email Format...');
  await makeRequest('/send-support-response', 'POST', {
    clientEmail: 'invalid-email',
    clientName: testClientName,
    inquiry: testInquiry,
    response: testResponse
  });
}

async function testMissingFields() {
  console.log('\n🧪 Testing Missing Required Fields...');
  await makeRequest('/send-welcome', 'POST', {
    clientEmail: testClientEmail
    // Missing clientName
  });
}

async function testUnauthorizedAccess() {
  console.log('\n🧪 Testing Unauthorized Access...');
  await makeRequest('/test-config', 'GET', null, false);
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting Support Email Service Tests...');
  console.log('==========================================');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`API Key: ${API_KEY ? 'Set' : 'Not set'}`);
  
  try {
    // Test 1: Health check (no auth required)
    await testHealthCheck();
    
    // Test 2: Support email configuration
    await testSupportEmailConfig();
    
    // Test 3: Support email service status
    await testSupportEmailStatus();
    
    // Test 4: Support response email
    await testSupportResponseEmail();
    
    // Test 5: Welcome email
    await testWelcomeEmail();
    
    // Test 6: Custom email
    await testCustomEmail();
    
    // Test 7: Bulk emails
    await testBulkEmails();
    
    // Test 8: Invalid email format
    await testInvalidEmail();
    
    // Test 9: Missing required fields
    await testMissingFields();
    
    // Test 10: Unauthorized access
    await testUnauthorizedAccess();
    
    console.log('\n✅ All support email tests completed!');
    console.log('\n📋 Test Summary:');
    console.log('- Health check endpoint');
    console.log('- Support email configuration test');
    console.log('- Support email service status check');
    console.log('- Support response email sending');
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
