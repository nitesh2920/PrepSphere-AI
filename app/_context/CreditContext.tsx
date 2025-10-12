"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useUser } from '@clerk/nextjs'

interface CreditContextType {
  credits: number;
  isMember: boolean;
  loading: boolean;
  refreshCredits: () => void;
  useCredit: () => Promise<boolean>;
  syncMemberCredits: () => Promise<void>;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const useCredits = () => {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
};

interface CreditProviderProps {
  children: ReactNode;
}

export const CreditProvider = ({ children }: CreditProviderProps) => {
  const { user } = useUser();
  const [credits, setCredits] = useState(0);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCredits = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        const response = await fetch('/api/user-credits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'get_credits',
            userEmail: user.primaryEmailAddress.emailAddress
          })
        });
        const data = await response.json();
        if (response.ok) {
          setCredits(data.credits || 0);
          setIsMember(data.isMember || false);
        }
      } catch (error) {
        // Silently handle error
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const useCredit = async (): Promise<boolean> => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.log('❌ No user email found');
      return false;
    }

    console.log('🔍 Using credit for user:', user.primaryEmailAddress.emailAddress);

    try {
      const response = await fetch('/api/user-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'use_credit',
          userEmail: user.primaryEmailAddress.emailAddress
        })
      });
      const data = await response.json();
      
      console.log('📊 API Response:', { status: response.status, data });
      
      if (response.ok) {
        console.log('✅ Credit deducted. New credits:', data.remainingCredits);
        setCredits(data.remainingCredits);
        return true;
      } else if (data.needsUpgrade) {
        console.log('⚠️ Insufficient credits');
        return false; // Insufficient credits
      } else {
        console.log('❌ API error:', data);
      }
    } catch (error) {
      console.error('❌ Network error:', error);
    }
    return false;
  };

  const syncMemberCredits = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const response = await fetch('/api/user-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sync_member_credits',
          userEmail: user.primaryEmailAddress.emailAddress
        })
      });
      const data = await response.json();
      
      if (response.ok && data.newCredits) {
        setCredits(data.newCredits);
      }
    } catch (error) {
      // Silently handle error
    }
  };

  const refreshCredits = () => {
    fetchCredits();
  };

  useEffect(() => {
    fetchCredits();
  }, [user]);

  // Auto-sync credits for members who might have wrong credit count
  // Only sync if credits are 0 or negative (indicating a potential issue)
  // Don't sync for normal credit usage (1-49 credits)
  useEffect(() => {
    if (isMember && credits <= 0 && !loading) {
      console.log('🔄 Auto-syncing credits for Pro member with 0 credits');
      syncMemberCredits();
    }
  }, [isMember, credits, loading]);

  return (
    <CreditContext.Provider value={{ 
      credits, 
      isMember, 
      loading, 
      refreshCredits, 
      useCredit,
      syncMemberCredits 
    }}>
      {children}
    </CreditContext.Provider>
  );
};