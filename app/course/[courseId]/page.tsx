"use client"
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader'
import axios from "axios"
import CourseIntroCard from './_components/CourseIntro'
import StudyMaterialSection from './_components/StudyMaterialSection'
import ChapterList from './_components/ChapterList'

export default function Course() {

    const [course, setCourse] = useState(null)
    const { courseId } = useParams()
    useEffect(() => {
        GetCourse()
    }, [])

    const GetCourse = async () => {
        const result = await axios.get('/api/courses?courseId=' + courseId);
        setCourse(result.data.result)
        console.log("get course detail", result)
    }
    return (
        <div>
            <DashboardHeader />
            <div className='mx-10 md:mx-36 lg:mx-60 mt-10'>

                <CourseIntroCard course={course} />
                <StudyMaterialSection />
                {course && <ChapterList course={course} />}

            </div>
        </div>
    )
}
