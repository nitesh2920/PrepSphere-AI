"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from "next/navigation"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
function ViewNotes() {
    const { courseId } = useParams();
    const [notes, setNotes] = useState()
    const [stepCount, setStepCount] = useState(0);

    const route=useRouter()
    useEffect(() => {
        GetNotes()
    }, [])
    const GetNotes = async () => {
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType: 'notes'
        })
        console.log("notes", result?.data)
        setNotes(result?.data)
    }
    return notes && (
        <div>
            <div className='flex gap-5 items-center'>
                {stepCount !== 0 && <Button variant="outline" size="sm" onClick={() => setStepCount((prev) => (prev || 0) - 1)}>Previous</Button>}
                {notes?.map((_, index) => (
                    <div key={index} className={`w-full h-2 rounded-full ${index < stepCount ? 'bg-primary' : 'bg-gray-300'}`}>
                    </div>
                ))}
                {stepCount <= notes.length - 1 && <Button variant="outline" size="sm" onClick={() => setStepCount((prev) => (prev || 0) + 1)}>Next</Button>}
            </div>
            <div>
                <div className="prose max-w-none mt-10" dangerouslySetInnerHTML={{ __html: (notes?.[stepCount]?.notes)?.replace('```html', '')?.replace(/```$/, '')  }} />
                        {notes?.length==stepCount &&<div className='text-center flex-col gap-5 flex items-center justify-center'>
                                You have reached the end of the notes.
                                <Button onClick={()=>route.back()}> Go to Chapter Page</Button>
                                </div>

                        }
                </div>

            </div>
       
    )
}
export default ViewNotes