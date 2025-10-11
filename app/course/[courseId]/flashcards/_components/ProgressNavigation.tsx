'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface ProgressNavigationProps {
  currentIndex: number;
  totalCards: number;
  onCardSelect: (index: number) => void;
}

export default function ProgressNavigation({ 
  currentIndex, 
  totalCards, 
  onCardSelect 
}: ProgressNavigationProps) {
  const progressPercentage = ((currentIndex + 1) / totalCards) * 100;

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base">Progress</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Card {currentIndex + 1} of {totalCards}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xl sm:text-2xl font-bold text-primary">
              {Math.round(progressPercentage)}%
            </div>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-secondary rounded-full h-2 mb-4">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Progress Dots */}
        <div className="flex gap-1.5 sm:gap-2 justify-center flex-wrap max-w-full overflow-hidden">
          {Array.from({ length: totalCards }).map((_, index) => (
            <button
              key={index}
              onClick={() => onCardSelect(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 flex-shrink-0 ${
                index === currentIndex
                  ? 'bg-primary scale-125'
                  : index < currentIndex
                    ? 'bg-green-500'
                    : 'bg-muted hover:bg-muted-foreground/20'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}