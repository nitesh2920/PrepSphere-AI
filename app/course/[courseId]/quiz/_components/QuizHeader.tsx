import React from 'react';
import { Clock, Trophy, Target } from 'lucide-react';

interface QuizHeaderProps {
  totalQuestions: number;
  currentQuestion: number;
  timeElapsed?: number;
  score?: number;
}

export default function QuizHeader({ 
  totalQuestions, 
  currentQuestion, 
  timeElapsed = 0, 
  score 
}: QuizHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-background rounded-xl shadow-sm border border-border p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Question {currentQuestion} of {totalQuestions}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-foreground">
              {formatTime(timeElapsed)}
            </span>
          </div>
          
          {score !== undefined && (
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-foreground">
                Score: {score}%
              </span>
            </div>
          )}
        </div>
        
        <div className="text-right">
          <h1 className="text-2xl font-bold text-foreground">
            Quiz Challenge
          </h1>
          <p className="text-sm text-muted-foreground">
            Test your knowledge
          </p>
        </div>
      </div>
    </div>
  );
}