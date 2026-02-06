'use client'

import { SignIn } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import AuthBackground from '@/app/_components/auth/AuthBackground'

export default function SignInPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't return null - render with opacity to prevent CLS
  const visibility = mounted ? 'opacity-100' : 'opacity-0'

  return (
    <AuthBackground>
    <div className={`min-h-screen relative overflow-hidden transition-opacity duration-300 ${visibility}`}>
      {/* Blurred Background */}
      <div className="absolute inset-0 z-0">
        {/* Background gradient matching the landing page */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950/20" />
        
        {/* Animated background elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/20 dark:bg-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-400/20 dark:bg-amber-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30" />
      </div>

      {/* Back Button - Mobile Responsive */}
      <div className="auth-back-button absolute left-3 hidden md:block sm:left-4 md:left-6 z-20">
        <Link href="/">
          <motion.button
            initial={{ opacity: 0.01, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 cursor-pointer sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-lg text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-outfit text-sm sm:text-base"
            style={{ willChange: 'auto' }}
          >
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </motion.button>
        </Link>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0.01, y: 0, scale: 1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md"
          style={{ willChange: 'auto' }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0.01, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-3 mb-4"
              style={{ willChange: 'auto' }}
            >
              <img 
                src="/logo-dark.svg"
                alt="PrepSphere AI" 
                className="w-10 h-10"
                width="40"
                height="40"
                loading="eager"
                decoding="sync"
              />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-outfit">
                PrepSphere AI
              </h1>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300 font-outfit">
              Welcome back! Sign in to continue your learning journey.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0.01, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center"
            style={{ 
              minHeight: '550px',
              willChange: 'auto',
              contentVisibility: 'auto',
              containIntrinsicSize: '0 550px'
            }}
          >
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-2xl",
                  headerTitle: "text-gray-900 dark:text-white font-outfit",
                  headerSubtitle: "text-gray-600 dark:text-gray-300 font-outfit",
                  socialButtonsBlockButton: "bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-outfit",
                  formFieldInput: "bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-outfit",
                  formButtonPrimary: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 font-outfit",
                  footerActionLink: "text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-outfit",
                  identityPreviewText: "text-gray-900 dark:text-white font-outfit",
                  formFieldLabel: "text-gray-700 dark:text-gray-300 font-outfit",
                  dividerLine: "bg-gray-200 dark:bg-gray-700",
                  dividerText: "text-gray-500 dark:text-gray-400 font-outfit",
                  formFieldErrorText: "text-red-500 dark:text-red-400 font-outfit",
                  alertText: "text-gray-700 dark:text-gray-300 font-outfit",
                  formHeaderTitle: "text-gray-900 dark:text-white font-outfit",
                  formHeaderSubtitle: "text-gray-600 dark:text-gray-300 font-outfit"
                },
                layout: {
                  socialButtonsPlacement: "top",
                  showOptionalFields: false
                }
              }}
              signUpUrl="/sign-up"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
    </AuthBackground>
  )
}