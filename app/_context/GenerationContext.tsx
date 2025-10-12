"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"

interface GenerationContextType {
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

const GenerationContext = createContext<GenerationContextType | undefined>(undefined);

export const useGeneration = () => {
  const context = useContext(GenerationContext);
  if (context === undefined) {
    throw new Error('useGeneration must be used within a GenerationProvider');
  }
  return context;
};

interface GenerationProviderProps {
  children: ReactNode;
}

export const GenerationProvider = ({ children }: GenerationProviderProps) => {
  const [isGenerating, setIsGenerating] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('isGenerating');
      return saved === 'true';
    }
    return false;
  });



  // Save to localStorage whenever state changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isGenerating', isGenerating.toString());
    }
  }, [isGenerating]);



  const setIsGeneratingWithStorage = (generating: boolean) => {
    setIsGenerating(generating);
    if (typeof window !== 'undefined') {
      localStorage.setItem('isGenerating', generating.toString());
    }
  };

  return (
    <GenerationContext.Provider value={{ isGenerating, setIsGenerating: setIsGeneratingWithStorage }}>
      {children}
    </GenerationContext.Provider>
  );
};