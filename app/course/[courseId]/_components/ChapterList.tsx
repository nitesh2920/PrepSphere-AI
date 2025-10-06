import React from 'react'
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

function ChapterList({course}:Props) {
    const chapters=course?.courseLayout?.chapters;
  return (
    <div className='mt-3'>
        <h2 className='font-medium text-xl'>Chapters</h2>
        <div className='flex flex-col gap-4 mt-3'>
            {chapters?.map((chapter,index)=>(
                <div key={index} className=' cursor-pointer flex items-center gap-5 p-4 border shadow-md rounded-lg '>
                    <h2 className='text-2xl' >{chapter.emoji ?? "📘" }</h2>
                    <div>
                        <h2 className="font-medium">{chapter?.chapter_title}</h2>
                        <p className="text-sm text-gray-600 ">{chapter?.chapter_summary}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChapterList