import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport for support@trizenventures.com
const createTransporter = () => {
  const emailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'support@trizenventures.com',
      pass: process.env.SMTP_PASS,
    },
    // Professional configurations
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 1000, // 1 second
    rateLimit: 10, // 10 emails per second max
  };

  // Add specific configurations for different providers
  if (process.env.SMTP_HOST?.includes('outlook') || process.env.SMTP_HOST?.includes('hotmail')) {
    emailConfig.requireTLS = true;
    emailConfig.tls = {
      ciphers: 'SSLv3'
    };
  }

  return nodemailer.createTransport(emailConfig);
};

// Professional email templates for support emails
const getSupportEmailTemplate = (type, data) => {
  const baseStyle = `
    <style>
      .container { 
        max-width: 600px; 
        margin: 0 auto; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .header { 
        background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
        color: white; 
        padding: 30px 20px; 
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .content { 
        padding: 40px 30px; 
        background-color: #ffffff;
        border: 1px solid #e5e7eb;
        border-top: none;
      }
      .button { 
        display: inline-block; 
        padding: 16px 32px; 
        background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
        color: white; 
        text-decoration: none; 
        border-radius: 8px; 
        margin: 24px 0;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
      }
      .button:hover {
        background: linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%);
      }
      .footer { 
        padding: 30px 20px; 
        text-align: center; 
        color: #6b7280; 
        font-size: 14px;
        background-color: #f9fafb;
        border-radius: 0 0 8px 8px;
      }
      .logo {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      .support-info {
        background-color: #eff6ff;
        border: 1px solid #3b82f6;
        border-radius: 6px;
        padding: 16px;
        margin: 20px 0;
        color: #1e40af;
      }
    </style>
  `;

  switch (type) {
    case 'support-response':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Support Response - Trizen Ventures</title>
          ${baseStyle}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🚀 Trizen Ventures</div>
              <h1 style="margin: 0; font-size: 28px;">Support Response</h1>
            </div>
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 24px;">Hello ${data.clientName || 'Valued Client'},</p>
              
              <p>Thank you for reaching out to our support team. We have received your inquiry and are here to help.</p>
              
              <div class="support-info">
                <strong>📋 Your Inquiry:</strong><br>
                ${data.inquiry || 'General support request'}
              </div>
              
              <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 6px; padding: 16px; margin: 20px 0;">
                <strong>💬 Our Response:</strong><br>
                ${data.response || 'We are currently reviewing your request and will provide a detailed response shortly.'}
              </div>
              
              ${data.actionRequired ? `
                <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 16px; margin: 20px 0;">
                  <strong>⚡ Action Required:</strong><br>
                  ${data.actionRequired}
                </div>
              ` : ''}
              
              <p>If you have any additional questions or need further assistance, please don't hesitate to contact us.</p>
              
              <p style="margin-top: 32px;">
                Best regards,<br>
                <strong>Trizen Ventures Support Team</strong>
              </p>
            </div>
            <div class="footer">
              <p><strong>Trizen Ventures</strong></p>
              <p>Email: support@trizenventures.com</p>
              <p>Website: https://trizenventures.com</p>
              <p style="margin-top: 16px; font-size: 12px;">
                © ${new Date().getFullYear()} Trizen Ventures. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    
    case 'welcome':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome - Trizen Ventures</title>
          ${baseStyle}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🚀 Trizen Ventures</div>
              <h1 style="margin: 0; font-size: 28px;">Welcome to Trizen Ventures!</h1>
            </div>
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 24px;">Hello ${data.clientName || 'Valued Client'},</p>
              
              <p>Welcome to Trizen Ventures! We're excited to have you on board.</p>
              
              <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 6px; padding: 16px; margin: 20px 0;">
                <strong>🎯 What's Next:</strong>
                <ul style="margin: 8px 0; padding-left: 20px;">
                  <li>Your account has been set up successfully</li>
                  <li>You can now access our services</li>
                  <li>Our support team is here to help you get started</li>
                </ul>
              </div>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
              
              <p style="margin-top: 32px;">
                Best regards,<br>
                <strong>Trizen Ventures Team</strong>
              </p>
            </div>
            <div class="footer">
              <p><strong>Trizen Ventures</strong></p>
              <p>Email: support@trizenventures.com</p>
              <p>Website: https://trizenventures.com</p>
            </div>
          </div>
        </body>
        </html>
      `;
    
    case 'custom':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${data.subject || 'Message from Trizen Ventures'}</title>
          ${baseStyle}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🚀 Trizen Ventures</div>
              <h1 style="margin: 0; font-size: 28px;">${data.subject || 'Important Message'}</h1>
            </div>
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 24px;">Hello ${data.clientName || 'Valued Client'},</p>
              
              ${data.message || data.content || 'This is an important message from Trizen Ventures.'}
              
              <p style="margin-top: 32px;">
                Best regards,<br>
                <strong>Trizen Ventures Team</strong>
              </p>
            </div>
            <div class="footer">
              <p><strong>Trizen Ventures</strong></p>
              <p>Email: support@trizenventures.com</p>
              <p>Website: https://trizenventures.com</p>
            </div>
          </div>
        </body>
        </html>
      `;
    
    default:
      return '';
  }
};

