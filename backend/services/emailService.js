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
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
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

// Email Templates
const getTemplate = (type, data) => {
  const { name, subject, score, totalQuestions, percentage, date } = data;
  const year = new Date().getFullYear();

  const baseStyles = `
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #1e293b;
    max-width: 600px;
    margin: 0 auto;
    background-color: #f8fafc;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  `;

  const headerStyles = `
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    padding: 30px;
    text-align: center;
    color: white;
  `;

  const footerStyles = `
    padding: 20px;
    text-align: center;
    font-size: 12px;
    color: #64748b;
    background: #f1f5f9;
  `;

  const buttonStyles = `
    display: inline-block;
    padding: 12px 24px;
    background: #6366f1;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    margin-top: 20px;
  `;

  switch (type) {
    case 'WELCOME':
      return {
        subject: `Welcome to Portfolio Platform, ${name}!`,
        html: `
          <div style="${baseStyles}">
            <div style="${headerStyles}">
              <h1 style="margin: 0;">Welcome Aboard! 🚀</h1>
            </div>
            <div style="padding: 40px; background: white;">
              <h2>Hello ${name},</h2>
              <p>We're thrilled to have you join our premium Portfolio & Learning platform. You can now explore courses, take tests, and earn certifications.</p>
              <p>Start your journey today by taking your first technical assessment!</p>
              <a href="https://yourportfolio.com/dashboard" style="${buttonStyles}">Go to Dashboard</a>
              <p style="margin-top: 30px;">If you have any questions, feel free to reply to this email.</p>
            </div>
            <div style="${footerStyles}">
              <p>&copy; ${year} Portfolio Platform. All rights reserved.</p>
            </div>
          </div>
        `
      };

    case 'LOGIN_WELCOME':
      return {
        subject: `New Login Detected - Portfolio Platform`,
        html: `
          <div style="${baseStyles}">
            <div style="${headerStyles}">
              <h1 style="margin: 0;">Welcome Back! ✨</h1>
            </div>
            <div style="padding: 40px; background: white;">
              <h2>Hello ${name},</h2>
              <p>A new login was detected on your account at <strong>${new Date().toLocaleString()}</strong>.</p>
              <p>If this was you, you can safely ignore this email. If not, please secure your account immediately.</p>
              <a href="https://yourportfolio.com/security" style="${buttonStyles}">Secure Account</a>
            </div>
            <div style="${footerStyles}">
              <p>&copy; ${year} Portfolio Platform. All rights reserved.</p>
            </div>
          </div>
        `
      };

    case 'TEST_FINISHED':
      return {
        subject: `Course Test Completed: ${subject}`,
        html: `
          <div style="${baseStyles}">
            <div style="${headerStyles}">
              <h1 style="margin: 0;">Test Finished! 🏆</h1>
            </div>
            <div style="padding: 40px; background: white;">
              <h2>Great job, ${name}!</h2>
              <p>You have successfully finished the test for <strong>${subject}</strong>.</p>
              <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Score:</strong> ${score} / ${totalQuestions}</p>
                <p style="margin: 5px 0;"><strong>Percentage:</strong> ${percentage}%</p>
                <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: ${percentage >= 70 ? '#10b981' : '#ef4444'}">${percentage >= 70 ? 'PASSED' : 'FAILED'}</span></p>
              </div>
              ${percentage >= 70 ? '<p>Congratulations! You are eligible for a certificate.</p>' : '<p>Keep practicing and try again to earn your certificate!</p>'}
              <a href="https://yourportfolio.com/results" style="${buttonStyles}">View Detailed Results</a>
            </div>
            <div style="${footerStyles}">
              <p>&copy; ${year} Portfolio Platform. All rights reserved.</p>
            </div>
          </div>
        `
      };

    case 'CERTIFICATE':
      return {
        subject: `Your Certificate for ${subject} is Here! 🎓`,
        html: `
          <div style="${baseStyles}">
            <div style="${headerStyles}">
              <h1 style="margin: 0;">Congratulations! 🎓</h1>
            </div>
            <div style="padding: 40px; background: white; text-align: center;">
              <h2>Verified Certification</h2>
              <p>This is to certify that <strong>${name}</strong> has successfully mastered the concepts of <strong>${subject}</strong> with a score of ${percentage}%.</p>
              
              <div style="margin: 40px 0; border: 4px double #6366f1; padding: 30px; border-radius: 8px; position: relative; background: #fff;">
                <div style="font-family: 'Georgia', serif; font-size: 24px; color: #1e293b; margin-bottom: 10px;">CERTIFICATE OF COMPLETION</div>
                <div style="color: #64748b; margin-bottom: 20px;">Presented to</div>
                <div style="font-size: 32px; font-weight: bold; color: #4338ca; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 5px; margin-bottom: 20px;">${name}</div>
                <div style="color: #64748b;">for successfully completing the course</div>
                <div style="font-size: 20px; font-weight: 600; color: #1e293b; margin-top: 10px;">${subject}</div>
                <div style="margin-top: 30px; display: flex; justify-content: space-between; font-size: 14px; color: #64748b;">
                  <div>Date: ${date || new Date().toLocaleDateString()}</div>
                  <div>ID: PORT-${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                </div>
              </div>

              <p>Your hard work and dedication have paid off. Keep up the excellent work!</p>
              <a href="https://yourportfolio.com/certificates" style="${buttonStyles}">Download PDF Copy</a>
            </div>
            <div style="${footerStyles}">
              <p>&copy; ${year} Portfolio Platform. All rights reserved.</p>
            </div>
          </div>
        `
      };

    default:
      return {
        subject: data.subject || 'Portfolio Notification',
        html: `<p>${data.message}</p>`
      };
  }
};

// Main send notification function with fallback
export const sendEmailNotification = async (name, email, typeOrMessage, extraData = {}) => {
  try {
    const data = { name, ...extraData };
    const template = getTemplate(typeOrMessage, data);
    
    console.log(`Attempting to send ${typeOrMessage} email to ${email}...`);

    // 1. Try SendGrid
    if (process.env.SENDGRID_API_KEY) {
      try {
        const msg = {
          to: email,
          from: process.env.EMAIL_USER || 'sahoopriyabrata780@gmail.com',
          subject: template.subject,
          html: template.html,
        };
        await sgMail.send(msg);
        console.log('✅ Email sent via SendGrid!');
        return;
      } catch (sgError) {
        console.error('❌ SendGrid failed:', sgError.message);
      }
    }

    // 2. Fallback to Gmail
    console.log('Attempting to send via Gmail fallback...');
    const transporter = createGmailTransporter();
    if (!transporter) throw new Error('Gmail transporter not available');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: template.subject,
      html: template.html,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent via Gmail!');

  } catch (error) {
    console.error('❌ ALL email methods failed:', error.message);
    throw error;
  }
};
