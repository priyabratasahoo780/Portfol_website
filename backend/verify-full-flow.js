import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_URL = `http://localhost:${process.env.PORT || 5000}/api`;

const testFlow = async () => {
  try {
    console.log('--- Starting Backend Verification Flow ---');

    // 1. Signup
    console.log('\n[1] Testing Signup...');
    const signupData = {
      name: 'Verification Bot',
      email: `test-${Date.now()}@example.com`,
      password: 'password123'
    };
    
    const signupRes = await axios.post(`${API_URL}/auth/signup`, signupData);
    console.log('✅ Signup Successful!');
    const token = signupRes.data.token;

    // 2. Login
    console.log('\n[2] Testing Login...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: signupData.email,
      password: signupData.password
    });
    console.log('✅ Login Successful!');

    // 3. Submit Test (Success)
    console.log('\n[3] Testing Test Submission (Passing)...');
    const testRes = await axios.post(`${API_URL}/test/submit`, {
      subject: 'React Mastery',
      score: 8,
      totalQuestions: 10
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Passing Test Submitted!');
    console.log('   Result Status:', testRes.data.data.status);

    // 4. Submit Test (Failure)
    console.log('\n[4] Testing Test Submission (Failing)...');
    const failRes = await axios.post(`${API_URL}/test/submit`, {
      subject: 'Advanced CSS',
      score: 2,
      totalQuestions: 10
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Failing Test Submitted!');
    console.log('   Result Status:', failRes.data.data.status);

    console.log('\n--- Verification Flow Completed Successfully ---');
    console.log('Note: Check server logs to verify email sending triggers.');

  } catch (error) {
    console.error('\n❌ Verification Failed:');
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    } else {
      console.error('   Message:', error.message);
    }
  }
};

testFlow();
