'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EmptyState() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="flex flex-col min-h-screen items-center justify-center">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <HelpCircle className="w-10 h-10 text-muted-foreground" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">No Quiz Available</h2>
                  <p className="text-muted-foreground">
                    This quiz hasn't been generated yet. Please go back and generate the quiz content first.
                  </p>
                </div>

                <Button 
                  onClick={() => router.back()} 
                  size="lg"
                  className="mt-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Course
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}