import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios'
import { Button } from '@/components/ui/button'; // Assuming Shadcn Button component
import { RefreshCw } from 'lucide-react'

function MaterialCardItem({ item, studyTypeContent, refreshData, course }) {

  const [loading, setLoading] = useState(false)
  // console.log('item.type',item.type)
  // console.log('studyTypeContent.[item.type]',studyTypeContent?.[item.type])

  const GenerateContent = async () => {
    setLoading(true)
    console.log('course hai', course)
    let chapters = ''
    course?.courseLayout.chapters.forEach((chapter) => {
      chapters += chapter.chapter_title + ', ';
    });

    const result = await axios.post('/api/study-type-content', {
      courseId: course?.courseId,
      type: item.name,
      chapters: chapters
    });
    setLoading(false)
    refreshData(true)
    // console.log('study-type', result)
    // console.log("ch", chapters)
    console.log("studyTypecontent",studyTypeContent)

  }
  return (
    <div className={`border shadow-md rounded-lg 
    p-5 flex flex-col  h-full
    ${studyTypeContent?.[item.type]?.length == null && 'grayscale opacity-50'} 
    `}>

      {/* Status Badge */}
      <div className='  flex flex-col items-center flex-grow text-cneter'>

        {studyTypeContent?.[item.type]?.length == null ? <h2 className='p-1 px-2 bg-gray-500 text-white rounded-full text-[12px] mb-2 '>
          Generate
        </h2> :
          <h2 className='p-1 px-2 bg-green-500 text-white rounded-full text-[12px] mb-2 '>
            Ready
          </h2>}

        <Image
          src={item.icon}
          alt={item.name}
          width={50}
          height={50}
          className='mt-4' // Added margin for spacing
        />

        {/* Material Name */}
        <h2 className='font-medium  mt-3 '>{item.name}</h2>

        {/* Material Description */}
        <p className='text-gray-500 text-sm text-center mt-1'>{item.desc}</p>

      </div>

      {/* Action Button */}
      {studyTypeContent?.[item.type]?.length == null ? <Button className="  mt-3 w-full" onClick={() => GenerateContent()}>
        {loading && <RefreshCw className='animate-spin' />} Generate</Button>
        : <Button className="  mt-3 w-full">View</Button>}
      {/* {console.log('stct', [item.type])} */}
      {  console.log('ya lst hai',studyTypeContent?.[item.type.toLowerCase()])}
      {  console.log('ya lst hai t ya f',studyTypeContent?.[item.type.toLowerCase()]?.content?.length > 0)}
    </div>

  );
}
export default MaterialCardItem;