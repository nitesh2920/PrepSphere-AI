import React from 'react';
import { CheckCircle, Circle, XCircle } from 'lucide-react';

interface QuizProgressProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: boolean[];
  results?: boolean[];
  showResults?: boolean;
}

export default function QuizProgress({ 
  totalQuestions, 
  currentQuestion, 
  answeredQuestions, 
  results = [], 
  showResults = false 
}: QuizProgressProps) {
  return (
    <div className="bg-background rounded-xl shadow-sm border border-border p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
        Progress
      </h3>
      
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-1.5 sm:gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const questionNumber = index + 1;
          const isAnswered = answeredQuestions[index];
          const isCorrect = results[index];
          const isCurrent = questionNumber === currentQuestion;
          
          return (
            <div
              key={questionNumber}
              className={`
                relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg border-2 transition-all duration-200
                ${isCurrent 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border'
                }
                ${isAnswered && !showResults 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600' 
                  : ''
                }
                ${showResults && isAnswered
                  ? isCorrect 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
                    : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                  : ''
                }
              `}
            >
              {showResults && isAnswered ? (
                isCorrect ? (
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600" />
                ) : (
                  <XCircle className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-600" />
                )
              ) : isAnswered ? (
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600" />
              ) : (
                <Circle className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`} />
              )}
              
              <span className={`
                absolute -bottom-5 sm:-bottom-6 text-xs font-medium
                ${isCurrent ? 'text-primary' : 'text-muted-foreground'}
              `}>
                {questionNumber}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 text-xs sm:text-sm">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
            <span className="text-foreground">
              Answered ({answeredQuestions.filter(Boolean).length})
            </span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-muted"></div>
            <span className="text-foreground">
              Remaining ({totalQuestions - answeredQuestions.filter(Boolean).length})
            </span>
          </div>
        </div>
        
        <div className="text-muted-foreground font-medium">
          {Math.round((answeredQuestions.filter(Boolean).length / totalQuestions) * 100)}% Complete
        </div>
      </div>
    </div>
  );
}