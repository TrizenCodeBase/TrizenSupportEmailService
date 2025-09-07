# Support Email Service - Complete Usage Guide

## 📧 **Overview**

The Support Email Service is a standalone microservice that sends professional emails from `support@trizenventures.com` to clients. It's designed for various business communication needs including support responses, welcome emails, custom messages, and bulk communications.

## 🚀 **Service Information**

- **Base URL:** `https://trizensupportemailservice.llp.trizenventures.com`
- **Local Development:** `http://localhost:3002`
- **From Email:** `support@trizenventures.com`
- **Authentication:** API Key required
- **Status:** ✅ Operational and Ready

---

## 🔑 **Authentication**

All API endpoints (except health check) require authentication via API Key:

```
X-API-Key: your-api-key
```

**Your API Key:** `trizen-support-email-2024-secure-key-xyz789`

---

## 📚 **API Endpoints**

### **1. Health Check**
**GET** `/health`
- **Purpose:** Check if the service is running
- **Authentication:** Not required
- **Response:** Service status and health information
- **Production URL:** `https://trizensupportemailservice.llp.trizenventures.com/health`

### **2. Test Email Configuration**
**GET** `/api/support/test-config`
- **Purpose:** Test SMTP configuration
- **Authentication:** Required
- **Response:** Email configuration test results
- **Production URL:** `https://trizensupportemailservice.llp.trizenventures.com/api/support/test-config`

### **3. Send Welcome Email**
**POST** `/api/support/send-welcome`
- **Purpose:** Send welcome emails to new clients
- **Authentication:** Required
- **Use Cases:** New user onboarding, account activation, service introduction
- **Production URL:** `https://trizensupportemailservice.llp.trizenventures.com/api/support/send-welcome`

### **4. Send Support Response Email**
**POST** `/api/support/send-support-response`
- **Purpose:** Send professional support ticket responses
- **Authentication:** Required
- **Use Cases:** Customer support, issue resolution, help desk responses
- **Production URL:** `https://trizensupportemailservice.llp.trizenventures.com/api/support/send-support-response`

### **5. Send Custom Email**
**POST** `/api/support/send-custom`
- **Purpose:** Send custom messages to clients
- **Authentication:** Required
- **Use Cases:** Announcements, updates, personalized communications
- **Production URL:** `https://trizensupportemailservice.llp.trizenventures.com/api/support/send-custom`

### **6. Send Bulk Emails**
**POST** `/api/support/send-bulk`
- **Purpose:** Send emails to multiple clients
- **Authentication:** Required
- **Use Cases:** Newsletter, mass announcements, marketing campaigns
- **Production URL:** `https://trizensupportemailservice.llp.trizenventures.com/api/support/send-bulk`

---

## 📧 **Detailed Usage Examples**

### **1. Welcome Email - New Client Onboarding**

**Purpose:** Welcome new clients to Trizen Ventures services

**Endpoint:** `POST /api/support/send-welcome`

**Request:**
```json
{
  "clientEmail": "newclient@company.com",
  "clientName": "John Smith"
}
```

**Use Cases:**
- New user registration
- Service activation
- Account setup completion
- First-time client introduction

**Email Content:** Professional welcome message with:
- Personalized greeting
- Service overview
- Next steps
- Contact information

---

### **2. Support Response - Customer Service**

**Purpose:** Respond to client inquiries and support tickets

**Endpoint:** `POST /api/support/send-support-response`

**Request:**
```json
{
  "clientEmail": "client@company.com",
  "clientName": "Jane Doe",
  "inquiry": "I'm having trouble accessing my dashboard after the recent update",
  "response": "Thank you for contacting us. We've identified the issue and here's the solution: Please clear your browser cache and try logging in again. If the problem persists, please try using an incognito/private browsing window.",
  "actionRequired": "Please clear your browser cache and try accessing the dashboard again. If issues continue, reply to this email with a screenshot of the error."
}
```

**Use Cases:**
- Technical support responses
- Account issues resolution
- Service troubleshooting
- Feature explanations
- Billing inquiries

**Email Content:** Professional support response with:
- Acknowledgment of inquiry
- Detailed response/solution
- Action items if required
- Follow-up instructions

---

### **3. Custom Email - Business Communications**

**Purpose:** Send custom messages for various business needs

**Endpoint:** `POST /api/support/send-custom`

**Request:**
```json
{
  "clientEmail": "client@company.com",
  "clientName": "Mike Johnson",
  "subject": "Important Service Update - New Features Available",
  "message": "We're excited to announce new features in your Trizen Ventures dashboard. The new analytics module provides deeper insights into your business performance. Please log in to explore these new capabilities.",
  "isHtml": false
}
```

**Use Cases:**
- Service announcements
- Feature updates
- Policy changes
- Maintenance notifications
- Business updates
- Personalized communications

