'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader'

type props = {
    children: React.ReactNode
}

function CourseViewLayout({ children }: props) {
    const pathname = usePathname()
    
    const getPageType = () => {
        if (pathname.includes('/notes')) return 'notes'
        if (pathname.includes('/flashcard')) return 'flashcard'
        if (pathname.includes('/quiz')) return 'quiz'
        if (pathname.includes('/qa')) return 'qa'
        return 'course'
    }

    return (
        <div>
            <DashboardHeader pageType={getPageType()} />
            <div className="mx-10 md:mx-36 lg:mx-60 mt-10">
                {children}
            </div>
        </div>
    )
}

export default CourseViewLayout