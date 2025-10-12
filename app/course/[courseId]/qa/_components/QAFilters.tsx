'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';

interface QAFiltersProps {
  difficulties: string[];
  categories: string[];
  selectedDifficulty: string;
  selectedCategory: string;
  onDifficultyChange: (difficulty: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function QAFilters({
  difficulties,
  categories,
  selectedDifficulty,
  selectedCategory,
  onDifficultyChange,
  onCategoryChange,
}: QAFiltersProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard':
        return 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Conceptual':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300';
      case 'Practical':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300';
      case 'Problem-solving':
        return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300';
      case 'Best Practices':
        return 'bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-300';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Filter Questions</h3>
        </div>

        <div className="space-y-4">
          {/* Difficulty Filter */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedDifficulty === 'All' ? 'default' : 'outline'}
                className={`cursor-pointer transition-colors ${
                  selectedDifficulty === 'All' 
                    ? 'bg-orange-600 hover:bg-orange-700' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => onDifficultyChange('All')}
              >
                All
              </Badge>
              {difficulties.map((difficulty) => (
                <Badge
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors ${
                    selectedDifficulty === difficulty
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : getDifficultyColor(difficulty)
                  }`}
                  onClick={() => onDifficultyChange(difficulty)}
                >
                  {difficulty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Category</h4>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === 'All' ? 'default' : 'outline'}
                className={`cursor-pointer transition-colors ${
                  selectedCategory === 'All' 
                    ? 'bg-orange-600 hover:bg-orange-700' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => onCategoryChange('All')}
              >
                All
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : getCategoryColor(category)
                  }`}
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}