// Send support response email
export const sendSupportResponseEmail = async (clientEmail, clientName, inquiry, response, actionRequired = null) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Trizen Ventures Support',
        address: 'support@trizenventures.com'
      },
      to: clientEmail,
      subject: 'Re: Your Support Request - Trizen Ventures',
      html: getSupportEmailTemplate('support-response', {
        clientName,
        inquiry,
        response,
        actionRequired
      }),
      text: `
Support Response - Trizen Ventures

Hello ${clientName || 'Valued Client'},

Thank you for reaching out to our support team.

Your Inquiry: ${inquiry || 'General support request'}

Our Response: ${response || 'We are currently reviewing your request and will provide a detailed response shortly.'}

${actionRequired ? `Action Required: ${actionRequired}` : ''}

If you have any additional questions or need further assistance, please don't hesitate to contact us.

Best regards,
Trizen Ventures Support Team

Email: support@trizenventures.com
Website: https://trizenventures.com
      `,
      headers: {
        'X-Mailer': 'Trizen Ventures Support System',
        'X-Priority': '3',
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Support response email sent successfully to ${clientEmail}`);
    console.log('Message ID:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error sending support response email:', error);
    
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Check SMTP credentials.');
    } else if (error.code === 'ECONNECTION') {
      console.error('Connection failed. Check SMTP host and port.');
    }
    
    throw new Error(`Failed to send support response email: ${error.message}`);
  }
};

// Send welcome email to new clients
export const sendWelcomeEmail = async (clientEmail, clientName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Trizen Ventures',
        address: 'support@trizenventures.com'
      },
      to: clientEmail,
      subject: 'Welcome to Trizen Ventures! 🚀',
      html: getSupportEmailTemplate('welcome', { clientName }),
      text: `
Welcome to Trizen Ventures!

Hello ${clientName || 'Valued Client'},

Welcome to Trizen Ventures! We're excited to have you on board.

What's Next:
- Your account has been set up successfully
- You can now access our services
- Our support team is here to help you get started

If you have any questions or need assistance, please don't hesitate to contact our support team.

Best regards,
Trizen Ventures Team

Email: support@trizenventures.com
Website: https://trizenventures.com
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent successfully to ${clientEmail}`);
    
    return { 
      success: true, 
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    throw new Error(`Failed to send welcome email: ${error.message}`);
  }
};

// Send custom email to clients
export const sendCustomEmail = async (clientEmail, clientName, subject, message, isHtml = false) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Trizen Ventures',
        address: 'support@trizenventures.com'
      },
      to: clientEmail,
      subject: subject,
      html: isHtml ? message : getSupportEmailTemplate('custom', {
        clientName,
        subject,
        message
      }),
      text: isHtml ? message.replace(/<[^>]*>/g, '') : message,
      headers: {
        'X-Mailer': 'Trizen Ventures Support System',
        'X-Priority': '3',
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Custom email sent successfully to ${clientEmail}`);
    console.log('Message ID:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error sending custom email:', error);
    
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Check SMTP credentials.');
    } else if (error.code === 'ECONNECTION') {
      console.error('Connection failed. Check SMTP host and port.');
    }
    
    throw new Error(`Failed to send custom email: ${error.message}`);
  }
};

