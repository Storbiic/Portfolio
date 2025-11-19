import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:5173',
    'http://localhost:4173',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:4173',
    'https://saadnajar.vercel.app',
    /\.vercel\.app$/  // Allow all Vercel preview deployments
  ],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'portfolio-smtp-server',
    version: '1.0.0'
  });
});

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailgun.org',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Mailgun-friendly settings
  tls: {
    rejectUnauthorized: false
  },
  debug: true, // Enable debug output
  logger: true // Log information to console
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});



// Send email endpoint
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and message',
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address',
    });
  }

  try {
    // Email to yourself
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #333;">Name:</strong> 
              <span style="color: #555;">${name}</span>
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #333;">Email:</strong> 
              <span style="color: #555;">${email}</span>
            </p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #0ea5e9; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
            <p>This email was sent from your portfolio contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
This email was sent from your portfolio contact form.
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Email server running on http://localhost:${PORT}`);
});
