import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { sendEmailNotification } from '../services/emailService.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    const token = signToken(newUser._id);

    // Trigger Welcome Email
    try {
      await sendEmailNotification(name, email, 'WELCOME');
    } catch (emailError) {
      console.error('Welcome email failed:', emailError.message);
      // Don't fail signup if email fails
    }

    res.status(201).json({
      success: true,
      token,
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Incorrect email or password' });
    }

    const token = signToken(user._id);

    // Update Welcome email or login notification if needed
    // The user requested: "when user login the send email welcom"
    // I'll send the welcome/info email on login too as requested.
    try {
        await sendEmailNotification(user.name, user.email, 'LOGIN_WELCOME');
    } catch (emailError) {
        console.error('Login notification email failed:', emailError.message);
    }

    res.status(200).json({
      success: true,
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
