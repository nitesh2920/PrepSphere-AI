'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Brain } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-8">
          {/* Header Skeleton */}
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          {/* Progress Card Skeleton */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-16" />
                  <Skeleton className="h-12 w-16" />
                  <Skeleton className="h-12 w-16" />
                </div>
              </div>
              <Skeleton className="h-2 w-full mb-4" />
              <div className="flex gap-2 justify-center">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="w-8 h-8 rounded-full" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Question Card Skeleton */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
              <Skeleton className="h-8 w-full mb-8" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Skeleton */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-12 w-24" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}