**Email Content:** Custom message with:
- Professional subject line
- Personalized content
- Clear call-to-action
- Contact information

---

### **4. Bulk Email - Mass Communications**

**Purpose:** Send emails to multiple clients simultaneously

**Endpoint:** `POST /api/support/send-bulk`

**Request:**
```json
{
  "clients": [
    {
      "email": "client1@company.com",
      "name": "John Smith"
    },
    {
      "email": "client2@company.com",
      "name": "Jane Doe"
    },
    {
      "email": "client3@company.com",
      "name": "Mike Johnson"
    }
  ],
  "subject": "Monthly Newsletter - December 2024",
  "message": "Dear valued client, Thank you for your continued partnership with Trizen Ventures. This month's newsletter includes: 1. New service features 2. Industry insights 3. Upcoming events 4. Success stories Best regards, Trizen Ventures Team",
  "isHtml": false
}
```

**Use Cases:**
- Monthly newsletters
- Service announcements
- Event invitations
- Marketing campaigns
- Policy updates
- Holiday greetings

**Email Content:** Bulk message with:
- Professional subject
- Personalized greetings
- Relevant content
- Clear structure

---

## 🛠️ **Integration Examples**

### **JavaScript/Node.js Integration**

```javascript
// Send welcome email
const sendWelcomeEmail = async (clientEmail, clientName) => {
  const response = await fetch('https://trizensupportemailservice.llp.trizenventures.com/api/support/send-welcome', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'trizen-support-email-2024-secure-key-xyz789'
    },
    body: JSON.stringify({
      clientEmail,
      clientName
    })
  });
  
  return await response.json();
};

// Send support response
const sendSupportResponse = async (clientEmail, clientName, inquiry, response) => {
  const response = await fetch('https://trizensupportemailservice.llp.trizenventures.com/api/support/send-support-response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'trizen-support-email-2024-secure-key-xyz789'
    },
    body: JSON.stringify({
      clientEmail,
      clientName,
      inquiry,
      response
    })
  });
  
  return await response.json();
};
```

### **Python Integration**

```python
import requests

def send_welcome_email(client_email, client_name):
    url = "https://trizensupportemailservice.llp.trizenventures.com/api/support/send-welcome"
    headers = {
        "Content-Type": "application/json",
        "X-API-Key": "trizen-support-email-2024-secure-key-xyz789"
    }
    data = {
        "clientEmail": client_email,
        "clientName": client_name
    }
    
    response = requests.post(url, json=data, headers=headers)
    return response.json()

def send_support_response(client_email, client_name, inquiry, response):
    url = "https://trizensupportemailservice.llp.trizenventures.com/api/support/send-support-response"
    headers = {
        "Content-Type": "application/json",
        "X-API-Key": "trizen-support-email-2024-secure-key-xyz789"
    }
    data = {
        "clientEmail": client_email,
        "clientName": client_name,
        "inquiry": inquiry,
        "response": response
    }
    
    response = requests.post(url, json=data, headers=headers)
    return response.json()
```

### **PHP Integration**

```php
<?php
function sendWelcomeEmail($clientEmail, $clientName) {
    $url = "https://trizensupportemailservice.llp.trizenventures.com/api/support/send-welcome";
    $data = [
        "clientEmail" => $clientEmail,
        "clientName" => $clientName
    ];
    
    $options = [
        'http' => [
            'header' => [
                "Content-Type: application/json",
                "X-API-Key: trizen-support-email-2024-secure-key-xyz789"
            ],
            'method' => 'POST',
            'content' => json_encode($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    return json_decode($result, true);
}

function sendSupportResponse($clientEmail, $clientName, $inquiry, $response) {
    $url = "https://trizensupportemailservice.llp.trizenventures.com/api/support/send-support-response";
    $data = [
        "clientEmail" => $clientEmail,
        "clientName" => $clientName,
        "inquiry" => $inquiry,
        "response" => $response
    ];
    
    $options = [
        'http' => [
            'header' => [
                "Content-Type: application/json",
                "X-API-Key: trizen-support-email-2024-secure-key-xyz789"
            ],
            'method' => 'POST',
            'content' => json_encode($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    return json_decode($result, true);
}
?>
```

---

## 📋 **Business Use Cases**

### **Customer Support**
- **Support ticket responses**
- **Technical issue resolutions**
- **Account problem solutions**
- **Feature explanations**
- **Billing inquiries**

### **Client Onboarding**
- **Welcome emails for new clients**
- **Service introduction**
- **Account setup guidance**
- **First-time user assistance**

### **Business Communications**
- **Service announcements**
- **Feature updates**
- **Policy changes**
- **Maintenance notifications**
- **Holiday greetings**

### **Marketing & Outreach**
- **Newsletter distribution**
- **Event invitations**
- **Promotional campaigns**
- **Client success stories**
- **Industry insights**

