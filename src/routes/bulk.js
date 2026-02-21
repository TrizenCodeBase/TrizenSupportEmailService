import express from 'express';
import Joi from 'joi';
import { sendBulkEmails } from '../services/supportEmailService.js';

const router = express.Router();

// Bulk email schema (same as supportEmail.js)
const bulkEmailSchema = Joi.object({
  clients: Joi.array().items(
    Joi.object({
      email: Joi.string().email().required(),
      name: Joi.string().min(1).max(100).required()
    })
  ).min(1).max(1000).required(),
  subject: Joi.string().min(1).max(200).required(),
  message: Joi.string().min(1).max(50000).required(),
  isHtml: Joi.boolean().optional().default(false),
  attachments: Joi.array().items(
    Joi.alternatives().try(
      Joi.string(), // File path
      // Attachment with base64 content
      Joi.object({
        filename: Joi.string().required(),
        content: Joi.string().required(),
        encoding: Joi.string().optional().default('base64'),
        contentType: Joi.string().optional().default('application/pdf'),
        cid: Joi.string().optional()
      }).unknown(false),
      // Attachment with URL (for header logo)
      Joi.object({
        filename: Joi.string().required(),
        url: Joi.string().pattern(/^https?:\/\/.+/).required(),
        contentType: Joi.string().optional(),
        cid: Joi.string().optional()
      }).unknown(false),
      // Attachment with file path
      Joi.object({
        filename: Joi.string().required(),
        path: Joi.string().required(),
        cid: Joi.string().optional()
      })
    )
  ).optional().allow(null).default([])
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

export default router;
