# Mailgun Setup Guide

## Step 1: Create Mailgun Account

1. Go to https://signup.mailgun.com/new/signup
2. Sign up with your email (use `saadnajar@icloud.com` or any email)
3. Verify your email address
4. Complete the setup wizard

## Step 2: Get SMTP Credentials

1. After login, go to **Sending** → **Overview** → **SMTP**
2. Or directly to **Domain settings** → **SMTP credentials**
3. You'll see:
   - **SMTP Hostname**: `smtp.mailgun.org`
   - **Port**: `587` (or `465` for SSL)
   - **Username**: Something like `postmaster@sandboxXXXXXXXXXXXXXXXXXXXXXXXX.mailgun.org`
   - **Password**: Click "Reset Password" to generate a new one

## Step 3: Update Your .env File

Replace the current values in your `.env` file:

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@sandboxXXXXXXXXXXXXXXXXXXXXXXXX.mailgun.org
SMTP_PASS=YOUR_MAILGUN_PASSWORD_HERE
RECIPIENT_EMAIL=saadnajar@icloud.com
```

## Step 4: Add Authorized Recipients (Sandbox Mode)

**Important**: Mailgun sandbox domains can only send to authorized recipients.

1. Go to **Sending** → **Domain settings** → **Authorized Recipients**
2. Add your email: `saadnajar@icloud.com`
3. Check your email and click the verification link

## Step 5: Test the Setup

1. Stop the current server (if running): `Ctrl+C`
2. Start the server again: `npm run server`
3. Test the contact form on your website
4. Check your inbox at `saadnajar@icloud.com`

## Step 6: Upgrade for Production (Optional)

For production use with custom domain:

1. Go to **Sending** → **Domains** → **Add New Domain**
2. Add your domain (e.g., `portfolio.saadnajar.com`)
3. Add the required DNS records to your domain provider
4. Verify domain ownership
5. Update `.env` with new domain credentials

## Mailgun Free Tier Limits

- **5,000 emails per month** (first 3 months)
- **100 emails per day**
- Sandbox domain only sends to authorized recipients
- Add custom domain for unrestricted sending

## Troubleshooting

### "Sandbox subdomains can only send to authorized recipients"
- Add recipient email in Mailgun dashboard
- Verify the email address

### "Authentication failed"
- Double-check username and password
- Make sure there are no extra spaces
- Try resetting the password in Mailgun

### Still not working?
- Check server logs: `npm run server`
- Enable debug mode (already enabled in code)
- Contact Mailgun support

## GitHub Secrets (for CI/CD)

When deploying, add these secrets to your GitHub repository:

```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-sandbox.mailgun.org
SMTP_PASS=your-mailgun-password
RECIPIENT_EMAIL=saadnajar@icloud.com
```

## Production Deployment

For Railway/Render/Heroku, add these environment variables in their dashboard with your Mailgun credentials.
