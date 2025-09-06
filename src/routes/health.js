import express from 'express';
import { testEmailConfig } from '../services/emailService.js';

const router = express.Router();

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const emailStatus = await testEmailConfig();
    
    const healthData = {
      service: 'WBC Email Service',
      version: '1.0.0',
      status: emailStatus.success ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      email: {
        configured: emailStatus.success,
        status: emailStatus.success ? 'operational' : 'error',
        details: emailStatus
      },
      system: {
        memory: process.memoryUsage(),
        platform: process.platform,
        nodeVersion: process.version,
        pid: process.pid
      }
    };

    const statusCode = emailStatus.success ? 200 : 503;
    
    res.status(statusCode).json({
      success: emailStatus.success,
      message: emailStatus.success 
        ? 'Email service is healthy and operational' 
        : 'Email service is unhealthy',
      data: healthData
    });
  } catch (error) {
    console.error('Health check error:', error);
    
    res.status(503).json({
      success: false,
      message: 'Health check failed',
      error: error.message,
      data: {
        service: 'WBC Email Service',
        version: '1.0.0',
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      }
    });
  }
});

// API documentation endpoint
router.get('/api/health', async (req, res) => {
  const apiDocs = {
    service: 'WBC Email Service API',
    version: '1.0.0',
    description: 'Standalone Email Service for WhatsApp Broadcast Platform',
    baseUrl: '/api/email',
    endpoints: {
      'GET /health': {
        description: 'Health check endpoint',
        authentication: 'None required',
        response: 'Service health status'
      },
      'GET /api/email/test-config': {
        description: 'Test email configuration',
        authentication: 'API Key or Bearer Token required',
        response: 'Email configuration test results'
      },
      'GET /api/email/status': {
        description: 'Get email service status',
        authentication: 'API Key or Bearer Token required',
        response: 'Current email service status'
      },
      'POST /api/email/send-password-reset': {
        description: 'Send password reset email',
        authentication: 'API Key or Bearer Token required',
        body: {
          email: 'string (required)',
          resetToken: 'string (required)'
        },
        response: 'Password reset email sending result'
      },
      'POST /api/email/send-welcome': {
        description: 'Send welcome email',
        authentication: 'API Key or Bearer Token required',
        body: {
          email: 'string (required)',
          firstName: 'string (required)'
        },
        response: 'Welcome email sending result'
      },
      'POST /api/email/send-custom': {
        description: 'Send custom email',
        authentication: 'API Key or Bearer Token required',
        body: {
          to: 'string (required)',
          subject: 'string (required)',
          html: 'string (optional)',
          text: 'string (optional)'
        },
        response: 'Custom email sending result'
      },
      'POST /api/email/send-bulk': {
        description: 'Send bulk emails',
        authentication: 'API Key or Bearer Token required',
        body: {
          emails: 'array (required)',
          subject: 'string (required)',
          html: 'string (optional)',
          text: 'string (optional)'
        },
        response: 'Bulk email sending results'
      }
    },
    authentication: {
      methods: ['API Key (X-API-Key header)', 'Bearer Token (Authorization header)'],
      note: 'All endpoints except /health require authentication'
    },
    rateLimiting: {
      windowMs: '15 minutes',
      maxRequests: '100 requests per IP per window',
      message: 'Too many requests from this IP, please try again later.'
    },
    environment: {
      required: [
        'SMTP_HOST',
        'SMTP_PORT', 
        'SMTP_USER',
        'SMTP_PASS',
        'CLIENT_URL'
      ],
      optional: [
        'PORT',
        'NODE_ENV',
        'API_KEY',
        'JWT_SECRET',
        'EMAIL_FROM_NAME',
        'EMAIL_FROM_ADDRESS'
      ]
    }
  };

  res.json({
    success: true,
    message: 'API documentation',
    data: apiDocs
  });
});

export default router;

