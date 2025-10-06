import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming Shadcn Button component
import { RefreshCcw } from 'lucide-react'; // Assuming lucide-react for icons
import { toast } from 'sonner'; // Assuming sonner for toast notifications
import axios from 'axios'; // Assuming axios for API calls

function MaterialCardItem({ item }) {
  return (
    <div className='border shadow-md rounded-lg p-5 flex flex-col  h-full'>
      
      {/* Status Badge */}
      <div className='  flex flex-col items-center flex-grow text-cneter'>

<h2 className='p-1 px-2 bg-green-500 text-white rounded-full text-[12px] mb-2 '>
        Ready
      </h2>
      
      <Image 
        src={item.icon} 
        alt={item.name} 
        width={50} 
        height={50}
        className='mt-4' // Added margin for spacing
      />
      
      {/* Material Name */}
      <h2 className='font-medium mt-3'>{item.name}</h2>
      
      {/* Material Description */}
      <p className='text-gray-500 text-sm text-center mt-1'>{item.desc}</p>

      </div>
      
      {/* Action Button */}
      <Button className="  mt-3 w-full">View</Button>
    </div>
  );
}
export default MaterialCardItem;