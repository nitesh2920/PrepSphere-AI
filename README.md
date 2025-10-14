# 🧡 PrepSphere AI - Smart Study Companions

<div align="center">
  <img src="public/logo-dark.svg" alt="PrepSphere AI Logo" width="120" height="120">
  
  **AI-Powered Study Material Generator for Academic Excellence**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
  
  [🚀 Live Demo](https://prepsphere.ai) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/yourusername/prepsphere-ai/issues) • [✨ Request Feature](https://github.com/yourusername/prepsphere-ai/issues)
</div>

---

## 🌟 **What is PrepSphere AI?**

PrepSphere AI is a revolutionary study companion that transforms the way students prepare for exams and interviews. Using advanced AI technology, it generates personalized study materials including comprehensive notes, interactive flashcards, and challenging quizzes tailored to your learning needs.

### ✨ **Key Features**

🤖 **AI-Powered Content Generation**
- Generate comprehensive study notes from any topic
- Create interactive flashcards for active recall
- Build challenging quizzes with detailed explanations
- Personalized content based on difficulty level

💳 **Smart Credit System**
- **Basic Plan**: 5 free credits monthly
- **Pro Plan**: 50 credits for ₹199/month
- 1 credit = 1 complete course package (notes + flashcards + quiz)

🎨 **Beautiful User Experience**
- Modern, responsive design with dark/light mode
- Orange-themed UI with smooth animations
- Mobile-first approach with PWA support
- Intuitive navigation and user-friendly interface



📱 **Progressive Web App**
- Install on any device like a native app
- Offline functionality for uninterrupted studying
- Push notifications for study reminders

📄 **Export Capabilities**
- Download notes as PDF files
- Print-friendly formatting
- Organized content structure

---

## 🚀 **Quick Start**

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/prepsphere-ai.git
   cd prepsphere-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Database
   DATABASE_URL=your_neon_database_url
   
   # Google AI
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   
   # Stripe Payments
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=your_stripe_price_id
   
   # Inngest
   INNGEST_EVENT_KEY=your_inngest_event_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ **Tech Stack**

### **Frontend**
- **Next.js 15.5.3** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives

### **Backend & Database**
- **Next.js API Routes** - Serverless API endpoints
- **Neon Database** - Serverless PostgreSQL
- **Drizzle ORM** - Type-safe database toolkit
- **Inngest** - Background job processing

### **AI & Services**
- **Google AI (Gemini)** - Content generation
- **Clerk** - Authentication and user management
- **Stripe** - Payment processing
- **Vercel** - Deployment and hosting

### **Additional Features**
- **PWA Support** - Service worker and manifest
- **Real-time Updates** - Smart polling system
- **Theme System** - Dark/light mode with smooth transitions

---

## 📁 **Project Structure**

```
prepsphere-ai/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 _components/              # Reusable components

│   │   └── 📁 landing/              # Landing page sections
│   ├── 📁 _context/                 # React context providers
│   ├── 📁 _hooks/                   # Custom React hooks
│   ├── 📁 api/                      # API routes
│   ├── 📁 course/                   # Course-related pages
│   ├── 📁 dashboard/                # Dashboard and user pages
│   └── 📁 create/                   # Course creation flow
├── 📁 components/                   # UI components
├── 📁 configs/                      # Configuration files
├── 📁 inngest/                      # Background job functions
├── 📁 public/                       # Static assets
├── 📄 Dockerfile                    # Docker configuration
├── 📄 docker-compose.yml           # Docker Compose setup
└── 📄 README.md                     # This file
```

---

## 🎯 **Core Features Deep Dive**

### **1. AI Content Generation**
- **Smart Prompting**: Context-aware AI prompts for better content quality
- **Multiple Formats**: Notes, flashcards, and quizzes from single input
- **Difficulty Levels**: Easy, Medium, Hard content adaptation
- **Topic Flexibility**: Works with any academic subject

### **2. Credit Management System**
- **Transparent Pricing**: Clear credit-based pricing model
- **Usage Tracking**: Real-time credit balance monitoring
- **Auto-renewal**: Monthly credit refresh for Pro users
- **Upgrade Flow**: Seamless Stripe integration for payments

### **3. Study Materials**
- **Rich Notes**: HTML-formatted comprehensive study notes
- **Interactive Flashcards**: Flip-card interface with spaced repetition
- **Smart Quizzes**: Multiple-choice questions with explanations
- **Progress Tracking**: Chapter-wise completion monitoring

### **4. User Experience**
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Theme Support**: Dark and light modes with smooth transitions
- **Accessibility**: WCAG compliant with keyboard navigation
- **Performance**: Optimized loading with smart caching

---

## 🐳 **Docker Deployment**

### **Quick Docker Setup**

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Or use the build script**
   ```bash
   chmod +x scripts/docker-build.sh
   ./scripts/docker-build.sh
   ```

### **Production Deployment**
```bash
# Build production image
docker build -t prepsphere-ai .

# Run container
docker run -p 3000:3000 prepsphere-ai
```

---

## 🔧 **Configuration**

### **Environment Variables**

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key for authentication | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ |
| `DATABASE_URL` | Neon PostgreSQL connection string | ✅ |
| `GOOGLE_AI_API_KEY` | Google AI API key for content generation | ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key for payments | ✅ |
| `NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID` | Stripe price ID for Pro plan | ✅ |
| `INNGEST_EVENT_KEY` | Inngest event key | ✅ |
| `INNGEST_SIGNING_KEY` | Inngest signing key | ✅ |

### **Database Setup**

1. Create a Neon database account
2. Create a new database project
3. Copy the connection string to `DATABASE_URL`
4. Run database migrations:
   ```bash
   npm run db:push
   ```

---

## 🚀 **Deployment**

### **Vercel (Recommended)**

1. **Connect your repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/prepsphere-ai)

