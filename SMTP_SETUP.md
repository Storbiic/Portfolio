# Portfolio Contact Form - SMTP Setup Guide

## ✅ What's Been Implemented

1. **Removed EmailJS** - Uninstalled the package and removed all dependencies
2. **Created Node.js Backend** - Express server with Nodemailer for SMTP
3. **Updated Contact Component** - Now sends emails via your own SMTP server
4. **Added Translations** - Full internationalization support (EN/FR)
5. **Security** - Environment variables for sensitive credentials

## 🚀 Quick Start

### Step 1: Configure Your Email

Edit the `.env` file in the root directory:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com          # Your email address
SMTP_PASS=your-app-password              # Gmail App Password (see below)
RECIPIENT_EMAIL=saadnajar@icloud.com     # Where to receive messages
PORT=3001
```

### Step 2: Get Gmail App Password (Recommended)

1. Go to https://myaccount.google.com/
2. Enable **2-Step Verification**
3. Visit https://myaccount.google.com/apppasswords
4. Create app password for "Mail" → "Other (Portfolio)"
5. Copy the 16-character password
6. Paste it as `SMTP_PASS` in your `.env` file

### Step 3: Start the Servers

```bash
# Option 1: Start both frontend and backend together
npm run dev:all

# Option 2: Start separately (use 2 terminals)
npm run dev      # Frontend (Terminal 1)
npm run server   # Backend (Terminal 2)
```

### Step 4: Test the Contact Form

1. Open http://localhost:8080
2. Scroll to the Contact section
3. Fill out the form
4. Submit and check your recipient email!

## 📁 Project Structure

```
stellar-orb-showcase/
├── server/
│   ├── index.js          # SMTP email server
│   └── README.md         # Detailed setup guide
├── src/
│   ├── components/
│   │   └── Contact.tsx   # Updated to use SMTP API
│   └── contexts/
│       └── LanguageContext.tsx  # Translation system
├── .env                  # Your credentials (DO NOT COMMIT)
├── .env.example          # Template for others
└── .gitignore            # Updated to exclude .env
```

## 🔒 Security Notes

- ✅ `.env` is in `.gitignore` - won't be committed to Git
- ✅ Use App Passwords, not your main email password
- ✅ CORS configured for localhost only
- ⚠️ **Never share your `.env` file or commit it to GitHub**

## 🌐 Alternative Email Providers

### iCloud Mail
```env
SMTP_HOST=smtp.mail.me.com
SMTP_PORT=587
SMTP_USER=your-apple-id@icloud.com
SMTP_PASS=app-specific-password
```

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### SendGrid (Production Ready)
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

## 🐛 Troubleshooting

### "ECONNREFUSED" or "Connection Error"
- Make sure the backend server is running (`npm run server`)
- Check if port 3001 is available
- Verify SMTP credentials in `.env`

### "Invalid Login" or "Authentication Failed"
- Enable 2FA on Gmail
- Generate a new App Password
- Don't use your regular email password

### Email Not Received
- Check spam/junk folder
- Verify `RECIPIENT_EMAIL` in `.env`
- Check server terminal for error logs

### CORS Errors
- Ensure frontend is on http://localhost:8080
- Backend should be on http://localhost:3001

## 📦 Production Deployment

### Deploy Backend To:
- **Vercel** (Serverless)
- **Heroku** (Container)
- **Railway** (Easy setup)
- **DigitalOcean** (App Platform)

### Update Frontend API URL:
In `src/components/Contact.tsx`, change:
```typescript
const response = await fetch('https://your-backend.com/api/send-email', {
```

### Set Environment Variables:
Add all `.env` variables to your hosting platform's environment settings.

## ✨ Features

- ✅ SMTP email sending (no third-party services)
- ✅ Full control over email template
- ✅ Multilingual support (EN/FR)
- ✅ Beautiful HTML emails
- ✅ Reply-to header set to sender's email
- ✅ Input validation
- ✅ Loading states and error handling
- ✅ Toast notifications

## 📝 Need Help?

Check `server/README.md` for detailed documentation on:
- Email service configurations
- API endpoints
- Security best practices
- Production deployment guides

---

**Ready to test?** Run `npm run dev:all` and visit http://localhost:8080! 🚀
