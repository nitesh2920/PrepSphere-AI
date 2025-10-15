"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useProgress } from '@/app/_context/ProgressContext';
import QAHeader from '@/app/course/[courseId]/qa/_components/QAHeader';
import QAProgress from '@/app/course/[courseId]/qa/_components/QAProgress';
import QAQuestion from '@/app/course/[courseId]/qa/_components/QAQuestion';
import QANavigation from '@/app/course/[courseId]/qa/_components/QANavigation';
import QAFilters from '@/app/course/[courseId]/qa/_components/QAFilters';
import KeyboardShortcuts from '@/app/_components/KeyboardShortcuts';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface QAData {
  question: string;
  answer: string;
  difficulty: string;
  category: string;
  tags?: string[];
  followUpQuestions?: string[];
}

interface QAResponse {
  content: QAData[];
}

export default function QAPage() {
  const { courseId } = useParams();
  const { user } = useUser();
  const { triggerProgressRefresh } = useProgress();
  const [qaData, setQaData] = useState<QAResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredQuestions, setFilteredQuestions] = useState<QAData[]>([]);

  useEffect(() => {
    if (courseId && user?.primaryEmailAddress?.emailAddress) {
      fetchQAData();
    }
  }, [courseId, user?.primaryEmailAddress?.emailAddress]);

  // Polling effect to check for data if initially empty
  useEffect(() => {
    if (!loading && !error && (!qaData?.content?.length)) {
      setIsPolling(true);
      const pollInterval = setInterval(async () => {
        console.log('Polling for Q&A data...');
        await fetchQAData();
      }, 2000); // Poll every 2 seconds for faster response

      // Clear polling after 30 seconds to prevent infinite polling
      const timeout = setTimeout(() => {
        clearInterval(pollInterval);
        setIsPolling(false);
        console.log('Q&A polling timeout reached');
      }, 30000);

      return () => {
        clearInterval(pollInterval);
        clearTimeout(timeout);
        setIsPolling(false);
      };
    } else if (qaData?.content?.length) {
      setIsPolling(false);
      console.log('Q&A data loaded successfully');
    }
  }, [loading, error, qaData?.content?.length]);

  // Filter questions based on difficulty and category
  useEffect(() => {
    if (qaData?.content) {
      let filtered = qaData.content;
      
      if (selectedDifficulty !== 'All') {
        filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
      }
      
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(q => q.category === selectedCategory);
      }
      
      setFilteredQuestions(filtered);
      
      // Reset current question if it's out of bounds
      if (currentQuestion > filtered.length) {
        setCurrentQuestion(1);
      }
    }
  }, [qaData, selectedDifficulty, selectedCategory, currentQuestion]);

  // Keyboard navigation - only on desktop
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile || !filteredQuestions.length) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent keyboard navigation when user is typing in input fields
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          event.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          event.preventDefault();
          handleNext();
          break;
        case ' ':
          event.preventDefault();
          if (!completedQuestions.has(currentQuestion - 1)) {
            markQuestionComplete(currentQuestion - 1);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [filteredQuestions.length, currentQuestion, completedQuestions]);

  const fetchQAData = async () => {
    if (!courseId || !user?.primaryEmailAddress?.emailAddress) {
      console.log('Missing courseId or user email, skipping fetch');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Fetching Q&A data for courseId:', courseId);

      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'qa',
      });

      console.log('Q&A API response:', result.data);

      if (result.data && result.data.content) {
        let parsedContent;
        
        if (typeof result.data.content === 'string') {
          try {
            parsedContent = JSON.parse(result.data.content);
          } catch (parseError) {
            console.error('Error parsing Q&A content:', parseError);
            setError('Error parsing Q&A content. Please try refreshing.');
            return;
          }
        } else {
          parsedContent = result.data.content;
        }

        if (Array.isArray(parsedContent) && parsedContent.length > 0) {
          console.log('Q&A content loaded:', parsedContent.length, 'questions');
          setQaData({ content: parsedContent });
        } else {
          console.log('Q&A content is empty or not an array');
          if (!isPolling) {
            setError('Q&A content may still be generating. Please wait a moment or go back to generate it first.');
          }
        }
      } else {
        console.log('No Q&A content in response');
        if (!isPolling) {
          setError('Q&A content may still be generating. Please wait a moment or go back to generate it first.');
        }
      }
    } catch (error) {
      console.error('Error fetching Q&A data:', error);
      if (!isPolling) {
        setError('Failed to load Q&A data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const markQuestionComplete = async (questionIndex: number) => {
    if (user?.primaryEmailAddress?.emailAddress && courseId) {
      try {
        await fetch('/api/user-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'mark_complete',
            userId: user.primaryEmailAddress.emailAddress,
            courseId: courseId,
            materialType: 'qa',
            itemId: questionIndex.toString()
          })
        });
        setCompletedQuestions(prev => new Set([...prev, questionIndex]));
        triggerProgressRefresh();
      } catch (error) {
        // Silently handle error
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length) {
      // Mark current question as completed when moving to next
      markQuestionComplete(currentQuestion - 1);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleQuestionSelect = (index: number) => {
    // Mark previous question as completed when jumping to another
    if (index !== currentQuestion - 1) {
      markQuestionComplete(currentQuestion - 1);
    }
    setCurrentQuestion(index + 1);
  };

  if (loading || isPolling) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {isPolling ? 'Checking for Generated Content' : 'Loading Q&A'}
          </h2>
          <p className="text-muted-foreground">
            {isPolling ? 'Q&A content may still be generating. Please wait...' : 'Preparing your interview questions...'}
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
            Q&A Not Available
          </h2>
          <p className="text-muted-foreground mb-4">
            {error}
          </p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                setError(null);
                setQaData(null);
                fetchQAData();
              }}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!qaData || !qaData.content || qaData.content.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            No Q&A Available
          </h2>
          <p className="text-muted-foreground">
            No interview questions found for this course.
          </p>
        </div>
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <QAHeader
            totalQuestions={qaData.content.length}
            currentQuestion={0}
            completedCount={completedQuestions.size}
          />
          
          <QAFilters
            difficulties={['Easy', 'Medium', 'Hard']}
            categories={['Conceptual', 'Practical', 'Problem-solving', 'Best Practices']}
            selectedDifficulty={selectedDifficulty}
            selectedCategory={selectedCategory}
            onDifficultyChange={setSelectedDifficulty}
            onCategoryChange={setSelectedCategory}
          />
          
          <div className="text-center py-10">
            <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No Questions Match Your Filters
            </h2>
            <p className="text-muted-foreground">
              Try adjusting your difficulty or category filters.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = filteredQuestions[currentQuestion - 1];
  const totalQuestions = filteredQuestions.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <QAHeader
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestion}
          completedCount={completedQuestions.size}
        />

        <QAFilters
          difficulties={['Easy', 'Medium', 'Hard']}
          categories={['Conceptual', 'Practical', 'Problem-solving', 'Best Practices']}
          selectedDifficulty={selectedDifficulty}
          selectedCategory={selectedCategory}
          onDifficultyChange={setSelectedDifficulty}
          onCategoryChange={setSelectedCategory}
        />

        <QAProgress
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestion}
          completedQuestions={completedQuestions}
          onQuestionSelect={handleQuestionSelect}
        />

        <div className="mb-6">
          <QAQuestion
            questionData={currentQuestionData}
            questionNumber={currentQuestion}
            isCompleted={completedQuestions.has(currentQuestion - 1)}
            onMarkComplete={() => markQuestionComplete(currentQuestion - 1)}
          />
        </div>

        <QANavigation
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        {/* PDF Export - Coming Soon */}
        <div className="mt-6 flex justify-center">
          <div className="relative group">
            <button
              disabled
              className="flex items-center gap-2 px-4 py-2 border border-orange-300 text-orange-600 rounded-lg opacity-50 cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export PDF
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Coming Soon
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <KeyboardShortcuts type="qa" />
      </div>
    </div>
  );
}