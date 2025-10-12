'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircleQuestion, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Tag,
  HelpCircle
} from 'lucide-react';

interface QAData {
  question: string;
  answer: string;
  difficulty: string;
  category: string;
  tags?: string[];
  followUpQuestions?: string[];
}

interface QAQuestionProps {
  questionData: QAData;
  questionNumber: number;
  isCompleted: boolean;
  onMarkComplete: () => void;
}

export default function QAQuestion({
  questionData,
  questionNumber,
  isCompleted,
  onMarkComplete,
}: QAQuestionProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Conceptual':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Practical':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Problem-solving':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'Best Practices':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Question Header */}
        <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-b">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold">
                {questionNumber}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Interview Question
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={getDifficultyColor(questionData.difficulty)}>
                    {questionData.difficulty}
                  </Badge>
                  <Badge className={getCategoryColor(questionData.category)}>
                    {questionData.category}
                  </Badge>
                </div>
              </div>
            </div>
            
            {isCompleted && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {questionData.tags && questionData.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-1">
                {questionData.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Question */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <div className="flex items-start gap-3">
              <MessageCircleQuestion className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
              <p className="text-foreground font-medium leading-relaxed">
                {questionData.question}
              </p>
            </div>
          </div>
        </div>

        {/* Answer Section */}
        <div className="p-6">
          <Button
            variant="outline"
            onClick={() => setShowAnswer(!showAnswer)}
            className="w-full justify-between mb-4"
          >
            <span className="flex items-center gap-2">
              <MessageCircleQuestion className="w-4 h-4" />
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </span>
            {showAnswer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>

          {showAnswer && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 border">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <div 
                    className=" prose prose-invert text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: questionData.answer.replace(/\n/g, '<br>') 
                    }}
                  />
                </div>
              </div>

              {/* Follow-up Questions */}
              {questionData.followUpQuestions && questionData.followUpQuestions.length > 0 && (
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowFollowUp(!showFollowUp)}
                    className="w-full justify-between p-0 h-auto text-left"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <HelpCircle className="w-4 h-4" />
                      Follow-up Questions ({questionData.followUpQuestions.length})
                    </span>
                    {showFollowUp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>

                  {showFollowUp && (
                    <div className="mt-3 space-y-2">
                      {questionData.followUpQuestions.map((followUp, index) => (
                        <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                          <p className="text-sm text-foreground">
                            <span className="font-medium text-blue-600 dark:text-blue-400">Q{index + 1}:</span> {followUp}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Mark Complete Button */}
              {!isCompleted && (
                <div className="pt-4 border-t">
                  <Button
                    onClick={onMarkComplete}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Understood
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}