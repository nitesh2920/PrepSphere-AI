import React from 'react'
import MaterialCardItem from './MaterialCardItem'; 

export default function StudyMaterialSection() {

   const materialList = [
  {
    name: 'Notes/Chapters',
    desc: 'Master the core concepts by diving deep into detailed chapters and notes.',
    icon: '/notes.png',
    path: '/notes'
  },
  {
    name: 'Flashcard',
    desc: 'Strengthen your recall of key concepts with interactive flashcards designed for active learning.',
    icon: '/flashcard.png',
    path: '/flashcards'
  },
  {
    name: 'Quiz',
    desc: 'Challenge your understanding and solidify your knowledge with targeted quizzes.',
    icon: '/quiz.png',
    path: '/quiz'
  },
  {
    name: 'Question/Answer',
    desc: 'Apply your knowledge by tackling common questions and reviewing expertly crafted answers.',
    icon: '/qa.png',
    path: '/qa'
  }
];
  return (
    <div className='mt-5 mb-5'>
      <h2 className='font-medium text-xl'>Study Material</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3 '>
        {materialList.map((item, index) => (
          <MaterialCardItem 
            key={index} 
            item={item} 
      
          />
        ))}
      </div>
    </div>
  )
}
