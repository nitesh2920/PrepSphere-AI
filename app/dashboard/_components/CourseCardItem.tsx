import React from 'react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import { Button } from "@/components/ui/button"
import { RefreshCw } from 'lucide-react'
import Link from 'next/link'
export default function CourseCardItem({ course }) {
  return (
    <div className='p-4 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer'>
      <div>
        <div className='flex justify-between items-center'>
          <Image src={'/knowledge.png'} alt={'other'}
            width={50} height={50} />
          <h2 className='text-[10px] p-1 px-2 rounded-full bg-gray-200 text-gray-600 font-medium'>
            20 Dec 2024
          </h2>
        </div>
        <h2 className='mt-3 font-medium text-lg'>{course?.courseLayout?.course_title}</h2>

        <p className='text-sm line-clamp-2 text-gray-500 mt-2'>
          {course?.courseLayout?.course_summary}
        </p>
      </div>

      <div className='mt-3'>
        <Progress value={10} />
      </div>
      <div className='mt-3 flex justify-end'>
        {course?.status === 'Generating' ? 
        <h2 className='text-sm rounded-full flex gap-2 items-center p-1 px-2 bg-gray-200 text-gray-600 font-medium'>
          <RefreshCw className='w-4 h-4 animate-spin' />
          Generating</h2> : 
          <Link href={`/course/${course?.courseId}`}>
          <Button >View</Button>
          </Link>
          }

      </div>
    </div>
  )
}
