import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import { Button } from "@/components/ui/button"
import { RefreshCw, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useProgress } from '@/app/_context/ProgressContext'

interface Course {
  courseId: string;
  courseType?: string;
  courseLayout?: {
    course_title: string;
    course_summary: string;
    difficulty_level?: string;
  };
  status: string;
  createdAt: string;
}

interface CourseCardItemProps {
  course: Course;
  index?: number;
  isUpdating?: boolean;
}

interface CourseCardItemProps {
  course: Course;
  index?: number;
}

export default function CourseCardItem({ course, index = 0, isUpdating = false }: CourseCardItemProps) {
  const { user } = useUser();
  const { refreshTrigger } = useProgress();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [progressDetails, setProgressDetails] = React.useState<any>(null);
  const summary = course?.courseLayout?.course_summary || 'No description available';
  const isLongSummary = summary.length > 150; // Show "View More" if summary is longer than 150 characters

  // Fetch course progress
  React.useEffect(() => {
    const fetchProgress = async () => {
      if (course?.courseId && course?.status === 'Ready') {
        try {
          const userEmail = user?.primaryEmailAddress?.emailAddress;
          if (!userEmail) return;
          
          const response = await fetch('/api/user-progress', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({ 
              action: 'get_progress',
              userId: userEmail,
              courseId: course.courseId,
              timestamp: Date.now()
            })
          });
          const data = await response.json();
          if (data.overall?.percentage !== undefined) {
            setProgress(data.overall.percentage);
            setProgressDetails(data.progress);
          }
        } catch (error) {
          // Silently handle error, keep default progress
        }
      }
    };

    fetchProgress();
  }, [course?.courseId, course?.status, user, refreshTrigger]);
  const getCourseImage = (courseType?: string) => {
    switch (courseType) {
      case 'Exam':
        return '/exam.png';
      case 'Coding Prep':
        return '/code.png';
      case 'Job Interview':
        return '/job.png';
      case 'other':
        return '/knowledge.png';
      default:
        return '/knowledge.png';
    }
  };

  const getDifficultyColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative h-full"
    >
      <motion.div
        variants={hoverVariants}
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full min-h-[400px] flex flex-col"
      >
        {/* Header with Icon and Date */}
        <div className="p-6 pb-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <Image
                src={getCourseImage(course.courseType)}
                alt={course.courseType || 'other'}
                width={50}
                height={50}
                className="rounded-lg shadow-lg"
              />
            </motion.div>

            <div className="flex flex-col items-end gap-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
              >
                <Calendar size={12} />
                {new Date(course.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </motion.div>

              <div className="flex flex-col gap-2">
                {course?.courseType && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-xs px-2 py-1 rounded-full font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 capitalize"
                  >
                    {course.courseType}
                  </motion.span>
                )}
                {course?.courseLayout?.difficulty_level && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`text-xs px-2 py-1 rounded-full text-center font-medium ${getDifficultyColor(course.courseLayout.difficulty_level)}`}
                  >
                    {course.courseLayout.difficulty_level}
                  </motion.span>
                )}
              </div>
            </div>
          </div>

          {/* Course Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200"
          >
            {course?.courseLayout?.course_title || 'Untitled Course'}
          </motion.h3>

          {/* Course Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="mb-4 flex-1 flex flex-col"
          >
            <motion.div
              layout
              className="overflow-hidden"
            >
              <motion.p
                layout
                animate={{
                  opacity: 1,
                  transition: { duration: 0.4, ease: "easeInOut" }
                }}
                className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-all duration-500 ease-in-out ${!isExpanded && isLongSummary ? 'line-clamp-3' : ''}`}
              >
                {summary}
              </motion.p>
            </motion.div>

            {isLongSummary && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 font-medium mt-2 self-start transition-colors duration-300 flex items-center gap-1"
              >
                <span>{isExpanded ? 'View Less' : 'View More'}</span>
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="inline-block"
                >
                  ↓
                </motion.span>
              </motion.button>
            )}
          </motion.div>

          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="mt-auto"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Progress
              </span>
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                {progress}%
              </span>
            </div>
            <Progress
              value={progress}
              className="bg-orange-100 dark:bg-orange-900/30 [&>div]:bg-orange-500 dark:[&>div]:bg-orange-400"
            />
            {progressDetails && (
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span className={progressDetails.notes?.percentage > 0 ? 'text-green-600 dark:text-green-400' : ''}>
                  Notes {progressDetails.notes?.percentage > 0 ? `${progressDetails.notes.percentage}%` : '○'}
                </span>
                <span className={progressDetails.flashcards?.percentage > 0 ? 'text-green-600 dark:text-green-400' : ''}>
                  Cards {progressDetails.flashcards?.percentage > 0 ? `${progressDetails.flashcards.percentage}%` : '○'}
                </span>
                <span className={progressDetails.quiz?.percentage > 0 ? 'text-green-600 dark:text-green-400' : ''}>
                  Quiz {progressDetails.quiz?.percentage > 0 ? `${progressDetails.quiz.percentage}%` : '○'}
                </span>
                <span className={progressDetails.qa?.percentage > 0 ? 'text-green-600 dark:text-green-400' : ''}>
                  Q&A {progressDetails.qa?.percentage > 0 ? `${progressDetails.qa.percentage}%` : '○'}
                </span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + index * 0.1 }}
          className="px-6 pb-6"
        >
          {course?.status === 'Generating' ? (
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center justify-center gap-2 p-2 px-3 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-medium"
            >
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating</span>
            </motion.div>
          ) : (
            <Link href={`/course/${course?.courseId}`} className="block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full">View</Button>
              </motion.div>
            </Link>
          )}
        </motion.div>

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-orange-600/10 to-transparent pointer-events-none rounded-2xl"
        />

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-2xl" />

        {/* Loading Overlay */}
        <AnimatePresence>
          {isUpdating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10"
            >
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"
                />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Updating status...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
