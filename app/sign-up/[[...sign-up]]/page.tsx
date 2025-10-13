'use client'

import { SignUp } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import AuthBackground from '@/app/_components/auth/AuthBackground'

export default function SignUpPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AuthBackground>
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-lg text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-outfit"
          >
            <ArrowLeft size={16} />
            Back to Home
          </motion.button>
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <img 
                src={theme === 'dark' ? '/logo-dark.svg' : '/logo-dark.svg'} 
                alt="PrepSphere AI" 
                className="w-10 h-10" 
              />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-outfit">
                PrepSphere AI
              </h1>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300 font-outfit">
              Join thousands of learners and start your AI-powered study journey today!
            </p>
          </div>

          {/* Clerk SignUp Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <SignUp 
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
              signInUrl="/sign-in"
            />
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-orange-100/80 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Start with 5 Free Credits
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AuthBackground>
  )
}