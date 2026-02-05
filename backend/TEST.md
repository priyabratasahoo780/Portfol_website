# Test the Contact Form API

## Prerequisites

- Backend server running on port 5000
- MongoDB running and connected

## Test 1: Health Check

curl http://localhost:5000/api/health

## Test 2: Submit Contact Form

curl -X POST http://localhost:5000/api/contact \
 -H "Content-Type: application/json" \
 -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"This is a test message from the contact form!\"}"

## Test 3: View All Contacts (Optional)

curl http://localhost:5000/api/contact

## Expected Response (Success)

{
"success": true,
"message": "Thank you for your message! I will get back to you soon."
}

## What Should Happen

1. ✅ Data saved to MongoDB `portfolio` database
2. ✅ Email sent to your Gmail inbox
3. ✅ Success response returned to frontend

## Troubleshooting

- 500 error: Check `.env` file has correct email credentials
- Connection refused: Make sure backend server is running
- MongoDB error: Ensure MongoDB service is running
