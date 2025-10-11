"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import FlashCardItem from './_components/FlashcardItem';
import FlashcardHeader from './_components/FlashcardHeader';
import ProgressNavigation from './_components/ProgressNavigation';
import NavigationControls from './_components/NavigationControls';
import LoadingState from './_components/LoadingState';
import EmptyState from './_components/EmptyState';

interface FlashcardData {
    front: string;
    back: string;
}

interface FlashcardsResponse {
    content: FlashcardData[];
}

function Flashcards() {
    const { courseId } = useParams();
    const [flashCards, setFlashCards] = useState<FlashcardsResponse | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
        GetFlashCards()
    }, [])

    const GetFlashCards = async () => {
        if (!courseId || !user?.primaryEmailAddress?.emailAddress) return;

        try {
            setLoading(true);
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'Flashcard',
            });

            console.log("api result", result.data)
            // Handle different possible data structures
            let flashcardData = result.data;

            // If data is directly an array, wrap it in content property
            if (Array.isArray(result.data)) {
                flashcardData = { content: result.data };
            }
            // If data has Flashcard property, use that
            else if (result.data?.Flashcard && Array.isArray(result.data.Flashcard)) {
                flashcardData = { content: result.data.Flashcard };
            }
            // If data has flashcard property, use that
            else if (result.data?.flashcard && Array.isArray(result.data.flashcard)) {
                flashcardData = { content: result.data.flashcard };
            }

            setFlashCards(flashcardData);
        } catch (error) {
            console.log('Error fetching flashcards:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (flashCards?.content && currentIndex < flashCards.content.length - 1) {
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
        setCurrentIndex(index);
        setIsFlipped(false);
    };

    if (loading) {
        return <LoadingState />;
    }

    if (!flashCards?.content?.length) {
        return <EmptyState />;
    }

    const totalCards = flashCards.content.length;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-6xl">
                <div className="flex flex-col min-h-screen">
                    {/* Header Section */}
                    <div className="mb-4 sm:mb-6">
                        <FlashcardHeader />
                    </div>

                    {/* Progress Section */}
                    <div className="mb-6 sm:mb-8">
                        <ProgressNavigation
                            currentIndex={currentIndex}
                            totalCards={totalCards}
                            onCardSelect={handleCardSelect}
                        />
                    </div>

                    {/* Flashcard Section - Responsive centered layout */}
                    <div className="flex-1 flex items-center justify-center min-h-[350px] sm:min-h-[450px] lg:min-h-[500px] mb-6 sm:mb-8">
                        <FlashCardItem
                            flashcard={flashCards.content[currentIndex]}
                            isFlipped={isFlipped}
                            setIsFlipped={setIsFlipped}
                        />
                        {console.log("flashcard hai", flashCards)}
                    </div>

                    {/* Navigation Section */}
                    <div className="mt-auto pb-4 sm:pb-6">
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