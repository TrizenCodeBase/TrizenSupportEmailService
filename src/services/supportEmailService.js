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
    
    case 'application-confirmation':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Confirmation - Trizen Ventures</title>
          ${baseStyle}
          <style>
            .application-details {
              background-color: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .next-steps {
              background-color: #f0f9ff;
              border: 1px solid #0ea5e9;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: 600;
              color: #374151;
            }
            .detail-value {
              color: #6b7280;
            }
            .status-badge {
              background-color: #dbeafe;
              color: #1e40af;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
            }
            .step-item {
              margin: 8px 0;
              padding-left: 20px;
              position: relative;
            }
            .step-item::before {
              content: "•";
              color: #0ea5e9;
              font-weight: bold;
              position: absolute;
              left: 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🚀 Trizen Ventures</div>
              <h1 style="margin: 0; font-size: 28px;">Application Confirmed!</h1>
            </div>
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 24px;">Hello ${data.applicantName || 'Applicant'},</p>
              
              <p style="font-size: 16px; margin-bottom: 24px;">
                Thank you for your interest in joining our team at <strong>Trizen Ventures</strong>! 
                We have successfully received your application for the position of <strong>"${data.jobTitle || 'Position'}"</strong> 
                (Job ID: ${data.jobId || 'N/A'}).
              </p>
              
              <div class="next-steps">
                <h3 style="margin: 0 0 16px 0; color: #0ea5e9; font-size: 18px;">📋 What happens next:</h3>
                <div class="step-item">Our HR team will review your application within 2-3 business days</div>
                <div class="step-item">If your profile matches our requirements, we'll contact you for the next steps</div>
                <div class="step-item">You may be invited for an interview or assessment</div>
                <div class="step-item">We'll keep you updated throughout the process</div>
              </div>
              
              <div class="application-details">
                <h3 style="margin: 0 0 16px 0; color: #374151; font-size: 18px;">📄 Application Details:</h3>
                <div class="detail-row">
                  <span class="detail-label">Position:</span>
                  <span class="detail-value">${data.jobTitle || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Application ID:</span>
                  <span class="detail-value">${data.jobId || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Applied on:</span>
                  <span class="detail-value">${data.appliedDate || new Date().toLocaleDateString()}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Status:</span>
                  <span class="status-badge">Under Review</span>
                </div>
              </div>
              
              <p style="margin: 24px 0;">
                If you have any questions about your application or the recruitment process, 
                please don't hesitate to contact us at 
                <a href="mailto:support@trizenventures.com" style="color: #1e40af; text-decoration: none;">
                  <strong>support@trizenventures.com</strong>
                </a>.
              </p>
              
              <p style="margin: 32px 0 24px 0; font-size: 16px;">
                We appreciate your interest in <strong>Trizen Ventures</strong> and look forward to potentially welcoming you to our team!
              </p>
              
              <p style="margin-top: 32px;">
                Best regards,<br>
                <strong>Trizen Ventures HR Team</strong>
              </p>
            </div>
            <div class="footer">
              <p><strong>Trizen Ventures</strong></p>
              <p>Email: support@trizenventures.com</p>
              <p>Website: https://trizenventures.com</p>
              <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">
                This is an automated confirmation email. Please do not reply to this email.<br>
                For support, contact us at support@trizenventures.com
              </p>
              <p style="margin-top: 16px; font-size: 12px;">
                © ${new Date().getFullYear()} Trizen Ventures. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    
    case 'custom':
      // Find header logo from attachments (look for header logo by filename or cid)
      let headerLogo = data.headerLogo;
      
      // If not passed directly, find from attachments
      if (!headerLogo && data.attachments && data.attachments.length > 0) {
        headerLogo = data.attachments.find(a => {
          const filename = (a.filename || '').toLowerCase();
          const contentType = (a.contentType || '').toLowerCase();
          const cid = a.cid || '';
          return (
            (contentType.startsWith('image/') && 
             (filename.includes('header') || filename.includes('logo') || cid === 'header-logo')) ||
            cid === 'header-logo'
          );
        });
      }
      
      // Embed header logo directly in HTML (NOT as attachment)
      // Use URL if provided (best), otherwise convert base64 to data URI
      let logoSrc = '';
      if (headerLogo && headerLogo.url) {
        // Hosted URL - best for Gmail (no attachment, loads from server)
        logoSrc = headerLogo.url;
        console.log('✅ Header logo using hosted URL (best for Gmail):', logoSrc);
      } else if (headerLogo && headerLogo.content) {
        // Base64 content - convert to data URI (Gmail may block but won't show as attachment)
        const contentType = headerLogo.contentType || 'image/png';
        logoSrc = `data:${contentType};base64,${headerLogo.content}`;
        console.log('⚠️  Header logo using data URI (Gmail may block images, but won\'t show as attachment)');
        console.log('💡 For Gmail: Host the image and provide URL instead of base64 content');
      } else {
        console.log('⚠️  No header logo found in template');
      }
      
      // Email-safe HTML with tables (works in Gmail, Outlook, etc.)
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${data.subject || 'Message from Trizen Ventures'}</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f5f5f5; font-family:Arial, sans-serif;">
          
          <!-- Email Wrapper Table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
            <tr>
              <td align="center" style="padding:20px 0;">
                
                <!-- Main Container Table -->
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; max-width:600px;">
                  
                  ${logoSrc ? `
                  <!-- Header Logo -->
                  <tr>
                    <td align="center" style="padding:0; margin:0; height:120px; overflow:hidden; line-height:0;">
                      <img 
                        src="${logoSrc}" 
                        alt="Trizen Ventures" 
                        width="600" 
                        style="display:block; width:100%; max-width:600px; height:120px; object-fit:cover; object-position:center; border:0; outline:none; margin:0; padding:0;" 
                      />
                    </td>
                  </tr>
                  ` : ''}
                  
                  <!-- Message Content -->
                  <tr>
                    <td style="padding:30px 20px; font-family:Arial, sans-serif; font-size:16px; line-height:1.6; color:#333333;">
                      ${data.message || data.content || ''}
                    </td>
                  </tr>
                  
                </table>
                
              </td>
            </tr>
          </table>
          
        </body>
        </html>
      `;
    
    case 'application-accepted':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Accepted - Trizen Ventures</title>
          ${baseStyle}
          <style>
            .success-badge {
              background-color: #d1fae5;
              color: #065f46;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 600;
              display: inline-block;
              margin: 16px 0;
            }
            .next-steps {
              background-color: #f0f9ff;
              border: 1px solid #0ea5e9;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .step-item {
              margin: 12px 0;
              padding-left: 24px;
              position: relative;
            }
            .step-item::before {
              content: "✓";
              color: #0ea5e9;
              font-weight: bold;
              position: absolute;
              left: 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🚀 Trizen Ventures</div>
              <h1 style="margin: 0; font-size: 28px;">Congratulations! 🎉</h1>
            </div>
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 24px;">Hello ${data.applicantName || 'Applicant'},</p>
              
              <p style="font-size: 18px; margin-bottom: 24px;">
                We are thrilled to inform you that your application for the position of 
                <strong>"${data.jobTitle || 'Position'}"</strong> (Job ID: ${data.jobId || 'N/A'}) 
                has been <strong>ACCEPTED</strong>!
              </p>
              
              <div class="success-badge">✓ Application Accepted</div>
              
              <div class="next-steps">
                <h3 style="margin: 0 0 16px 0; color: #0ea5e9; font-size: 18px;">📋 Next Steps:</h3>
                <div class="step-item">Our HR team will contact you within 2-3 business days to discuss the next steps</div>
                <div class="step-item">You will receive details about your onboarding process and start date</div>
                <div class="step-item">Please keep an eye on your email for further communication</div>
                <div class="step-item">Prepare any required documents as mentioned in the job posting</div>
              </div>
              
              <p style="margin: 24px 0;">
                We are excited to welcome you to the <strong>Trizen Ventures</strong> team! 
                Your skills and experience align perfectly with what we're looking for, and we believe 
                you will be a valuable addition to our organization.
              </p>
              
              <p style="margin: 24px 0;">
                If you have any questions or need clarification on anything, please don't hesitate to 
                contact us at 
                <a href="mailto:support@trizenventures.com" style="color: #1e40af; text-decoration: none;">
                  <strong>support@trizenventures.com</strong>
                </a>.
              </p>
              
              <p style="margin: 32px 0 24px 0; font-size: 16px;">
                Once again, congratulations on your acceptance! We look forward to working with you.
              </p>
              
              <p style="margin-top: 32px;">
                Best regards,<br>
                <strong>Trizen Ventures HR Team</strong>
              </p>
            </div>
            <div class="footer">
              <p><strong>Trizen Ventures</strong></p>
              <p>Email: support@trizenventures.com</p>
              <p>Website: https://trizenventures.com</p>
              <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">
                This is an automated email. Please do not reply to this email.<br>
                For support, contact us at support@trizenventures.com
              </p>
              <p style="margin-top: 16px; font-size: 12px;">
                © ${new Date().getFullYear()} Trizen Ventures. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    
    case 'application-rejected':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Update - Trizen Ventures</title>
          ${baseStyle}
          <style>
            .feedback-section {
              background-color: #fef3c7;
              border: 1px solid #f59e0b;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .encouragement {
              background-color: #f0f9ff;
              border: 1px solid #0ea5e9;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🚀 Trizen Ventures</div>
              <h1 style="margin: 0; font-size: 28px;">Application Update</h1>
            </div>
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 24px;">Hello ${data.applicantName || 'Applicant'},</p>
              
              <p style="font-size: 16px; margin-bottom: 24px;">
                Thank you for your interest in joining <strong>Trizen Ventures</strong> and for taking the time 
                to apply for the position of <strong>"${data.jobTitle || 'Position'}"</strong> 
                (Job ID: ${data.jobId || 'N/A'}).
              </p>
              
              <p style="font-size: 16px; margin-bottom: 24px;">
                After careful consideration of all applications, we regret to inform you that we have decided 
                to move forward with other candidates whose qualifications more closely match our current needs 
                for this position.
              </p>
              
              <div class="feedback-section">
                <h3 style="margin: 0 0 12px 0; color: #92400e; font-size: 16px;">💡 We Appreciate Your Interest</h3>
                <p style="margin: 0; color: #78350f;">
                  This decision was not an easy one, and we want you to know that we genuinely appreciate 
                  the time and effort you invested in your application. We received many qualified applications, 
                  and the selection process was highly competitive.
                </p>
              </div>
              
              <div class="encouragement">
                <h3 style="margin: 0 0 12px 0; color: #0ea5e9; font-size: 16px;">🌟 Keep Growing</h3>
                <p style="margin: 0; color: #1e40af;">
                  We encourage you to continue developing your skills and to keep an eye on our career page 
                  for future opportunities that may be a better fit. We believe that the right opportunity 
                  is out there for you, and we wish you the very best in your career journey.
                </p>
              </div>
              
              <p style="margin: 24px 0;">
                If you have any questions about this decision or would like feedback on your application, 
                please feel free to reach out to us at 
                <a href="mailto:support@trizenventures.com" style="color: #1e40af; text-decoration: none;">
                  <strong>support@trizenventures.com</strong>
                </a>.
              </p>
              
              <p style="margin: 32px 0 24px 0;">
                Thank you again for your interest in <strong>Trizen Ventures</strong>. We wish you all the best 
                in your future endeavors.
              </p>
              
              <p style="margin-top: 32px;">
                Best regards,<br>
                <strong>Trizen Ventures HR Team</strong>
              </p>
            </div>
            <div class="footer">
              <p><strong>Trizen Ventures</strong></p>
              <p>Email: support@trizenventures.com</p>
              <p>Website: https://trizenventures.com</p>
              <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">
                This is an automated email. Please do not reply to this email.<br>
                For support, contact us at support@trizenventures.com
              </p>
              <p style="margin-top: 16px; font-size: 12px;">
                © ${new Date().getFullYear()} Trizen Ventures. All rights reserved.
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

// Send application confirmation email
export const sendApplicationConfirmationEmail = async (applicantEmail, applicantName, jobTitle, jobId, appliedDate = null) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Trizen Ventures HR',
        address: 'support@trizenventures.com'
      },
      to: applicantEmail,
      subject: `Application Confirmed - ${jobTitle} | Trizen Ventures`,
      html: getSupportEmailTemplate('application-confirmation', {
        applicantName,
        jobTitle,
        jobId,
        appliedDate: appliedDate || new Date().toLocaleDateString()
      }),
      text: `
Application Confirmation - Trizen Ventures

Hello ${applicantName || 'Applicant'},

Thank you for your interest in joining our team at Trizen Ventures! 
We have successfully received your application for the position of "${jobTitle}" (Job ID: ${jobId}).

What happens next:
• Our HR team will review your application within 2-3 business days
• If your profile matches our requirements, we'll contact you for the next steps
• You may be invited for an interview or assessment
• We'll keep you updated throughout the process

Application Details:
• Position: ${jobTitle}
• Application ID: ${jobId}
• Applied on: ${appliedDate || new Date().toLocaleDateString()}
• Status: Under Review

If you have any questions about your application or the recruitment process, please don't hesitate to contact us at support@trizenventures.com.

We appreciate your interest in Trizen Ventures and look forward to potentially welcoming you to our team!

Best regards,
Trizen Ventures HR Team

---
This is an automated confirmation email. Please do not reply to this email.
For support, contact us at support@trizenventures.com
      `,
      headers: {
        'X-Mailer': 'Trizen Ventures Application System',
        'X-Priority': '3',
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Application confirmation email sent successfully to ${applicantEmail}`);
    console.log('Message ID:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error sending application confirmation email:', error);
    
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Check SMTP credentials.');
    } else if (error.code === 'ECONNECTION') {
      console.error('Connection failed. Check SMTP host and port.');
    }
    
    throw new Error(`Failed to send application confirmation email: ${error.message}`);
  }
};

