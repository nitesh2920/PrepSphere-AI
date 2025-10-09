'use client';

import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { Card } from '@/components/ui/card';
import { HelpCircle, CheckCircle2, Sparkles, Target } from 'lucide-react';

interface FlashcardData {
  front: string;
  back: string;
}

interface FlashCardItemProps {
  flashcard: FlashcardData;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
}

function FlashCardItem({ flashcard, isFlipped, setIsFlipped }: FlashCardItemProps) {
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex items-center justify-center w-full py-4 sm:py-8">
      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          {/* Front Card */}
          <Card 
            onClick={handleClick}
            className="group relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-primary via-primary/90 to-primary/80 
                       text-primary-foreground rounded-2xl sm:rounded-3xl flex items-center justify-center cursor-pointer 
                       shadow-xl hover:shadow-2xl sm:shadow-2xl sm:hover:shadow-3xl transition-all duration-500 
                       h-[280px] w-full sm:h-[320px] lg:h-[400px] aspect-[4/5] sm:aspect-auto
                       border-0 hover:scale-[1.02] sm:hover:scale-105 transform-gpu overflow-hidden
                       backdrop-blur-sm"
          >
            {/* Premium Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-3xl" />
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-3 right-3 sm:top-6 sm:right-6 w-12 h-12 sm:w-20 sm:h-20 border border-white/20 rounded-full animate-pulse" />
              <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 w-8 h-8 sm:w-12 sm:h-12 border border-white/30 rounded-full" />
              <div className="absolute top-1/3 left-3 sm:left-6 w-1 h-12 sm:h-20 bg-white/20 rounded-full" />
              <Sparkles className="absolute top-4 left-4 sm:top-8 sm:left-8 w-4 h-4 sm:w-6 sm:h-6 text-white/30 animate-pulse" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center space-y-3 sm:space-y-6 max-w-full px-2 sm:px-4">
              <div className="w-12 h-12 sm:w-16 lg:w-20 sm:h-16 lg:h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 sm:mb-6 shadow-lg">
                <HelpCircle className="w-6 h-6 sm:w-8 lg:w-10 sm:h-8 lg:h-10 text-white" />
              </div>
              <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold leading-relaxed break-words text-white px-2">
                {flashcard?.front}
              </h2>
              <div className="pt-3 sm:pt-6">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/30">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                  <span className="hidden sm:inline">Click to reveal answer</span>
                  <span className="sm:hidden">Tap for answer</span>
                </div>
              </div>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          </Card>

          {/* Back Card */}
          <Card 
            onClick={handleClick}
            className="group relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-card via-card/95 to-muted/50 
                       text-card-foreground rounded-2xl sm:rounded-3xl flex items-center justify-center cursor-pointer 
                       shadow-xl hover:shadow-2xl sm:shadow-2xl sm:hover:shadow-3xl transition-all duration-500 
                       h-[280px] w-full sm:h-[320px] lg:h-[400px] aspect-[4/5] sm:aspect-auto
                       border-2 border-green-200/50 hover:scale-[1.02] sm:hover:scale-105 transform-gpu overflow-hidden
                       backdrop-blur-sm"
          >
            {/* Premium Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/30 rounded-2xl sm:rounded-3xl" />
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-3 right-3 sm:top-6 sm:right-6 w-12 h-12 sm:w-20 sm:h-20 border border-green-300/40 rounded-full animate-pulse" />
              <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 w-8 h-8 sm:w-12 sm:h-12 border border-green-400/50 rounded-full" />
              <div className="absolute top-1/3 right-3 sm:right-6 w-1 h-12 sm:h-20 bg-green-300/40 rounded-full" />
              <Target className="absolute top-4 right-4 sm:top-8 sm:right-8 w-4 h-4 sm:w-6 sm:h-6 text-green-400/60 animate-pulse" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center space-y-3 sm:space-y-6 max-w-full px-2 sm:px-4">
              <div className="w-12 h-12 sm:w-16 lg:w-20 sm:h-16 lg:h-20 mx-auto bg-green-100 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 sm:mb-6 shadow-lg border border-green-200">
                <CheckCircle2 className="w-6 h-6 sm:w-8 lg:w-10 sm:h-8 lg:h-10 text-green-600" />
              </div>
              <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold leading-relaxed text-foreground break-words px-2">
                {flashcard?.back}
              </h2>
              <div className="pt-3 sm:pt-6">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 bg-green-100 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-green-700 border border-green-200">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="hidden sm:inline">Click to see question</span>
                  <span className="sm:hidden">Tap for question</span>
                </div>
              </div>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-green-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-green-200/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          </Card>
        </ReactCardFlip>
      </div>
    </div>
  );
}

export default FlashCardItem;