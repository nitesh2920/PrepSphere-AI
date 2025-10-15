'use client'

import React from 'react'
import { Menu, BookOpen, FileText, Brain, Zap, LayoutDashboard } from 'lucide-react'
import { motion } from 'framer-motion'
import CustomUserButton from '@/app/_components/CustomUserButton'

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  pageType?: 'dashboard' | 'course' | 'notes' | 'materials' | 'quiz' | 'flashcard' | 'qa';
  customTitle?: string;
  customDescription?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onMenuClick,
  showMenuButton = false,
  pageType = 'dashboard',
  customTitle,
  customDescription
}) => {
  const getPageContent = () => {
    if (customTitle) {
      return {
        title: customTitle,
        description: customDescription || '',
        icon: LayoutDashboard
      };
    }

    switch (pageType) {
      case 'course':
        return {
          title: 'Course',
          description: 'Explore your course content and track your progress.',
          icon: BookOpen
        };
      case 'notes':
        return {
          title: 'Notes & Materials',
          description: 'Access your study notes and learning materials.',
          icon: FileText
        };
      case 'materials':
        return {
          title: 'Study Materials',
          description: 'Browse and download your course materials.',
          icon: FileText
        };
      case 'quiz':
        return {
          title: 'Quiz',
          description: 'Test your knowledge with interactive quizzes.',
          icon: Brain
        };
      case 'flashcard':
        return {
          title: 'Flashcards',
          description: 'Review key concepts with smart flashcards.',
          icon: Zap
        };
      case 'qa':
        return {
          title: 'Questions & Answers',
          description: 'Explore detailed Q&A sessions for better understanding.',
          icon: Brain
        };
      default:
        return {
          title: 'Dashboard',
          description: 'Welcome back! Here\'s what\'s happening with your courses.',
          icon: LayoutDashboard
        };
    }
  };

  const { title, description, icon: Icon } = getPageContent();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Menu size={20} className="text-gray-600 dark:text-gray-400" />
            </motion.button>
          )}

          <div className="hidden sm:block">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg"
              >
                <Icon size={20} className="text-orange-600 dark:text-orange-400" />
              </motion.div>
              <div>
                <motion.h1
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="text-xl font-semibold text-gray-900 dark:text-white"
                >
                  {title}
                </motion.h1>
                {description && (
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-sm text-gray-500 dark:text-gray-400"
                  >
                    {description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Mobile Title */}
          <div className="block sm:hidden">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg"
              >
                <Icon size={16} className="text-orange-600 dark:text-orange-400" />
              </motion.div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* User Profile */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="flex items-center"
          >
            <CustomUserButton />
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default DashboardHeader