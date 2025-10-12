'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';

interface BannerProps {
  isNewUser?: boolean;
}

const Banner = ({ isNewUser }: BannerProps) => {
  const { user } = useUser();

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

  return (
    <div className='p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700'>
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