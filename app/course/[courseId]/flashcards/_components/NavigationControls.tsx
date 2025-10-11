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
    <div className="max-w-md mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <Button
              onClick={onPrevious}
              disabled={currentIndex === 0}
              variant="outline"
              size="lg"
              className="flex-1 h-12"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </Button>

            <Button
              onClick={onReset}
              variant="ghost"
              size="lg"
              className="h-12 px-4"
              title="Reset to first card"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>

            <Button
              onClick={onNext}
              disabled={isLastCard}
              variant="outline"
              size="lg"
              className="flex-1 h-12"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
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