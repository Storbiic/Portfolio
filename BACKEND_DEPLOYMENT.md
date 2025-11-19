# Backend Deployment Guide

## Problem
Your production website is trying to connect to `http://localhost:3001` which doesn't exist for your users. You need to deploy your backend server to a hosting platform.

## Quick Solution Options

### Option 1: Deploy Backend to Railway (Recommended - Easiest)

1. **Go to Railway:** https://railway.app/
2. **Sign up** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Select `stellar-orb-showcase` repository
5. **Add environment variables:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=saadnajar.portfolio@gmail.com
   SMTP_PASS=gwkhdyqbcyspjobr
   RECIPIENT_EMAIL=saadnajar.portfolio@gmail.com
   PORT=3001
   ```
6. **Add start command** in Railway settings:
   ```
   node server/index.js
   ```
7. **Copy your Railway URL** (e.g., `https://your-app.railway.app`)

### Option 2: Deploy to Render

1. **Go to Render:** https://render.com/
2. **New** → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Root Directory:** leave empty
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
5. **Add Environment Variables** (same as above)
6. **Copy your Render URL**

### Option 3: Deploy to Heroku

1. **Install Heroku CLI:** https://devcenter.heroku.com/articles/heroku-cli
2. **Create app:**
   ```bash
   heroku create stellar-orb-backend
   ```
3. **Set environment variables:**
   ```bash
   heroku config:set SMTP_HOST=smtp.gmail.com
   heroku config:set SMTP_PORT=587
   heroku config:set SMTP_USER=saadnajar.portfolio@gmail.com
   heroku config:set SMTP_PASS=gwkhdyqbcyspjobr
   heroku config:set RECIPIENT_EMAIL=saadnajar.portfolio@gmail.com
   ```
4. **Create Procfile:**
   ```
   web: node server/index.js
   ```
5. **Deploy:**
   ```bash
   git push heroku main
   ```

### Option 4: Vercel Serverless Function (Advanced)

Convert your Express server to Vercel serverless functions. This requires restructuring your code.

## After Deployment

### Update Your Frontend

1. **Get your backend URL** from your hosting platform (e.g., `https://stellar-orb-backend.railway.app`)

2. **Update environment variable** in your build/deployment settings:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

3. **For GitHub Pages deployment**, you can set this in GitHub Actions:
   ```yaml
   env:
     VITE_API_URL: ${{ secrets.BACKEND_URL }}
   ```

4. **Add BACKEND_URL secret** to GitHub:
   - Go to repository Settings → Secrets → Actions
   - Add new secret: `BACKEND_URL` = your deployed backend URL

5. **Rebuild and redeploy** your frontend

## Testing

1. Visit your deployed frontend
2. Try the contact form
3. Check if email arrives at `saadnajar.portfolio@gmail.com`

## Fallback Behavior

Your contact form now has fallback behavior:
- If backend is unavailable, it shows a message
- Offers to open email client as alternative
- Users can still contact you via `mailto:` link

## Current Status

✅ **Development:** Working with `localhost:3001`
⚠️ **Production:** Backend needs deployment

Your frontend will gracefully handle the missing backend and offer email fallback until you deploy the server.

## Quick Start (Railway - 5 minutes)

```bash
# 1. Sign up at railway.app with GitHub
# 2. Create new project from GitHub repo
# 3. Add environment variables
# 4. Copy your Railway URL
# 5. Add BACKEND_URL to GitHub secrets
# 6. Rebuild your frontend
```

That's it! Your contact form will work in production.