// Send application acceptance email
export const sendApplicationAcceptanceEmail = async (applicantEmail, applicantName, jobTitle, jobId) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Trizen Ventures HR',
        address: 'support@trizenventures.com'
      },
      to: applicantEmail,
      subject: `Congratulations! Application Accepted - ${jobTitle} | Trizen Ventures`,
      html: getSupportEmailTemplate('application-accepted', {
        applicantName,
        jobTitle,
        jobId
      }),
      text: `
Congratulations! Application Accepted - Trizen Ventures

Hello ${applicantName || 'Applicant'},

We are thrilled to inform you that your application for the position of "${jobTitle}" (Job ID: ${jobId}) has been ACCEPTED!

Next Steps:
• Our HR team will contact you within 2-3 business days to discuss the next steps
• You will receive details about your onboarding process and start date
• Please keep an eye on your email for further communication
• Prepare any required documents as mentioned in the job posting

We are excited to welcome you to the Trizen Ventures team! Your skills and experience align perfectly with what we're looking for, and we believe you will be a valuable addition to our organization.

If you have any questions or need clarification on anything, please don't hesitate to contact us at support@trizenventures.com.

Once again, congratulations on your acceptance! We look forward to working with you.

Best regards,
Trizen Ventures HR Team

---
This is an automated email. Please do not reply to this email.
For support, contact us at support@trizenventures.com
      `,
      headers: {
        'X-Mailer': 'Trizen Ventures Application System',
        'X-Priority': '1', // High priority for acceptance emails
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Application acceptance email sent successfully to ${applicantEmail}`);
    console.log('Message ID:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error sending application acceptance email:', error);
    
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Check SMTP credentials.');
    } else if (error.code === 'ECONNECTION') {
      console.error('Connection failed. Check SMTP host and port.');
    }
    
    throw new Error(`Failed to send application acceptance email: ${error.message}`);
  }
};

// Send application rejection email
export const sendApplicationRejectionEmail = async (applicantEmail, applicantName, jobTitle, jobId) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Trizen Ventures HR',
        address: 'support@trizenventures.com'
      },
      to: applicantEmail,
      subject: `Application Update - ${jobTitle} | Trizen Ventures`,
      html: getSupportEmailTemplate('application-rejected', {
        applicantName,
        jobTitle,
        jobId
      }),
      text: `
Application Update - Trizen Ventures

Hello ${applicantName || 'Applicant'},

Thank you for your interest in joining Trizen Ventures and for taking the time to apply for the position of "${jobTitle}" (Job ID: ${jobId}).

After careful consideration of all applications, we regret to inform you that we have decided to move forward with other candidates whose qualifications more closely match our current needs for this position.

This decision was not an easy one, and we want you to know that we genuinely appreciate the time and effort you invested in your application. We received many qualified applications, and the selection process was highly competitive.

We encourage you to continue developing your skills and to keep an eye on our career page for future opportunities that may be a better fit. We believe that the right opportunity is out there for you, and we wish you the very best in your career journey.

If you have any questions about this decision or would like feedback on your application, please feel free to reach out to us at support@trizenventures.com.

Thank you again for your interest in Trizen Ventures. We wish you all the best in your future endeavors.

Best regards,
Trizen Ventures HR Team

---
This is an automated email. Please do not reply to this email.
For support, contact us at support@trizenventures.com
      `,
      headers: {
        'X-Mailer': 'Trizen Ventures Application System',
        'X-Priority': '3',
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Application rejection email sent successfully to ${applicantEmail}`);
    console.log('Message ID:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error sending application rejection email:', error);
    
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Check SMTP credentials.');
    } else if (error.code === 'ECONNECTION') {
      console.error('Connection failed. Check SMTP host and port.');
    }
    
    throw new Error(`Failed to send application rejection email: ${error.message}`);
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

