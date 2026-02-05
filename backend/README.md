# Backend Setup Instructions

## 1. Install MongoDB

### Option A: Local MongoDB (Recommended for Development)

1. Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB service
3. MongoDB will run on `mongodb://localhost:27017`

### Option B: MongoDB Atlas (Cloud Database)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Get connection string and update `MONGODB_URI` in `backend/.env`

## 2. Configure Email

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Generate an app password for "Mail"
3. Update `backend/.env` with:
   - `EMAIL_USER`: your Gmail address
   - `EMAIL_PASS`: the generated app password

## 3. Start Backend Server

```bash
cd backend
npm run dev
```

Server will run on `http://localhost:5000`

## 4. Test the API

### Health Check

```bash
curl http://localhost:5000/api/health
```

### Test Contact Form

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello!"}'
```

## 5. Frontend Connection

The frontend (React) will connect to the backend automatically at `http://localhost:5000/api/contact`

## Troubleshooting

- **MongoDB error**: Make sure MongoDB is running
- **Email error**: Check Gmail app password
- **CORS error**: Backend has CORS enabled for all origins
- **Port conflict**: Change `PORT` in `backend/.env`
