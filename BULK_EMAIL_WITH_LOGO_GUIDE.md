# Bulk Email with Logo in Header - Guide

## Overview

Yes! The Trizen Support Email Service **does have templates with logo support in the header** for bulk emails. You can use the **`/send-bulk`** endpoint with the **custom template** that supports header logos.

---

## 🎯 Available Endpoints

### 1. **Send Custom Email** (Single Recipient)

- **Endpoint**: `POST /api/support/send-custom`
- **Supports**: Logo in header ✅

### 2. **Send Bulk Emails** (Multiple Recipients)

- **Endpoint**: `POST /api/support/send-bulk`
- **Supports**: Logo in header ✅

---

## 📧 How to Send Bulk Emails with Logo

### Method 1: Using Hosted Logo URL (Recommended for Gmail)

This is the **best method** because:

- ✅ Logo loads from your server (no attachment)
- ✅ Works perfectly in Gmail, Outlook, etc.
- ✅ Smaller email size
- ✅ No "image blocked" warnings

```javascript
const response = await fetch("http://localhost:3002/api/support/send-bulk", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "your-api-key-here",
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
      <p>We are excited to share some important updates with you...</p>
      <p>Best regards,<br>Trizen Ventures Team</p>
    `,
    isHtml: true,
    attachments: [
      {
        filename: "header-logo.png",
        url: "https://your-domain.com/images/header-logo.png",
        contentType: "image/png",
        cid: "header-logo", // Important: This tells the system it's a header logo
      },
    ],
  }),
});

const result = await response.json();
console.log(result);
```

---

### Method 2: Using Base64 Encoded Logo

If you don't have a hosted URL, you can embed the logo as base64:

```javascript
const fs = require("fs");

// Read your logo file and convert to base64
const logoBase64 = fs.readFileSync("./path/to/logo.png", "base64");

const response = await fetch("http://localhost:3002/api/support/send-bulk", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "your-api-key-here",
  },
  body: JSON.stringify({
    clients: [
      { email: "client1@example.com", name: "John Doe" },
      { email: "client2@example.com", name: "Jane Smith" },
    ],
    subject: "Newsletter - December 2025",
    message: `
      <p>Hello [Name],</p>
      <p>Here's what's new this month...</p>
    `,
    isHtml: true,
    attachments: [
      {
        filename: "header-logo.png",
        content: logoBase64,
        contentType: "image/png",
        encoding: "base64",
        cid: "header-logo", // This marks it as the header logo
      },
    ],
  }),
});
```

**Note**: Gmail may block base64 images by default. Use Method 1 (hosted URL) for best results.

---

## 🎨 Email Template Features

The custom template automatically:

- ✅ Displays logo at **600px width** in the header
- ✅ Responsive design (works on mobile)
- ✅ Professional email-safe HTML (uses tables)
- ✅ Replaces `[Name]` placeholder with each recipient's name
- ✅ Clean, modern design

### Template Preview

```
┌─────────────────────────────────────┐
│                                     │
│     [YOUR LOGO - 600px wide]        │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Dear John Doe,                     │
│                                     │
│  Your message content here...       │
│                                     │
│  Best regards,                      │
│  Trizen Ventures Team               │
│                                     │
└─────────────────────────────────────┘
```

---

## 🔑 Important Notes

### Logo Requirements

- **Format**: PNG, JPG, JPEG, GIF, or WEBP
- **Recommended size**: 600px wide × 120px tall (or similar aspect ratio)
- **File size**: Keep under 200KB for best performance
- **Naming**: Include "header" or "logo" in filename, or use `cid: 'header-logo'`

### Attachment Detection

The system automatically detects header logos by:

1. **CID**: `cid: 'header-logo'`
2. **Filename**: Contains "header" or "logo" (e.g., `header-logo.png`)
3. **Content Type**: Must be an image type (`image/png`, `image/jpeg`, etc.)

### Personalization

- Use `[Name]` in your message to personalize for each recipient
- Example: `"Dear [Name],"` becomes `"Dear John Doe,"`

### Bulk Limits

- Maximum: **1000 recipients** per request (configurable)
- Rate limiting: **10 emails per second**
- Connection pooling: **5 concurrent connections**

---

## 📝 Complete Example with cURL

```bash
curl -X POST http://localhost:3002/api/support/send-bulk \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "clients": [
      {"email": "john@example.com", "name": "John Doe"},
      {"email": "jane@example.com", "name": "Jane Smith"}
    ],
    "subject": "Monthly Newsletter",
    "message": "<p>Dear [Name],</p><p>Check out our latest updates!</p>",
    "isHtml": true,
    "attachments": [
      {
        "filename": "header-logo.png",
        "url": "https://trizenventures.com/logo.png",
        "contentType": "image/png",
        "cid": "header-logo"
      }
    ]
  }'
```

---

## 🚀 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Bulk emails sent successfully. Sent: 2, Failed: 0",
  "data": {
    "totalSent": 2,
    "totalFailed": 0,
    "results": [
      {
        "email": "john@example.com",
        "success": true,
        "messageId": "<unique-id@smtp.gmail.com>"
      },
      {
        "email": "jane@example.com",
        "success": true,
        "messageId": "<unique-id@smtp.gmail.com>"
      }
    ],
    "timestamp": "2025-12-22T05:21:22.000Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Validation error",
  "details": "\"clients\" must contain at least 1 items"
}
```

---

## 🎯 Best Practices

1. **Use Hosted URLs**: Always prefer hosted logo URLs over base64 for better deliverability
2. **Test First**: Send to yourself first to verify the logo displays correctly
3. **Optimize Images**: Compress your logo to reduce email size
4. **Personalize**: Use `[Name]` placeholder for better engagement
5. **Monitor Results**: Check the response for failed emails and retry if needed
6. **Rate Limiting**: For large lists (>1000), split into multiple batches

---

## 🔧 Testing

Test the email configuration:

```bash
curl -X GET http://localhost:3002/api/support/test-config \
  -H "X-API-Key: your-api-key"
```

---

## 📞 Need Help?

- **Service Status**: `GET /api/support/status`
- **Health Check**: `GET /health`
- **Email**: support@trizenventures.com

---

## 🎨 Customization

If you need a different template design, you can:

1. Modify the `custom` template in `src/services/supportEmailService.js` (line 339)
2. Adjust the header height, logo size, or styling
3. Add your brand colors and fonts

The template uses **email-safe HTML with tables** to ensure compatibility with all email clients (Gmail, Outlook, Apple Mail, etc.).
