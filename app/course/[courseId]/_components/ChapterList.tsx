import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ArrowRight } from 'lucide-react'

type Chapter = {
  chapter_number: number;
  chapter_title: string;
  chapter_summary: string;
  topics: string[];
  emoji?: string;
};

type CourseLayout = {
  course_title: string;
  difficulty_level: string;
  target_audience: string;
  course_summary: string;
  chapters: Chapter[];
};

type Course = {
  courseLayout: CourseLayout;
  courseId?: string;
  status?: string;
};

type Props = {
  course: Course;
};

function ChapterList({ course }: Props) {
  const chapters = course?.courseLayout?.chapters;
  
  return (
    <div className='space-y-6'>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <h2 className='font-bold text-xl sm:text-2xl text-foreground'>Study Chapters</h2>
        <Badge variant="secondary" className="ml-auto">
          {chapters?.length || 0} Chapters
        </Badge>
      </div>
      
      <div className='grid gap-3 sm:gap-4'>
        {chapters?.map((chapter, index) => (
          <Card 
            key={index} 
            className='group cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary/20'
          >
            <CardContent className="p-4 sm:p-6">
              <div className='flex items-center gap-4 sm:gap-6'>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className='text-xl sm:text-2xl'>{chapter.emoji ?? "📘"}</span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground text-base sm:text-lg leading-tight group-hover:text-primary transition-colors">
                        {chapter?.chapter_title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {chapter?.chapter_summary}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <span>Chapter {index + 1}</span>
                    <span>•</span>
                    <span>~15 min read</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ChapterList