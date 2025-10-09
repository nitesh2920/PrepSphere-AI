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
  refreshData: (refresh: boolean) => void;
  course: any;
}

function MaterialCardItem({ item, studyTypeContent, refreshData, course }: MaterialCardItemProps) {
  const [loading, setLoading] = useState(false)
  const isReady = Array.isArray(studyTypeContent?.[item.type]) && studyTypeContent?.[item.type]?.length > 0;

  const GenerateContent = async () => {
    toast('Generating Content')
    setLoading(true)
    let chapters = ''
    course?.courseLayout.chapters.forEach((chapter: any) => {
      chapters += chapter.chapter_title + ', ';
    });

    const result = await axios.post('/api/study-type-content', {
      courseId: course?.courseId,
      type: item.name,
      chapters: chapters
    });
    setLoading(false)
    refreshData(true)
    toast('Your content ready to view')
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