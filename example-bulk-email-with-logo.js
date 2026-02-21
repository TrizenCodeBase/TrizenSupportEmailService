// Example: Send Bulk Email with Logo in Header
// This is a working example you can use to test the bulk email functionality

const API_BASE_URL = "http://localhost:3002";
const API_KEY = "your-api-key-here"; // Replace with your actual API key

// Example 1: Using a hosted logo URL (RECOMMENDED)
async function sendBulkEmailWithHostedLogo() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/support/send-bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
      },
      body: JSON.stringify({
        clients: [
          { email: "client1@example.com", name: "John Doe" },
          { email: "client2@example.com", name: "Jane Smith" },
          { email: "client3@example.com", name: "Bob Wilson" },
        ],
        subject: "Important Update from Trizen Ventures",
        message: `
          <p>Dear [Name],</p>
          
          <p>We are excited to share some important updates with you regarding our latest services and offerings.</p>
          
          <h3>What's New:</h3>
          <ul>
            <li>Enhanced career opportunities</li>
            <li>New training programs</li>
            <li>Expanded support services</li>
          </ul>
          
          <p>If you have any questions, please don't hesitate to reach out to our support team.</p>
          
          <p>Best regards,<br>
          <strong>Trizen Ventures Team</strong></p>
        `,
        isHtml: true,
        attachments: [
          {
            filename: "header-logo.png",
            // Replace with your actual hosted logo URL
            url: "https://trizenventures.com/images/logo.png",
            contentType: "image/png",
            cid: "header-logo",
          },
        ],
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("✅ Bulk emails sent successfully!");
      console.log(
        `📧 Sent: ${result.data.totalSent}, Failed: ${result.data.totalFailed}`
      );
      console.log("Results:", result.data.results);
    } else {
      console.error("❌ Failed to send emails:", result.error);
    }

    return result;
  } catch (error) {
    console.error("❌ Error:", error.message);
    throw error;
  }
}

// Example 2: Using base64 encoded logo
async function sendBulkEmailWithBase64Logo() {
  // In Node.js, you would read the file like this:
  // const fs = require('fs');
  // const logoBase64 = fs.readFileSync('./logo.png', 'base64');

  // For this example, we'll use a placeholder
  const logoBase64 = "YOUR_BASE64_ENCODED_IMAGE_HERE";

  try {
    const response = await fetch(`${API_BASE_URL}/api/support/send-bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
      },
      body: JSON.stringify({
        clients: [
          { email: "test1@example.com", name: "Alice Johnson" },
          { email: "test2@example.com", name: "Charlie Brown" },
        ],
        subject: "Newsletter - December 2025",
        message: `
          <p>Hello [Name],</p>
          
          <p>Welcome to our monthly newsletter! Here's what's happening this month:</p>
          
          <p><strong>Featured Articles:</strong></p>
          <ul>
            <li>Career growth strategies for 2025</li>
            <li>Interview tips from industry experts</li>
            <li>Upcoming job opportunities</li>
          </ul>
          
          <p>Stay tuned for more updates!</p>
          
          <p>Warm regards,<br>
          The Trizen Team</p>
        `,
        isHtml: true,
        attachments: [
          {
            filename: "header-logo.png",
            content: logoBase64,
            contentType: "image/png",
            encoding: "base64",
            cid: "header-logo",
          },
        ],
      }),
    });

    const result = await response.json();
    console.log("Result:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Example 3: Simple text email (no HTML, no logo)
async function sendSimpleBulkEmail() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/support/send-bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
      },
      body: JSON.stringify({
        clients: [
          { email: "user1@example.com", name: "David Lee" },
          { email: "user2@example.com", name: "Emma Davis" },
        ],
        subject: "Quick Update",
        message: `Dear [Name],

This is a quick update to let you know about our upcoming event.

Date: January 15, 2025
Time: 2:00 PM IST
Location: Virtual (Zoom link will be shared)

Looking forward to seeing you there!

Best,
Trizen Ventures Team`,
        isHtml: false, // Plain text email
      }),
    });

    const result = await response.json();
    console.log("Result:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Test the email service configuration
async function testEmailConfig() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/support/test-config`, {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY,
      },
    });

    const result = await response.json();

    if (result.success) {
      console.log("✅ Email service is configured correctly!");
    } else {
      console.error("❌ Email service configuration error:", result.error);
    }

    return result;
  } catch (error) {
    console.error("❌ Error testing config:", error.message);
    throw error;
  }
}

// Usage examples:
// Uncomment the one you want to test

// Test configuration first
// testEmailConfig();

// Send bulk email with hosted logo (recommended)
// sendBulkEmailWithHostedLogo();

// Send bulk email with base64 logo
// sendBulkEmailWithBase64Logo();

// Send simple text email
// sendSimpleBulkEmail();

// Export functions for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    sendBulkEmailWithHostedLogo,
    sendBulkEmailWithBase64Logo,
    sendSimpleBulkEmail,
    testEmailConfig,
  };
}
