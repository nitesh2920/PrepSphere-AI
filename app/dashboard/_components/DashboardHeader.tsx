import React from 'react'
import {UserButton} from '@clerk/nextjs'

const DashboardHeader = () => {
  return (
    <div className='p-5 shadow-md flex justify-end'>
      <UserButton/>
    </div>
  )
}

export default DashboardHeader