"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useRouter } from "next/navigation"
import { Button } from '@/components/ui/button'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

function ViewNotes() {
    const { courseId } = useParams();
    const [notes, setNotes] = useState<any[] | null>(null);
    const [stepCount, setStepCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        GetNotes()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [stepCount]);

    const GetNotes = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'notes'
            });
            console.log("notes", result?.data);
            setNotes(result?.data);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="p-5">
                {/* Skeleton for header */}
                <div className="flex gap-5 items-center">
                    <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="h-2 w-full bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                {/* Skeleton for content */}
                <div className="mt-10">
                    <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                    <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
            </div>
        )
    }

    return notes && (
        <div className="p-5">
            <div className='flex gap-5 items-center'>
                {stepCount !== 0 && <Button variant="outline" size="sm" onClick={() => setStepCount((prev) => (prev || 0) - 1)}>Previous</Button>}
                {notes?.map((_, index) => (
                    <div key={index} className={`w-full h-2 rounded-full ${index < stepCount ? 'bg-primary' : 'bg-gray-300'}`}>
                    </div>
                ))}
                {stepCount < notes.length  && <Button variant="outline" size="sm" onClick={() => setStepCount((prev) => (prev || 0) + 1)}>Next</Button>}
            </div>
            <div>
                <div className="prose max-w-none mt-10" dangerouslySetInnerHTML={{ __html: (notes?.[stepCount]?.notes)?.replace('```html', '')?.replace(/```$/, '')  }} />
                {(stepCount >= notes.length || stepCount>=notes.length-1 )&& <div className='text-center flex-col gap-5 flex items-center justify-center mt-10'>
                    You have reached the end of the notes.
                    <Button onClick={() => router.back()}> Go to Chapter Page</Button>
                </div>
                }
            </div>

{stepCount < notes.length && <div className="mt-10">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => setStepCount(stepCount - 1)} className={stepCount === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                        </PaginationItem>
                        {notes.map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink onClick={() => setStepCount(index)} isActive={stepCount === index} className="cursor-pointer">
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext onClick={() => setStepCount(stepCount + 1)} className={stepCount === notes.length - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            }
        </div>
    )
}
export default ViewNotes;
