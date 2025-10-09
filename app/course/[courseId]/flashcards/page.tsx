"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'; // Used to get user email for API calls
import FlashCardItem from './_components/FlashcardItem';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

function Flashcards() {

    const { courseId } = useParams();
    const [flashCards, setFlashCards] = useState([]);
    const [isFlipped, setIsFlipped] = useState(false);
    const [api, setApi] = useState();
    const { user } = useUser(); // Clerk hook to get user information

    useEffect(() => {
        GetFlashCards()
    }, [])

    useEffect(() => {
  console.log("✅ flashCards updated:", flashCards);
}, [flashCards]);
  

    const GetFlashCards = async () => {
        if (!courseId || !user?.primaryEmailAddress?.emailAddress) return; // Ensure necessary data is available

        try {
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'Flashcard',
            });
        setFlashCards(result.data);
            console.log("api result", result.data);
        } catch (error) {
            console.log('Error fetching flashcards:', error);
        }
    };

    return (
        <div >
            <h2 className='font-bold text-2xl'> Flashcards</h2>
            <p>Flashcards: The ultimate tool to Lock in conceptes</p>
                   <div className='flex items-center justify-center'>
                <Carousel className='w-full max-w-lg mx-auto mt-10'>
                    <CarouselContent>

                        {flashCards?.content?.map((item, index) => (
                            <CarouselItem key={index} className="flex items-center justify-center">

                                <FlashCardItem flashcard={item} isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
                            </CarouselItem>
                        ))}




                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        {console.log("flashcard data state wla", flashCards?.content)}

        </div>
    )
}

export default Flashcards