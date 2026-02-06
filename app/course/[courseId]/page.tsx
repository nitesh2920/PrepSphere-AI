"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from "axios"
import CourseIntroCard from './_components/CourseIntro'
import StudyMaterialSection from './_components/StudyMaterialSection'
import ChapterList from './_components/ChapterList'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LenisProvider from '@/app/_components/providers/LenisProvider'

export default function Course() {
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true);
    const { courseId } = useParams()
    const router = useRouter()

    useEffect(() => {
        GetCourse()
    }, [])

    const GetCourse = async () => {
        setLoading(true);
        try {
            const result = await axios.get('/api/courses?courseId=' + courseId);
            setCourse(result.data.result)
        } catch (error) {
            // Silently handle error
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <motion.div
                className="min-h-screen bg-background"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="container mx-auto px-4 py-6 max-w-6xl">
                    <motion.div
                        className="space-y-8"
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {/* Back Button Skeleton */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                        >
                            <Skeleton className="h-10 w-32" />
                        </motion.div>

                        {/* Course Intro Skeleton */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <Card>
                                <CardContent className="p-6 sm:p-8">
                                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                        <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl" />
                                        <div className="flex-1 space-y-4">
                                            <Skeleton className="h-8 w-3/4" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-5/6" />
                                            <Skeleton className="h-2 w-full mt-6" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Study Materials Skeleton */}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <Skeleton className="h-8 w-48" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                                    >
                                        <Card>
                                            <CardContent className="p-6 space-y-4">
                                                <Skeleton className="h-6 w-20 mx-auto" />
                                                <Skeleton className="w-16 h-16 rounded-2xl mx-auto" />
                                                <Skeleton className="h-6 w-3/4 mx-auto" />
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-10 w-full" />
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Chapters Skeleton */}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <Skeleton className="h-8 w-32" />
                            <div className="space-y-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                                    >
                                        <Card>
                                            <CardContent className="p-6">
                                                <div className="flex items-center gap-6">
                                                    <Skeleton className="w-12 h-12 rounded-xl" />
                                                    <div className="flex-1 space-y-2">
                                                        <Skeleton className="h-6 w-3/4" />
                                                        <Skeleton className="h-4 w-full" />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        )
    }

    return (
        <LenisProvider>
            <AnimatePresence mode="wait">
                <motion.div
                    className="min-h-screen bg-background"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >


                    <div className="container mx-auto px-4 py-6 max-w-6xl">
                        <motion.div
                            className="space-y-8"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            {/* Back to Dashboard Button */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    variant="outline"
                                    onClick={() => router.push('/dashboard')}
                                    className="flex items-center space-x-2 transition-all duration-200 hover:shadow-md"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    <span>Back to Dashboard</span>
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                            >
                                <CourseIntroCard course={course} />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                            >
                                <StudyMaterialSection courseId={courseId as string} course={course} />
                            </motion.div>

                            {course && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                                >
                                    <ChapterList course={course} />
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </LenisProvider>
    )
}