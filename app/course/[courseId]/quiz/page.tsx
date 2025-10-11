"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import QuizHeader from './_components/QuizHeader';
import QuizProgress from './_components/QuizProgress';
import QuizQuestion from './_components/QuizQuestion';
import QuizNavigation from './_components/QuizNavigation';
import QuizResults from './_components/QuizResults';
import { Loader2, AlertCircle } from 'lucide-react';

interface QuizData {
  question: string;
  options: string[];
  answer: string;
}

interface QuizResponse {
  content: QuizData[];
}

export default function QuizPage() {
  const { courseId } = useParams();
  const { user } = useUser();
  const [quizData, setQuizData] = useState<QuizResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<boolean[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    fetchQuizData();
  }, [courseId, user]);

  useEffect(() => {
    if (quizData && !showResults && startTime) {
      const timer = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizData, showResults, startTime]);

  const fetchQuizData = async () => {
    if (!courseId || !user?.primaryEmailAddress?.emailAddress) return;

    try {
      setLoading(true);
      setError(null);

      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'quiz',
      });

      console.log('Quiz API Response:', result.data);

      if (result.data && result.data.content) {
        const parsedContent = typeof result.data.content === 'string'
          ? JSON.parse(result.data.content)
          : result.data.content;

        setQuizData({ content: parsedContent });
        setAnswers(new Array(parsedContent.length).fill(''));
        setAnsweredQuestions(new Array(parsedContent.length).fill(false));
        setResults(new Array(parsedContent.length).fill(false));
        setStartTime(Date.now());
      } else {
        setError('No quiz data available. Please generate quiz content first.');
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      setError('Failed to load quiz data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers];
    const newAnsweredQuestions = [...answeredQuestions];

    newAnswers[currentQuestion - 1] = answer;
    newAnsweredQuestions[currentQuestion - 1] = true;

    setAnswers(newAnswers);
    setAnsweredQuestions(newAnsweredQuestions);
  };

  const handleNext = () => {
    if (currentQuestion < (quizData?.content.length || 0)) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (!quizData) return;

    const newResults = quizData.content.map((question, index) =>
      answers[index] === question.answer
    );

    const correct = newResults.filter(Boolean).length;

    setResults(newResults);
    setCorrectAnswers(correct);
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(1);
    setAnswers(new Array(quizData?.content.length || 0).fill(''));
    setAnsweredQuestions(new Array(quizData?.content.length || 0).fill(false));
    setResults(new Array(quizData?.content.length || 0).fill(false));
    setShowResults(false);
    setCorrectAnswers(0);
    setTimeElapsed(0);
    setStartTime(Date.now());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Loading Quiz
          </h2>
          <p className="text-muted-foreground">
            Preparing your quiz questions...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Quiz Not Available
          </h2>
          <p className="text-muted-foreground mb-4">
            {error}
          </p>
          <button
            onClick={fetchQuizData}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!quizData || !quizData.content || quizData.content.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            No Quiz Available
          </h2>
          <p className="text-muted-foreground">
            No quiz questions found for this course.
          </p>
        </div>
      </div>
    );
  }

  const currentQuestionData = quizData.content[currentQuestion - 1];
  const totalQuestions = quizData.content.length;
  const score = showResults ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <QuizHeader
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestion}
          timeElapsed={timeElapsed}
          score={showResults ? score : undefined}
        />

        {showResults ? (
          <QuizResults
            score={score}
            totalQuestions={totalQuestions}
            correctAnswers={correctAnswers}
            timeElapsed={timeElapsed}
            results={results}
            quizData={quizData.content}
            userAnswers={answers}
            courseId={courseId as string}
            onRestart={handleRestart}
          />
        ) : (
          <>
            <QuizProgress
              totalQuestions={totalQuestions}
              currentQuestion={currentQuestion}
              answeredQuestions={answeredQuestions}
              results={results}
              showResults={showResults}
            />

            <div className="mb-6">
              <QuizQuestion
                question={currentQuestionData.question}
                options={currentQuestionData.options}
                selectedAnswer={answers[currentQuestion - 1]}
                correctAnswer={showResults ? currentQuestionData.answer : undefined}
                showResult={showResults}
                onAnswerSelect={handleAnswerSelect}
                questionNumber={currentQuestion}
              />
            </div>

            <QuizNavigation
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
              hasAnswer={answeredQuestions[currentQuestion - 1]}
              showResults={showResults}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
              onRestart={handleRestart}
            />
          </>
        )}
      </div>
    </div>
  );
}

