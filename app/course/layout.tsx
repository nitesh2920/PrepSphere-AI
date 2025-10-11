import React from 'react'
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader'

type props={
    children: React.ReactNode
}

function CourseViewLayout({ children }:props) {
    return (
        <div>
            <DashboardHeader />
            <div className="mx-10 md:mx-36 lg:mx-60 mt-10">

            {children}
            </div>
        </div>
    )
}

export default CourseViewLayout