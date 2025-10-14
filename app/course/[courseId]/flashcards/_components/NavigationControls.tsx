'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, RotateCcw, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavigationControlsProps {
  currentIndex: number;
  totalCards: number;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
}

export default function NavigationControls({
  currentIndex,
  totalCards,
  onNext,
  onPrevious,
  onReset
}: NavigationControlsProps) {
  const router = useRouter();
  const isLastCard = currentIndex === totalCards - 1;

  return (
    <div className="w-full max-w-lg mx-auto px-2 sm:px-0">
      <Card>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
            <Button
              onClick={onPrevious}
              disabled={currentIndex === 0}
              variant="outline"
              size="sm"
              className="flex-1 h-10 sm:h-11 md:h-12 text-xs sm:text-sm"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Previous</span>
              <span className="xs:hidden">Prev</span>
            </Button>

            <Button
              onClick={onReset}
              variant="ghost"
              size="sm"
              className="h-10 sm:h-11 md:h-12 px-2 sm:px-3 md:px-4 flex-shrink-0"
              title="Reset to first card"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            <Button
              onClick={onNext}
              disabled={isLastCard}
              variant="outline"
              size="sm"
              className="flex-1 h-10 sm:h-11 md:h-12 text-xs sm:text-sm"
            >
              <span className="hidden xs:inline">Next</span>
              <span className="xs:hidden">Next</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
            </Button>
          </div>

          {/* Completion Message */}
          {isLastCard && (
            <Card className="mt-6 border-green-200 bg-green-50/50">
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <Trophy className="w-8 h-8 text-green-600 mx-auto" />
                  <h3 className="font-semibold text-green-800">Great job!</h3>
                  <p className="text-sm text-green-600">
                    You've reached the last flashcard. Ready to review?
                  </p>
                  <Button
                    onClick={() => router.back()}
                    className="mt-3 bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    Back to Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}