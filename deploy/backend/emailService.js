const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// 邮件服务配置
const EMAIL_ENABLED = process.env.EMAIL_ENABLED === 'true';
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_SECURE = process.env.EMAIL_SECURE === 'true';
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || EMAIL_USER;
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || 'ShredderBlades';

let transporter = null;

// 初始化邮件传输器
function initializeEmailService() {
  if (!EMAIL_ENABLED) {
    console.log('📧 Email notifications: DISABLED');
    return;
  }

  try {
    // 检查必要的配置
    if (!EMAIL_USER || !EMAIL_PASSWORD) {
      console.warn('⚠️  Email configuration incomplete. Set EMAIL_USER and EMAIL_PASSWORD in .env');
      return;
    }

    // 配置传输器
    const transportConfig = {};

    if (EMAIL_SERVICE) {
      // 使用预定义服务（Gmail, QQ, 163等）
      transportConfig.service = EMAIL_SERVICE;
      transportConfig.auth = {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
      };
    } else if (EMAIL_HOST) {
      // 使用自定义 SMTP 服务器
      transportConfig.host = EMAIL_HOST;
      transportConfig.port = EMAIL_PORT || 587;
      transportConfig.secure = EMAIL_SECURE;
      transportConfig.auth = {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
      };
    } else {
      console.warn('⚠️  Email configuration incomplete. Set EMAIL_SERVICE or EMAIL_HOST in .env');
      return;
    }

    transporter = nodemailer.createTransport(transportConfig);

    // 验证配置（异步，不阻塞启动）
    transporter.verify((error, success) => {
      if (error) {
        console.error('⚠️  Email service verification failed:', error.message);
        console.log('💡 Email will still attempt to send. Check your network and firewall settings.');
        // 不设置为 null，仍然尝试发送
      } else {
        console.log('✅ Email service ready:', EMAIL_USER);
      }
    });
  } catch (error) {
    console.error('❌ Failed to initialize email service:', error.message);
    transporter = null;
  }
}

// 发送新 inquiry 通知邮件
async function sendInquiryNotification(inquiry) {
  if (!EMAIL_ENABLED || !transporter) {
    console.log('📧 Email notification skipped (service not configured)');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    const mailOptions = {
      from: `"${EMAIL_FROM_NAME}" <${EMAIL_USER}>`,
      to: NOTIFICATION_EMAIL,
      subject: `🔔 New Inquiry from ${inquiry.name}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #1a365d 0%, #0f2944 100%);
      color: white;
      padding: 30px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .info-block {
      background: white;
      padding: 20px;
      margin: 15px 0;
      border-radius: 6px;
      border-left: 4px solid #1a365d;
    }
    .info-label {
      font-weight: 600;
      color: #1a365d;
      margin-bottom: 5px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-value {
      color: #333;
      font-size: 15px;
    }
    .message-box {
      background: white;
      padding: 20px;
      margin: 15px 0;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      color: #666;
      font-size: 13px;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background: #1a365d;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: 600;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: #d1e7dd;
      color: #0f5132;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔔 New Inquiry Received</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">ShredderBlades Contact Form</p>
  </div>
  
  <div class="content">
    <p style="margin-top: 0;">You have received a new inquiry. Please review and respond promptly.</p>
    
    <span class="badge">New</span>
    
    <div class="info-block">
      <div class="info-label">Customer Name</div>
      <div class="info-value">${inquiry.name}</div>
    </div>
    
    <div class="info-block">
      <div class="info-label">Email Address</div>
      <div class="info-value">
        <a href="mailto:${inquiry.email}" style="color: #1a365d; text-decoration: none;">
          ${inquiry.email}
        </a>
      </div>
    </div>
    
    <div class="info-block">
      <div class="info-label">Phone Number</div>
      <div class="info-value">${inquiry.phone}</div>
    </div>
    
    <div class="info-block">
      <div class="info-label">Inquiry Message</div>
      <div class="message-box">
        ${inquiry.message.replace(/\n/g, '<br>')}
      </div>
    </div>
    
    <div class="info-block">
      <div class="info-label">Received At</div>
      <div class="info-value">${new Date().toLocaleString('zh-CN')}</div>
    </div>
    
    <center>
      <a href="http://localhost:3001/admin.html" class="button">
        View in Admin Panel
      </a>
    </center>
    
    <div class="footer">
      <p>This is an automated notification from ShredderBlades Inquiry System</p>
      <p style="margin: 5px 0;">
        Inquiry ID: #${inquiry.id || 'Pending'}
      </p>
    </div>
  </div>
</body>
</html>
      `,
      text: `
New Inquiry Received - ShredderBlades

Customer Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone}

Message:
${inquiry.message}

Received at: ${new Date().toLocaleString('zh-CN')}

View in admin panel: http://localhost:3001/admin.html
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send email notification:', error.message);
    return { success: false, error: error.message };
  }
}

// 发送确认邮件给客户（可选）
async function sendCustomerConfirmation(inquiry) {
  if (!EMAIL_ENABLED || !transporter) {
    return { success: false, message: 'Email service not configured' };
  }

  try {
    const mailOptions = {
      from: `"${EMAIL_FROM_NAME}" <${EMAIL_USER}>`,
      to: inquiry.email,
      subject: 'Thank you for contacting ShredderBlades',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #1a365d 0%, #0f2944 100%);
      color: white;
      padding: 30px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .highlight-box {
      background: white;
      padding: 20px;
      margin: 20px 0;
      border-radius: 6px;
      border-left: 4px solid #28a745;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>✅ Thank You!</h1>
  </div>
  
  <div class="content">
    <p>Dear ${inquiry.name},</p>
    
    <p>Thank you for contacting ShredderBlades. We have received your inquiry and our team will review it shortly.</p>
    
    <div class="highlight-box">
      <strong>What happens next?</strong>
      <ul style="margin: 10px 0;">
        <li>Our specialists will review your requirements</li>
        <li>We'll respond within 24 hours</li>
        <li>You'll receive a detailed proposal tailored to your needs</li>
      </ul>
    </div>
    
    <p>If you have any urgent questions, please feel free to contact us directly.</p>
    
    <p style="margin-top: 30px;">
      Best regards,<br>
      <strong>ShredderBlades Team</strong>
    </p>
  </div>
</body>
</html>
      `,
      text: `
Dear ${inquiry.name},

Thank you for contacting ShredderBlades. We have received your inquiry and our team will review it shortly.

What happens next?
- Our specialists will review your requirements
- We'll respond within 24 hours
- You'll receive a detailed proposal tailored to your needs

If you have any urgent questions, please feel free to contact us directly.

Best regards,
ShredderBlades Team
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Customer confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send customer confirmation:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = {
  initializeEmailService,
  sendInquiryNotification,
  sendCustomerConfirmation
};
