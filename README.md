# 🧡 PrepSphere AI - Smart Study Companion

<div align="center">
  <img src="public/logo-dark.svg" alt="PrepSphere AI Logo" width="120" height="120">
  
  **AI-Powered Study Material Generator**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
  
  [🚀 Live Demo]() • [🐛 Report Bug](https://github.com/nitesh2920/prepsphere-ai/issues) • [✨ Request Feature](https://github.com/nitesh2920/prepsphere-ai/issues)
</div>

---

## 🌟 **What is PrepSphere AI?**

PrepSphere AI is a  study companion that transforms the way students, professionals to prepare for exams , interviews or to learn any topic. Using advanced AI technology, it generates personalized study materials including comprehensive notes, interactive flashcards, and challenging quizzes tailored to your learning needs.

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

## 🐳 **Docker Deployment**

[see reference here](./DOCKER.md)



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

### **Performance Monitoring**
- Vercel Analytics integration
- Real User Monitoring (RUM)
- Error tracking with Sentry (optional)



## 📈 **Roadmap**

### **Upcoming Features**

- [ ] **Advanced AI Models**: GPT-4 and Claude integration
- [ ] **Collaboration**: Share courses with classmates
- [ ] **Mobile App**: React Native companion app
- [ ] **Offline Mode**: Full offline functionality 
- [ ] **Analytics**: Detailed study analytics and insights
- [ ] **Study Groups**: Collaborative study sessions
---




<div align="center">
  
  **Made with ❤️ by the PrepSphere Team**
  
  [🌐 Website]() • [🐦 Twitter]() • [📧 Email]()
  
  ⭐ **Star this repo if you found it helpful!** ⭐
  
</div>
