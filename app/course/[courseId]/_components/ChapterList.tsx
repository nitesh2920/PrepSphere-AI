import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Chapter = {
  chapter_number: number;
  chapter_title: string;
  chapter_summary: string;
  topics: string[];
  emoji?: string;
};

type CourseLayout = {
  course_title: string;
  difficulty_level: string;
  target_audience: string;
  course_summary: string;
  chapters: Chapter[];
};

type Course = {
  courseLayout: CourseLayout;
  courseId?: string;
  status?: string;
};

type Props = {
  course: Course;
};

function ChapterList({ course }: Props) {
  const chapters = course?.courseLayout?.chapters;
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

  const toggleChapter = (chapterIndex: number) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterIndex)) {
      newExpanded.delete(chapterIndex);
    } else {
      newExpanded.add(chapterIndex);
    }
    setExpandedChapters(newExpanded);
  };
  
  return (
    <div className='space-y-6'>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <h2 className='font-bold text-xl sm:text-2xl text-foreground'>Study Chapters</h2>
        <Badge variant="secondary" className="ml-auto">
          {chapters?.length || 0} Chapters
        </Badge>
      </div>
      
      <div className='grid gap-3 sm:gap-4'>
        {chapters?.map((chapter, index) => {
          const isExpanded = expandedChapters.has(index);
          const hasTopics = chapter.topics && chapter.topics.length > 0;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card className='group hover:shadow-lg transition-all duration-300 hover:border-primary/20'>
                <CardContent className="p-4 sm:p-6">
                  <div 
                    className='flex items-center gap-4 sm:gap-6 cursor-pointer'
                    onClick={() => hasTopics && toggleChapter(index)}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <span className='text-xl sm:text-2xl'>{chapter.emoji ?? "📘"}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground text-base sm:text-lg leading-tight group-hover:text-primary transition-colors">
                            {chapter?.chapter_title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {chapter?.chapter_summary}
                          </p>
                        </div>
                        
                        <div className="flex-shrink-0">
                          {hasTopics ? (
                            <motion.div 
                              className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          ) : (
                            <div className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center" title="No topics available">
                              <span className="w-2 h-2 bg-muted-foreground/30 rounded-full"></span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                        <span>Chapter {index + 1}</span>
                        <span>•</span>
                        <span>~15 min read</span>
                        {hasTopics && (
                          <>
                            <span>•</span>
                            <span className="text-primary font-medium">
                              {chapter.topics.length} topic{chapter.topics.length !== 1 ? 's' : ''}
                            </span>
                            {!isExpanded && (
                              <span className="text-muted-foreground/70">(click to expand)</span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Topics Section */}
                  <AnimatePresence>
                    {isExpanded && hasTopics && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-4 h-4 bg-primary/20 rounded flex items-center justify-center">
                              <BookOpen className="w-2.5 h-2.5 text-primary" />
                            </div>
                            <h4 className="text-sm font-medium text-foreground">Topics Covered</h4>
                          </div>
                          
                          <div className="grid gap-2 sm:gap-3">
                            {chapter.topics.map((topic, topicIndex) => (
                              <motion.div
                                key={topicIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: topicIndex * 0.05, duration: 0.3 }}
                                whileHover={{ scale: 1.02, x: 4 }}
                                className="flex items-center gap-3 p-2 sm:p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group/topic"
                              >
                                <motion.div 
                                  className="w-2 h-2 bg-primary rounded-full flex-shrink-0"
                                  whileHover={{ scale: 1.5 }}
                                  transition={{ duration: 0.2 }}
                                ></motion.div>
                                <span className="text-sm text-foreground leading-relaxed group-hover/topic:text-primary transition-colors">
                                  {topic}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  )
}

export default ChapterList