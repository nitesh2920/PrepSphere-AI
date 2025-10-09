"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from "axios"
import CourseIntroCard from './_components/CourseIntro'
import StudyMaterialSection from './_components/StudyMaterialSection'
import ChapterList from './_components/ChapterList'

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
            <div className="p-5">
                {/* CourseIntroCard Skeleton */}
                <div className="p-5 bg-gray-100 rounded-lg mb-5">
                    <div className="h-8 w-1/3 bg-gray-200 rounded-md animate-pulse mb-4"></div>
                    <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded-md animate-pulse"></div>
                </div>

                {/* StudyMaterialSection Skeleton */}
                <div className='mt-5 mb-5'>
                    <div className="h-6 w-1/4 bg-gray-200 rounded-md animate-pulse mb-3"></div>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                </div>

                {/* ChapterList Skeleton */}
                <div className='mt-5'>
                    <div className="h-6 w-1/4 bg-gray-200 rounded-md animate-pulse mb-3"></div>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-5">
            <div className=' '>
                <CourseIntroCard course={course} />
                <StudyMaterialSection courseId={courseId} course={course}/>
                {course && <ChapterList course={course} />}
            </div>
        </div>
    )
}