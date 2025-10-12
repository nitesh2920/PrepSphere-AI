'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircleQuestion, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

interface QAHeaderProps {
  totalQuestions: number;
  currentQuestion: number;
  completedCount: number;
}

export default function QAHeader({ totalQuestions, currentQuestion, completedCount }: QAHeaderProps) {
  const router = useRouter();
  const { courseId } = useParams();

  return (
    <div className="mb-6">
      {/* Back Navigation */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.push(`/course/${courseId}`)}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Course
        </Button>
      </div>

      {/* Header Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <MessageCircleQuestion className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Interview Q&A</h1>
            <p className="text-orange-100">
              Master interview questions with detailed answers
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 text-sm">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
            <MessageCircleQuestion className="w-4 h-4" />
            <span>
              Question {currentQuestion > 0 ? currentQuestion : 1} of {totalQuestions}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
            <CheckCircle className="w-4 h-4" />
            <span>
              {completedCount} Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}