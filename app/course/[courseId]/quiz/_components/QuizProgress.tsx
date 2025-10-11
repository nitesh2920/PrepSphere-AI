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
    <div className="bg-background rounded-xl shadow-sm border border-border p-6 mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Progress
      </h3>
      
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const questionNumber = index + 1;
          const isAnswered = answeredQuestions[index];
          const isCorrect = results[index];
          const isCurrent = questionNumber === currentQuestion;
          
          return (
            <div
              key={questionNumber}
              className={`
                relative flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-all duration-200
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
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )
              ) : isAnswered ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className={`h-5 w-5 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`} />
              )}
              
              <span className={`
                absolute -bottom-6 text-xs font-medium
                ${isCurrent ? 'text-primary' : 'text-muted-foreground'}
              `}>
                {questionNumber}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-foreground">
              Answered ({answeredQuestions.filter(Boolean).length})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-muted"></div>
            <span className="text-foreground">
              Remaining ({totalQuestions - answeredQuestions.filter(Boolean).length})
            </span>
          </div>
        </div>
        
        <div className="text-muted-foreground">
          {Math.round((answeredQuestions.filter(Boolean).length / totalQuestions) * 100)}% Complete
        </div>
      </div>
    </div>
  );
}