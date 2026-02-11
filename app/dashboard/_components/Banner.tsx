'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';

interface BannerProps {
  isNewUser?: boolean;
}

const Banner = ({ isNewUser }: BannerProps) => {
  const { user, isLoaded } = useUser();

  const motivationalSlogans = [
    "Believe you can and you're halfway there.",
    'The secret of getting ahead is getting started.',
    'It\'s not whether you get knocked down, it\'s whether you get up.',
    'The future belongs to those who believe in the beauty of their dreams.',
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const slogan = motivationalSlogans[Math.floor(Math.random() * motivationalSlogans.length)];

  // Reserve space to prevent layout shift
  if (!isLoaded || !user) {
    return (
      <div className='p-4 md:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-4 md:mb-6 min-h-[120px] md:min-h-[140px]'>
        <div className='flex items-center'>
          <div className='space-y-3 w-full'>
            <div className='h-8 md:h-9 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-3/4'></div>
            <div className='h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4 md:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-4 md:mb-6 min-h-[120px] md:min-h-[140px]'>
      <div className='flex items-center'>
        {isNewUser ? (
          <div>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white'>
              {getGreeting()}, {user?.firstName}!{' '}
              <span className='inline-block'>👋</span>
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mt-2'>
              {slogan}
            </p>
          </div>
        ) : (
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white'>
            Welcome back, {user?.firstName}{' '}
            <span className='inline-block'>👋</span>
          </h1>
        )}
      </div>
      {!isNewUser && (
        <p className='text-gray-600 dark:text-gray-400 mt-2'>
          Let's get you ready for your next interview!
        </p>
      )}
    </div>
  );
};

export default Banner;