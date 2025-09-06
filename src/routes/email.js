import express from 'express';
import Joi from 'joi';
import { 
  sendPasswordResetEmail, 
  sendWelcomeEmail, 
  sendCustomEmail,
  testEmailConfig 
} from '../services/emailService.js';

const router = express.Router();

// Validation schemas
const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email address is required'
  })
});

const welcomeEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email address is required'
  }),
  firstName: Joi.string().min(1).max(50).required().messages({
    'string.min': 'First name must be at least 1 character long',
    'string.max': 'First name must not exceed 50 characters',
    'any.required': 'First name is required'
  })
});

const customEmailSchema = Joi.object({
  to: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid recipient email address',
    'any.required': 'Recipient email address is required'
  }),
  subject: Joi.string().min(1).max(200).required().messages({
    'string.min': 'Subject must be at least 1 character long',
    'string.max': 'Subject must not exceed 200 characters',
    'any.required': 'Subject is required'
  }),
  html: Joi.string().min(1).optional(),
  text: Joi.string().min(1).optional()
}).custom((value, helpers) => {
  if (!value.html && !value.text) {
    return helpers.error('custom.missingContent');
  }
  return value;
}).messages({
  'custom.missingContent': 'Either HTML or text content is required'
});

const passwordResetSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email address is required'
  }),
  resetToken: Joi.string().min(32).required().messages({
    'string.min': 'Reset token must be at least 32 characters long',
    'any.required': 'Reset token is required'
  })
});

// Test email configuration endpoint
router.get('/test-config', async (req, res) => {
  try {
    const result = await testEmailConfig();
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Email configuration is working properly',
        data: result
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Email configuration test failed',
        error: result.error,
        details: result.details
      });
    }
  } catch (error) {
    console.error('Email config test error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to test email configuration',
      error: error.message
    });
  }
});

// Send password reset email endpoint
router.post('/send-password-reset', async (req, res) => {
  try {
    // Validate input
    const { error, value } = passwordResetSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const { email, resetToken } = value;

    try {
      // Send professional password reset email
      const emailResult = await sendPasswordResetEmail(email, resetToken);
      
      console.log(`✅ Password reset email sent successfully to ${email}`);
      
      res.json({ 
        success: true,
        message: 'Password reset email sent successfully',
        data: {
          emailSent: true,
          messageId: emailResult.messageId,
          timestamp: emailResult.timestamp
        }
      });
    } catch (emailError) {
      console.error('❌ Failed to send password reset email:', emailError);
      
      // Return appropriate error message
      if (emailError.message.includes('Authentication failed')) {
        return res.status(500).json({ 
          success: false,
          error: 'Email service configuration error. Please contact support.' 
        });
      } else if (emailError.message.includes('Connection failed')) {
        return res.status(500).json({ 
          success: false,
          error: 'Unable to send email at this time. Please try again later.' 
        });
      }
      
      return res.status(500).json({ 
        success: false,
        error: 'Failed to send password reset email. Please try again later.' 
      });
    }

  } catch (error) {
    console.error('💥 Send password reset email error:', error);
    res.status(500).json({ 
      success: false,
      error: 'An unexpected error occurred. Please try again later.' 
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
        error: error.details[0].message
      });
    }

    const { email, firstName } = value;

    try {
      // Send welcome email
      const emailResult = await sendWelcomeEmail(email, firstName);
      
      console.log(`✅ Welcome email sent successfully to ${email}`);
      
      res.json({ 
        success: true,
        message: 'Welcome email sent successfully',
        data: {
          emailSent: true,
          recipient: email,
          messageId: emailResult.messageId,
          timestamp: emailResult.timestamp
        }
      });
    } catch (emailError) {
      console.error('❌ Failed to send welcome email:', emailError);
      
      // Return appropriate error message
      if (emailError.message.includes('Authentication failed')) {
        return res.status(500).json({ 
          success: false,
          error: 'Email service configuration error. Please contact support.' 
        });
      } else if (emailError.message.includes('Connection failed')) {
        return res.status(500).json({ 
          success: false,
          error: 'Unable to send email at this time. Please try again later.' 
        });
      }
      
      return res.status(500).json({ 
        success: false,
        error: 'Failed to send welcome email. Please try again later.' 
      });
    }

  } catch (error) {
    console.error('💥 Send welcome email error:', error);
    res.status(500).json({ 
      success: false,
      error: 'An unexpected error occurred. Please try again later.' 
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
        error: error.details[0].message
      });
    }

    const { to, subject, html, text } = value;

    try {
      const result = await sendCustomEmail(to, subject, html, text);
      
      console.log(`✅ Custom email sent successfully to ${to}`);
      
      res.json({ 
        success: true,
        message: 'Custom email sent successfully',
        data: result
      });
    } catch (emailError) {
      console.error('❌ Failed to send custom email:', emailError);
      
      return res.status(500).json({ 
        success: false,
        error: 'Failed to send custom email. Please try again later.' 
      });
    }

  } catch (error) {
    console.error('💥 Send custom email error:', error);
    res.status(500).json({ 
      success: false,
      error: 'An unexpected error occurred. Please try again later.' 
    });
  }
});

// Get email service status endpoint
router.get('/status', async (req, res) => {
  try {
    const result = await testEmailConfig();
    
    res.json({
      success: true,
      message: 'Email service status retrieved',
      data: {
        isConfigured: result.success,
        status: result.success ? 'operational' : 'error',
        lastChecked: new Date().toISOString(),
        details: result
      }
    });
  } catch (error) {
    console.error('Email status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check email service status',
      error: error.message
    });
  }
});

// Bulk email endpoint (for future use)
router.post('/send-bulk', async (req, res) => {
  try {
    const { emails, subject, html, text } = req.body;

    // Basic validation
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Emails array is required and must not be empty'
      });
    }

    if (!subject || (!html && !text)) {
      return res.status(400).json({
        success: false,
        error: 'Subject and either HTML or text content are required'
      });
    }

    const results = [];
    const errors = [];

    // Send emails in batches to avoid overwhelming the SMTP server
    const batchSize = 5;
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (email) => {
        try {
          const result = await sendCustomEmail(email, subject, html, text);
          return { email, success: true, result };
        } catch (error) {
          return { email, success: false, error: error.message };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      
      batchResults.forEach(result => {
        if (result.success) {
          results.push(result);
        } else {
          errors.push(result);
        }
      });

      // Small delay between batches
      if (i + batchSize < emails.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    res.json({
      success: true,
      message: `Bulk email processing completed. ${results.length} sent, ${errors.length} failed.`,
      data: {
        total: emails.length,
        sent: results.length,
        failed: errors.length,
        results: results,
        errors: errors
      }
    });

  } catch (error) {
    console.error('💥 Send bulk email error:', error);
    res.status(500).json({ 
      success: false,
      error: 'An unexpected error occurred during bulk email processing.' 
    });
  }
});

export default router;

