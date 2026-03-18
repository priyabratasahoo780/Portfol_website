import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';
import testRoutes from './routes/test.js';
import { sendEmailNotification } from './services/emailService.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet()); // Set API security headers

// Rate Limiting to prevent spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  }
});
app.use('/api', limiter);

// General Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    // Do NOT exit process, allows server to stay alive for diagnostics
    // process.exit(1); 
  });

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend server is running',
    timestamp: new Date().toISOString()
  });
});

// Temporary Email Test Endpoint
app.get('/api/test-email', async (req, res) => {
  try {
    const testEmail = process.env.EMAIL_USER; // Send to self
    await sendEmailNotification('Test User', testEmail, 'This is a test email from your diagnostics tool.');
    res.json({
      success: true,
      message: '✅ Email sent successfully! Check your inbox (and spam folder).',
      recipient: testEmail
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Email failed to send.',
      error: error.message,
      stack: error.stack,
      hint: error.message.includes('535') ? 'Authentication failed. Check EMAIL_PASS.' : 'Check server logs.'
    });
  }
});

// Diagnostic endpoint (remove in production if sensitive)
app.get('/api/debug-config', (req, res) => {
  res.json({
    status: 'Diagnostic Report',
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      MONGODB_URI_Configured: !!process.env.MONGODB_URI,
      EMAIL_USER_Configured: !!process.env.EMAIL_USER,
      EMAIL_PASS_Configured: !!process.env.EMAIL_PASS,
      SENDGRID_KEY_Configured: !!process.env.SENDGRID_API_KEY
    },
    headers: req.headers
  });
});

// Global 404 Handler - Catches any request that doesn't match a route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found on this server',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email User configured: ${process.env.EMAIL_USER ? 'Yes' : 'No'}`);
  console.log(`🗄️  Database configured: ${process.env.MONGODB_URI ? 'Yes' : 'No'}`);
});
