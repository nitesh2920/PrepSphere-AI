import React from 'react';
import { Trophy, Target, Clock, CheckCircle, XCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import QuizReview from './QuizReview';

interface QuizData {
  question: string;
  options: string[];
  answer: string;
}

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeElapsed: number;
  results: boolean[];
  quizData: QuizData[];
  userAnswers: string[];
  courseId: string;
  onRestart: () => void;
}

export default function QuizResults({
  score,
  totalQuestions,
  correctAnswers,
  timeElapsed,
  results,
  quizData,
  userAnswers,
  courseId,
  onRestart
}: QuizResultsProps) {
  const router = useRouter();
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return { title: 'Excellent!', message: 'Outstanding performance! You have mastered this topic.' };
    if (score >= 80) return { title: 'Great Job!', message: 'Very good performance! You have a solid understanding.' };
    if (score >= 70) return { title: 'Good Work!', message: 'Good performance! A little more practice will help.' };
    if (score >= 60) return { title: 'Keep Trying!', message: 'You\'re on the right track. Review the material and try again.' };
    return { title: 'Need More Practice', message: 'Don\'t worry! Review the material and take the quiz again.' };
  };

  const performance = getPerformanceMessage(score);

  return (
    <div className="space-y-8">
      {/* Main Results Card */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-8 text-center">
        <div className="mb-6">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Quiz Complete!
        </h2>
        
        <div className="text-6xl font-bold mb-4 text-orange-600">
          {score}%
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-orange-600">
          {performance.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          {performance.message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={() => router.push(`/course/${courseId}`)}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-200 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Course</span>
          </button>
          
          <button
            onClick={onRestart}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground border border-border rounded-lg transition-all duration-200 font-medium"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Take Quiz Again</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-600 rounded-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Final Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{score}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-600 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Correct Answers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {correctAnswers}/{totalQuestions}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-600 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Time Taken</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">
                {formatTime(timeElapsed)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Question Breakdown */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-orange-600" />
          <span>Question Breakdown</span>
        </h3>
        
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 mb-6">
          {results.map((isCorrect, index) => (
            <div
              key={index}
              className={`
                flex items-center justify-center w-12 h-12 rounded-lg border-2
                ${isCorrect 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
                  : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                }
              `}
            >
              {isCorrect ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600" />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-gray-600 dark:text-gray-300">
                Correct: {correctAnswers}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <span className="text-gray-600 dark:text-gray-300">
                Incorrect: {totalQuestions - correctAnswers}
              </span>
            </div>
          </div>
          
          <span className="text-gray-500 dark:text-gray-400">
            Accuracy: {Math.round((correctAnswers / totalQuestions) * 100)}%
          </span>
        </div>
      </div>

      {/* Quiz Review Section */}
      <QuizReview 
        quizData={quizData} 
        userAnswers={userAnswers} 
        results={results} 
      />
    </div>
  );
}