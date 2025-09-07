# 🚀 Support Email Service - Deployment Guide

## 📋 **Prerequisites**

- Docker installed and running
- Docker Compose installed
- `.env` file configured with proper SMTP credentials
- Port 3002 available on your system

## 🔧 **Environment Setup**

### **1. Create .env File**
```bash
# Copy the example file
cp env.example .env
```

### **2. Configure .env File**
```env
# SMTP Configuration (Microsoft 365)
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=support@trizenventures.com
SMTP_PASS=your-app-password

# Security
API_KEY=trizen-support-email-2024-secure-key-xyz789

# Service Configuration
PORT=3002
NODE_ENV=production
CLIENT_URL=https://trizenventures.com

# Email Configuration
EMAIL_FROM_NAME=Trizen Ventures Support
EMAIL_FROM_ADDRESS=support@trizenventures.com

# CORS Configuration
ALLOWED_ORIGINS=https://trizenventures.com,https://app.trizenventures.com
```

## 🐳 **Docker Deployment Options**

### **Option 1: Docker Compose (Recommended)**

#### **Build and Start**
```bash
# Navigate to EmailService directory
cd EmailService

# Build and start the service
docker-compose up --build -d

# Check logs
docker-compose logs -f email-service

# Check service status
docker-compose ps
```

#### **Stop and Cleanup**
```bash
# Stop the service
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Remove images
docker-compose down --rmi all
```

### **Option 2: Docker Build & Run**

#### **Build Image**
```bash
# Build the Docker image
docker build -t wbc-email-service:latest .

# Verify image was created
docker images | grep wbc-email-service
```

#### **Run Container**
```bash
# Run the container
docker run -d \
  --name wbc-email-service \
  -p 3002:3002 \
  --env-file .env \
  --restart unless-stopped \
  wbc-email-service:latest

# Check container status
docker ps | grep wbc-email-service

# View logs
docker logs -f wbc-email-service
```

#### **Stop and Cleanup**
```bash
# Stop container
docker stop wbc-email-service

# Remove container
docker rm wbc-email-service

# Remove image
docker rmi wbc-email-service:latest
```

## 🔍 **Deployment Verification**

### **1. Health Check**
```bash
# Test health endpoint (Local)
curl http://localhost:3002/health

# Test health endpoint (Production)
curl https://trizensupportemailservice.llp.trizenventures.com/health

# Expected response:
{
  "success": true,
  "message": "Email service is healthy",
  "data": {
    "service": "WBC Email Service",
    "version": "1.0.0",
    "status": "healthy",
    "timestamp": "2025-09-06T...",
    "uptime": 123.456,
    "environment": "production"
  }
}
```

### **2. Configuration Test**
```bash
# Test email configuration (Local)
curl -X GET http://localhost:3002/api/support/test-config \
  -H "X-API-Key: trizen-support-email-2024-secure-key-xyz789"

# Test email configuration (Production)
curl -X GET https://trizensupportemailservice.llp.trizenventures.com/api/support/test-config \
  -H "X-API-Key: trizen-support-email-2024-secure-key-xyz789"

# Expected response:
{
  "success": true,
  "message": "Email configuration test successful",
  "data": {
    "success": true,
    "message": "SMTP connection successful",
    "timestamp": "2025-09-06T..."
  }
}
```

### **3. Test Email Sending**
```bash
# Test welcome email (Local)
curl -X POST http://localhost:3002/api/support/send-welcome \
  -H "Content-Type: application/json" \
  -H "X-API-Key: trizen-support-email-2024-secure-key-xyz789" \
  -d '{
    "clientEmail": "test@example.com",
    "clientName": "Test User"
  }'

# Test welcome email (Production)
curl -X POST https://trizensupportemailservice.llp.trizenventures.com/api/support/send-welcome \
  -H "Content-Type: application/json" \
  -H "X-API-Key: trizen-support-email-2024-secure-key-xyz789" \
  -d '{
    "clientEmail": "test@example.com",
    "clientName": "Test User"
  }'
```

## 📊 **Production Deployment**

### **1. Production Environment Variables**
```env
NODE_ENV=production
PORT=3002
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=support@trizenventures.com
SMTP_PASS=your-secure-app-password
API_KEY=your-secure-production-api-key
CLIENT_URL=https://trizenventures.com
EMAIL_FROM_NAME=Trizen Ventures Support
EMAIL_FROM_ADDRESS=support@trizenventures.com
ALLOWED_ORIGINS=https://trizenventures.com,https://app.trizenventures.com
```

### **2. Production Docker Compose**
```yaml
version: '3.8'

services:
  email-service:
    build: 
      context: .
      dockerfile: Dockerfile
    image: wbc-email-service:latest
    container_name: wbc-email-service-prod
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3002/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## 🔒 **Security Considerations**

### **1. API Key Security**
- Use strong, unique API keys in production
- Rotate API keys regularly
- Never commit API keys to version control
- Use environment variables for all sensitive data

### **2. Network Security**
- Use HTTPS in production
- Configure proper CORS origins
- Implement rate limiting
- Use reverse proxy (nginx) for additional security

### **3. Container Security**
- Run containers as non-root user (already configured)
- Use minimal base images (alpine)
- Keep images updated
- Scan images for vulnerabilities

## 📈 **Monitoring & Logging**

### **1. Health Monitoring**
```bash
# Check container health
docker inspect wbc-email-service | grep -A 10 "Health"

# Monitor logs
docker logs -f wbc-email-service

# Check resource usage
docker stats wbc-email-service
```

### **2. Log Management**
- Logs are automatically rotated (10MB max, 3 files)
- Use centralized logging in production
- Monitor error rates and response times
- Set up alerts for service failures

## 🔄 **Updates & Maintenance**

### **1. Update Service**
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d

# Verify update
curl http://localhost:3002/health
```

### **2. Backup Configuration**
```bash
# Backup .env file
cp .env .env.backup

# Backup docker-compose.yml
cp docker-compose.yml docker-compose.yml.backup
```

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. Container Won't Start**
```bash
# Check logs
docker logs wbc-email-service

# Check environment variables
docker exec wbc-email-service env | grep SMTP
```

#### **2. SMTP Authentication Failed**
- Verify SMTP credentials in .env
- Check if app password is correct
- Ensure SMTP AUTH is enabled in Microsoft 365

#### **3. Port Already in Use**
```bash
# Check what's using port 3002
netstat -tulpn | grep 3002

# Kill process if needed
sudo kill -9 <PID>
```

#### **4. Health Check Failing**
```bash
# Check container logs
docker logs wbc-email-service

# Test health endpoint manually
curl http://localhost:3002/health
```

## 📞 **Support**

For deployment issues:
1. Check the logs: `docker logs wbc-email-service`
2. Verify environment variables
3. Test SMTP configuration
4. Check network connectivity
5. Review this deployment guide

---

**Your Support Email Service is ready for production deployment!** 🚀
