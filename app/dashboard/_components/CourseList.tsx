"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import CourseCardItem from './CourseCardItem'
import { Button } from '@/components/ui/button'
import { RefreshCw, BookOpen, Plus, Search } from 'lucide-react'
import { CourseCountContext } from '@/app/_context/CourseCountContext'
import { useGeneration } from '@/app/_context/GenerationContext'

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

function CourseList() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false)
  const context = useContext(CourseCountContext);
  const setTotalCourse = context?.setTotalCourse;
  const { isGenerating, setIsGenerating } = useGeneration();



  const [courseList, setCourseList] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [updatingCourses, setUpdatingCourses] = useState<Set<string>>(new Set())
  const [selectedFilter, setSelectedFilter] = useState('All')

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex)

  useEffect(() => {
    user && GetCourseList(); // Always check status regardless of manual/auto
  }, [user])

  // Polling every 15 seconds when generating - only check generating courses
  useEffect(() => {
    if (!isGenerating || !user || courseList.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      CheckGeneratingCoursesStatus();
    }, 15000); // 15 seconds

    return () => {
      clearInterval(interval);
    };
  }, [isGenerating, user, courseList.length])



  // Filter and search courses
  useEffect(() => {
    let filtered = courseList;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.courseLayout?.course_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.courseLayout?.course_summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.courseType?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(course => course.courseType === selectedFilter);
    }

    setFilteredCourses(filtered);
  }, [courseList, searchQuery, selectedFilter])

  // Function to check status of only generating courses
  const CheckGeneratingCoursesStatus = async () => {
    const generatingCourses = courseList.filter(course => course.status === 'Generating');

    if (generatingCourses.length === 0) {
      return;
    }

    const generatingCourseIds = generatingCourses.map(course => course.courseId);

    // Mark these courses as updating
    setUpdatingCourses(new Set(generatingCourseIds));

    try {
      const result = await axios.post('/api/course-status', {
        courseIds: generatingCourseIds
      });

      const statusUpdates = result.data.result || [];

      // Update only the courses that changed status
      setCourseList(prevCourses => {
        const updatedCourses = prevCourses.map(course => {
          const statusUpdate = statusUpdates.find((update: any) => update.courseId === course.courseId);
          if (statusUpdate && statusUpdate.status !== course.status) {
            return { ...course, status: statusUpdate.status };
          }
          return course;
        });
        return updatedCourses;
      });

      // Update filtered courses as well
      setFilteredCourses(prevFiltered => {
        return prevFiltered.map(course => {
          const statusUpdate = statusUpdates.find((update: any) => update.courseId === course.courseId);
          if (statusUpdate && statusUpdate.status !== course.status) {
            return { ...course, status: statusUpdate.status };
          }
          return course;
        });
      });

      // Check if any courses are still generating
      const stillGenerating = statusUpdates.some((update: any) => update.status === 'Generating');
      if (!stillGenerating) {
        setIsGenerating(false);
      }

    } catch (error) {
      // Silently handle error
    } finally {
      // Clear updating state
      setUpdatingCourses(new Set());
    }
  };

  const GetCourseList = async () => {
    setLoading(true)

    try {
      const result = await axios.post('/api/courses',
        { createdBy: user?.primaryEmailAddress?.emailAddress })
      const courses = result.data.result || [];

      setCourseList(courses)
      setFilteredCourses(courses)
      setTotalCourse?.(courses.length)

      // Check if any course is still generating
      const generatingCourses = courses.filter((course: any) => course.status === 'Generating');
      const hasGeneratingCourse = generatingCourses.length > 0;

      // Update generation state based on course status
      if (hasGeneratingCourse) {
        // If any course is still generating, keep buttons disabled
        setIsGenerating(true);
      } else {
        // If all courses are ready (or no courses), enable buttons
        setIsGenerating(false);
      }
    } catch (error) {
      setCourseList([])
      // On error, enable buttons (don't keep them stuck disabled)
      setIsGenerating(false);
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const LoadingSkeleton = ({ index }: { index: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div className="p-6">
        {/* Header skeleton */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl animate-pulse" />
          <div className="space-y-2">
            <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Title skeleton */}
        <div className="space-y-2 mb-4">
          <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-1/2 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Progress skeleton */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>

        {/* Stats skeleton */}
        <div className="flex justify-between mb-4">
          <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Button skeleton */}
        <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
      </div>
    </motion.div>
  );

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-full flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <BookOpen className="text-gray-600 dark:text-gray-400" size={32} />
      </motion.div>

      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {searchQuery || selectedFilter !== 'All' ? 'No Matching Study Materials' : 'No Study Materials Yet'}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
        {searchQuery || selectedFilter !== 'All'
          ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
          : 'Start your learning journey by creating your first study material. Our AI will help you generate comprehensive content tailored to your needs.'
        }
      </p>

      {!(searchQuery || selectedFilter !== 'All') && (
        <motion.div
          whileHover={{ scale: isGenerating ? 1 : 1.05 }}
          whileTap={{ scale: isGenerating ? 1 : 0.95 }}
        >
          {isGenerating ? (
            <Button
              disabled={true}
              className="bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60 text-white"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Generating Course...
            </Button>
          ) : (
            <Link href="/create">
              <Button>
                <Plus size={16} className="mr-2" />
                Create Your First Course
              </Button>
            </Link>
          )}
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >


      {/* Header Section */}
      <motion.div
        variants={headerVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-10"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white ">
            Your Study Material
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {courseList.length > 0
              ? totalPages > 1
                ? `${paginatedCourses.length} of ${courseList.length} Study Material${courseList.length !== 1 ? 's' : ''} ${searchQuery || selectedFilter !== 'All' ? 'found' : 'available'}`
                : `${filteredCourses.length} of ${courseList.length} Study Material${courseList.length !== 1 ? 's' : ''} ${searchQuery || selectedFilter !== 'All' ? 'found' : 'available'}`
              : 'Ready to start learning?'
            }
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Items per page dropdown */}
          {filteredCourses.length > 3 && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page
                }}
                className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value={3}>3</option>
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
                <option value={filteredCourses.length}>All</option>
              </select>
            </motion.div>
          )}

          {/* Search Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSearch(!showSearch)}
              className="flex items-center gap-2 border-gray-300 dark:border-gray-600"
            >
              <Search size={16} />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </motion.div>

          {/* Filter Dropdown */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <select
              value={selectedFilter}
              onChange={(e) => {
                setSelectedFilter(e.target.value);
                setCurrentPage(1); // Reset to first page when filtering
              }}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="All">All Types</option>
              <option value="Exam">Exam</option>
              <option value="Coding Prep">Coding Prep</option>
              <option value="Job Interview">Job Interview</option>
              <option value="other">Other</option>
            </select>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={() => GetCourseList()}
              disabled={loading}
              className="border-primary text-primary"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Search Input */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search courses, topics, or types..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1); // Reset to first page when clearing search
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Course Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={loading ? 'loading' : 'content'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={index} index={index} />
            ))
          ) : filteredCourses.length > 0 ? (
            // Course cards
            paginatedCourses.map((course, index) => (
              <CourseCardItem
                course={course}
                key={course.courseId}
                index={index}
                isUpdating={updatingCourses.has(course.courseId)}
              />
            ))
          ) : (
            // Empty state
            <EmptyState />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      {filteredCourses.length > 0 && totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          {/* Pagination Info */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredCourses.length)} of {filteredCourses.length} study materials
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Previous</span>
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="px-2 text-gray-400">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 p-0"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              <span className="hidden sm:inline">Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default CourseList