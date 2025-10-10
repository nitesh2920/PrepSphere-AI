import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, ArrowRight, Sparkles } from 'lucide-react'
import { toast } from 'sonner';

interface MaterialCardItemProps {
  item: any;
  studyTypeContent: any;
  refreshData: (refresh?: boolean) => void;
  course: any;
}

function MaterialCardItem({ item, studyTypeContent, refreshData, course }: MaterialCardItemProps) {
  const [loading, setLoading] = useState(false)

  // Debug for all items to see what's happening
  console.log(`🔍 ${item.name} Debug:`)
  console.log('studyTypeContent:', studyTypeContent)
  console.log('Available keys:', Object.keys(studyTypeContent || {}))
  console.log('Looking for:', item.type, item.name)

  // Check if content is ready - try multiple possible keys
  const contentData = studyTypeContent?.[item.type] ||
    studyTypeContent?.[item.type.toLowerCase()] ||
    studyTypeContent?.[item.name] ||
    studyTypeContent?.[item.name.toLowerCase()]

  const isReady = Array.isArray(contentData) && contentData.length > 0
console.log("areeeeee",studyTypeContent)
  console.log('contentData:', contentData)
  console.log('isReady:', isReady)

  const GenerateContent = async () => {
    const loadingToast = toast.loading(`Generating ${item.name}...`, {
      duration: Infinity,
    })

    setLoading(true)
    try {
      let chapters = ''
      course?.courseLayout.chapters.forEach((chapter: any) => {
        chapters += chapter.chapter_title + ', ';
      });

      // Step 1: Generate content via Inngest
      // console.log('🚀 Step 1: Calling /api/study-type-content')
      await axios.post('/api/study-type-content', {
        courseId: course?.courseId,
        type: item.type,  // Use item.type (e.g., 'Flashcard') not item.name (e.g., 'Flashcards')
        chapters: chapters
      });
      console.log('type', item.type)

      // Step 2: Wait for Inngest to complete, then refresh multiple times
      setTimeout(async () => {
        try {
          console.log('🔄 Step 2: First refresh after generation')
          refreshData(true)

          // Try again after more time
          setTimeout(() => {
            console.log('🔄 Step 3: Second refresh after generation')
            refreshData(true)
          }, 2000)

          // Final attempt
          setTimeout(() => {
            console.log('🔄 Step 4: Final refresh after generation')
            refreshData(true)
          }, 4000)

          toast.dismiss(loadingToast)
          toast.success(`${item.name} ready to view!`)
        } catch (error) {
          console.error('Error in post-generation steps:', error)
          toast.dismiss(loadingToast)
          toast.error('Generated but failed to refresh. Please reload the page.')
        }
      }, 5000)

      setLoading(false)
    } catch (error) {
      console.error('Error in generation:', error)
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