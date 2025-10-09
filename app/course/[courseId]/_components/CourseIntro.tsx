import React from 'react'
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Clock, Target } from 'lucide-react'

interface CourseIntroCardProps {
  course: any;
}

function CourseIntroCard({ course }: CourseIntroCardProps) {
  const totalChapters = course?.courseLayout?.chapters?.length || 0;
  const progressPercentage = 10; // You can implement actual progress tracking

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6 sm:p-8">
        <div className='flex flex-col sm:flex-row gap-6 items-start sm:items-center'>
          <div className="flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Image 
                src={'/knowledge.png'} 
                alt={'Study material icon'} 
                width={48} 
                height={48}
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl text-foreground leading-tight'>
                {course?.courseLayout?.course_title}
              </h1>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {course?.courseLayout?.course_summary}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Study Progress</span>
                <span className="text-muted-foreground">{progressPercentage}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">{totalChapters} Chapters</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="font-medium text-foreground">2-3 Hours</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-foreground">Interview Prep</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseIntroCard