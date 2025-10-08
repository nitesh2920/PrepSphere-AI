"use client"
import React,{useState,useEffect} from 'react'
import MaterialCardItem from './MaterialCardItem'; 
import axios from 'axios';
import Link from 'next/link';
import { Item } from '@radix-ui/react-select';
export default function StudyMaterialSection({courseId,course}) {

  const [studyTypeContent,setStudyTypeContent]=useState([])
   const materialList = [
  {
    name: 'Notes/Chapters',
    desc: 'Master the core concepts by diving deep into detailed chapters and notes.',
    icon: '/notes.png',
    path: '/notes',
    type:'notes'
  },
  {
    name: 'Flashcard',
    desc: 'Strengthen your recall of key concepts with interactive flashcards designed for active learning.',
    icon: '/flashcard.png',
    path: '/flashcards',
    type:'flashcard'
  },
  {
    name: 'Quiz',
    desc: 'Challenge your understanding and solidify your knowledge with targeted quizzes.',
    icon: '/quiz.png',
    path: '/quiz',
    type:'quiz'
  },
  {
    name: 'Question/Answer',
    desc: 'Apply your knowledge by tackling common questions and reviewing expertly crafted answers.',
    icon: '/qa.png',
    path: '/qa',
    type:'qa'
  }
]

useEffect(()=>{
  GetStudyMaterial()
},[])

  if (!studyTypeContent) {
    return <div>Loading study material...</div>;
  }

const GetStudyMaterial=async ()=>{
  const result= await axios.post('/api/study-type',{
    courseId:courseId,
    studyType:'ALL'
  })
  console.log("studyMaterial",result?.data)
  setStudyTypeContent(result.data)
}
  return (
    <div className='mt-5 mb-5'>
      <h2 className='font-medium text-xl'>Study Material</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3 '>
        {materialList.map((item, index) => (
                  // <Link key={index} href={'/course/'+courseId+item.path}>

          <MaterialCardItem 
            key={index} 
            item={item} 
            studyTypeContent={studyTypeContent}
            course={course}
            refreshData={GetStudyMaterial}
      
          />
           /* </Link> */
        ))}
       
      </div>
    </div>
  )
}
