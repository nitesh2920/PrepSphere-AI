'use client';

import React from 'react';

interface FlashcardHeaderProps {
  title?: string;
  description?: string;
}

export default function FlashcardHeader({ 
  title = "Flashcards", 
  description = "Master concepts with interactive learning cards" 
}: FlashcardHeaderProps) {
  return (
    <div className="text-center space-y-2 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h1>
      <p className="text-muted-foreground text-lg">
        {description}
      </p>
    </div>
  );
}