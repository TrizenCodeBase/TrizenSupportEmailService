import express from 'express';
import Joi from 'joi';
import { 
  sendSupportResponseEmail, 
  sendWelcomeEmail, 
  sendCustomEmail, 
  sendBulkEmails,
  testEmailConfig 
} from '../services/supportEmailService.js';

const router = express.Router();

// Validation schemas
const supportResponseSchema = Joi.object({
  clientEmail: Joi.string().email().required(),
  clientName: Joi.string().min(1).max(100).required(),
  inquiry: Joi.string().min(1).max(1000).required(),
  response: Joi.string().min(1).max(2000).required(),
  actionRequired: Joi.string().max(500).optional()
});

const welcomeEmailSchema = Joi.object({
  clientEmail: Joi.string().email().required(),
  clientName: Joi.string().min(1).max(100).required()
});

const customEmailSchema = Joi.object({
  clientEmail: Joi.string().email().required(),
  clientName: Joi.string().min(1).max(100).required(),
  subject: Joi.string().min(1).max(200).required(),
  message: Joi.string().min(1).max(5000).required(),
  isHtml: Joi.boolean().optional().default(false)
});

const bulkEmailSchema = Joi.object({
  clients: Joi.array().items(
    Joi.object({
      email: Joi.string().email().required(),
      name: Joi.string().min(1).max(100).required()
    })
  ).min(1).max(100).required(),
  subject: Joi.string().min(1).max(200).required(),
  message: Joi.string().min(1).max(5000).required(),
  isHtml: Joi.boolean().optional().default(false),
  attachments: Joi.array().items(
    Joi.alternatives().try(
      Joi.string(), // File path
      Joi.object({
        filename: Joi.string().required(),
        content: Joi.string().required(),
        encoding: Joi.string().optional().default('base64'),
        contentType: Joi.string().optional().default('application/pdf')
      }),
      Joi.object({
        filename: Joi.string().required(),
        path: Joi.string().required()
      })
    )
  ).optional().default([])
});

// Test email configuration endpoint
router.get('/test-config', async (req, res) => {
  try {
    const result = await testEmailConfig();
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Support email configuration is working properly',
        data: result
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Support email configuration test failed',
        error: result.error,
        details: result.details
      });
    }
  } catch (error) {
    console.error('Support email config test error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to test support email configuration',
      error: error.message
    });
  }
});

// Send support response email endpoint
router.post('/send-support-response', async (req, res) => {
  try {
    // Validate input
    const { error, value } = supportResponseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details[0].message
      });
    }

    const { clientEmail, clientName, inquiry, response, actionRequired } = value;

    // Send support response email
    const result = await sendSupportResponseEmail(
      clientEmail, 
      clientName, 
      inquiry, 
      response, 
      actionRequired
    );
    
    res.json({
      success: true,
      message: 'Support response email sent successfully',
      data: result
    });

  } catch (error) {
    console.error('Send support response email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send support response email',
      error: error.message
    });
  }
});

// Send welcome email endpoint
router.post('/send-welcome', async (req, res) => {
  try {
    // Validate input
    const { error, value } = welcomeEmailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details[0].message
      });
    }

    const { clientEmail, clientName } = value;

    // Send welcome email
    const result = await sendWelcomeEmail(clientEmail, clientName);
    
    res.json({
      success: true,
      message: 'Welcome email sent successfully',
      data: result
    });

  } catch (error) {
    console.error('Send welcome email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send welcome email',
      error: error.message
    });
  }
});

// Send custom email endpoint
router.post('/send-custom', async (req, res) => {
  try {
    // Validate input
    const { error, value } = customEmailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details[0].message
      });
    }

    const { clientEmail, clientName, subject, message, isHtml } = value;

    // Send custom email
    const result = await sendCustomEmail(clientEmail, clientName, subject, message, isHtml);
    
    res.json({
      success: true,
      message: 'Custom email sent successfully',
      data: result
    });

  } catch (error) {
    console.error('Send custom email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send custom email',
      error: error.message
    });
  }
});

// Send bulk emails endpoint
router.post('/send-bulk', async (req, res) => {
  try {
    // Validate input
    const { error, value } = bulkEmailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details[0].message
      });
    }

    const { clients, subject, message, isHtml, attachments } = value;

    // Send bulk emails with attachments
    const result = await sendBulkEmails(clients, subject, message, isHtml, attachments);
    
    res.json({
      success: true,
      message: `Bulk emails sent successfully. Sent: ${result.totalSent}, Failed: ${result.totalFailed}`,
      data: result
    });

  } catch (error) {
    console.error('Send bulk emails error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send bulk emails',
      error: error.message
    });
  }
});

// Get service status endpoint
router.get('/status', async (req, res) => {
  try {
    const result = await testEmailConfig();
    
    res.json({
      success: true,
      message: 'Support email service status retrieved',
      data: {
        isConfigured: result.success,
        status: result.success ? 'operational' : 'error',
        lastChecked: new Date().toISOString(),
        details: result,
        service: 'Trizen Ventures Support Email Service',
        fromEmail: 'support@trizenventures.com'
      }
    });
  } catch (error) {
    console.error('Support email status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check support email service status',
      error: error.message
    });
  }
});

export default router;
