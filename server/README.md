# SMTP Email Server Setup

This portfolio uses a Node.js backend with Nodemailer to handle contact form submissions via SMTP.

## Setup Instructions

### 1. Configure Environment Variables

Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

### 2. Email Service Configuration

#### Option A: Gmail (Recommended for Development)

1. Go to your Google Account: https://myaccount.google.com/
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Portfolio Contact Form"
   - Copy the 16-character password

4. Update your `.env` file:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
RECIPIENT_EMAIL=saadnajar@icloud.com
```

#### Option B: Other Email Providers

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

**Yahoo Mail:**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

**Custom SMTP Server:**
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

### 3. Run the Application

#### Development (Both servers):
```bash
npm run dev:all
```

This will start:
- Frontend: http://localhost:8080
- Backend: http://localhost:3001

#### Separate servers:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

### 4. Testing

1. Visit http://localhost:8080
2. Navigate to the Contact section
3. Fill out the form and submit
4. Check your configured recipient email for the message

## Production Deployment

### Backend Deployment

You can deploy the backend to:

1. **Vercel** (Serverless Functions)
2. **Heroku** (Node.js app)
3. **Railway** (Container deployment)
4. **DigitalOcean App Platform**

### Environment Variables in Production

Make sure to set all environment variables in your hosting platform:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `RECIPIENT_EMAIL`

### Frontend Configuration

Update the API endpoint in `src/components/Contact.tsx`:
```typescript
const response = await fetch('https://your-backend-url.com/api/send-email', {
  // ... rest of the configuration
});
```

## Security Notes

- ⚠️ **Never commit your `.env` file to Git**
- Use app-specific passwords, not your main email password
- Consider rate limiting for production deployments
- Use CORS configuration to restrict API access to your domain only

## Troubleshooting

### "Invalid login" or "Authentication failed"
- Ensure 2FA is enabled on Gmail
- Regenerate app password
- Check SMTP credentials are correct

### "ECONNREFUSED" or "Connection timeout"
- Check if firewall is blocking port 587
- Try port 465 with `secure: true` in transporter config
- Verify SMTP server address

### Email not received
- Check spam/junk folder
- Verify RECIPIENT_EMAIL is correct
- Check server logs for errors

## API Endpoints

### GET /api/health
Health check endpoint
- Returns: `{ status: 'ok', message: 'Email server is running' }`

### POST /api/send-email
Send contact form email
- Body: `{ name: string, email: string, message: string }`
- Returns: `{ success: boolean, message: string }`
