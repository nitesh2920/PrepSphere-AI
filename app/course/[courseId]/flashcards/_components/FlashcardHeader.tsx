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
      <div className="flex justify-start">
        <Button 
          variant="outline" 
          onClick={() => router.push(`/course/${courseId}`)}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Course
        </Button>
      </div>

      {/* Header Content */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}