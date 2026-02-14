'use client'

import React from 'react'
import { Menu, BookOpen, FileText, Brain, Zap, LayoutDashboard } from 'lucide-react'
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
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-5 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between gap-3 h-[72px]">
        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-3">
          {showMenuButton && (
            <button
              onClick={onMenuClick}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu size={18} className="text-gray-600 dark:text-gray-400" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex-shrink-0">
              <Icon size={20} className="text-orange-600 dark:text-orange-400" />
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight truncate">
                {title}
              </h1>
              {description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight hidden lg:block truncate">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Mobile Title */}
          <div className="flex sm:hidden items-center gap-1.5">
            <div className="p-1 bg-orange-100 dark:bg-orange-900/30 rounded flex-shrink-0">
              <Icon size={14} className="text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-sm font-semibold text-gray-900 dark:text-white leading-none truncate">
              {title}
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <CustomUserButton  />
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
