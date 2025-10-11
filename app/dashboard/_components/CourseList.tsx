"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useContext, useEffect, useState} from 'react'
import CourseCardItem from './CourseCardItem'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { CourseCountContext } from '@/app/_context/CourseCountContext'

function CourseList() {

  const { user } = useUser();

const [loading,setLoading]=useState(false)
const {totalCourse,setTotalCourse}=useContext(CourseCountContext)
  const [courseList,setCourseList]=useState([])   
  useEffect(() => {
user&& GetCourseList();
  },[user])

  const GetCourseList = async () => {
    setLoading(true)
    const result = await axios.post('/api/courses',
      { createdBy: user?.primaryEmailAddress?.emailAddress })
    console.log("res",result);
    setCourseList(result.data.result)
    setLoading(false)
    setTotalCourse(result.data.result?.length)
  }

  return (
    <div>
        <h2 className='mt-2 text-2xl font-bold flex justify-between items-center'>Your Study Material
          <Button variant={'outline'} className='border-primary text-primary' onClick={GetCourseList}><RefreshCw/></Button>
        </h2>

        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
          {loading == false?  courseList?.map((course,index)=>(
                <CourseCardItem course={course} key={index}/>
            ))
            :[1,2,3,4,5].map((item,index)=>(
              <div className='h-56 w-full bg-slate-200 rounded-lg animate-pulse' key={index}></div>
              
            ))

            
            } 
           
        </div>

    </div>
  )
}

export default CourseList