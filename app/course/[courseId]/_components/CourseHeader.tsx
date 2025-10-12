'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, BookOpen, Users, Star } from 'lucide-react';
import Image from 'next/image';

interface CourseHeaderProps {
  course: any;
}

export default function CourseHeader({ course }: CourseHeaderProps) {
  if (!course) return null;

  const totalChapters = course?.courseLayout?.chapters?.length || 0;
  const completedChapters = 0; // You can implement this based on your progress tracking
  const progressPercentage = totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;

  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-card via-card to-muted/20">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Course Image */}
          <div className="w-full lg:w-2/5 relative">
            <div className="aspect-video lg:aspect-square relative overflow-hidden">
              <Image
                src={course?.courseLayout?.course_image || '/placeholder-course.jpg'}
                alt={course?.courseLayout?.course_title || 'Course'}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                  <Star className="w-3 h-3 mr-1" />
                  Premium Course
                </Badge>
              </div>
            </div>
          </div>

          {/* Course Info */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10">
            <div className="space-y-6">
              {/* Title and Description */}
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                  {course?.courseLayout?.course_title}
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {course?.courseLayout?.course_summary}
                </p>
              </div>

              {/* Progress Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Course Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {completedChapters} of {totalChapters} chapters
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-muted/50 rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{totalChapters}</p>
                    <p className="text-xs text-muted-foreground">Chapters</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 sm:p-4 bg-muted/50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">2-3 hrs</p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 sm:p-4 bg-muted/50 rounded-xl col-span-2 sm:col-span-1">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Beginner</p>
                    <p className="text-xs text-muted-foreground">Level</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}