### **Other Platforms**

- **Netlify**: Full Next.js support with edge functions
- **Railway**: Simple deployment with database included
- **DigitalOcean**: App Platform with container support
- **AWS**: Amplify or EC2 with Docker

---

## 🤝 **Contributing**

We welcome contributions! Here's how you can help:

### **Development Setup**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run type-check
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### **Contribution Guidelines**

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass before submitting PR

---

## 📊 **Performance & Analytics**

### **Core Web Vitals**
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### **Bundle Analysis**
```bash
npm run analyze
```

### **Performance Monitoring**
- Vercel Analytics integration
- Real User Monitoring (RUM)
- Error tracking with Sentry (optional)

---

## 🔒 **Security**

### **Security Features**
- **Authentication**: Secure Clerk integration
- **Data Protection**: Encrypted database connections
- **API Security**: Rate limiting and input validation
- **HTTPS**: SSL/TLS encryption in production
- **Environment Variables**: Secure secret management

### **Security Best Practices**
- Regular dependency updates
- Security headers configuration
- Input sanitization
- SQL injection prevention with Drizzle ORM

---

## 📈 **Roadmap**

### **Upcoming Features**

- [ ] **Advanced AI Models**: GPT-4 and Claude integration
- [ ] **Collaboration**: Share courses with classmates
- [ ] **Mobile App**: React Native companion app
- [ ] **Offline Mode**: Full offline functionality
- [ ] **Analytics**: Detailed study analytics and insights
- [ ] **Integrations**: Google Classroom, Canvas, Moodle
- [ ] **Voice Notes**: Audio-to-text note generation
- [ ] **Study Groups**: Collaborative study sessions

### **Version History**

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added PWA support and enhanced features
- **v1.2.0** - Enhanced UI and user experience
- **v1.3.0** - Docker support and performance improvements

---

## 🆘 **Support & Help**

### **Getting Help**

- 📖 **Documentation**: Check our [docs](https://docs.prepsphere.ai)
- 💬 **Discord**: Join our [community](https://discord.gg/prepsphere)
- 📧 **Email**: support@prepsphere.ai
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/prepsphere-ai/issues)

### **FAQ**

**Q: How many courses can I create with one credit?**
A: One credit generates a complete course package including notes, flashcards, and quiz.

**Q: Can I use PrepSphere AI offline?**
A: Yes! Install the PWA for offline access to your downloaded content.

**Q: Is my data secure?**
A: Absolutely. We use enterprise-grade security with encrypted databases and secure authentication.

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Google AI** for powerful content generation
- **Vercel** for seamless deployment platform
- **Clerk** for robust authentication system
- **Neon** for serverless PostgreSQL database
- **Stripe** for secure payment processing
- **Open Source Community** for amazing tools and libraries

---

<div align="center">
  
  **Made with ❤️ by the PrepSphere Team**
  
  [🌐 Website](https://prepsphere.ai) • [🐦 Twitter](https://twitter.com/prepsphere) • [📧 Email](mailto:hello@prepsphere.ai)
  
  ⭐ **Star this repo if you found it helpful!** ⭐
  
</div>
