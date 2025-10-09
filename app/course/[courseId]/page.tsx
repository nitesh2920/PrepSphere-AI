"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from "axios"
import CourseIntroCard from './_components/CourseIntro'
import StudyMaterialSection from './_components/StudyMaterialSection'
import ChapterList from './_components/ChapterList'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export default function Course() {
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true);
    const { courseId } = useParams()

    useEffect(() => {
        GetCourse()
    }, [])

    const GetCourse = async () => {
        setLoading(true);
        try {
            const result = await axios.get('/api/courses?courseId=' + courseId);
            setCourse(result.data.result)
        } catch (error) {
            console.error("Failed to fetch course:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-6 max-w-6xl">
                    <div className="space-y-8">
                        {/* Course Intro Skeleton */}
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

                        {/* Study Materials Skeleton */}
                        <div className="space-y-6">
                            <Skeleton className="h-8 w-48" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Card key={i}>
                                        <CardContent className="p-6 space-y-4">
                                            <Skeleton className="h-6 w-20 mx-auto" />
                                            <Skeleton className="w-16 h-16 rounded-2xl mx-auto" />
                                            <Skeleton className="h-6 w-3/4 mx-auto" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-10 w-full" />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Chapters Skeleton */}
                        <div className="space-y-6">
                            <Skeleton className="h-8 w-32" />
                            <div className="space-y-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Card key={i}>
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
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                <div className="space-y-8">
                    <CourseIntroCard course={course} />
                    <StudyMaterialSection courseId={courseId as string} course={course} />
                    {course && <ChapterList course={course} />}
                </div>
            </div>
        </div>
    )
}