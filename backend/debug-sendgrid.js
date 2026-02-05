import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing SendGrid...');
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: process.env.EMAIL_USER, // Sending to yourself
        from: process.env.EMAIL_USER, // Verified sender
        subject: 'SendGrid Debug Email',
        text: 'If you receive this, SendGrid is working!',
        html: '<strong>If you receive this, SendGrid is working!</strong>',
    };
    
    sgMail
    .send(msg)
    .then(() => {
        console.log('✅ SendGrid Email Sent Successfully!');
    })
    .catch((error) => {
        console.error('❌ SendGrid Failed:');
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
    });
} else {
    console.log('❌ No SENDGRID_API_KEY found in .env');
}
