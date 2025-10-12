'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {  
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface StudyMaterialsGridProps {
  courseId: string;
  course: any;
}

export default function StudyMaterialsGrid({ courseId, course }: StudyMaterialsGridProps) {
  const router = useRouter();

  const materialList = [
    {
      name: 'Notes/Chapters',
      desc: 'Master the core concepts by diving deep into detailed chapters and notes.',
      icon: '/notes.png',
      path: '/notes',
      type: 'notes',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      textColor: 'text-orange-700 dark:text-orange-400',
      badgeText: 'Study Material'
    },
    {
      name: 'Flashcards',
      desc: 'Reinforce your learning with interactive flashcards for quick revision.',
      icon: '/flashcard.png',
      path: '/flashcards',
      type: 'Flashcard',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      textColor: 'text-orange-700 dark:text-orange-400',
      badgeText: 'Interactive'
    },
    {
      name: 'Quiz',
      desc: 'Test your knowledge and track your progress with comprehensive quizzes.',
      icon: '/quiz.png',
      path: '/quiz',
      type: 'quiz',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      textColor: 'text-green-700',
      badgeText: 'Assessment'
    },
    {
      name: 'Q&A',
      desc: 'Get answers to your questions and clarify doubts with AI assistance.',
      icon: '/qa.png',
      path: '/qa',
      type: 'qa',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      textColor: 'text-orange-700',
      badgeText: 'AI Powered'
    }
  ];

  const handleMaterialClick = (material: any) => {
    router.push(`/course/${courseId}${material.path}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Study Materials</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {materialList.map((material, index) => (
          <Card 
            key={index}
            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
            onClick={() => handleMaterialClick(material)}
          >
            <CardContent className="p-0">
              {/* Header with gradient */}
              <div className={`h-20 bg-gradient-to-r ${material.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs">
                    {material.badgeText}
                  </Badge>
                </div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/10 rounded-full" />
                <div className="absolute -top-2 -left-2 w-12 h-12 bg-white/10 rounded-full" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Icon */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${material.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                    <Image
                      src={material.icon}
                      alt={material.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg leading-tight">
                      {material.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {material.desc}
                </p>

                {/* Action Button */}
                <Button 
                  variant="ghost" 
                  className="w-full justify-between group-hover:bg-muted/50 transition-colors"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-muted/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}