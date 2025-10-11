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
      <div className="bg-background rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onPrevious}
              disabled={isFirstQuestion}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200
                ${isFirstQuestion
                  ? 'border-border text-muted-foreground cursor-not-allowed'
                  : 'border-border text-foreground hover:bg-accent'
                }
              `}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={onNext}
              disabled={isLastQuestion}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200
                ${isLastQuestion
                  ? 'border-border text-muted-foreground cursor-not-allowed'
                  : 'border-border text-foreground hover:bg-accent'
                }
              `}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={onRestart}
            className="flex items-center space-x-2 px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-200"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Restart Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-xl shadow-sm border border-border p-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200
            ${isFirstQuestion
              ? 'border-border text-muted-foreground cursor-not-allowed'
              : 'border-border text-foreground hover:bg-accent'
            }
          `}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-4">
          {!isLastQuestion ? (
            <button
              onClick={onNext}
              disabled={!hasAnswer}
              className={`
                flex items-center space-x-2 px-6 py-2 rounded-lg transition-all duration-200
                ${hasAnswer
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                }
              `}
            >
              <span>Next Question</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              disabled={!hasAnswer}
              className={`
                flex items-center space-x-2 px-6 py-2 rounded-lg transition-all duration-200
                ${hasAnswer
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                }
              `}
            >
              <CheckCircle className="h-4 w-4" />
              <span>Submit Quiz</span>
            </button>
          )}
        </div>
      </div>

      {!hasAnswer && (
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Please select an answer to continue
          </p>
        </div>
      )}
    </div>
  );
}