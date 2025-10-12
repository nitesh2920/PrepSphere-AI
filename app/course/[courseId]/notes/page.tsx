"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useRouter } from "next/navigation"
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useProgress } from '@/app/_context/ProgressContext'
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
    const { user } = useUser();
    const { triggerProgressRefresh } = useProgress();
    const [notes, setNotes] = useState<any[] | null>(null);
    const [stepCount, setStepCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isPolling, setIsPolling] = useState(false);
    const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set());

    const router = useRouter();

    useEffect(() => {
        GetNotes()
    }, [])

    // Polling effect to check for data if initially empty
    useEffect(() => {
        if (!loading && (!notes || notes.length === 0)) {
            setIsPolling(true);
            const pollInterval = setInterval(async () => {
                await GetNotes();
            }, 3000); // Poll every 3 seconds

            // Clear polling after 60 seconds to prevent infinite polling
            const timeout = setTimeout(() => {
                clearInterval(pollInterval);
                setIsPolling(false);
            }, 60000);

            return () => {
                clearInterval(pollInterval);
                clearTimeout(timeout);
                setIsPolling(false);
            };
        } else if (notes && notes.length > 0) {
            setIsPolling(false);
        }
    }, [loading, notes])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [stepCount]);

    // Mark chapter as completed when user finishes reading
    const markChapterComplete = async (chapterIndex: number) => {
        if (user?.primaryEmailAddress?.emailAddress && courseId) {
            try {
                await fetch('/api/user-progress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'mark_complete',
                        userId: user.primaryEmailAddress.emailAddress,
                        courseId: courseId,
                        materialType: 'notes',
                        itemId: chapterIndex.toString()
                    })
                });
                setCompletedChapters(prev => new Set([...prev, chapterIndex]));
                triggerProgressRefresh(); // Trigger progress refresh when chapter is completed
            } catch (error) {
                // Silently handle error
            }
        }
    };

    const GetNotes = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'notes'
            });

            setNotes(result?.data);
        } catch (error) {
            // Silently handle error
        } finally {
            setLoading(false);
        }
    }

    if (loading || isPolling) {
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

    // Show empty state if no notes after loading/polling
    if (!notes || notes.length === 0) {
        return (
            <div className="p-5">
                <div className="mb-6">
                    <Button
                        variant="outline"
                        onClick={() => router.push(`/course/${courseId}`)}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        Back to Course
                    </Button>
                </div>
                <div className="text-center py-10">
                    <h2 className="text-xl font-semibold mb-2">No Notes Available</h2>
                    <p className="text-muted-foreground mb-4">
                        Notes may still be generating. Please wait a moment or go back to generate them first.
                    </p>
                    <Button onClick={() => window.location.reload()}>
                        Refresh Page
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-5 ">
            {/* Back Navigation */}
            <div className="mb-6">
                <Button
                    variant="outline"
                    onClick={() => router.push(`/course/${courseId}`)}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft size={16} />
                    Back to Course
                </Button>
            </div>

            <div className='flex gap-5 items-center justify-between'>
                <div className='flex gap-5 items-center flex-1'>
                    {stepCount !== 0 && <Button variant="outline" size="sm" onClick={() => setStepCount((prev) => (prev || 0) - 1)}>Previous</Button>}
                    {notes?.map((_, index) => (
                        <div key={index} className={`w-full h-2 rounded-full ${index <= stepCount ? 'bg-primary' : 'bg-gray-300'}`}>
                        </div>
                    ))}
                    {stepCount < notes.length - 1 && <Button variant="outline" size="sm" onClick={() => {
                        const nextStep = (stepCount || 0) + 1;
                        setStepCount(nextStep);
                        // Mark current chapter as completed when moving to next
                        markChapterComplete(stepCount);
                    }}>Next</Button>}
                </div>
                {/* PDF Export - Coming Soon */}
                <div className="relative group">
                    <button
                        disabled
                        className="flex items-center gap-2 px-4 py-2 border border-orange-300 text-orange-600 rounded-lg opacity-50 cursor-not-allowed"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export PDF
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Coming Soon
                    </div>
                </div>
            </div>

            <div >
                <div className="prose prose-invert max-w-none mt-10  " dangerouslySetInnerHTML={{ __html: (notes?.[stepCount]?.notes)?.replace('```html', '')?.replace(/```$/, '') }} />

                {/* Mark as Complete Button */}
                {!completedChapters.has(stepCount) && (
                    <div className="mt-6 text-center">
                        <Button
                            onClick={() => markChapterComplete(stepCount)}
                            className="flex items-center gap-2"
                        >
                            <CheckCircle size={16} />
                            Mark Chapter as Complete
                        </Button>
                    </div>
                )}

                {completedChapters.has(stepCount) && (
                    <div className="mt-6 text-center">
                        <div className="flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle size={16} />
                            <span>Chapter Completed!</span>
                        </div>
                    </div>
                )}

                {(stepCount >= notes.length || stepCount >= notes.length - 1) && <div className='text-center flex-col gap-5 flex items-center justify-center mt-10'>
                    You have reached the end of the notes.
                    <Button onClick={() => {
                        // Mark final chapter as complete
                        markChapterComplete(stepCount);
                        router.back();
                    }}> Go to Chapter Page</Button>
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
