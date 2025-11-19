# Saad Najar - Portfolio

[![CI/CD Pipeline](https://github.com/Storbiic/stellar-orb-showcase/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Storbiic/stellar-orb-showcase/actions/workflows/ci-cd.yml)

Data Scientist & AI Engineer Portfolio - Showcasing intelligent solutions through Machine Learning, Deep Learning, and cutting-edge AI technologies.

## 🚀 Features

- ✨ Modern glassmorphism UI design
- 🌓 Dark/Light mode toggle
- 🌍 Multi-language support (EN/FR)
- 📧 Contact form with SMTP backend
- 📱 Fully responsive design
- 🎨 Interactive 3D Spline background
- 🔄 Automated CI/CD with GitHub Actions

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite 7
- Tailwind CSS 3
- GSAP animations
- shadcn/ui components

**Backend:**
- Express.js
- Nodemailer (SMTP via Mailgun)
- Node.js 18+

**DevOps:**
- GitHub Actions CI/CD
- Automated testing
- Email notifications
- Daily health checks

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your SMTP credentials

# Run development servers (frontend + backend)
npm run dev:all

# Or run separately:
npm run dev        # Frontend only (http://localhost:8080)
npm run server     # Backend only (http://localhost:3001)
```

## 🧪 Testing

```bash
# Build production bundle
npm run build

# Test production build
npm run preview

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## 🚀 CI/CD & Deployment

The project includes a comprehensive GitHub Actions pipeline that:

✅ Runs linting and type checking  
✅ Tests production builds  
✅ Verifies backend server health  
✅ Performs security audits  
✅ Sends email notifications on success/failure  
✅ Runs daily health checks at 2 AM UTC

### Setup GitHub Actions:

1. Add secrets to your repository (see `.github/SECRETS_SETUP.md`)
2. Push to `main` or `develop` branch
3. GitHub Actions automatically runs tests
4. Receive email notifications for build status

**View workflow status:** https://github.com/Storbiic/stellar-orb-showcase/actions

## 📧 Contact Form Setup

1. **Get Gmail App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Enable 2FA if not already enabled
   - Create app password for "Mail" → "Portfolio"
   - Copy the 16-character password

2. **Update `.env` file:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   RECIPIENT_EMAIL=saadnajar@icloud.com
   ```

3. **Start the servers:**
   ```bash
   npm run dev:all
   ```

4. **Test the form:**
   - Visit http://localhost:8080
   - Navigate to Contact section
   - Submit a test message

For detailed setup instructions, see `SMTP_SETUP.md`

## 🌍 Internationalization

The portfolio supports multiple languages:
- 🇬🇧 English (default)
- 🇫🇷 French

Language switcher is available in the navigation bar. All content including navigation, sections, and contact form is translated.

## 📁 Project Structure

```
stellar-orb-showcase/
├── .github/
│   ├── workflows/
│   │   └── ci-cd.yml          # CI/CD pipeline
│   └── SECRETS_SETUP.md        # GitHub secrets guide
├── server/
│   ├── index.js                # SMTP email server
│   └── README.md               # Backend documentation
├── src/
│   ├── components/             # React components
│   ├── contexts/
│   │   └── LanguageContext.tsx # Translation system
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utilities
├── .env                        # Environment variables (not committed)
├── .env.example                # Environment template
├── SMTP_SETUP.md              # Email setup guide
└── README.md                   # This file
```

## 🔒 Security

- ✅ Environment variables in `.env` (not committed)
- ✅ SMTP credentials stored as GitHub secrets
- ✅ CORS configured for localhost only
- ✅ Input validation on contact form
- ✅ Regular security audits via GitHub Actions

## 📝 License

© 2025 Saad Najar. All rights reserved.

## 🔗 Links

- **Portfolio:** https://github.com/Storbiic/stellar-orb-showcase
- **GitHub:** [@Storbiic](https://github.com/Storbiic)
- **LinkedIn:** [Saad Najar](https://www.linkedin.com/in/saad-najar/)
- **Email:** saadnajar@icloud.com
- **Phone:** +212 656 311 999
- **Location:** Kenitra, Morocco

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to open an issue if you find any bugs or have ideas for improvements.

## 📞 Support

For questions or issues:
1. Check the documentation in `SMTP_SETUP.md` and `.github/SECRETS_SETUP.md`
2. Review workflow logs in the [Actions tab](https://github.com/Storbiic/stellar-orb-showcase/actions)
3. Open an issue on GitHub
4. Contact me directly via email

---

**Built with** ❤️ **by Saad Najar using React, TypeScript, and modern web technologies.**