### **Operational Communications**
- **System updates**
- **Security notifications**
- **Service disruptions**
- **Recovery notifications**
- **Performance reports**

---

## 🔧 **Configuration & Setup**

### **Environment Variables**
```env
# SMTP Configuration
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=support@trizenventures.com
SMTP_PASS=mhpxzttmmjjqhzyf

# Security
API_KEY=trizen-support-email-2024-secure-key-xyz789

# Service Configuration
PORT=3002
CLIENT_URL=https://trizenventures.com
EMAIL_FROM_NAME=Trizen Ventures Support
EMAIL_FROM_ADDRESS=support@trizenventures.com
```

### **Starting the Service**
```bash
cd EmailService
npm run dev
```

### **Testing the Service**
```bash
# Health check
curl http://localhost:3002/health

# Test configuration
curl -X GET http://localhost:3002/api/support/test-config \
  -H "X-API-Key: trizen-support-email-2024-secure-key-xyz789"
```

---

## 📊 **Response Formats**

### **Success Response**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "data": {
    "success": true,
    "messageId": "<message-id>",
    "timestamp": "2025-09-06T15:51:27.543Z"
  }
}
```

### **Error Response**
```json
{
  "success": false,
  "message": "Validation error",
  "error": "clientEmail is required"
}
```

---

## 🚨 **Error Handling**

### **Common Errors**
- **400 Bad Request:** Invalid input data
- **401 Unauthorized:** Missing or invalid API key
- **500 Internal Server Error:** SMTP or service issues

### **Validation Rules**
- **Email format:** Must be valid email address
- **Required fields:** All marked fields are mandatory
- **String lengths:** Names (1-100 chars), messages (1-5000 chars)
- **Bulk limit:** Maximum 100 recipients per bulk email

---

## 🔒 **Security Features**

- **API Key Authentication:** Secure service access
- **Input Validation:** Joi schema validation
- **Rate Limiting:** 100 requests per 15 minutes
- **CORS Protection:** Configurable origin restrictions
- **Error Handling:** Secure error messages

---

## 📈 **Monitoring & Logging**

- **Health Checks:** `/health` endpoint
- **Service Status:** `/api/support/status` endpoint
- **Request Logging:** Morgan HTTP logging
- **Error Tracking:** Comprehensive error logging
- **Performance Monitoring:** Memory and uptime tracking

---

## 🚀 **Best Practices**

### **Email Content**
- Keep messages professional and clear
- Use personalized greetings
- Include clear call-to-actions
- Provide contact information
- Test emails before sending

### **API Usage**
- Always include proper headers
- Validate input data
- Handle errors gracefully
- Use appropriate endpoints for use cases
- Monitor response status codes

### **Security**
- Keep API key secure
- Use HTTPS in production
- Validate all inputs
- Monitor for unusual activity
- Regular security updates

---

## 📞 **Support & Troubleshooting**

### **Common Issues**
1. **Authentication Failed:** Check API key and SMTP credentials
2. **Connection Failed:** Verify service is running and accessible
3. **Validation Errors:** Check required fields and data formats
4. **Rate Limiting:** Wait before making additional requests

### **Getting Help**
- Check service health: `GET /health`
- Test configuration: `GET /api/support/test-config`
- Review logs for error details
- Contact system administrator for persistent issues

---

## 📝 **Changelog**

### **Version 1.0.0** (Current)
- ✅ Support response emails
- ✅ Welcome emails
- ✅ Custom emails
- ✅ Bulk email functionality
- ✅ Professional email templates
- ✅ Microsoft 365 SMTP integration
- ✅ API key authentication
- ✅ Comprehensive error handling

---

## 🌐 **Production Status**

**✅ LIVE AND OPERATIONAL**

- **Production URL:** `https://trizensupportemailservice.llp.trizenventures.com`
- **Health Status:** [Check Service Health](https://trizensupportemailservice.llp.trizenventures.com/health)
- **Last Updated:** September 6, 2025
- **Environment:** Production
- **Status:** Healthy and Operational

### **Production API Endpoints:**
- **Health Check:** `GET https://trizensupportemailservice.llp.trizenventures.com/health`
- **Test Config:** `GET https://trizensupportemailservice.llp.trizenventures.com/api/support/test-config`
- **Send Welcome:** `POST https://trizensupportemailservice.llp.trizenventures.com/api/support/send-welcome`
- **Send Support Response:** `POST https://trizensupportemailservice.llp.trizenventures.com/api/support/send-support-response`
- **Send Custom:** `POST https://trizensupportemailservice.llp.trizenventures.com/api/support/send-custom`
- **Send Bulk:** `POST https://trizensupportemailservice.llp.trizenventures.com/api/support/send-bulk`

---

**Your Support Email Service is ready for production use!** 🚀

For any questions or issues, refer to this documentation or contact the development team.
