'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useCredits } from '@/app/_context/CreditContext';

export default function PaymentSuccessHandler() {
  const searchParams = useSearchParams();
  const { refreshCredits } = useCredits();
  
  useEffect(() => {
    const payment = searchParams.get('payment');
    
    if (payment === 'success') {
      // Show success message
      toast.success('🎉 Welcome to Pro!', {
        description: 'Your subscription is now active. You have 50 credits to use!',
        duration: 5000,
      });
      
      // Refresh credits to show updated status
      setTimeout(() => {
        refreshCredits();
      }, 1000);
      
      // Clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete('payment');
      window.history.replaceState({}, '', url.toString());
    } else if (payment === 'cancelled') {
      toast.info('Payment cancelled', {
        description: 'You can upgrade to Pro anytime from your dashboard.',
      });
      
      // Clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete('payment');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams, refreshCredits]);

  return null; // This component doesn't render anything
}