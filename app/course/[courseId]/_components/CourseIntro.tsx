import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Target, RefreshCw } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useProgress } from '@/app/_context/ProgressContext'

interface CourseIntroCardProps {
  course: any;
}
  const getCourseImage = (courseType?: string) => {
    switch (courseType) {
      case 'Exam':
        return '/exam.png';
      case 'Coding Prep':
        return '/code.png';
      case 'Job Interview':
        return '/job.png';
      case 'other':
        return '/knowledge.png';
      default:
        return '/knowledge.png';
    }
  };

function CourseIntroCard({ course }: CourseIntroCardProps) {
  const { user } = useUser();
  const { refreshTrigger } = useProgress();
  const [progressData, setProgressData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const totalChapters = course?.courseLayout?.chapters?.length || 0;

  const fetchProgress = async (showRefreshing = false) => {
    if (user?.primaryEmailAddress?.emailAddress && course?.courseId) {
      if (showRefreshing) setIsRefreshing(true);
      try {
        const response = await fetch('/api/user-progress', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache' // Prevent caching
          },
          body: JSON.stringify({
            action: 'get_progress',
            userId: user.primaryEmailAddress.emailAddress,
            courseId: course.courseId,
            timestamp: Date.now() // Cache busting
          })
        });
        const data = await response.json();
        setProgressData(data);
      } catch (error) {
        // Silently handle error
      } finally {
        setIsLoading(false);
        if (showRefreshing) setIsRefreshing(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [user, course?.courseId, refreshTrigger]);

  const handleManualRefresh = () => {
    fetchProgress(true);
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6 sm:p-8">
        <div className='flex flex-col sm:flex-row gap-6 items-start sm:items-center'>
          <div className="flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Image
                src={getCourseImage(course.courseType)}
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
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {progressData?.overall?.percentage || 0}% Complete
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleManualRefresh}
                    disabled={isRefreshing}
                    className="h-6 w-6 p-0"
                  >
                    <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>
              <Progress value={progressData?.overall?.percentage || 0} className="h-2" />
              
              {progressData?.progress && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                  <div className="text-center">
                    <div className="font-medium text-foreground">Notes</div>
                    <div className="text-muted-foreground">
                      {progressData.progress.notes?.completed || 0}/{progressData.progress.notes?.total || 0}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-foreground">Cards</div>
                    <div className="text-muted-foreground">
                      {progressData.progress.flashcards?.completed || 0}/{progressData.progress.flashcards?.total || 0}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-foreground">Quiz</div>
                    <div className="text-muted-foreground">
                      {progressData.progress.quiz?.completed || 0}/{progressData.progress.quiz?.total || 0}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-foreground">Q&A</div>
                    <div className="text-muted-foreground">
                      {progressData.progress.qa?.completed || 0}/{progressData.progress.qa?.total || 0}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">{totalChapters} Chapters</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-orange-600" />
                <span className="font-medium text-foreground">{course.courseType}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseIntroCard