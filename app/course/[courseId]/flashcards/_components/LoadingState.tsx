'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex flex-col min-h-screen">
          {/* Header Skeleton */}
          <div className="mb-6">
            <div className="text-center space-y-2">
              <div className="h-10 w-64 bg-muted rounded-lg animate-pulse mx-auto" />
              <div className="h-6 w-96 bg-muted rounded-lg animate-pulse mx-auto" />
            </div>
          </div>

          {/* Progress Card Skeleton */}
          <div className="mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="h-8 w-12 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-2 w-full bg-muted rounded-full animate-pulse mb-4" />
                <div className="flex gap-2 justify-center">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-muted rounded-full animate-pulse" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flashcard Skeleton */}
          <div className="flex-1 flex items-center justify-center min-h-[500px] mb-8">
            <div className="h-[400px] w-[340px] bg-muted rounded-3xl animate-pulse shadow-2xl" />
          </div>

          {/* Navigation Skeleton */}
          <div className="mt-auto pb-6">
            <div className="max-w-md mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="h-12 flex-1 bg-muted rounded-lg animate-pulse" />
                    <div className="h-12 w-12 bg-muted rounded-lg animate-pulse" />
                    <div className="h-12 flex-1 bg-muted rounded-lg animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}