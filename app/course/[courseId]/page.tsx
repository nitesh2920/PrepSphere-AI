"use client"
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'
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
           
            <div className=' '>

                <CourseIntroCard course={course} />
                <StudyMaterialSection courseId={courseId} course={course}/>
                {course && <ChapterList course={course} />}

            </div>
        </div>
    )
}
