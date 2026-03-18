import mongoose from 'mongoose';

const testResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject name'],
    trim: true,
  },
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['passed', 'failed'],
    default: 'passed',
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

const TestResult = mongoose.model('TestResult', testResultSchema);
export default TestResult;
