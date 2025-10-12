"use client";

import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Shield, UserCircle, ChevronLeft, ChevronRight, X, Sun, Moon } from "lucide-react";
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { CourseCountContext } from '@/app/_context/CourseCountContext';
import { useGeneration } from '@/app/_context/GenerationContext';
import { useCredits } from '@/app/_context/CreditContext';
import { useThemeTransition } from '@/app/_hooks/useThemeTransition';
import { useTheme } from 'next-themes';
import { Zap, Crown } from 'lucide-react';

interface SideBarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  isCollapsed = false,
  onToggle,
  isMobile = false,
  isOpen = false,
  onClose
}) => {
  const context = useContext(CourseCountContext);
  const totalCourse = context?.totalCourse || 0;
  const { isGenerating } = useGeneration();
  const { credits, isMember } = useCredits();
  const { theme } = useTheme();
  const { toggleTheme, isTransitioning } = useThemeTransition();



  const path = usePathname();

  const MenuList = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard/'
    },
    {
      name: 'Upgrade',
      icon: Shield,
      path: '/dashboard/upgrade'
    },
    {
      name: 'Profile',
      icon: UserCircle,
      path: '/dashboard/profile'
    }
  ];

  const themeButtonRef = React.useRef<HTMLButtonElement>(null);

  const sidebarVariants = {
    expanded: {
      width: 280,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        type: "tween"
      }
    },
    collapsed: {
      width: 80,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        type: "tween"
      }
    }
  };

  const contentVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: 0.15,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    collapsed: {
      opacity: 0,
      x: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const mobileVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        mass: 0.8
      }
    },
    closed: {
      x: -288, // w-72 = 288px
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        mass: 0.8
      }
    }
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={onClose}
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar */}
        <motion.div
          variants={mobileVariants}
          animate={isOpen ? "open" : "closed"}
          initial="closed"
          className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-2xl z-50 flex flex-col"
        >
          {/* Mobile Header */}
          <div className="p-5 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Image src={'/logo-dark.svg'} alt="logo" width={40} height={40} />
                <h2 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white whitespace-nowrap">PrepSphere AI</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <X size={20} />
              </Button>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="flex-1 p-5 overflow-y-auto">
            {isGenerating ? (
              <Button
                disabled={true}
                className="w-full text-white transition-all duration-300 bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60 mb-6"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Generating...
                </div>
              </Button>
            ) : (
              <Link href="/create" className="w-full block mb-6">
                <Button className="w-full text-white transition-all duration-300 bg-orange-600 hover:bg-orange-700">
                  Generate Material +
                </Button>
              </Link>
            )}

            <nav className="space-y-2">
              {MenuList.map((item, index) => {
                const isActive = path === item.path;
                return (
                  <Link href={item.path} key={index} onClick={onClose}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${isActive
                        ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                    >
                      <item.icon size={20} className={isActive ? "text-orange-600 dark:text-orange-400" : ""} />
                      <span className="font-medium">{item.name}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Credits */}
          <div className="p-5 border-t border-gray-200 dark:border-gray-800">
            <div className="bg-slate-100 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">Available Credits</h3>
                <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {credits}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Credits</span>
                </div>
                {isMember && <Crown className="w-4 h-4 text-orange-500" />}
              </div>
              <Progress
                value={isMember ? (credits / 50) * 100 : (credits / 5) * 100}
                className="mb-3 bg-orange-100 dark:bg-orange-900/30 [&>div]:bg-orange-500"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {credits} out of {isMember ? 50 : 5} credits remaining
              </p>
              <Link href="/dashboard/upgrade" onClick={onClose}>
                <Button variant="outline" size="sm" className="w-full text-orange-600 border-orange-200 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-800 dark:hover:bg-orange-900/20">
                  Upgrade to create more
                </Button>
              </Link>

              {/* Theme Toggle */}
              <Button
                ref={themeButtonRef}
                onClick={() => toggleTheme(themeButtonRef)}
                disabled={isTransitioning}
                variant="outline"
                size="sm"
                className="w-full mt-2 flex items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: isTransitioning ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'dark' ? (
                    <Sun size={16} className="text-yellow-500" />
                  ) : (
                    <Moon size={16} className="text-gray-600" />
                  )}
                </motion.div>
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </div>
        </motion.div>
      </>
    );
  }

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      className="h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl relative flex flex-col"
    >
      {/* Desktop Header */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="flex gap-2 items-center"
              >
                <Image src={'/logo-dark.svg'} alt="logo" width={40} height={40} />
                <h2 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white whitespace-nowrap">PrepSphere AI</h2>
              </motion.div>
            )}
          </AnimatePresence>

          {isCollapsed && (
            <div className="flex justify-center w-full">
              <Image src={'/logo.svg'} alt="logo" width={40} height={40} />
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggle}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            <motion.div
              key={isCollapsed ? 'collapsed' : 'expanded'}
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {isCollapsed ? (
                <ChevronRight className="text-gray-600 dark:text-gray-400" size={20} />
              ) : (
                <ChevronLeft className="text-gray-600 dark:text-gray-400" size={20} />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Desktop Create Button */}
      <div className="p-5">
        {isGenerating ? (
          <motion.div
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <Button
              disabled={true}
              className={`w-full transition-all duration-300 ${isCollapsed ? 'px-0' : 'px-4'} bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60 text-white`}
            >
              <motion.span
                key="generating"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                {!isCollapsed && "Generating..."}
              </motion.span>
            </Button>
          </motion.div>
        ) : (
          <Link href="/create" className="block">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <Button
                className={`w-full transition-all duration-300 ${isCollapsed ? 'px-0' : 'px-4'} bg-orange-600 hover:bg-orange-700 text-white`}
              >
                <motion.span
                  key={isCollapsed ? 'collapsed' : 'expanded'}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="flex items-center gap-2"
                >
                  {isCollapsed ? (
                    <span className="text-lg">+</span>
                  ) : (
                    "Generate Material +"
                  )}
                </motion.span>
              </Button>
            </motion.div>
          </Link>
        )}
      </div>

      {/* Desktop Navigation */}
      <nav className="flex-1 px-5">
        <div className="space-y-2">
          {MenuList.map((item, index) => {
            const isActive = path === item.path;
            return (
              <Link href={item.path} key={index}>
                <motion.div
                  whileHover={{
                    x: isCollapsed ? 0 : 4,
                    scale: isCollapsed ? 1.05 : 1
                  }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 relative ${isActive
                    ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                >
                  <item.icon
                    size={20}
                    className={`w-5 h-5 shrink-0 ${isActive ? "text-orange-600 dark:text-orange-400" : "text-gray-700 dark:text-gray-300"}`}
                  />

                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        variants={contentVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="font-medium"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10, scale: 0.8 }}
                      whileHover={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50"
                    >
                      {item.name}
                    </motion.div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Credits Section */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            variants={contentVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="p-5 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="bg-slate-100 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">Available Credits</h3>
                <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {credits}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Credits</span>
                </div>
                {isMember && <Crown className="w-4 h-4 text-orange-500" />}
              </div>
              <Progress
                value={isMember ? (credits / 50) * 100 : (credits / 5) * 100}
                className="mb-3 bg-orange-100 dark:bg-orange-900/30 [&>div]:bg-orange-500"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {credits} out of {isMember ? 50 : 5} credits remaining
              </p>
              <Link href="/dashboard/upgrade">
                <Button variant="outline" size="sm" className="w-full text-orange-600 border-orange-200 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-800 dark:hover:bg-orange-900/20">
                  Upgrade to create more
                </Button>
              </Link>

              {/* Theme Toggle */}
              <Button
                onClick={() => toggleTheme()}
                disabled={isTransitioning}
                variant="outline"
                size="sm"
                className="w-full mt-2 flex items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: isTransitioning ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'dark' ? (
                    <Sun size={16} className="text-yellow-500" />
                  ) : (
                    <Moon size={16} className="text-gray-600" />
                  )}
                </motion.div>
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Credits Indicator */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="p-5 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-2 relative group">
                <span className="text-orange-600 dark:text-orange-400 text-sm font-bold">{credits}</span>
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.8 }}
                  whileHover={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50"
                >
                  {credits} Credits Available
                </motion.div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <div
                  className="bg-orange-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(credits / (isMember ? 50 : 5)) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SideBar;
