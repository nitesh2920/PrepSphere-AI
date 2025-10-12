'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Circle } from 'lucide-react';

interface QAProgressProps {
  totalQuestions: number;
  currentQuestion: number;
  completedQuestions: Set<number>;
  onQuestionSelect: (index: number) => void;
}

export default function QAProgress({
  totalQuestions,
  currentQuestion,
  completedQuestions,
  onQuestionSelect,
}: QAProgressProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Progress</h3>
          <span className="text-sm text-muted-foreground">
            {completedQuestions.size} of {totalQuestions} completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div
            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${totalQuestions > 0 ? (completedQuestions.size / totalQuestions) * 100 : 0}%`,
            }}
          />
        </div>

        {/* Question Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-15 gap-2">
          {Array.from({ length: totalQuestions }, (_, index) => {
            const questionIndex = index;
            const isCompleted = completedQuestions.has(questionIndex);
            const isCurrent = currentQuestion === index + 1;

            return (
              <button
                key={index}
                onClick={() => onQuestionSelect(index)}
                className={`
                  w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200
                  ${isCurrent
                    ? 'bg-orange-600 text-white ring-2 ring-orange-300'
                    : isCompleted
                    ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }
                `}
                title={`Question ${index + 1}${isCompleted ? ' (Completed)' : ''}`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : isCurrent ? (
                  index + 1
                ) : (
                  <Circle className="w-3 h-3" />
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}