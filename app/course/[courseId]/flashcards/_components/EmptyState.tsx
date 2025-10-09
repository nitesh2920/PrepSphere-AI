'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EmptyState() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex flex-col min-h-screen items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto" />
                <h2 className="text-2xl font-bold text-foreground">No flashcards available</h2>
                <p className="text-muted-foreground">
                  Please check back later or contact support.
                </p>
                <Button onClick={() => router.back()} variant="outline">
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}