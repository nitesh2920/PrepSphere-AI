import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, RotateCcw } from 'lucide-react';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  hasAnswer: boolean;
  showResults: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onRestart: () => void;
}

export default function QuizNavigation({
  currentQuestion,
  totalQuestions,
  hasAnswer,
  showResults,
  onPrevious,
  onNext,
  onSubmit,
  onRestart
}: QuizNavigationProps) {
  const isFirstQuestion = currentQuestion === 1;
  const isLastQuestion = currentQuestion === totalQuestions;

  if (showResults) {
    return (
      <div className="bg-background rounded-xl shadow-sm border border-border p-3 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            <button
              onClick={onPrevious}
              disabled={isFirstQuestion}
              className={`
                flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg border transition-all duration-200 text-xs sm:text-sm flex-1 sm:flex-none justify-center
                ${isFirstQuestion
                  ? 'border-border text-muted-foreground cursor-not-allowed'
                  : 'border-border text-foreground hover:bg-accent'
                }
              `}
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Previous</span>
              <span className="xs:hidden">Prev</span>
            </button>

            <button
              onClick={onNext}
              disabled={isLastQuestion}
              className={`
                flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg border transition-all duration-200 text-xs sm:text-sm flex-1 sm:flex-none justify-center
                ${isLastQuestion
                  ? 'border-border text-muted-foreground cursor-not-allowed'
                  : 'border-border text-foreground hover:bg-accent'
                }
              `}
            >
              <span className="hidden xs:inline">Next</span>
              <span className="xs:hidden">Next</span>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>

          <button
            onClick={onRestart}
            className="flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-200 text-xs sm:text-sm w-full sm:w-auto justify-center"
          >
            <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Restart Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-xl shadow-sm border border-border p-3 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className={`
            flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg border transition-all duration-200 text-xs sm:text-sm w-full sm:w-auto justify-center
            ${isFirstQuestion
              ? 'border-border text-muted-foreground cursor-not-allowed'
              : 'border-border text-foreground hover:bg-accent'
            }
          `}
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Previous</span>
          <span className="xs:hidden">Prev</span>
        </button>

        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
          {!isLastQuestion ? (
            <button
              onClick={onNext}
              disabled={!hasAnswer}
              className={`
                flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm w-full sm:w-auto justify-center
                ${hasAnswer
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                }
              `}
            >
              <span className="hidden sm:inline">Next Question</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              disabled={!hasAnswer}
              className={`
                flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm w-full sm:w-auto justify-center
                ${hasAnswer
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                }
              `}
            >
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Submit Quiz</span>
            </button>
          )}
        </div>
      </div>

      {!hasAnswer && (
        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 text-center">
            Please select an answer to continue
          </p>
        </div>
      )}
    </div>
  );
}