import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('=== EMAIL CONFIGURATION TEST ===');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);
console.log('EMAIL_PASS (last 4):', process.env.EMAIL_PASS ? '****' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');

async function testEmail() {
  console.log('\n=== CREATING TRANSPORTER ===');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  console.log('Transporter type:', typeof transporter);
  console.log('sendMail type:', typeof transporter.sendMail);

  console.log('\n=== SENDING TEST EMAIL ===');
  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email from Portfolio Backend',
      html: '<h1>Test Success!</h1><p>If you receive this, email configuration is working!</p>'
    });
    console.log('✅ EMAIL SENT SUCCESSFULLY!');
    console.log('Message ID:', result.messageId);
  } catch (error) {
    console.log('❌ EMAIL FAILED!');
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    if (error.code) console.log('Error code:', error.code);
    if (error.response) console.log('SMTP Response:', error.response);
    console.error('\nFull stack:', error.stack);
  }
}

testEmail();