// Helper function to convert plain text to HTML
const convertTextToHtml = (text) => {
  if (!text) return '';
  
  // Escape HTML special characters
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  
  // Convert line breaks to <br> tags
  html = html.replace(/\n/g, '<br>');
  
  // Convert double line breaks to paragraphs
  html = html.replace(/(<br>\s*){2,}/g, '</p><p>');
  
  // Wrap in paragraph tags
  if (!html.startsWith('<p>')) {
    html = '<p>' + html + '</p>';
  }
  
  return html;
};

// Send custom email to clients
export const sendCustomEmail = async (clientEmail, clientName, subject, message, isHtml = false, attachments = []) => {
  try {
    const transporter = createTransporter();
    
    // Process message: if not HTML, convert plain text to HTML
    let processedMessage = message;
    if (!isHtml) {
      processedMessage = convertTextToHtml(message);
    } else {
      // Replace [Name] placeholder if HTML
      processedMessage = message.replace(/\[Name\]/g, clientName);
    }
    
    // Find header logo from attachments (look for header/logo image)
    let headerLogoIndex = -1;
    
    if (attachments && attachments.length > 0) {
      console.log('🔍 Checking attachments for header logo:', attachments.length, 'attachments');
      
      attachments.forEach((attachment, index) => {
        const filename = (attachment.filename || '').toLowerCase();
        const contentType = (attachment.contentType || '').toLowerCase();
        const cid = attachment.cid || '';
        
        // Detect image type from filename if contentType not set
        const isImage = contentType.startsWith('image/') || 
                       filename.endsWith('.png') || 
                       filename.endsWith('.jpg') || 
                       filename.endsWith('.jpeg') || 
                       filename.endsWith('.gif') ||
                       filename.endsWith('.webp');
        
        // Check if this is a header logo (image with header/logo in name or cid)
        const isHeaderLogo = (
          (isImage && (filename.includes('header') || filename.includes('logo'))) ||
          cid === 'header-logo'
        );
        
        console.log(`  Attachment ${index}:`, {
          filename: attachment.filename,
          contentType: attachment.contentType || 'not set',
          isImage,
          isHeaderLogo,
          hasContent: !!attachment.content,
          hasUrl: !!attachment.url
        });
        
        if (isHeaderLogo) {
          headerLogoIndex = index;
          // Ensure header logo has a CID for embedding (only if using CID, not URL)
          if (!attachment.cid && !attachment.url) {
            attachment.cid = 'header-logo';
          }
          console.log(`  ✅ Header logo found at index ${index}`, {
            hasUrl: !!attachment.url,
            hasContent: !!attachment.content,
            url: attachment.url || 'none'
          });
        }
      });
    }
    
    if (headerLogoIndex === -1) {
      console.log('⚠️  No header logo detected in attachments');
      console.log('💡 Tip: For best Gmail compatibility, use a hosted URL instead of base64 attachment');
    } else {
      console.log(`✅ Header logo detected at index ${headerLogoIndex}`);
    }
    
    const mailOptions = {
      from: {
        name: 'Trizen Ventures',
        address: 'support@trizenventures.com'
      },
      to: clientEmail,
      subject: subject,
      html: (() => {
        // Prepare header logo for template
        const headerLogoForTemplate = headerLogoIndex >= 0 ? {
          ...attachments[headerLogoIndex],
          // Only set CID if using content-based embedding (not URL)
          ...(attachments[headerLogoIndex].url ? {} : { cid: 'header-logo' })
        } : null;
        
        console.log('📧 Preparing email template:', {
          hasHeaderLogo: !!headerLogoForTemplate,
          headerLogoIndex,
          totalAttachments: attachments.length,
          headerLogoUrl: headerLogoForTemplate?.url || 'none',
          headerLogoHasContent: !!headerLogoForTemplate?.content
        });
        
        return getSupportEmailTemplate('custom', {
          clientName,
          subject,
          message: processedMessage,
          headerLogo: headerLogoForTemplate,
          attachments: attachments
        });
      })(),
      text: isHtml ? message.replace(/<[^>]*>/g, '').replace(/\[Name\]/g, clientName) : message.replace(/\[Name\]/g, clientName),
      headers: {
        'X-Mailer': 'Trizen Ventures Support System',
        'X-Priority': '3',
      }
    };

    // Process attachments - EXCLUDE header logo completely from attachments array
    // Header logo is embedded in HTML (as URL or data URI), NOT as attachment
    const regularAttachments = [];
    
    if (attachments && attachments.length > 0) {
      attachments.forEach((attachment, index) => {
        const filename = (attachment.filename || '').toLowerCase();
        const contentType = (attachment.contentType || '').toLowerCase();
        
        // Check if this is the header logo
        const isHeaderLogo = index === headerLogoIndex;
        
        if (!isHeaderLogo) {
          // Only add non-header-logo attachments that have content (not URL-only)
          if (attachment.content || attachment.path) {
            const attachmentObj = {
              filename: attachment.filename || 'attachment.pdf',
              content: attachment.content,
              path: attachment.path,
              encoding: attachment.encoding || 'base64',
              contentType: attachment.contentType || (filename.endsWith('.png') ? 'image/png' : 
                                                       filename.endsWith('.jpg') || filename.endsWith('.jpeg') ? 'image/jpeg' : 
                                                       filename.endsWith('.gif') ? 'image/gif' : 
                                                       filename.endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream')
            };
            regularAttachments.push(attachmentObj);
          } else if (attachment.url) {
            // URL-only attachments are embedded in HTML, not sent as attachments
            console.log(`⚠️  Skipping URL-only attachment: ${attachment.filename || 'unnamed'} (URL: ${attachment.url})`);
          }
        } else {
          // Header logo is EXCLUDED from attachments - it's embedded in HTML only
          console.log('📷 Header logo EXCLUDED from attachments array (embedded in HTML only)');
          if (attachment.url) {
            console.log('✅ Using hosted URL for header logo (best for Gmail):', attachment.url);
          } else if (attachment.content) {
            console.log('⚠️  Using data URI for header logo (Gmail may block, but won\'t show as attachment)');
            console.log('💡 For best Gmail compatibility, host the image and provide URL instead of base64');
          }
        }
      });
    }
    
    // Add only regular attachments (header logo is NOT in this array)
    if (regularAttachments.length > 0) {
      mailOptions.attachments = regularAttachments;
      console.log('📎 Regular attachments (header logo excluded):', regularAttachments.length);
    } else {
      // No attachments at all if only header logo was provided
      console.log('📎 No regular attachments (header logo was excluded)');
    }

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
    
    // Process message once for all clients
    let processedMessage = message;
    if (!isHtml) {
      processedMessage = convertTextToHtml(message);
    }
    
    // Find header logo index from attachments (once for all clients)
    let headerLogoIndex = -1;
    if (attachments && attachments.length > 0) {
      attachments.forEach((attachment, index) => {
        const filename = (attachment.filename || '').toLowerCase();
        const contentType = (attachment.contentType || '').toLowerCase();
        const cid = attachment.cid || '';
        
        if (
          (contentType.startsWith('image/') && 
           (filename.includes('header') || filename.includes('logo') || cid === 'header-logo')) ||
          cid === 'header-logo'
        ) {
          headerLogoIndex = index;
          if (!attachment.cid) {
            attachment.cid = 'header-logo';
          }
        }
      });
    }
    
    for (const client of clients) {
      try {
        // Replace [Name] placeholder for each client
        let clientMessage = processedMessage;
        if (isHtml) {
          clientMessage = message.replace(/\[Name\]/g, client.name);
        } else {
          clientMessage = processedMessage.replace(/\[Name\]/g, client.name);
        }
        
        const mailOptions = {
          from: {
            name: 'Trizen Ventures',
            address: 'support@trizenventures.com'
          },
          to: client.email,
          subject: subject,
          html: getSupportEmailTemplate('custom', {
            clientName: client.name,
            subject,
            message: clientMessage,
            headerLogo: headerLogoIndex >= 0 ? attachments[headerLogoIndex] : null,
            attachments: attachments
          }),
          text: isHtml ? message.replace(/<[^>]*>/g, '').replace(/\[Name\]/g, client.name) : message.replace(/\[Name\]/g, client.name),
          headers: {
            'X-Mailer': 'Trizen Ventures Support System',
            'X-Priority': '3',
          }
        };

        // Separate header logo (inline only) from regular attachments
        const inlineAttachments = [];
        const regularAttachments = [];
        
        if (attachments && attachments.length > 0) {
          attachments.forEach((attachment, index) => {
            if (typeof attachment === 'string') {
              // File path - regular attachment
              regularAttachments.push({
                filename: attachment.split('/').pop() || 'attachment.pdf',
                path: attachment
              });
            } else if (attachment.content) {
              // Base64 content
              const filename = (attachment.filename || '').toLowerCase();
              const contentType = (attachment.contentType || '').toLowerCase();
              const isHeaderLogo = index === headerLogoIndex;
              
              if (isHeaderLogo) {
                // Header logo: inline only, no filename
                inlineAttachments.push({
                  cid: 'header-logo',
                  content: attachment.content,
                  encoding: attachment.encoding || 'base64',
                  contentType: attachment.contentType || (filename.endsWith('.png') ? 'image/png' : 
                                                           filename.endsWith('.jpg') || filename.endsWith('.jpeg') ? 'image/jpeg' : 
                                                           filename.endsWith('.gif') ? 'image/gif' : 'image/png')
                });
              } else if (attachment.cid) {
                // Other inline images
                inlineAttachments.push({
                  cid: attachment.cid,
                  content: attachment.content,
                  encoding: attachment.encoding || 'base64',
                  contentType: attachment.contentType || (filename.endsWith('.png') ? 'image/png' : 
                                                           filename.endsWith('.jpg') || filename.endsWith('.jpeg') ? 'image/jpeg' : 
                                                           filename.endsWith('.gif') ? 'image/gif' : 'image/png')
                });
              } else {
                // Regular file attachment
                regularAttachments.push({
                  filename: attachment.filename || 'attachment.pdf',
                  content: attachment.content,
                  encoding: attachment.encoding || 'base64',
                  contentType: attachment.contentType || (filename.endsWith('.png') ? 'image/png' : 
                                                         filename.endsWith('.jpg') || filename.endsWith('.jpeg') ? 'image/jpeg' : 
                                                         filename.endsWith('.gif') ? 'image/gif' : 'application/pdf')
                });
              }
            } else if (attachment.path) {
              // File path attachment
              const filename = (attachment.filename || attachment.path.split('/').pop() || '').toLowerCase();
              const isHeaderLogo = index === headerLogoIndex;
              
              if (isHeaderLogo) {
                // Header logo from path - read and embed inline
                inlineAttachments.push({
                  cid: 'header-logo',
                  path: attachment.path,
                  contentType: attachment.contentType || (filename.endsWith('.png') ? 'image/png' : 
                                                           filename.endsWith('.jpg') || filename.endsWith('.jpeg') ? 'image/jpeg' : 
                                                           filename.endsWith('.gif') ? 'image/gif' : 'image/png')
                });
              } else if (attachment.cid) {
                inlineAttachments.push({
                  cid: attachment.cid,
                  path: attachment.path
                });
              } else {
                regularAttachments.push({
                  filename: attachment.filename || attachment.path.split('/').pop() || 'attachment.pdf',
                  path: attachment.path
                });
              }
            }
          });
        }
        
        // Combine inline and regular attachments
        const allAttachments = [...inlineAttachments, ...regularAttachments];
        if (allAttachments.length > 0) {
          mailOptions.attachments = allAttachments;
        }

        const info = await transporter.sendMail(mailOptions);
        results.push({
          email: client.email,
          success: true,
          messageId: info.messageId
        });
        
        console.log(`✅ Bulk email with attachments sent successfully to ${client.email}`);
        
        // Rate limiting - wait 500ms between emails (reduced from 1000ms for faster sending)
        // ⚠️ WARNING: Removing this delay entirely may cause SMTP server rejections
        // Gmail allows ~100 emails/day for free accounts, ~2000/day for Workspace
        await new Promise(resolve => setTimeout(resolve, 500));
        
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

// Send Final Year Project Training Email
export const sendFinalYearProjectEmail = async (recipientEmail) => {
  try {
    const transporter = createTransporter();
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Final Year Project & Research Training</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); padding: 40px 30px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; margin-bottom: 12px; color: #ffffff;">
                      🚀 Trizen Ventures
                    </div>
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                      Final Year Project & Research Training
                    </h1>
                    <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">
                      End-to-End Deliverables
                    </p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      Dear Student,
                    </p>
                    
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      Your final year project is a key academic milestone and should demonstrate clear understanding, implementation, and research quality.
                    </p>
                    
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                      At <strong>Trizen Academy</strong>, we train B.Tech and M.Tech students to complete their final year projects end-to-end, covering every required deliverable from start to submission.
                    </p>
                    
                    <div style="background-color: #f8f9fa; border-left: 4px solid #1e40af; padding: 20px; margin: 0 0 25px 0; border-radius: 4px;">
                      <h2 style="color: #1e40af; font-size: 18px; margin: 0 0 15px 0; font-weight: bold;">
                        End-to-End Deliverables Include:
                      </h2>
                      <ol style="color: #333333; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                        <li>Finalized industry-relevant problem statement</li>
                        <li>Complete working project code using updated technologies</li>
                        <li>System architecture, flowcharts, and diagrams</li>
                        <li>PPT, documentation, and final reports (as per college format)</li>
                        <li>Live demo preparation and explanation</li>
                        <li>Research paper drafting (IEEE/Scopus standards, low plagiarism)</li>
                      </ol>
                    </div>
                    
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      Students work through the entire project lifecycle, ensuring confidence during vivas, reviews, placements, and research discussions.
                    </p>
                    
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                      <strong>Domains include:</strong> CSE, AIML, AI, Blockchain, IoT, ECE, VLSI, Embedded Systems, and more.
                    </p>
                    
                    <!-- Contact Section -->
                    <div style="background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); border-radius: 8px; padding: 25px; text-align: center; margin: 0 0 20px 0;">
                      <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 15px 0; font-weight: bold;">
                        Get Started Today!
                      </h3>
                      <p style="color: #ffffff; font-size: 15px; line-height: 1.6; margin: 0 0 15px 0;">
                        To know more about project formats and training details, contact us:
                      </p>
                      <div style="margin: 15px 0 0 0;">
                        <p style="color: #ffffff; margin: 8px 0; font-size: 15px;">
                          🌐 <strong>Website:</strong> <a href="https://academy.trizenventures.com" style="color: #ffffff; text-decoration: underline;">academy.trizenventures.com</a>
                        </p>
                        <p style="color: #ffffff; margin: 8px 0; font-size: 15px;">
                          📞 <strong>Phone:</strong> +91 8639648822
                        </p>
                      </div>
                    </div>
                    
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                      Regards,<br>
                      <strong>Trizen Academy</strong>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="color: #6c757d; font-size: 13px; margin: 0 0 5px 0;">
                      © ${new Date().getFullYear()} Trizen Academy. All rights reserved.
                    </p>
                    <p style="color: #6c757d; font-size: 12px; margin: 5px 0 0 0;">
                      This email was sent to ${recipientEmail}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Trizen Academy'}" <${process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: 'Final Year Project & Research Training – End-to-End Deliverables',
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: info.messageId,
      recipient: recipientEmail
    };
  } catch (error) {
    console.error('Error sending final year project email:', error);
    throw error;
  }
};

export default {
  sendApplicationConfirmationEmail,
  sendApplicationAcceptanceEmail,
  sendApplicationRejectionEmail,
  sendSupportResponseEmail,
  sendWelcomeEmail,
  sendCustomEmail,
  sendBulkEmails,
  testEmailConfig,
  sendFinalYearProjectEmail
};
