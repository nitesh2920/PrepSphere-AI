'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QANavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function QANavigation({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
}: QANavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestion <= 1}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Question</span>
        <span className="font-semibold text-foreground">
          {currentQuestion}
        </span>
        <span>of</span>
        <span className="font-semibold text-foreground">
          {totalQuestions}
        </span>
      </div>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={currentQuestion >= totalQuestions}
        className="flex items-center gap-2"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}