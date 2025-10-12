"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"

interface ProgressContextType {
  refreshTrigger: number;
  triggerProgressRefresh: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider = ({ children }: ProgressProviderProps) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerProgressRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <ProgressContext.Provider value={{ refreshTrigger, triggerProgressRefresh }}>
      {children}
    </ProgressContext.Provider>
  );
};