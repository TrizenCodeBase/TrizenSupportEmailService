# WBC Email Service

A standalone microservice for handling all email-related functionality for the WhatsApp Broadcast Platform.

## 🚀 Features

- **Password Reset Emails** - Professional HTML templates with security features
- **Welcome Emails** - Branded welcome messages for new users
- **Custom Emails** - Flexible email sending with HTML and text support
- **Bulk Email** - Send emails to multiple recipients efficiently
- **Email Configuration Testing** - Validate SMTP settings
- **Rate Limiting** - Built-in protection against spam
- **Security** - API key authentication and CORS protection
- **Health Monitoring** - Comprehensive health checks and status endpoints

## 📁 Project Structure

```
EmailService/
├── src/
│   ├── index.js              # Main server file
│   ├── routes/
│   │   ├── email.js          # Email endpoints
│   │   └── health.js         # Health check endpoints
│   ├── services/
│   │   └── emailService.js   # Email service logic
│   └── test.js               # Test script
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
- SMTP email account (Gmail, Outlook, etc.)

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
   npm test
   ```

### Docker Deployment

1. **Build and run with Docker:**
   ```bash
   docker-compose up -d
   ```

2. **Or build manually:**
   ```bash
   docker build -t wbc-email-service .
   docker run -p 3002:3002 --env-file .env wbc-email-service
   ```

## ⚙️ Environment Variables

### Required Variables

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Client URL for reset links
CLIENT_URL=http://localhost:3000

# Security
API_KEY=your-secure-api-key
```

### Optional Variables

```env
# Server Configuration
PORT=3002
NODE_ENV=development

# Email Templates
EMAIL_FROM_NAME=WhatsApp Broadcast Platform
EMAIL_FROM_ADDRESS=noreply@wbc.com

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://wbc.trizenventures.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📚 API Endpoints

### Base URL: `http://localhost:3002/api/email`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check | No |
| GET | `/test-config` | Test email config | Yes |
| GET | `/status` | Service status | Yes |
| POST | `/send-password-reset` | Send password reset | Yes |
| POST | `/send-welcome` | Send welcome email | Yes |
| POST | `/send-custom` | Send custom email | Yes |
| POST | `/send-bulk` | Send bulk emails | Yes |

### Authentication

Include either:
- **API Key**: `X-API-Key: your-api-key`
- **Bearer Token**: `Authorization: Bearer your-token`

### Example Usage

```javascript
// Send password reset email
const response = await fetch('http://localhost:3002/api/email/send-password-reset', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    resetToken: 'secure-reset-token-123'
  })
});

// Send welcome email
const response = await fetch('http://localhost:3002/api/email/send-welcome', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    firstName: 'John'
  })
});
```

## 🧪 Testing

### Run Test Suite

```bash
npm test
```

### Manual Testing

```bash
# Health check
curl http://localhost:3002/health

# Test email config
curl -X GET http://localhost:3002/api/email/test-config \
  -H "X-API-Key: your-api-key"

# Send password reset
curl -X POST http://localhost:3002/api/email/send-password-reset \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{"email": "test@example.com", "resetToken": "test-token"}'
```

## 🔧 Configuration

### SMTP Providers

#### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Use App Password, not regular password
```

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

#### Custom SMTP
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
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

### Health Monitoring

The service provides comprehensive health checks:

- **Health Endpoint**: `GET /health`
- **Status Endpoint**: `GET /api/email/status`
- **Docker Health Check**: Built-in container health monitoring

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

## 🤝 Integration with WBC Backend

The WBC backend can call this email service using HTTP requests:

```javascript
// In WBC backend
const emailServiceUrl = 'http://localhost:3002/api/email';

// Send password reset
const response = await fetch(`${emailServiceUrl}/send-password-reset`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.EMAIL_SERVICE_API_KEY
  },
  body: JSON.stringify({
    email: userEmail,
    resetToken: resetToken
  })
});
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

