"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { useProgress } from '@/app/_context/ProgressContext';
import FlashCardItem from './_components/FlashcardItem';
import FlashcardHeader from './_components/FlashcardHeader';
import ProgressNavigation from './_components/ProgressNavigation';
import NavigationControls from './_components/NavigationControls';
import LoadingState from './_components/LoadingState';
import EmptyState from './_components/EmptyState';
import { RefreshCw } from 'lucide-react';

interface FlashcardData {
    front: string;
    back: string;
}

interface FlashcardsResponse {
    content: FlashcardData[];
}

function Flashcards() {
    const { courseId } = useParams();
    const { user } = useUser();
    const { triggerProgressRefresh } = useProgress();
    const [flashCards, setFlashCards] = useState<FlashcardsResponse | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isPolling, setIsPolling] = useState(false);
    const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());

    useEffect(() => {
        GetFlashCards()
    }, [])

    // Polling effect to check for data if initially empty
    useEffect(() => {
        if (!loading && (!flashCards?.content?.length)) {
            setIsPolling(true);
            const pollInterval = setInterval(async () => {
                await GetFlashCards();
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
        } else if (flashCards?.content?.length) {
            setIsPolling(false);
        }
    }, [loading, flashCards?.content?.length])

    const GetFlashCards = async () => {
        if (!courseId || !user?.primaryEmailAddress?.emailAddress) return;

        try {
            setLoading(true);
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'Flashcard',
            });

            // Handle different possible data structures
            let flashcardData = null;

            if (result.data) {
                // If result.data has content property and it's an array
                if (result.data.content && Array.isArray(result.data.content)) {
                    flashcardData = { content: result.data.content };
                }
                // If result.data is directly an array
                else if (Array.isArray(result.data)) {
                    flashcardData = { content: result.data };
                }
                // If result.data has nested properties
                else if (result.data.content) {
                    try {
                        const parsedContent = typeof result.data.content === 'string' 
                            ? JSON.parse(result.data.content) 
                            : result.data.content;
                        
                        if (Array.isArray(parsedContent)) {
                            flashcardData = { content: parsedContent };
                        }
                    } catch (parseError) {
                        // Silently handle parsing error
                    }
                }
            }

            setFlashCards(flashcardData);
        } catch (error) {
            // Silently handle error
        } finally {
            setLoading(false);
        }
    };

    const markCardComplete = async (cardIndex: number) => {
        if (user?.primaryEmailAddress?.emailAddress && courseId) {
            try {
                await fetch('/api/user-progress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'mark_complete',
                        userId: user.primaryEmailAddress.emailAddress,
                        courseId: courseId,
                        materialType: 'flashcards',
                        itemId: cardIndex.toString()
                    })
                });
                setCompletedCards(prev => new Set([...prev, cardIndex]));
                triggerProgressRefresh(); // Trigger progress refresh when card is completed
            } catch (error) {
                // Silently handle error
            }
        }
    };

    const handleNext = () => {
        if (flashCards?.content && currentIndex < flashCards.content.length - 1) {
            // Mark current card as completed when moving to next
            markCardComplete(currentIndex);
            setCurrentIndex(prev => prev + 1);
            setIsFlipped(false);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setIsFlipped(false);
        }
    };

    const handleReset = () => {
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    const handleCardSelect = (index: number) => {
        // Mark previous card as completed when jumping to another card
        if (index !== currentIndex) {
            markCardComplete(currentIndex);
        }
        setCurrentIndex(index);
        setIsFlipped(false);
    };

    if (loading || isPolling) {
        return <LoadingState />;
    }

    if (!flashCards?.content?.length) {
        return <EmptyState />;
    }

    const totalCards = flashCards.content.length;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6 max-w-7xl">
                <div className="flex flex-col min-h-screen">
                    {/* Header Section */}
                    <div className="mb-3 sm:mb-4 md:mb-6">
                        <FlashcardHeader />
                    </div>

                    {/* Progress Section */}
                    <div className="mb-4 sm:mb-6 md:mb-8">
                        <ProgressNavigation
                            currentIndex={currentIndex}
                            totalCards={totalCards}
                            onCardSelect={handleCardSelect}
                        />
                    </div>

                    {/* Flashcard Section - Responsive centered layout */}
                    <div className="flex-1 flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] mb-4 sm:mb-6 md:mb-8 px-2">
                        <FlashCardItem
                            flashcard={flashCards.content[currentIndex]}
                            isFlipped={isFlipped}
                            setIsFlipped={setIsFlipped}
                        />
                    </div>

                    {/* Navigation Section */}
                    <div className="mt-auto pb-2 sm:pb-4 md:pb-6">
                        <NavigationControls
                            currentIndex={currentIndex}
                            totalCards={totalCards}
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                            onReset={handleReset}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Flashcards