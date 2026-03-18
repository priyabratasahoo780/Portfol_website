import TestResult from '../models/TestResult.js';
import { sendEmailNotification } from '../services/emailService.js';

export const submitTest = async (req, res) => {
  try {
    const { subject, score, totalQuestions } = req.body;
    const userId = req.user._id;
    const name = req.user.name;
    const email = req.user.email;

    const percentage = (score / totalQuestions) * 100;
    const status = percentage >= 70 ? 'passed' : 'failed';

    const newResult = await TestResult.create({
      user: userId,
      subject,
      score,
      totalQuestions,
      percentage,
      status,
    });

    // 1. Send Test Finished Email
    try {
      await sendEmailNotification(name, email, 'TEST_FINISHED', {
        subject,
        score,
        totalQuestions,
        percentage: percentage.toFixed(2),
      });
    } catch (error) {
      console.error('Test finished email failed:', error.message);
    }

    // 2. Send Certificate Email if passed
    if (status === 'passed') {
      try {
        await sendEmailNotification(name, email, 'CERTIFICATE', {
          subject,
          percentage: percentage.toFixed(2),
          date: new Date().toLocaleDateString(),
        });
      } catch (error) {
        console.error('Certificate email failed:', error.message);
      }
    }

    res.status(201).json({
      success: true,
      data: newResult,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUserResults = async (req, res) => {
  try {
    const results = await TestResult.find({ user: req.user._id }).sort('-completedAt');
    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
