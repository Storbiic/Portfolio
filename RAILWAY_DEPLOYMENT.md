# Deploy Backend to Railway (5 Minutes)

Railway is the easiest way to deploy your Node.js backend. It's free for 500 hours/month.

## Step 1: Create Railway Account

1. Go to https://railway.app/
2. Click "Login" → Sign in with GitHub
3. Authorize Railway to access your repositories

## Step 2: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `Storbiic/stellar-orb-showcase`
4. Railway will auto-detect it's a Node.js project

## Step 3: Configure the Service

1. After deployment starts, click on the service
2. Go to **Settings** tab
3. Find **Start Command** and set it to:
   ```
   node server/index.js
   ```
4. Find **Root Directory** and set it to:
   ```
   /
   ```
   (or leave blank - it should use the root by default)

## Step 4: Add Environment Variables

1. Click on **Variables** tab
2. Add these variables (click "New Variable" for each):

```
SMTP_HOST=smtp.mailersend.net
SMTP_PORT=587
SMTP_USER=your-mailersend-smtp-username
SMTP_PASS=your-mailersend-smtp-password
RECIPIENT_EMAIL=saadnajar@icloud.com
PORT=3001
NODE_ENV=production
```

3. Click "Add" after entering each variable

## Step 5: Get Your Backend URL

1. Go to **Settings** tab
2. Scroll to **Domains** section
3. Click "Generate Domain"
4. Copy the URL (will look like: `https://stellar-orb-showcase-production.up.railway.app`)

## Step 6: Update Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Select your `saadnajar` project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-railway-url.railway.app` (paste your Railway URL)
   - **Environment**: Production, Preview, Development (check all)
5. Click "Save"

## Step 7: Redeploy on Vercel

1. Go to **Deployments** tab in Vercel
2. Click the "..." menu on the latest deployment
3. Click "Redeploy"
4. Make sure "Use existing Build Cache" is **unchecked**
5. Click "Redeploy"

## Step 8: Test Your Production Site

1. Visit https://saadnajar.vercel.app
2. Go to the Contact section
3. Fill out the form and submit
4. Check your email at `saadnajar@icloud.com`
5. ✅ Email should arrive!

---

## Alternative: Quick Deploy Button

Railway also supports one-click deploy:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

Just connect your GitHub repo and Railway will auto-configure everything.

---

## Troubleshooting

### "Application failed to respond"
- Check the **Logs** tab in Railway
- Verify Start Command is `node server/index.js`
- Ensure PORT is set to 3001

### "SMTP Authentication Failed"
- Double-check all SMTP_* environment variables
- No extra spaces or quotes in values
- MailerSend credentials should match exactly

### "CORS Error" still appears
- Verify `VITE_API_URL` is set in Vercel
- Redeploy Vercel with cache cleared
- Check backend logs for CORS errors

### Backend won't start
- Go to Railway **Logs** tab
- Look for error messages
- Common issues:
  - Missing environment variables
  - Wrong start command
  - Node version mismatch

---

## Cost

**Railway Free Tier:**
- 500 execution hours per month
- $5 credit included
- Perfect for portfolio backends
- Scales automatically

**If you exceed free tier:**
- ~$5-10/month for a simple backend
- Pay only for what you use

---

## GitHub Secrets Update

After deploying to Railway, update your GitHub repository secrets:

1. Go to https://github.com/Storbiic/stellar-orb-showcase/settings/secrets/actions
2. Add new secret:
   - **Name**: `BACKEND_URL`
   - **Value**: `https://your-railway-url.railway.app`

This will be used for automated testing in CI/CD.

---

## Next Steps

Once deployed:
- ✅ Your contact form will work in production
- ✅ No more localhost errors
- ✅ Professional email notifications
- ✅ Automatic deployments on push to main

Enjoy your fully functional portfolio! 🚀
