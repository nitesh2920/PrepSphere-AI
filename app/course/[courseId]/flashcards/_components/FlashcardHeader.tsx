'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface FlashcardHeaderProps {
  title?: string;
  description?: string;
}

export default function FlashcardHeader({ 
  title = "Flashcards", 
  description = "Master concepts with interactive learning cards" 
}: FlashcardHeaderProps) {
  const router = useRouter();
  const { courseId } = useParams();

  return (
    <div className="space-y-4">
      {/* Back Navigation */}
      <div className="flex justify-start px-2">
        <Button 
          variant="outline" 
          onClick={() => router.push(`/course/${courseId}`)}
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9 md:h-10 px-2 sm:px-3 md:px-4"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Back to Course</span>
          <span className="xs:hidden">Back</span>
        </Button>
      </div>

      {/* Header Content */}
      <div className="text-center space-y-2 px-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
          {title}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}