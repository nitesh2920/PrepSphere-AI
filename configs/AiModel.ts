import { GoogleGenAI, Schema, Type } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

export async function getCourseOutline(prompt: string): Promise<string> {
  const courseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      course_title: { type: Type.STRING },
      difficulty_level: { type: Type.STRING },
      target_audience: { type: Type.STRING },
      course_summary: { type: Type.STRING },
      chapters: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            chapter_number: { type: Type.NUMBER },
            chapter_title: { type: Type.STRING },
            chapter_summary: { type: Type.STRING },
            emoji: { type: Type.STRING },
            topics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["chapter_number", "chapter_title", "chapter_summary", "topics"],
        },
      },
    },
    required: ["course_title", "difficulty_level", "target_audience", "course_summary", "chapters"],
  };

  const config = {
    responseMimeType: "application/json",
    responseSchema: courseSchema,
    thinkingConfig: {
      thinkingBudget: -1,
    },
  };

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config,
  });

  const response = result.text ?? '';
  
  return response;
}


export async function generateNotesAIModel(prompt: string): Promise<string> {
  
  // const tools = [
  //   {
  //     googleSearch: {},
  //   },
  // ];

  const config = {
    responseMimeType:'text/plain',
    thinkingConfig: {
      thinkingBudget: -1,
    },
    // tools,
  };

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents,
    config,
  });

    const result = response.text ?? '';

    console.log("notessss ka resutl ", result)

  return result;

}

export async function generateFlashcards(prompt: string): Promise<string> {
  // Schema definition
  const flashcardSchema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        front: { type: Type.STRING },
        back: { type: Type.STRING },
      },
      required: ["front", "back"],
    },
  };

  const config = {
    responseMimeType: "application/json",
    responseSchema: flashcardSchema,
    thinkingConfig: {
      thinkingBudget: -1,
    },
  };

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config,
  });

  const response = result.text ?? '';
  return response;
}

export async function generateQuiz(prompt: string): Promise<string> {
  const quizSchema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        options: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        answer: { type: Type.STRING },
      },
      required: ['question', 'options', 'answer'],
    },
  };

  const config = {
    responseMimeType: 'application/json',
    responseSchema: quizSchema,
    thinkingConfig: {
      thinkingBudget: -1,
    },
  };

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];


  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config,
    });

    const response = result.text ?? '';
    return response;
  } catch (err) {
    console.error('Error generating quiz:', err);
    return '[]';
  }
}

export async function generateQA(prompt: string): Promise<string> {
  
  const qaSchema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        answer: { type: Type.STRING },
        difficulty: { type: Type.STRING },
        category: { type: Type.STRING },
        tags: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        followUpQuestions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: ['question', 'answer', 'difficulty', 'category'],
    },
  };

  const config = {
    responseMimeType: 'application/json',
    responseSchema: qaSchema,
    thinkingConfig: {
      thinkingBudget: -1,
    },
  };

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config,
    });

    const response = result.text ?? '';
    
    if (!response || response.trim() === '') {
      console.error('Empty response from Gemini API');
      return '[]';
    }
    
    // Validate JSON
    try {
      JSON.parse(response);
    } catch (parseError) {
      console.error('Q&A response is not valid JSON:', parseError);
      return '[]';
    }
    
    return response;
  } catch (err) {
    console.error('Error generating Q&A:', err);
    return '[]';
  }
}