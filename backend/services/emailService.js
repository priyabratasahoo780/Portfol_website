import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Create Gmail transporter
const createGmailTransporter = () => {
  try {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } catch (error) {
    console.error('Failed to create Gmail transporter:', error);
    return null;
  }
};

// Send via SendGrid
export const sendViaSendGrid = async (name, email, message) => {
  console.log(`Creating SendGrid payload for message length: ${message ? message.length : 0}`);
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SendGrid API key not configured');
  }

  const msg = {
    to: process.env.EMAIL_USER || 'sahoopriyabrata780@gmail.com',
    from: process.env.EMAIL_USER || 'sahoopriyabrata780@gmail.com',
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Message: ${message}
Submitted at: ${new Date().toLocaleString()}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr>
      <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
    `,
  };

  await sgMail.send(msg);
  console.log('✅ Email sent via SendGrid!');
};

// Send via Gmail
export const sendViaGmail = async (name, email, message) => {
  const transporter = createGmailTransporter();
  if (!transporter) {
    throw new Error('Failed to create Gmail transporter');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Message: ${message}
Submitted at: ${new Date().toLocaleString()}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr>
      <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
    `,
    replyTo: email
  };

  await transporter.sendMail(mailOptions);
  console.log('✅ Email sent via Gmail!');
};

// Main send notification function with fallback
export const sendEmailNotification = async (name, email, message) => {
  try {
    console.log('Attempting to send email via SendGrid...');
    await sendViaSendGrid(name, email, message);
  } catch (sendGridError) {
    console.error('❌ SendGrid failed:', sendGridError.message);
    if (process.env.SENDGRID_API_KEY) {
       console.error('  Hint: Check if your SENDGRID_API_KEY is valid and has "Mail Send" permissions.');
    } else {
       console.error('  Hint: SENDGRID_API_KEY is not set in .env');
    }

    console.log('Attempting to send via Gmail fallback...');
    try {
      await sendViaGmail(name, email, message);
    } catch (gmailError) {
      console.error('❌ Gmail failed:', gmailError.message);
      if (gmailError.response && gmailError.response.includes('535')) {
          console.error('  CRITICAL: Authentication Failed (535).');
          console.error('  Solution: You MUST use an App Password, not your login password.');
          console.error('  1. Go to Google Account > Security > 2-Step Verification > App Passwords');
          console.error('  2. Create new app password');
          console.error('  3. Update EMAIL_PASS in backend/.env');
      }
      throw gmailError; // Re-throw to indicate total failure
    }
  }
};
