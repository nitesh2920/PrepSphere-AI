import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizData {
  question: string;
  options: string[];
  answer: string;
}

interface QuizReviewProps {
  quizData: QuizData[];
  userAnswers: string[];
  results: boolean[];
}

export default function QuizReview({ quizData, userAnswers, results }: QuizReviewProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Review</h2>
        <p className="text-gray-600 dark:text-gray-400">Review all questions and their correct answers</p>
      </div>

      {quizData.map((question, questionIndex) => {
        const userAnswer = userAnswers[questionIndex];
        const correctAnswer = question.answer;
        const isCorrect = results[questionIndex];

        return (
          <div key={questionIndex} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{questionIndex + 1}</span>
                </div>
                <span className="text-orange-600 font-medium">Question {questionIndex + 1}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-600 font-medium">Correct</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="text-red-600 font-medium">Incorrect</span>
                  </>
                )}
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6 leading-relaxed">
              {question.question}
            </h3>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {question.options.map((option, optionIndex) => {
                const isUserAnswer = userAnswer === option;
                const isCorrectAnswer = correctAnswer === option;
                
                let optionStyle = 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300';
                
                if (isCorrectAnswer) {
                  optionStyle = 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400';
                } else if (isUserAnswer && !isCorrectAnswer) {
                  optionStyle = 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400';
                }

                return (
                  <div
                    key={optionIndex}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${optionStyle}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium opacity-70">
                          Option {optionIndex + 1}
                        </span>
                        <span className="font-medium">{option}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {isCorrectAnswer && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        {isUserAnswer && !isCorrectAnswer && (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        {isUserAnswer && (
                          <span className="text-xs px-2 py-1 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                            Your Answer
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Answer Summary */}
            <div className={`p-4 rounded-lg border ${
              isCorrect 
                ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
                : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                }`}>
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${
                      isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                    }`}>
                      {isCorrect ? 'Correct Answer' : 'Incorrect Answer'}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 dark:text-gray-400">Your answer:</span>
                      <span className={`font-medium ${
                        isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                      }`}>
                        {userAnswer || 'No answer selected'}
                      </span>
                    </div>
                    
                    {!isCorrect && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600 dark:text-gray-400">Correct answer:</span>
                        <span className="font-medium text-green-700 dark:text-green-400">
                          {correctAnswer}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}