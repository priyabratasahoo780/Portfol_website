import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const logFile = 'debug-output.txt';
function log(msg) {
  console.log(msg);
  try {
      fs.appendFileSync(logFile, msg + '\n');
  } catch(e) {
      // ignore
  }
}

async function test() {
  fs.writeFileSync(logFile, 'Starting Test\n');
  log(`User: ${process.env.EMAIL_USER ? process.env.EMAIL_USER : 'Not Set'}`);
  log(`Pass: ${process.env.EMAIL_PASS ? 'Set (Length: ' + process.env.EMAIL_PASS.length + ')' : 'Not Set'}`);
  log(`SendGrid Key: ${process.env.SENDGRID_API_KEY ? 'Set (Length: ' + process.env.SENDGRID_API_KEY.length + ')' : 'Not Set'}`);

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      log('Testing Nodemailer (Gmail)...');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      
      try {
          await transporter.verify();
          log('✅ Nodemailer verify success! Credentials are valid.');
          
          // Try sending a real email
           try {
            const info = await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: 'Debug Email Test',
                text: 'This is a test email from debug-email.js'
            });
            log('✅ Test email sent: ' + info.messageId);
          } catch(sendErr) {
            log('❌ Verify worked but Send failed: ' + sendErr.message);
          }

      } catch(e) {
          log('❌ Nodemailer verify failed: ' + e.message);
          if (e.message.includes('Invalid login')) {
              log('Hint: Check if you are using an App Password. Regular passwords often don\'t work.');
          }
      }
  } else {
      log('Skipping Nodemailer test due to missing env vars');
  }
}

test().catch(err => log('Fatal error: ' + err.message));
