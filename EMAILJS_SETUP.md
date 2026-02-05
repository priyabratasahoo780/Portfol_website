# EmailJS Setup Guide

Follow these steps to complete the email integration for your contact form.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. **Copy your Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. **Copy your Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_xyz123abc`)
3. Copy it

## Step 5: Configure Your Project

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual IDs from EmailJS

## Step 6: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## Step 7: Test the Form

1. Open your portfolio in the browser
2. Navigate to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check your email inbox for the message!

## Security Note

⚠️ **Important**: Add `.env` to your `.gitignore` file to keep your credentials private.

## Troubleshooting

- **"EmailJS is not configured" error**: Make sure your `.env` file exists and has the correct variable names
- **Email not received**: Check your EmailJS dashboard for error logs
- **CORS errors**: Make sure you've verified your domain in EmailJS settings

## Free Plan Limits

EmailJS free plan includes:

- 200 emails per month
- All email services
- All templates

This should be more than enough for a portfolio contact form!