// Send bulk emails to multiple clients with optional attachments
export const sendBulkEmails = async (clients, subject, message, isHtml = false, attachments = []) => {
  try {
    const transporter = createTransporter();
    const results = [];
    
    for (const client of clients) {
      try {
        const mailOptions = {
          from: {
            name: 'Trizen Ventures',
            address: 'support@trizenventures.com'
          },
          to: client.email,
          subject: subject,
          html: isHtml ? message : getSupportEmailTemplate('custom', {
            clientName: client.name,
            subject,
            message
          }),
          text: isHtml ? message.replace(/<[^>]*>/g, '') : message,
          headers: {
            'X-Mailer': 'Trizen Ventures Support System',
            'X-Priority': '3',
          }
        };

        // Add attachments if provided
        if (attachments && attachments.length > 0) {
          mailOptions.attachments = attachments.map(attachment => {
            if (typeof attachment === 'string') {
              // If attachment is a file path
              return {
                filename: attachment.split('/').pop() || 'attachment.pdf',
                path: attachment
              };
            } else if (attachment.content) {
              // If attachment is base64 content
              return {
                filename: attachment.filename || 'attachment.pdf',
                content: attachment.content,
                encoding: attachment.encoding || 'base64',
                contentType: attachment.contentType || 'application/pdf'
              };
            } else if (attachment.path) {
              // If attachment has path property
              return {
                filename: attachment.filename || attachment.path.split('/').pop() || 'attachment.pdf',
                path: attachment.path
              };
            }
            return attachment;
          });
        }

        const info = await transporter.sendMail(mailOptions);
        results.push({
          email: client.email,
          success: true,
          messageId: info.messageId
        });
        
        console.log(`✅ Bulk email with attachments sent successfully to ${client.email}`);
        
        // Rate limiting - wait 1 second between emails
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Failed to send email to ${client.email}:`, error);
        results.push({
          email: client.email,
          success: false,
          error: error.message
        });
      }
    }
    
    return {
      success: true,
      results,
      totalSent: results.filter(r => r.success).length,
      totalFailed: results.filter(r => !r.success).length,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error in bulk email sending:', error);
    throw new Error(`Failed to send bulk emails: ${error.message}`);
  }
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    
    // Verify connection
    await transporter.verify();
    
    console.log('✅ Support email configuration test passed');
    return { 
      success: true, 
      message: 'Support email configuration is valid and ready to send emails',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Support email configuration test failed:', error);
    
    let errorDetails = 'Unknown error';
    if (error.code === 'EAUTH') {
      errorDetails = 'Authentication failed. Check your email and app password.';
    } else if (error.code === 'ECONNECTION') {
      errorDetails = 'Connection failed. Check SMTP host and port settings.';
    } else if (error.code === 'ETIMEDOUT') {
      errorDetails = 'Connection timeout. Check your internet connection and firewall settings.';
    }
    
    return { 
      success: false, 
      error: error.message,
      details: errorDetails,
      timestamp: new Date().toISOString()
    };
  }
};

export default {
  sendSupportResponseEmail,
  sendWelcomeEmail,
  sendCustomEmail,
  sendBulkEmails,
  testEmailConfig
};
