import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  // Support multiple email providers
  const emailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Additional professional configurations
    pool: true, // Use connection pooling
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 1000, // 1 second
    rateLimit: 5, // 5 emails per second max
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

// Professional email templates
const getEmailTemplate = (type, data) => {
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
        background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
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
        background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
        color: white; 
        text-decoration: none; 
        border-radius: 8px; 
        margin: 24px 0;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
      }
      .button:hover {
        background: linear-gradient(135deg, #15803d 0%, #166534 100%);
      }
      .footer { 
        padding: 30px 20px; 
        text-align: center; 
        color: #6b7280; 
        font-size: 14px;
        background-color: #f9fafb;
        border-radius: 0 0 8px 8px;
      }
      .security-notice {
        background-color: #fef3c7;
        border: 1px solid #f59e0b;
        border-radius: 6px;
        padding: 16px;
        margin: 20px 0;
        color: #92400e;
      }
      .logo {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 8px;
      }
    </style>
  `;

  switch (type) {
    case 'password-reset':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset - WhatsApp Broadcast Platform</title>
          ${baseStyle}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">📱 WhatsApp Broadcast</div>
              <h1 style="margin: 0; font-size: 28px;">Password Reset Request</h1>
            </div>
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 24px;">Hello,</p>
              
              <p>We received a request to reset the password for your WhatsApp Broadcast Platform account.</p>
              
              <p>Click the button below to create a new password:</p>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${data.resetUrl}" class="button">Reset My Password</a>
              </div>
              
              <div class="security-notice">
                <strong>🔒 Security Information:</strong>
                <ul style="margin: 8px 0; padding-left: 20px;">
                  <li>This link will expire in <strong>1 hour</strong></li>
                  <li>Use this link only once to reset your password</li>
                  <li>If you didn't request this reset, please ignore this email</li>
                </ul>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${data.resetUrl}" style="color: #16a34a; word-break: break-all;">${data.resetUrl}</a>
              </p>
              
              <p style="margin-top: 32px;">
                Best regards,<br>
                <strong>WhatsApp Broadcast Platform Team</strong>
              </p>
            </div>
            <div class="footer">
              <p><strong>WhatsApp Broadcast Platform</strong></p>
              <p>This is an automated security email. Please do not reply to this message.</p>
              <p style="margin-top: 16px; font-size: 12px;">
                © ${new Date().getFullYear()} WhatsApp Broadcast Platform. All rights reserved.
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
          <title>Welcome - WhatsApp Broadcast Platform</title>
          ${baseStyle}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">📱 WhatsApp Broadcast</div>
              <h1 style="margin: 0; font-size: 28px;">Welcome, ${data.firstName}! 🎉</h1>
            </div>
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 24px;">Hello ${data.firstName},</p>
              
              <p>Thank you for joining WhatsApp Broadcast Platform!</p>
              
              <p>You can now start creating and managing your WhatsApp broadcast campaigns with ease.</p>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${data.loginUrl}" class="button">Get Started</a>
              </div>
              
              <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 6px; padding: 16px; margin: 20px 0;">
                <strong>🚀 What you can do:</strong>
                <ul style="margin: 8px 0; padding-left: 20px;">
                  <li>Create and manage contact lists</li>
                  <li>Design custom message templates</li>
                  <li>Schedule broadcast campaigns</li>
                  <li>Track delivery and engagement metrics</li>
                </ul>
              </div>
              
              <p>If you have any questions, feel free to reach out to our support team.</p>
              
              <p style="margin-top: 32px;">
                Best regards,<br>
                <strong>WhatsApp Broadcast Platform Team</strong>
              </p>
            </div>
            <div class="footer">
              <p><strong>WhatsApp Broadcast Platform</strong></p>
              <p>This is an automated welcome email. Please do not reply to this message.</p>
              <p style="margin-top: 16px; font-size: 12px;">
                © ${new Date().getFullYear()} WhatsApp Broadcast Platform. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    
    default:
      return '';
  }
};

// Send password reset email with professional formatting
export const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: {
        name: process.env.EMAIL_FROM_NAME || 'WhatsApp Broadcast Platform',
        address: process.env.SMTP_USER
      },
      to: email,
      subject: '🔐 Password Reset Request - Action Required',
      html: getEmailTemplate('password-reset', { resetUrl }),
      // Add text version for better deliverability
      text: `
Password Reset Request

Hello,

We received a request to reset the password for your WhatsApp Broadcast Platform account.

Click this link to reset your password: ${resetUrl}

SECURITY INFORMATION:
- This link will expire in 1 hour
- Use this link only once to reset your password
- If you didn't request this reset, please ignore this email

Best regards,
WhatsApp Broadcast Platform Team

This is an automated security email. Please do not reply to this message.
      `,
      // Professional email headers
      headers: {
        'X-Mailer': 'WhatsApp Broadcast Platform',
        'X-Priority': '1', // High priority for security emails
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent successfully to ${email}`);
    console.log('Message ID:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    
    // Log specific error details for debugging
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Check SMTP credentials.');
    } else if (error.code === 'ECONNECTION') {
      console.error('Connection failed. Check SMTP host and port.');
    }
    
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
};

// Test email configuration with detailed feedback
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    
    // Verify connection
    await transporter.verify();
    
    console.log('✅ Email configuration test passed');
    return { 
      success: true, 
      message: 'Email configuration is valid and ready to send emails',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Email configuration test failed:', error);
    
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

// Send welcome email (bonus feature)
export const sendWelcomeEmail = async (email, firstName) => {
  try {
    const transporter = createTransporter();
    
    const loginUrl = `${process.env.CLIENT_URL}/login`;
    
    const mailOptions = {
      from: {
        name: process.env.EMAIL_FROM_NAME || 'WhatsApp Broadcast Platform',
        address: process.env.SMTP_USER
      },
      to: email,
      subject: '🎉 Welcome to WhatsApp Broadcast Platform!',
      html: getEmailTemplate('welcome', { firstName, loginUrl }),
      text: `
Welcome to WhatsApp Broadcast Platform!

Hello ${firstName},

Thank you for joining WhatsApp Broadcast Platform!

You can now start creating and managing your WhatsApp broadcast campaigns.

What you can do:
- Create and manage contact lists
- Design custom message templates
- Schedule broadcast campaigns
- Track delivery and engagement metrics

Get started: ${loginUrl}

If you have any questions, feel free to reach out to our support team.

Best regards,
WhatsApp Broadcast Platform Team
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);
    
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

// Send custom email with flexible content
export const sendCustomEmail = async (to, subject, html, text) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: process.env.EMAIL_FROM_NAME || 'WhatsApp Broadcast Platform',
        address: process.env.SMTP_USER
      },
      to: to,
      subject: subject,
      html: html,
      text: text,
      // Professional email headers
      headers: {
        'X-Mailer': 'WhatsApp Broadcast Platform',
        'X-Priority': '3', // Normal priority for custom emails
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Custom email sent successfully to ${to}`);
    console.log('Message ID:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error sending custom email:', error);
    
    // Log specific error details for debugging
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Check SMTP credentials.');
    } else if (error.code === 'ECONNECTION') {
      console.error('Connection failed. Check SMTP host and port.');
    }
    
    throw new Error(`Failed to send custom email: ${error.message}`);
  }
};

