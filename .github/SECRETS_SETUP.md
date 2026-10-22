# GitHub Actions Secrets Setup Guide

To enable the CI/CD pipeline with email notifications, you need to configure the following secrets in your GitHub repository.

## How to Add Secrets

1. Go to your GitHub repository: https://github.com/Storbiic/stellar-orb-showcase
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret below

## Required Secrets

### SMTP Configuration

| Secret Name | Value | Description |
|------------|-------|-------------|
| `SMTP_HOST` | `smtp.gmail.com` | Gmail SMTP server |
| `SMTP_PORT` | `587` | SMTP port (587 for TLS) |
| `SMTP_USER` | `saadnajar.portfolio@gmail.com` | Your Gmail address |
| `SMTP_PASS` | `your-gmail-app-password` | Your Gmail App Password |
| `RECIPIENT_EMAIL` | `saadnajar.portfolio@gmail.com` | Email to receive alerts |

## Step-by-Step Instructions

### 1. Add SMTP_HOST
- Name: `SMTP_HOST`
- Secret: `smtp.gmail.com`
- Click "Add secret"

### 2. Add SMTP_PORT
- Name: `SMTP_PORT`
- Secret: `587`
- Click "Add secret"

### 3. Add SMTP_USER
- Name: `SMTP_USER`
- Secret: `saadnajar.portfolio@gmail.com`
- Click "Add secret"

### 4. Add SMTP_PASS
- Name: `SMTP_PASS`
- Secret: `your-gmail-app-password`
- Click "Add secret"

### 5. Add RECIPIENT_EMAIL
- Name: `RECIPIENT_EMAIL`
- Secret: `saadnajar.portfolio@gmail.com`
- Click "Add secret"

## Security Notes

⚠️ **IMPORTANT:**
- Never commit secrets to your repository
- Use App Passwords for Gmail (not your regular password)
- The `.env` file should remain in `.gitignore`
- Secrets are encrypted by GitHub and only available to Actions
- You can update secrets anytime without affecting your workflow files

## Verify Secrets

After adding all secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. You should see 5 repository secrets listed:
   - SMTP_HOST
   - SMTP_PORT
   - SMTP_USER
   - SMTP_PASS
   - RECIPIENT_EMAIL

## Testing the Workflow

After adding secrets, push a commit to trigger the workflow:

```bash
git add .
git commit -m "ci: add GitHub Actions workflow"
git push origin main
```

Or manually trigger the workflow:
1. Go to **Actions** tab
2. Select "CI/CD Pipeline"
3. Click "Run workflow"

## Workflow Features

✅ **Automated Testing:**
- Linting and type checking
- Production build verification
- Backend server health check
- Security audit (npm audit)

✅ **Email Notifications:**
- **Success:** ✅ Green email with build details
- **Failure:** 🚨 Red alert email with error logs and quick links to fix

✅ **Scheduled Checks:**
- Runs daily at 2 AM UTC to catch any issues
- Runs on every push to main/develop
- Runs on pull requests
- Can be triggered manually

## Viewing Workflow Results

Go to: https://github.com/Storbiic/stellar-orb-showcase/actions

You'll see:
- ✅ Green checkmark = All tests passed (you'll receive success email)
- ❌ Red X = Tests failed (you'll receive alert email)
- 🟡 Yellow dot = Workflow is running

## Troubleshooting

### Workflow not running?
- Check that secrets are added correctly
- Verify the workflow file is in `.github/workflows/ci-cd.yml`
- Check Actions tab for any errors

### Not receiving emails?
- Verify SMTP credentials are correct
- Check spam/junk folder
- Test SMTP credentials locally first

### Build failing?
- Click on the failed workflow run
- Check the logs for specific error messages
- You'll receive an email with direct links to fix issues

## Alternative Email Services

If you prefer to use a different email service:

### SendGrid (Production Recommended)
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Outlook/Hotmail
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Custom SMTP Server
```
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

## Support

If you encounter issues:
1. Check the workflow logs in the Actions tab
2. Verify all secrets are correctly configured
3. Test your SMTP credentials locally first
4. Check the email alert for specific error details
