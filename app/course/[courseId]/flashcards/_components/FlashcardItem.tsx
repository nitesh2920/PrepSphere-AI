'use client'; // This directive is typically added at the top for client-side components

import React from 'react';
import ReactCardFlip from 'react-card-flip'; // Library for card flip animation

function FlashCardItem({ flashcard, isFlipped, setIsFlipped }) { // Accept props for flashcard data and flip state
  // This internal state is NOT used in the video's final implementation, 
  // as the flip state is managed by the parent component (Flashcards) 
  // to reset on carousel slide change. 
  // However, the video briefly shows it before centralizing the state.
  // const [isFlippedLocal, setIsFlippedLocal] = useState(false); 

  const handleClick = () => {
    setIsFlipped(!isFlipped); // Toggle the flip state provided by the parent
  };

  return (
    <div>
    <ReactCardFlip isFlipped={isFlipped} flipDirection='vertical'>
      {/* Front of the card */}
      <div
        onClick={handleClick}
        className='p-4 bg-blue-600 text-white  rounded-lg flex items-center justify-center cursor-pointer shadow-lg 
                   h-[250px] w-[200px] md:h-[350px] md:w-[300px]' // Responsive height and width classes
      >
        <h2 className='text-center text-lg font-bold'>{flashcard?.front}</h2> 
      </div>

      {/* Back of the card */}
      <div
        onClick={handleClick}
        className='p-4 bg-white text-primary rounded-lg flex items-center justify-center cursor-pointer shadow-lg 
                   h-[250px] w-[200px] md:h-[350px] md:w-[300px]' 
      >
        <h2 className='text-center text-lg font-bold'>{flashcard?.back} </h2> 
      </div>
    </ReactCardFlip>
    </div>
  );
}

export default FlashCardItem;