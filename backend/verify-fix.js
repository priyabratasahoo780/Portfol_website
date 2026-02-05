
import fetch from 'node-fetch';

async function testSubmit() {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Setup',
        email: 'test@example.com',
        message: 'This is a test message to verify the fix.'
      })
    });

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testSubmit();
