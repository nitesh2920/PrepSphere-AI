import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, ArrowRight, Sparkles } from 'lucide-react'
import { toast } from 'sonner';
import { useProgress } from '@/app/_context/ProgressContext';
import { useCredits } from '@/app/_context/CreditContext';
import { useRouter } from 'next/navigation';

interface MaterialCardItemProps {
  item: any;
  studyTypeContent: any;
  refreshData: (refresh?: boolean) => void;
  course: any;
}

function MaterialCardItem({ item, studyTypeContent, refreshData, course }: MaterialCardItemProps) {
  const { triggerProgressRefresh } = useProgress();
  const { credits, useCredit, isMember, refreshCredits } = useCredits();
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  // Check if content is ready - try multiple possible keys
  const contentData = studyTypeContent?.[item.type] ||
    studyTypeContent?.[item.type.toLowerCase()] ||
    studyTypeContent?.[item.name] ||
    studyTypeContent?.[item.name.toLowerCase()]

  const isReady = Array.isArray(contentData) && contentData.length > 0

  const GenerateContent = async () => {
    // Check if content is already ready
    if (isReady) {
      toast.info(`${item.name} already exists!`);
      return;
    }

    // Note: No credit deduction here since credits are deducted when creating the course
    // Individual study materials (notes, flashcards, quiz) are included in the original course credit

    const loadingToast = toast(`Generating ${item.name}...`, {
      duration: Infinity,
      icon: <RefreshCw className="w-4 h-4 animate-spin" />,
    })

    setLoading(true)
    try {
      let chapters = ''
      course?.courseLayout.chapters.forEach((chapter: any) => {
        chapters += chapter.chapter_title + ', ';
      });

      // Step 1: Generate content via Inngest
      await axios.post('/api/study-type-content', {
        courseId: course?.courseId,
        type: item.type,  // Use item.type (e.g., 'Flashcard') not item.name (e.g., 'Flashcards')
        chapters: chapters
      });

      // Step 2: Poll for completion instead of fixed timeouts
      const pollForCompletion = async (attempts = 0, maxAttempts = 20) => {
        try {
          // Check if content is ready
          const checkResult = await axios.post('/api/study-type', {
            courseId: course?.courseId,
            studyType: item.type
          });

          const hasContent = checkResult.data &&
            (Array.isArray(checkResult.data.content) ? checkResult.data.content.length > 0 : checkResult.data !== null);

          if (hasContent) {
            refreshData(true);
            refreshCredits(); // Refresh credits to show updated count
            // Add a delay to ensure database is fully updated before refreshing progress
            setTimeout(() => {
              triggerProgressRefresh();
            }, 2000);
            toast.dismiss(loadingToast);
            toast.success(`${item.name} ready to view!`);
            return;
          }

          // If not ready and we haven't exceeded max attempts, try again
          if (attempts < maxAttempts - 1) {
            setTimeout(() => pollForCompletion(attempts + 1, maxAttempts), 2000);
          } else {
            toast.dismiss(loadingToast);
            toast.error(`${item.name} is taking longer than expected. Please refresh the page in a moment.`);
          }
        } catch (error) {
          if (attempts < maxAttempts - 1) {
            setTimeout(() => pollForCompletion(attempts + 1, maxAttempts), 2000);
          } else {
            toast.dismiss(loadingToast);
            toast.error('Error checking generation status. Please refresh the page.');
          }
        }
      };

      // Start polling after a short delay
      setTimeout(() => pollForCompletion(), 3000);

      setLoading(false)
    } catch (error) {
      toast.dismiss(loadingToast)
      setLoading(false)
      toast.error(`Error generating ${item.name}. Please try again.`)
    }
  }

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isReady) {
      return (
        <Link href={'/course/' + course?.courseId + item.path}>
          {children}
        </Link>
      );
    }
    return <>{children}</>;
  };

  return (
    <CardWrapper>
      <Card className={`group cursor-pointer hover:shadow-xl transition-all duration-300 h-full
        ${!isReady ? 'grayscale opacity-60 hover:opacity-80' : 'hover:scale-[1.02]'} 
      `}>
        <CardContent className="p-6 flex flex-col h-full">
          {/* Status Badge */}
          <div className="flex justify-center mb-4">
            {!isReady ? (
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                <Sparkles className="w-3 h-3 mr-1" />
                Generate
              </Badge>
            ) : (
              <Badge className="bg-green-500 hover:bg-green-600">
                <ArrowRight className="w-3 h-3 mr-1" />
                Ready
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col items-center flex-grow text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Image
                src={item.icon}
                alt={item.name}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {item.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            {!isReady ? (
              <Button
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  GenerateContent();
                }}
                disabled={loading}
              >
                {loading && <RefreshCw className="animate-spin w-4 h-4 mr-2" />}
                {loading ? 'Generating...' : 'Generate'}
              </Button>
            ) : (
              <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                View Material
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
}

export default MaterialCardItem;