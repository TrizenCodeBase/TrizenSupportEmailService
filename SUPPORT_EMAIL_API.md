# Support Email Service API

A standalone email service for sending professional emails from `support@trizenventures.com` to clients.

## 🚀 Features

- **Support Response Emails** - Professional support ticket responses
- **Welcome Emails** - Welcome new clients to Trizen Ventures
- **Custom Emails** - Send custom messages to clients
- **Bulk Emails** - Send emails to multiple clients efficiently
- **OTP Emails** - Send OTP (sends only, does not verify)
- **Email Templates** - Professional HTML templates with Trizen Ventures branding
- **Rate Limiting** - Built-in protection against spam
- **Security** - API key authentication and CORS protection
- **Health Monitoring** - Comprehensive health checks and status endpoints

## 📁 Project Structure

```
EmailService/
├── src/
│   ├── index.js                    # Main server file
│   ├── routes/
│   │   ├── email.js               # General email endpoints
│   │   ├── supportEmail.js        # Support email endpoints
│   │   └── health.js              # Health check endpoints
│   ├── services/
│   │   ├── emailService.js        # General email service
│   │   └── supportEmailService.js # Support email service
│   ├── test.js                    # General email tests
│   └── test-support.js            # Support email tests
├── package.json
├── Dockerfile
├── docker-compose.yml
├── env.example
└── README.md
```

## 🛠️ Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- SMTP email account for `support@trizenventures.com`

### Local Development

1. **Clone and setup:**
   ```bash
   cd EmailService
   npm install
   ```

2. **Environment Configuration:**
   ```bash
   cp env.example .env
   # Edit .env with your SMTP credentials
   ```

3. **Start the service:**
   ```bash
   npm run dev
   ```

4. **Test the service:**
   ```bash
   npm run test:support
   ```

## ⚙️ Environment Variables

### Required Variables

```env
# SMTP Configuration for support@trizenventures.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=support@trizenventures.com
SMTP_PASS=your-app-password

# Security
API_KEY=your-secure-api-key

# Client URL for any links in emails
CLIENT_URL=https://trizenventures.com
```

### Optional Variables

```env
# Server Configuration
PORT=3002
NODE_ENV=development

# Email Templates
EMAIL_FROM_NAME=Trizen Ventures Support
EMAIL_FROM_ADDRESS=support@trizenventures.com

# CORS
ALLOWED_ORIGINS=https://trizenventures.com,http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📚 API Endpoints

### Base URL: `http://localhost:3002/api/support`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check | No |
| GET | `/test-config` | Test email config | Yes |
| GET | `/status` | Service status | Yes |
| POST | `/send-support-response` | Send support response | Yes |
| POST | `/send-welcome` | Send welcome email | Yes |
| POST | `/send-custom` | Send custom email | Yes |
| POST | `/send-bulk` | Send bulk emails | Yes |
| POST | `/send-otp` | Send OTP | Yes |

### Authentication

Include API key in header:
- **API Key**: `X-API-Key: your-api-key`

## 📧 API Usage Examples

### 1. Send Support Response Email

```javascript
const response = await fetch('http://localhost:3002/api/support/send-support-response', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    clientEmail: 'client@example.com',
    clientName: 'John Doe',
    inquiry: 'I need help with my account setup',
    response: 'Thank you for contacting us. We have reviewed your request and here is our response...',
    actionRequired: 'Please verify your email address by clicking the link we sent you.'
  })
});
```

### 2. Send Welcome Email

```javascript
const response = await fetch('http://localhost:3002/api/support/send-welcome', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    clientEmail: 'client@example.com',
    clientName: 'John Doe'
  })
});
```

### 3. Send Custom Email

```javascript
const response = await fetch('http://localhost:3002/api/support/send-custom', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    clientEmail: 'client@example.com',
    clientName: 'John Doe',
    subject: 'Important Update from Trizen Ventures',
    message: 'This is a custom message from our support team.',
    isHtml: false
  })
});
```

### 4. Send Bulk Emails

