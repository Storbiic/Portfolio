# 🚂 Railway Backend Deployment - Quick Start

## Step 1: Create Railway Account (1 minute)
1. Go to https://railway.app/
2. Click **"Login with GitHub"**
3. Authorize Railway to access your GitHub

## Step 2: Deploy Backend (3 minutes)

### 2.1 Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose: **`Storbiic/Portfolio`** (or `stellar-orb-showcase`)
4. Railway will start deploying automatically

### 2.2 Configure Root Directory (Important!)
Railway might try to build from the root, but we need it to run the backend:

1. Click on your project
2. Go to **Settings** tab
3. Find **"Root Directory"** (leave as `/` - this is correct)
4. Find **"Start Command"**
5. Set to: `node server/index.js`
6. Click **"Save"**

### 2.3 Add Environment Variables
1. Go to **"Variables"** tab
2. Click **"+ New Variable"** and add these ONE BY ONE:

```
SMTP_HOST=smtp.mailersend.net
SMTP_PORT=587
SMTP_USER=your-mailersend-smtp-username
SMTP_PASS=your-mailersend-smtp-password
RECIPIENT_EMAIL=saadnajar@icloud.com
PORT=3001
NODE_ENV=production
```

3. Click **"Deploy"** or wait for auto-redeploy

### 2.4 Get Your Backend URL
1. Go to **"Settings"** tab
2. Scroll to **"Domains"**
3. Click **"Generate Domain"**
4. Copy the URL (e.g., `https://portfolio-production-xxxx.up.railway.app`)

## Step 3: Update Vercel Environment Variables (2 minutes)

1. Go to https://vercel.com/dashboard
2. Select your **`saadnajar`** project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-railway-url.railway.app` (paste your Railway URL)
   - **Environment**: Select all (Production, Preview, Development)
5. Click **"Save"**

## Step 4: Redeploy Vercel

1. Go to **Deployments** tab
2. Click **"⋯"** (three dots) on latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to finish

## Step 5: Test! 🎉

1. Go to your live site: https://saadnajar.vercel.app
2. Navigate to the Contact section
3. Fill out the form and submit
4. Check your email at `saadnajar@icloud.com`

---

## Troubleshooting

### ❌ "Application failed to respond"
- Check Railway logs for errors
- Verify `node server/index.js` is set as start command
- Make sure all environment variables are added

### ❌ "CORS error" in browser
- Already fixed in code - server allows `https://saadnajar.vercel.app`
- Make sure Railway deployment is successful

### ❌ "Email not received"
- Check Railway logs for email sending errors
- Verify MailerSend credentials are correct
- Check spam folder

### ❌ "Cannot find module 'express'"
Railway auto-installs dependencies from `package.json`. If this fails:
1. Make sure `package.json` includes backend dependencies
2. Check Railway build logs

---

## Railway Free Tier

- ✅ $5 free credit per month
- ✅ Enough for small portfolios with moderate traffic
- ✅ Automatic HTTPS
- ✅ Auto-deploy on git push
- ✅ Easy scaling if needed

## GitHub Actions Update

Don't forget to add Railway URL to your GitHub secrets for CI/CD:
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add secret: `BACKEND_URL` = `https://your-railway-url.railway.app`

---

## Next Steps

Once everything works:
- ✅ Monitor Railway logs for any errors
- ✅ Set up custom domain (optional)
- ✅ Configure Railway alerts
- ✅ Test email delivery regularly

**Questions?** Check Railway docs: https://docs.railway.app
