"use client"
import React, { useState, useEffect } from 'react'
import MaterialCardItem from './MaterialCardItem'; 
import axios from 'axios';
import { BookOpen, Brain } from 'lucide-react';

interface StudyMaterialSectionProps {
  courseId: string;
  course: any;
}

export default function StudyMaterialSection({ courseId, course }: StudyMaterialSectionProps) {
  const [studyTypeContent, setStudyTypeContent] = useState([])
  
  const materialList = [
    {
      name: 'Notes/Chapters',
      desc: 'Master the core concepts by diving deep into detailed chapters and notes.',
      icon: '/notes.png',
      path: '/notes',
      type: 'notes'
    },
    {
      name: 'Flashcards',
      desc: 'Strengthen your recall of key concepts with interactive flashcards designed for active learning.',
      icon: '/flashcard.png',
      path: '/flashcards',
      type: 'flashcard'
    },
    {
      name: 'Quiz',
      desc: 'Challenge your understanding and solidify your knowledge with targeted quizzes.',
      icon: '/quiz.png',
      path: '/quiz',
      type: 'quiz'
    },
    {
      name: 'Question/Answer',
      desc: 'Apply your knowledge by tackling common questions and reviewing expertly crafted answers.',
      icon: '/qa.png',
      path: '/qa',
      type: 'qa'
    }
  ]

  useEffect(() => {
    GetStudyMaterial()
  }, [])

  if (!studyTypeContent) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center space-y-2">
          <Brain className="w-8 h-8 text-muted-foreground mx-auto animate-pulse" />
          <p className="text-muted-foreground">Loading study materials...</p>
        </div>
      </div>
    );
  }

  const GetStudyMaterial = async () => {
    const result = await axios.post('/api/study-type', {
      courseId: courseId,
      studyType: 'ALL'
    })
    setStudyTypeContent(result.data)
  }

  return (
    <div className='space-y-6'>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <h2 className='font-bold text-xl sm:text-2xl text-foreground'>Study Materials</h2>
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
        {materialList.map((item, index) => (
          <MaterialCardItem 
            key={index} 
            item={item} 
            studyTypeContent={studyTypeContent}
            course={course}
            refreshData={GetStudyMaterial}
          />
        ))}
      </div>
    </div>
  )
}