```javascript
const response = await fetch('http://localhost:3002/api/support/send-bulk', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    clients: [
      { email: 'client1@example.com', name: 'John Doe' },
      { email: 'client2@example.com', name: 'Jane Smith' }
    ],
    subject: 'Bulk Update from Trizen Ventures',
    message: 'This is a bulk message sent to multiple clients.',
    isHtml: false
  })
});
```

### 5. Send OTP Email

```javascript
const response = await fetch('http://localhost:3002/api/support/send-otp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    email: 'client@example.com',
    otp: '123456',
    firstName: 'John', // optional
    expiryMins: 10 // optional, defaults to 10
  })
});
```

Request Body Schema:
```json
{
  "email": "string, required, valid email",
  "otp": "string, required, 6 digits",
  "firstName": "string, optional, max 100 chars",
  "expiryMins": "number, optional, 1-60, defaults to 10"
}
```

Success Response:
```json
{
  "success": true,
  "message": "OTP email sent successfully",
  "data": {
    "messageId": "...",
    "timestamp": "2024-01-20T12:00:00.000Z"
  }
}
```

## 🧪 Testing

### Run Support Email Tests

```bash
npm run test:support
```

### Manual Testing

```bash
# Health check
curl http://localhost:3002/health

# Test email config
curl -X GET http://localhost:3002/api/support/test-config \
  -H "X-API-Key: your-api-key"

# Send support response
curl -X POST http://localhost:3002/api/support/send-support-response \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "clientEmail": "client@example.com",
    "clientName": "John Doe",
    "inquiry": "I need help with my account",
    "response": "We are here to help you with your account setup."
  }'
```

## 🔧 SMTP Configuration

### For Gmail (support@trizenventures.com)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=support@trizenventures.com
SMTP_PASS=your-app-password  # Use App Password, not regular password
```

**Setup Steps:**
1. Enable 2-factor authentication on the Gmail account
2. Generate an App Password
3. Use the App Password in `SMTP_PASS`

### For Other Providers

```env
# Outlook/Hotmail
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=support@trizenventures.com
SMTP_PASS=your-password

# Custom SMTP
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=support@trizenventures.com
SMTP_PASS=your-password
```

## 🚀 Deployment

### Production Deployment

1. **Set production environment:**
   ```env
   NODE_ENV=production
   ```

2. **Use Docker Compose:**
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

3. **Or deploy to cloud platforms:**
   - AWS ECS
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean App Platform

## 🔒 Security Features

- **API Key Authentication** - Secure service-to-service communication
- **Rate Limiting** - Prevents abuse and spam
- **CORS Protection** - Configurable origin restrictions
- **Input Validation** - Joi schema validation for all inputs
- **Error Handling** - Secure error messages without sensitive data
- **Helmet Security** - Security headers and CSP

## 📊 Monitoring & Logging

- **Structured Logging** - Morgan HTTP request logging
- **Error Tracking** - Comprehensive error logging
- **Performance Monitoring** - Memory usage and uptime tracking
- **Health Checks** - Automated service health monitoring

## 🤝 Integration Examples

### From Your Application

```javascript
// Send support response
const sendSupportResponse = async (clientEmail, clientName, inquiry, response) => {
  const response = await fetch('http://localhost:3002/api/support/send-support-response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.SUPPORT_EMAIL_API_KEY
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

// Send welcome email
const sendWelcomeEmail = async (clientEmail, clientName) => {
  const response = await fetch('http://localhost:3002/api/support/send-welcome', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.SUPPORT_EMAIL_API_KEY
    },
    body: JSON.stringify({
      clientEmail,
      clientName
    })
  });
  
  return await response.json();
};
```

## 🐛 Troubleshooting

### Common Issues

1. **SMTP Authentication Failed**
   - Check email and password
   - Use App Password for Gmail
   - Verify SMTP settings

2. **Connection Timeout**
   - Check firewall settings
   - Verify SMTP host and port
   - Test network connectivity

3. **CORS Errors**
   - Update ALLOWED_ORIGINS in .env
   - Check frontend URL configuration

4. **Rate Limiting**
   - Adjust RATE_LIMIT_MAX_REQUESTS
   - Implement proper retry logic

### Debug Mode

Enable debug logging:
```env
LOG_LEVEL=debug
NODE_ENV=development
```

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation at `/api/health`
