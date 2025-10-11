import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizQuestionProps {
  question: string;
  options: string[];
  selectedAnswer: string;
  correctAnswer?: string;
  showResult?: boolean;
  onAnswerSelect: (answer: string) => void;
  questionNumber: number;
}

export default function QuizQuestion({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  showResult = false,
  onAnswerSelect,
  questionNumber
}: QuizQuestionProps) {
  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return selectedAnswer === option
        ? 'border-primary bg-primary/10 text-primary'
        : 'border-border hover:border-primary/50 hover:bg-primary/5 text-foreground';
    }

    if (option === correctAnswer) {
      return 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400';
    }
    
    if (selectedAnswer === option && option !== correctAnswer) {
      return 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400';
    }
    
    return 'border-border text-muted-foreground';
  };

  const getOptionIcon = (option: string) => {
    if (!showResult) return null;
    
    if (option === correctAnswer) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    
    if (selectedAnswer === option && option !== correctAnswer) {
      return <XCircle className="h-5 w-5 text-red-600" />;
    }
    
    return null;
  };

  return (
    <div className="bg-background border border-border rounded-xl shadow-sm p-8">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
            <span className="text-sm font-bold text-primary">
              {questionNumber}
            </span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber}
          </span>
        </div>
        
        <h2 className="text-xl font-semibold text-foreground leading-relaxed">
          {question}
        </h2>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && onAnswerSelect(option)}
            disabled={showResult}
            className={`
              w-full p-4 text-left rounded-lg border-2 transition-all duration-200 flex items-center justify-between
              ${getOptionStyle(option)}
              ${!showResult ? 'cursor-pointer' : 'cursor-default'}
            `}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-current">
                <span className="text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
              </div>
              <span className="font-medium">{option}</span>
            </div>
            
            {getOptionIcon(option)}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="mt-6 p-4 rounded-lg bg-muted/50">
          <div className="flex items-start space-x-3">
            {selectedAnswer === correctAnswer ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
            )}
            <div>
              <p className={`font-medium ${
                selectedAnswer === correctAnswer 
                  ? 'text-green-700 dark:text-green-300' 
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect'}
              </p>
              {selectedAnswer !== correctAnswer && (
                <p className="text-sm text-muted-foreground mt-1">
                  The correct answer is: <span className="font-medium">{correctAnswer}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}