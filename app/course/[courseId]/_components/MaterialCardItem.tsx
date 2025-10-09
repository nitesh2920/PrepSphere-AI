import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios'
import { Button } from '@/components/ui/button'; // Assuming Shadcn Button component
import { RefreshCw } from 'lucide-react'
import { toast } from 'sonner';

function MaterialCardItem({ item, studyTypeContent, refreshData, course }) {

  const [loading, setLoading] = useState(false)
  // console.log('item.type',item.type)
  // console.log('studyTypeContent.[item.type]',studyTypeContent?.[item.type])
  const isReady = Array.isArray(studyTypeContent?.[item.type]) && studyTypeContent?.[item.type]?.length > 0;


  const GenerateContent = async () => {
    toast('Generating Content')
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
    toast('Your content ready to view')
    // console.log('study-type', result)
    // console.log("ch", chapters)
    // console.log("studyTypecontent",studyTypeContent)

  }
  return (
    <Link  href={'/course/'+course?.courseId+item.path}>
    <div className={`border shadow-md rounded-lg 
    p-5 flex flex-col  h-full
    ${!isReady && 'grayscale opacity-50'} 
    `}>

      {/* Status Badge */}
      <div className='  flex flex-col items-center flex-grow text-cneter'>

        {!isReady ? <h2 className='p-1 px-2 bg-gray-500 text-white rounded-full text-[12px] mb-2 '>
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

      
      {!isReady ? <Button className="  mt-3 w-full" onClick={() => GenerateContent()}>
        {loading && <RefreshCw className='animate-spin' />} Generate</Button>
        : <Button className="  mt-3 w-full">View</Button>}
      {/* {console.log('stct', [item.type])} */}
      {/* {  console.log('ya lst hai',studyTypeContent?.[item.type.toLowerCase()])} */}
      {/* { console.log('item.type lst mai',item.type)} */}
      {/* {  console.log('ya lst hai t ya f',studyTypeContent?.[item.type.toLowerCase()]?.length == 0)} */}
    </div>
     </Link> 

  );
}
export default MaterialCardItem;