import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming Shadcn Button component


function MaterialCardItem({ item, studyTypeContent }) {
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
     {studyTypeContent?.[item.type]?.length == null ? <Button className="  mt-3 w-full">Generate</Button>
     : <Button className="  mt-3 w-full">View</Button> }
    </div>
  );
}
export default MaterialCardItem;