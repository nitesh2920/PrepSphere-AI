'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  PlayCircle,
  ArrowRight,
  FileText
} from 'lucide-react';

interface ChaptersListProps {
  course: any;
}

export default function ChaptersList({ course }: ChaptersListProps) {
  if (!course?.courseLayout?.chapters) return null;

  const chapters = course.courseLayout.chapters;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Course Chapters</h2>
        <Badge variant="secondary" className="ml-auto">
          {chapters.length} Chapters
        </Badge>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {chapters.map((chapter: any, index: number) => (
          <Card 
            key={index}
            className="group overflow-hidden border hover:shadow-lg transition-all duration-300 hover:border-primary/20"
          >
            <CardContent className="p-0">
              <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6">
                {/* Chapter Number */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Chapter Info */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-foreground text-base sm:text-lg leading-tight group-hover:text-primary transition-colors">
                      {chapter.chapter_title}
                    </h3>
                    <Badge variant="outline" className="flex-shrink-0 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      15 min
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {chapter.chapter_summary || 'Explore the key concepts and practical applications in this comprehensive chapter.'}
                  </p>

                  {/* Chapter Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>Study Material</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <PlayCircle className="w-3 h-3" />
                      <span>Interactive Content</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  >
                    <span className="hidden sm:inline mr-2">Start</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1 bg-muted">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${Math.random() * 100}%` }} // Replace with actual progress
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Completion Card */}
      <Card className="border-2 border-dashed border-muted-foreground/20 bg-muted/20">
        <CardContent className="p-6 sm:p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-lg">Complete All Chapters</h3>
            <p className="text-muted-foreground text-sm">
              Finish all chapters to unlock your course completion certificate and advanced materials.
            </p>
          </div>
          <Button variant="outline" disabled>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Course Completion
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}